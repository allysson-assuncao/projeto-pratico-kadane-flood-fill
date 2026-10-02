"""Gerador de gráficos comparativos para o benchmark do Algoritmo de Kadane.

Lê os dados coletados em results/benchmark_data.json e gera:
- grafico_tempo.png: Comparação de tempo de execução (escala log-log) com curvas teóricas.
- grafico_memoria.png: Comparação de consumo de memória de heap e call stack.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import matplotlib.pyplot as plt

RESULTS_DIR = Path(__file__).parent / "results"
DATA_FILE = RESULTS_DIR / "benchmark_data.json"


def plot_benchmarks() -> None:
    """Carrega os dados de benchmark e gera os gráficos PNG."""
    if not DATA_FILE.exists():
        raise FileNotFoundError(
            f"Arquivo de dados não encontrado: {DATA_FILE}. "
            "Execute 'python kadane/benchmarks/runner.py' primeiro."
        )

    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    results = data["results"]

    n_values = [r["n"] for r in results]
    iter_times = [r["iter_time_mean"] for r in results]
    iter_mems_kb = [r["iter_peak_mem"] / 1024 for r in results]

    rec_n = [r["n"] for r in results if r["rec_time_mean"] is not None]
    rec_times = [r["rec_time_mean"] for r in results if r["rec_time_mean"] is not None]
    rec_mems_kb = [
        r["rec_peak_mem"] / 1024 for r in results if r["rec_peak_mem"] is not None
    ]

    err_n = [r["n"] for r in results if r.get("recursion_error", False)]

    # Configuração de estilo limpo
    plt.style.use("seaborn-v0_8-whitegrid" if "seaborn-v0_8-whitegrid" in plt.style.available else "default")

    # =========================================================================
    # GRÁFICO 1: TEMPO DE EXECUÇÃO (Escala Log-Log)
    # =========================================================================
    plt.figure(figsize=(10, 6), dpi=300)

    # Curvas reais medidas
    plt.plot(
        n_values,
        iter_times,
        marker="o",
        color="#1f77b4",
        linewidth=2.5,
        label="Kadane Iterativo — O(n)",
    )
    plt.plot(
        rec_n,
        rec_times,
        marker="s",
        color="#d62728",
        linewidth=2.5,
        label="Divisão e Conquista (Recursivo) — O(n log n)",
    )

    # Curvas de referência assintótica teóricas normalizadas
    if len(n_values) > 1 and iter_times[0] > 0:
        c1 = iter_times[0] / n_values[0]
        theory_on = [c1 * n for n in n_values]
        plt.plot(
            n_values,
            theory_on,
            linestyle="--",
            color="#8c96c6",
            alpha=0.7,
            label="Referência Teórica O(n)",
        )

    if len(rec_n) > 1 and rec_times[0] > 0:
        c2 = rec_times[0] / (rec_n[0] * math.log2(rec_n[0]))
        theory_nlogn = [c2 * n * math.log2(n) for n in n_values]
        plt.plot(
            n_values,
            theory_nlogn,
            linestyle=":",
            color="#fc9272",
            alpha=0.8,
            label="Referência Teórica O(n log n)",
        )

    if err_n:
        for en in err_n:
            plt.scatter(
                [en],
                [max(iter_times) * 2],
                marker="x",
                color="red",
                s=100,
                zorder=5,
                label=f"RecursionError (N={en:,})",
            )

    plt.xscale("log")
    plt.yscale("log")
    plt.xlabel("Tamanho da Entrada (N)", fontsize=12, fontweight="bold")
    plt.ylabel("Tempo Médio de Execução (segundos - log)", fontsize=12, fontweight="bold")
    plt.title(
        "Comparativo de Tempo: Kadane Iterativo vs. Divisão e Conquista",
        fontsize=14,
        fontweight="bold",
        pad=15,
    )
    plt.legend(frameon=True, facecolor="white", framealpha=0.9, fontsize=10)
    plt.tight_layout()

    time_plot_path = RESULTS_DIR / "grafico_tempo.png"
    plt.savefig(time_plot_path)
    plt.close()
    print(f"[OK] Gráfico de tempo gerado: {time_plot_path}")

    # =========================================================================
    # GRÁFICO 2: PICO DE MEMÓRIA ALOCADA (KB)
    # =========================================================================
    plt.figure(figsize=(10, 6), dpi=300)

    plt.plot(
        n_values,
        iter_mems_kb,
        marker="o",
        color="#1f77b4",
        linewidth=2.5,
        label="Kadane Iterativo — Espaço Auxiliar O(1)",
    )
    plt.plot(
        rec_n,
        rec_mems_kb,
        marker="^",
        color="#d62728",
        linewidth=2.5,
        label="Divisão e Conquista — Pilha O(log n)",
    )

    plt.xscale("log")
    plt.xlabel("Tamanho da Entrada (N)", fontsize=12, fontweight="bold")
    plt.ylabel("Pico de Memória Alocada (KB)", fontsize=12, fontweight="bold")
    plt.title(
        "Comparativo de Consumo de Memória (Heap Tracing)",
        fontsize=14,
        fontweight="bold",
        pad=15,
    )
    plt.legend(frameon=True, facecolor="white", framealpha=0.9, fontsize=10)
    plt.tight_layout()

    mem_plot_path = RESULTS_DIR / "grafico_memoria.png"
    plt.savefig(mem_plot_path)
    plt.close()
    print(f"[OK] Gráfico de memória gerado: {mem_plot_path}")


if __name__ == "__main__":
    plot_benchmarks()
