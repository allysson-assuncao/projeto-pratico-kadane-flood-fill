"""Implementação recursiva do Problema da Soma Máxima de Subarranjo (Divisão e Conquista).

Abordagem canônica descrita no CLRS / Bentley:
Complexidade de Tempo: O(n log n)
Complexidade de Espaço (Pilha de Chamadas): O(log n)
"""

from __future__ import annotations

from typing import Any

from kadane.src.types import StepEvent, SubarrayResult


def _max_crossing_subarray(
    arr: list[int],
    low: int,
    mid: int,
    high: int,
    tracer: Any | None = None,
) -> SubarrayResult:
    """Encontra o subarranjo contíguo de soma máxima que cruza obrigatoriamente o ponto médio `mid`.

    Args:
        arr: Array de inteiros.
        low: Limite inferior do intervalo.
        mid: Ponto médio da divisão.
        high: Limite superior do intervalo.
        tracer: Coletor de rastreamento opcional.

    Returns:
        SubarrayResult: Subarranjo de maior soma contendo arr[mid] e arr[mid+1].
    """
    # 1. Metade esquerda: acumulando de mid descendo até low
    left_sum = float("-inf")
    curr_sum = 0
    max_left = mid

    for i in range(mid, low - 1, -1):
        curr_sum += arr[i]
        if curr_sum > left_sum:
            left_sum = curr_sum
            max_left = i

        if tracer is not None and hasattr(tracer, "record"):
            tracer.record(
                StepEvent(
                    step=getattr(tracer, "current_step", 0),
                    algorithm="recursive",
                    current_idx=i,
                    max_current=int(curr_sum),
                    max_global=int(left_sum),
                    active_start=i,
                    active_end=mid,
                    call_stack=(
                        tracer.get_stack_snapshot()
                        if hasattr(tracer, "get_stack_snapshot")
                        else []
                    ),
                    event_type="step",
                    annotation=(
                        f"Cruzamento à esquerda: A[{i}] = {arr[i]}, "
                        f"acumulado = {curr_sum}, melhor à esquerda = {left_sum}"
                    ),
                )
            )

    # 2. Metade direita: acumulando de mid + 1 subindo até high
    right_sum = float("-inf")
    curr_sum = 0
    max_right = mid + 1

    for j in range(mid + 1, high + 1):
        curr_sum += arr[j]
        if curr_sum > right_sum:
            right_sum = curr_sum
            max_right = j

        if tracer is not None and hasattr(tracer, "record"):
            tracer.record(
                StepEvent(
                    step=getattr(tracer, "current_step", 0),
                    algorithm="recursive",
                    current_idx=j,
                    max_current=int(curr_sum),
                    max_global=int(right_sum),
                    active_start=mid + 1,
                    active_end=j,
                    call_stack=(
                        tracer.get_stack_snapshot()
                        if hasattr(tracer, "get_stack_snapshot")
                        else []
                    ),
                    event_type="step",
                    annotation=(
                        f"Cruzamento à direita: A[{j}] = {arr[j]}, "
                        f"acumulado = {curr_sum}, melhor à direita = {right_sum}"
                    ),
                )
            )

    return SubarrayResult(
        max_sum=int(left_sum + right_sum),
        start_idx=max_left,
        end_idx=max_right,
    )


def _max_subarray_rec(
    arr: list[int],
    low: int,
    high: int,
    tracer: Any | None = None,
    depth: int = 0,
) -> SubarrayResult:
    """Função recursiva principal da Divisão e Conquista.

    Divide o intervalo recursivamente em metades e recombina calculando o cruzamento.
    A profundidade da call stack é estritamente limitada a O(log n).

    Args:
        arr: Array de inteiros.
        low: Limite inferior do intervalo.
        high: Limite superior do intervalo.
        tracer: Coletor de rastreamento opcional.
        depth: Nível de profundidade da chamada recursiva corrente.

    Returns:
        SubarrayResult: Subarranjo ótimo no intervalo [low..high].
    """
    mid = (low + high) // 2

    # Registra a entrada na função (push frame)
    if tracer is not None and hasattr(tracer, "push_frame"):
        tracer.push_frame(
            fn_name="_max_subarray_rec",
            low=low,
            high=high,
            mid=mid if low != high else None,
            depth=depth,
        )
        if hasattr(tracer, "record"):
            tracer.record(
                StepEvent(
                    step=getattr(tracer, "current_step", 0),
                    algorithm="recursive",
                    current_idx=mid if low != high else low,
                    max_current=None,
                    max_global=0,
                    active_start=low,
                    active_end=high,
                    call_stack=(
                        tracer.get_stack_snapshot()
                        if hasattr(tracer, "get_stack_snapshot")
                        else []
                    ),
                    event_type="push",
                    annotation=(
                        f"PUSH: Iniciando recursão no intervalo [{low}..{high}], "
                        f"profundidade={depth}"
                    ),
                )
            )

    # Caso Base: subarranjo unitário
    if low == high:
        res = SubarrayResult(max_sum=arr[low], start_idx=low, end_idx=low)
        if tracer is not None:
            if hasattr(tracer, "pop_frame"):
                tracer.pop_frame(partial_result=res)
            if hasattr(tracer, "record"):
                tracer.record(
                    StepEvent(
                        step=getattr(tracer, "current_step", 0),
                        algorithm="recursive",
                        current_idx=low,
                        max_current=arr[low],
                        max_global=arr[low],
                        active_start=low,
                        active_end=low,
                        call_stack=(
                            tracer.get_stack_snapshot()
                            if hasattr(tracer, "get_stack_snapshot")
                            else []
                        ),
                        event_type="pop",
                        annotation=(
                            f"POP (Caso Base): elemento unitário A[{low}] = {arr[low]}"
                        ),
                    )
                )
        return res

    # Divisão: resolve os lados esquerdo e direito recursivamente
    left_res = _max_subarray_rec(arr, low, mid, tracer=tracer, depth=depth + 1)
    right_res = _max_subarray_rec(arr, mid + 1, high, tracer=tracer, depth=depth + 1)

    # Conquista: resolve o subarranjo que cruza a fronteira central
    cross_res = _max_crossing_subarray(arr, low, mid, high, tracer=tracer)

    # Seleciona o melhor entre os três subarranjos candidatos
    best_res = left_res
    if right_res.max_sum > best_res.max_sum:
        best_res = right_res
    if cross_res.max_sum > best_res.max_sum:
        best_res = cross_res

    # Registra o retorno da chamada (pop frame)
    if tracer is not None:
        if hasattr(tracer, "pop_frame"):
            tracer.pop_frame(partial_result=best_res)
        if hasattr(tracer, "record"):
            tracer.record(
                StepEvent(
                    step=getattr(tracer, "current_step", 0),
                    algorithm="recursive",
                    current_idx=None,
                    max_current=best_res.max_sum,
                    max_global=best_res.max_sum,
                    active_start=best_res.start_idx,
                    active_end=best_res.end_idx,
                    call_stack=(
                        tracer.get_stack_snapshot()
                        if hasattr(tracer, "get_stack_snapshot")
                        else []
                    ),
                    event_type="pop",
                    annotation=(
                        f"POP: Retorno do intervalo [{low}..{high}]: melhor soma = {best_res.max_sum} "
                        f"em [{best_res.start_idx}..{best_res.end_idx}]"
                    ),
                )
            )

    return best_res


def kadane_recursive(arr: list[int], tracer: Any | None = None) -> SubarrayResult:
    """Calcula a soma máxima de subarranjo usando Divisão e Conquista (Recursivo).

    Complexidade de tempo: O(n log n).
    Complexidade espacial (profundidade de call stack): O(log n).

    Args:
        arr: Lista de inteiros contendo números positivos, negativos ou nulos.
        tracer: Coletor de rastreamento opcional.

    Returns:
        SubarrayResult: Objeto imutável contendo max_sum, start_idx e end_idx.

    Raises:
        ValueError: Se o vetor de entrada for vazio.
    """
    if not arr:
        raise ValueError("O array de entrada não pode ser vazio.")

    result = _max_subarray_rec(arr, 0, len(arr) - 1, tracer=tracer, depth=0)

    if tracer is not None and hasattr(tracer, "record"):
        tracer.record(
            StepEvent(
                step=getattr(tracer, "current_step", 0),
                algorithm="recursive",
                current_idx=None,
                max_current=result.max_sum,
                max_global=result.max_sum,
                active_start=result.start_idx,
                active_end=result.end_idx,
                call_stack=[],
                event_type="result",
                annotation=(
                    f"Execução recursiva finalizada. Soma máxima = {result.max_sum} "
                    f"no intervalo [{result.start_idx}..{result.end_idx}]."
                ),
            )
        )

    return result
