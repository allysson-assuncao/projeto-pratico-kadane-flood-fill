from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
import statistics
import time
import tracemalloc

from domain.entities import Grid, Point
from strategies.iterative import IterativeFloodFill
from strategies.recursive import RecursiveFloodFill
from benchmarks.plotter import BenchmarkPlotter

RESULTS_DIR = Path(__file__).parent / "results"
GRID_SIZES: list[int] = [10, 20, 25, 30, 50, 80]
NUM_ROUNDS: int = 15

@dataclass(frozen=True)
class ExecutionStats:
    mean_time_s: float | None
    stdev_time_s: float | None
    peak_memory_kb: float | None
    recursion_error: bool = False

@dataclass(frozen=True)
class BenchmarkRow:
    dimension: int
    cells_count: int
    iterative: ExecutionStats
    recursive: ExecutionStats

    @property
    def speedup_iter_vs_rec(self) -> float | None:
        """Calcula a razão T_rec / T_iter (> 1.0 indica vantagem para a abordagem iterativa)."""
        if (
            self.iterative.mean_time_s
            and self.recursive.mean_time_s
            and self.iterative.mean_time_s > 0
        ):
            return self.recursive.mean_time_s / self.iterative.mean_time_s
        return None

class FloodFillRunner:
    """Executa medições empíricas comparativas entre implementações DFS de Flood Fill."""

    def __init__(self, sizes: list[int] = GRID_SIZES, rounds: int = NUM_ROUNDS) -> None:
        self._sizes = sizes
        self._rounds = rounds
        self._iterative_strategy = IterativeFloodFill()
        self._recursive_strategy = RecursiveFloodFill()

    def run_all(self) -> list[BenchmarkRow]:
        RESULTS_DIR.mkdir(parents=True, exist_ok=True)
        rows: list[BenchmarkRow] = []

        for size in self._sizes:
            cells = size * size
            print(f"Executando N={size}x{size} ({cells:,} células)...")
            iter_stats = self._benchmark_strategy(self._iterative_strategy, size)
            rec_stats = self._benchmark_strategy(self._recursive_strategy, size)
            rows.append(
                BenchmarkRow(
                    dimension=size,
                    cells_count=cells,
                    iterative=iter_stats,
                    recursive=rec_stats,
                )
            )

        self._export_markdown_report(rows, RESULTS_DIR / "report.md")
        BenchmarkPlotter.generate_charts(rows, RESULTS_DIR)
        return rows

    def _benchmark_strategy(self, strategy, size: int) -> ExecutionStats:
        times: list[float] = []
        peaks: list[float] = []

        try:
            # Warm-up
            warmup_grid = self._create_grid(size)
            strategy.fill(warmup_grid, Point(0, 0), target_color=1)

            # 1. Medição isolada de tempo de CPU
            for _ in range(self._rounds):
                test_grid = self._create_grid(size)
                t0 = time.perf_counter()
                strategy.fill(test_grid, Point(0, 0), target_color=1)
                times.append(time.perf_counter() - t0)

            # 2. Medição isolada de pico de memória de Heap
            for _ in range(self._rounds):
                mem_grid = self._create_grid(size)
                tracemalloc.start()
                try:
                    strategy.fill(mem_grid, Point(0, 0), target_color=1)
                    _, peak = tracemalloc.get_traced_memory()
                    peaks.append(peak / 1024.0)
                finally:
                    tracemalloc.stop()

            return ExecutionStats(
                mean_time_s=statistics.mean(times),
                stdev_time_s=statistics.stdev(times) if len(times) > 1 else 0.0,
                peak_memory_kb=max(peaks),
                recursion_error=False,
            )
        except RecursionError:
            return ExecutionStats(
                mean_time_s=None,
                stdev_time_s=None,
                peak_memory_kb=None,
                recursion_error=True,
            )

    @staticmethod
    def _create_grid(size: int, fill_color: int = 0) -> Grid:
        return Grid([[fill_color for _ in range(size)] for _ in range(size)])

    def _export_markdown_report(self, rows: list[BenchmarkRow], dest_path: Path) -> None:
        lines: list[str] = [
            "# Relatório de Benchmark Comparativo — Flood Fill (DFS)",
            "",
            f"- **Data da Coleta:** {datetime.now().isoformat()}",
            f"- **Rodadas por Dimensão:** {self._rounds}",
            "- **Cenário de Teste:** Matriz homogênea (pior caso de conectividade completa)",
            "- **Algoritmo Base:** DFS (Busca em Profundidade) — Pilha no Heap vs. Call Stack",
            "",
            "## 1. Tabela Comparativa de Tempo de Execução e Aceleração",
            "",
            "| Dimensão ($N$) | Total Células | Iterativo Média (s) | Iterativo Desvio Padrão | Recursivo Média (s) | Recursivo Desvio Padrão | Razão ($T_{rec} / T_{iter}$) |",
            "| :---: | :---: | :---: | :---: | :---: | :---: | :---: |",
        ]

        for r in rows:
            it_t = f"{r.iterative.mean_time_s:.6f}" if r.iterative.mean_time_s else "—"
            it_std = f"{r.iterative.stdev_time_s:.6f}" if r.iterative.stdev_time_s else "—"

            if r.recursive.recursion_error:
                rec_t = "**RecursionError**"
                rec_std = "—"
                ratio_str = "—"
            else:
                rec_t = f"{r.recursive.mean_time_s:.6f}" if r.recursive.mean_time_s else "—"
                rec_std = f"{r.recursive.stdev_time_s:.6f}" if r.recursive.stdev_time_s else "—"
                ratio_str = f"**{r.speedup_iter_vs_rec:.2f}x**" if r.speedup_iter_vs_rec else "—"

            lines.append(
                f"| {r.dimension}x{r.dimension} | {r.cells_count:,} | {it_t} | {it_std} | {rec_t} | {rec_std} | {ratio_str} |"
            )

        lines.extend([
            "",
            "## 2. Tabela Comparativa de Alocação de Memória (Heap Tracing)",
            "",
            "| Dimensão ($N$) | Total Células | Iterativo Pico (KB) | Recursivo Pico (KB) | Razão ($Heap_{rec} / Heap_{iter}$) |",
            "| :---: | :---: | :---: | :---: | :---: |",
        ])

        for r in rows:
            it_m = f"{r.iterative.peak_memory_kb:.2f}" if r.iterative.peak_memory_kb else "—"
            if r.recursive.recursion_error:
                rec_m = "**RecursionError**"
                ratio_str = "—"
            else:
                rec_m = f"{r.recursive.peak_memory_kb:.2f}" if r.recursive.peak_memory_kb else "—"
                if r.iterative.peak_memory_kb and r.recursive.peak_memory_kb:
                    ratio_str = f"{(r.recursive.peak_memory_kb / r.iterative.peak_memory_kb):.2f}x"
                else:
                    ratio_str = "—"

            lines.append(
                f"| {r.dimension}x{r.dimension} | {r.cells_count:,} | {it_m} | {rec_m} | {ratio_str} |"
            )

        lines.extend([
            "",
            "## 3. Análise dos Resultados e Limites da Pilha",
            "",
            "- **Estouro de Pilha (*Stack Overflow*):** Em Python, a profundidade padrão de chamadas (`sys.getrecursionlimit()`) é de 1000 frames. Matrizes a partir de ~30x30 excedem este limiar sob propagação homogênea.",
            "- **Natureza da Memória Rasteada:** O `tracemalloc` contabiliza estruturas alocadas pelos gestores de memória do Python. O custo da recursão reflete a instanciação de objetos `PyFrameObject` no Heap do interpretador, enquanto a abordagem iterativa utiliza uma lista Python contígua dinâmica.",
            "- **Estabilidade Operacional:** A abordagem iterativa com lista/pilha alocada no Heap não sofre a restrição imposta pelo interpretador para a pilha de recursão de funções, completando execuções de maior escala sem interrupção de runtime.",
            "",
        ])

        dest_path.write_text("\n".join(lines), encoding="utf-8")
        print(f"[OK] Relatório Markdown gerado: {dest_path}")


if __name__ == "__main__":
    runner = FloodFillRunner()
    runner.run_all()