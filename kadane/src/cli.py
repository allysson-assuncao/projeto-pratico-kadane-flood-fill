"""Interface de Linha de Comando (CLI) para o módulo Kadane.

Permite a execução interativa ou via argumentos dos algoritmos Kadane Iterativo
(Programação Dinâmica) e Kadane Recursivo (Divisão e Conquista), com comparação de
resultados, visualização de fatias, medição de tempo e modo passo a passo.
"""

from __future__ import annotations

import argparse
import re
import sys
import time
from typing import Sequence

from kadane.src.iterative import kadane_iterative
from kadane.src.recursive import kadane_recursive
from kadane.src.tracer import ExecutionTracer
from kadane.src.types import SubarrayResult

# Assegura configuração de stdout/stderr para UTF-8 com fallback seguro
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Cores ANSI para saída no terminal
RESET = "\033[0m"
BOLD = "\033[1m"
GREEN = "\033[32m"
BLUE = "\033[34m"
CYAN = "\033[36m"
YELLOW = "\033[33m"
RED = "\033[31m"
DIM = "\033[2m"


def parse_array_arg(raw: str) -> list[int]:
    """Converte uma string representativa de um vetor em uma lista de inteiros.

    Formatos suportados:
    - JSON/Python style: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]"
    - Separado por vírgulas: "-2, 1, -3, 4"
    - Separado por espaços: "-2 1 -3 4"

    Raises:
        ValueError: Se a string for vazia ou contiver elementos não inteiros.
    """
    cleaned = raw.strip()
    if not cleaned:
        raise ValueError("O vetor de entrada não pode ser vazio.")

    # Remove colchetes ou parênteses externos se houver
    cleaned = re.sub(r"^[\[\(]\s*", "", cleaned)
    cleaned = re.sub(r"\s*[\]\)]$", "", cleaned).strip()

    if not cleaned:
        raise ValueError("O vetor de entrada não pode ser vazio.")

    # Separa por vírgulas ou sequências de espaços
    tokens = [t for t in re.split(r"[\s,]+", cleaned) if t]

    if not tokens:
        raise ValueError("O vetor de entrada não pode ser vazio.")

    result: list[int] = []
    for token in tokens:
        try:
            result.append(int(token))
        except ValueError as err:
            raise ValueError(
                f"Elemento inválido '{token}'. Todos os elementos devem ser números inteiros."
            ) from err

    return result


def format_array_slice(arr: Sequence[int], start: int, end: int) -> str:
    """Formata visualmente o vetor destacando a fatia ótima da subarray."""
    parts = []
    for i, val in enumerate(arr):
        if start <= i <= end:
            parts.append(f"{BOLD}{GREEN}{val}{RESET}")
        else:
            parts.append(f"{DIM}{val}{RESET}")
    return "[" + ", ".join(parts) + "]"


def format_comparison(arr: list[int], verbose: bool = False) -> str:
    """Executa ambos os algoritmos e retorna uma tabela comparativa detalhada."""
    tracer_it = ExecutionTracer("iterative") if verbose else None
    tracer_rec = ExecutionTracer("recursive") if verbose else None

    # Execução Iterativa com medição
    t0_it = time.perf_counter()
    res_it = kadane_iterative(arr, tracer=tracer_it)
    dt_it_us = (time.perf_counter() - t0_it) * 1_000_000

    # Execução Recursiva com medição
    t0_rec = time.perf_counter()
    res_rec = kadane_recursive(arr, tracer=tracer_rec)
    dt_rec_us = (time.perf_counter() - t0_rec) * 1_000_000

    # Fatias
    slice_it = arr[res_it.start_idx : res_it.end_idx + 1]
    slice_rec = arr[res_rec.start_idx : res_rec.end_idx + 1]

    # Validação de equivalência matemática
    equivalent = res_it.max_sum == res_rec.max_sum

    border_double = "=" * 67
    border_single = "-" * 67
    border_split = "---------------------------+--------------------+------------------"

    lines: list[str] = []
    lines.append("")
    lines.append(f"{BOLD}{CYAN}{border_double}{RESET}")
    lines.append(f"{BOLD}{CYAN}          COMPARACAO: KADANE ITERATIVO vs RECURSIVO (D&C)         {RESET}")
    lines.append(f"{BOLD}{CYAN}{border_double}{RESET}")
    lines.append(f"{BOLD}Vetor de Entrada (N={len(arr)}):{RESET} {arr}")
    lines.append(f"{BOLD}Vetor com Destaque:{RESET}       {format_array_slice(arr, res_it.start_idx, res_it.end_idx)}")
    lines.append(border_single)
    lines.append(f"{'Metrica / Propriedade':<26} | {'Iterativo (PD)':<18} | {'Recursivo (D&C)':<18}")
    lines.append(border_split)
    lines.append(f"{'Paradigma':<26} | {'Prog. Dinamica':<18} | {'Divisao e Conquista':<18}")
    lines.append(f"{'Complexidade Temporal':<26} | {'O(n)':<18} | {'Theta(n log n)':<18}")
    lines.append(f"{'Complexidade Espacial':<26} | {'O(1)':<18} | {'O(log n)':<18}")
    lines.append(f"{'Soma Maxima (max_sum)':<26} | {BOLD}{GREEN}{res_it.max_sum:<18}{RESET} | {BOLD}{GREEN}{res_rec.max_sum:<18}{RESET}")
    lines.append(f"{'Intervalo Otimo [start..end]':<26} | {f'[{res_it.start_idx}..{res_it.end_idx}]':<18} | {f'[{res_rec.start_idx}..{res_rec.end_idx}]':<18}")
    lines.append(f"{'Subarranjo Otimo':<26} | {str(slice_it):<18} | {str(slice_rec):<18}")
    lines.append(f"{'Tempo Estimado (us)':<26} | {f'{dt_it_us:.2f} us':<18} | {f'{dt_rec_us:.2f} us':<18}")
    lines.append(border_single)

    eq_str = f"{BOLD}{GREEN}[OK] SOMAS IDENTICAS{RESET}" if equivalent else f"{BOLD}{RED}[ERRO] DISCREPANCIA DETECTADA{RESET}"
    speedup = dt_rec_us / dt_it_us if dt_it_us > 0 else 1.0
    lines.append(f"{'Equivalencia Formal:':<26} {eq_str}")
    lines.append(f"{'Speedup Iterativo:':<26} {BOLD}{YELLOW}{speedup:.2f}x mais rapido{RESET}")
    lines.append(f"{BOLD}{CYAN}{border_double}{RESET}")

    if verbose and tracer_it:
        lines.append("")
        lines.append(f"{BOLD}{YELLOW}Passo a Passo - Kadane Iterativo:{RESET}")
        for i, step in enumerate(tracer_it.get_trace(), 1):
            val_str = f"A[{step.current_idx}]" if step.current_idx is not None else "-"
            lines.append(f"  {DIM}[Passo {i:02d}]{RESET} {val_str:<6} | max_atual={step.max_current} | max_global={step.max_global} | {step.annotation or ''}")

    return "\n".join(lines)


def run_repl() -> None:
    """Executa um console iterativo REPL para testes rápidos e demonstração ao vivo."""
    print(f"\n{BOLD}{CYAN}Bem-vindo ao Console Interativo do Módulo Kadane!{RESET}")
    print("Digite um array de inteiros para analisar (ex: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`).")
    print("Digite 'exemplo' para carregar o vetor clássico de Bentley.")
    print("Digite 'sair' ou pressione Ctrl+C para encerrar.\n")

    while True:
        try:
            raw = input(f"{BOLD}{BLUE}kadane>{RESET} ").strip()
            if not raw:
                continue
            if raw.lower() in {"sair", "exit", "quit", "q"}:
                print("Encerrando console interativo. Até logo!")
                break
            if raw.lower() == "exemplo":
                raw = "[-2, 1, -3, 4, -1, 2, 1, -5, 4]"

            arr = parse_array_arg(raw)
            print(format_comparison(arr, verbose=True))
            print()
        except KeyboardInterrupt:
            print("\nEncerrando console interativo. Até logo!")
            break
        except Exception as e:
            print(f"{BOLD}{RED}Erro:{RESET} {e}\n")


def build_parser() -> argparse.ArgumentParser:
    """Configura e retorna o parser de argumentos de linha de comando."""
    parser = argparse.ArgumentParser(
        prog="kadane",
        description="Módulo Kadane: Comparação entre Programação Dinâmica O(n) e Divisão e Conquista O(n log n).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""Exemplos de uso:
  python -m kadane --array "[-2, 1, -3, 4, -1, 2, 1, -5, 4]"
  python -m kadane --array "5, -2, 7, -1, 3" --verbose
  python -m kadane --interactive
""",
    )

    parser.add_argument(
        "-a",
        "--array",
        type=str,
        default=None,
        help="Vetor de entrada (ex: '[-2, 1, -3, 4]' ou '1, -2, 3')",
    )

    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Exibe o rastreamento passo a passo das decisões do algoritmo",
    )

    parser.add_argument(
        "-i",
        "--interactive",
        action="store_true",
        help="Inicia o console interativo (REPL) para inserção contínua de vetores",
    )

    return parser


def main(argv: Sequence[str] | None = None) -> int:
    """Ponto de entrada principal da CLI."""
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.interactive or (args.array is None and len(sys.argv) <= 1):
        run_repl()
        return 0

    if args.array is not None:
        try:
            arr = parse_array_arg(args.array)
            print(format_comparison(arr, verbose=args.verbose))
            return 0
        except ValueError as err:
            print(f"{BOLD}{RED}Erro de Entrada:{RESET} {err}", file=sys.stderr)
            return 1
        except Exception as err:
            print(f"{BOLD}{RED}Erro Inesperado:{RESET} {err}", file=sys.stderr)
            return 1

    parser.print_help()
    return 0


if __name__ == "__main__":
    sys.exit(main())
