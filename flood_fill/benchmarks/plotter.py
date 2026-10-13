from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING
import matplotlib.pyplot as plt

if TYPE_CHECKING:
    from benchmarks.runner import BenchmarkRow


class BenchmarkPlotter:
    """Gera visualizações gráficas de tempo de execução e consumo de heap."""

    @classmethod
    def generate_charts(cls, rows: list[BenchmarkRow], output_dir: Path) -> None:
        cls._configure_style()
        cls._plot_execution_time(rows, output_dir / "grafico_tempo.png")
        cls._plot_memory_usage(rows, output_dir / "grafico_memoria.png")

    @staticmethod
    def _configure_style() -> None:
        style = "seaborn-v0_8-whitegrid" if "seaborn-v0_8-whitegrid" in plt.style.available else "default"
        plt.style.use(style)

    @staticmethod
    def _plot_execution_time(rows: list[BenchmarkRow], save_path: Path) -> None:
        cells = [r.cells_count for r in rows]
        iter_times = [r.iterative.mean_time_s for r in rows]

        rec_cells = [r.cells_count for r in rows if not r.recursive.recursion_error]
        rec_times = [r.recursive.mean_time_s for r in rows if not r.recursive.recursion_error]
        err_cells = [r.cells_count for r in rows if r.recursive.recursion_error]

        plt.figure(figsize=(10, 6), dpi=300)
        plt.plot(
            cells,
            iter_times,
            marker="o",
            color="#1f77b4",
            linewidth=2.2,
            label="Iterativo (BFS / Heap) — O(V + E)",
        )

        if rec_times:
            plt.plot(
                rec_cells,
                rec_times,
                marker="s",
                color="#2ca02c",
                linewidth=2.2,
                label="Recursivo (DFS / Call Stack) — O(V + E)",
            )

        if err_cells and iter_times:
            valid_max = max(t for t in iter_times if t is not None)
            for ec in err_cells:
                plt.scatter(
                    [ec],
                    [valid_max * 1.5],
                    marker="x",
                    color="red",
                    s=110,
                    zorder=5,
                    label=f"RecursionError ({ec:,} células)",
                )

        plt.xscale("log")
        plt.yscale("log")
        plt.xlabel("Quantidade de Células ($N \\times N$)", fontsize=11, fontweight="bold")
        plt.ylabel("Tempo Médio de Execução (s) — Escala Log", fontsize=11, fontweight="bold")
        plt.title("Comparativo de Tempo: Flood Fill Iterativo vs. Recursivo", fontsize=13, fontweight="bold", pad=12)
        plt.legend(frameon=True, facecolor="white", framealpha=0.9, fontsize=9)
        plt.tight_layout()
        plt.savefig(save_path)
        plt.close()
        print(f"[OK] Gráfico salvo: {save_path}")

    @staticmethod
    def _plot_memory_usage(rows: list[BenchmarkRow], save_path: Path) -> None:
        cells = [r.cells_count for r in rows]
        iter_mems = [r.iterative.peak_memory_kb for r in rows]

        rec_cells = [r.cells_count for r in rows if not r.recursive.recursion_error]
        rec_mems = [r.recursive.peak_memory_kb for r in rows if not r.recursive.recursion_error]

        plt.figure(figsize=(10, 6), dpi=300)
        plt.plot(
            cells,
            iter_mems,
            marker="o",
            color="#1f77b4",
            linewidth=2.2,
            label="Iterativo (Alocação de Heap / deque)",
        )

        if rec_mems:
            plt.plot(
                rec_cells,
                rec_mems,
                marker="^",
                color="#d62728",
                linewidth=2.2,
                label="Recursivo (Alocação de Stack Frames)",
            )

        plt.xscale("log")
        plt.xlabel("Quantidade de Células ($N \\times N$)", fontsize=11, fontweight="bold")
        plt.ylabel("Pico de Memória Alocada (KB)", fontsize=11, fontweight="bold")
        plt.title("Comparativo de Consumo de Memória (Heap Tracing)", fontsize=13, fontweight="bold", pad=12)
        plt.legend(frameon=True, facecolor="white", framealpha=0.9, fontsize=9)
        plt.tight_layout()
        plt.savefig(save_path)
        plt.close()
        print(f"[OK] Gráfico salvo: {save_path}")