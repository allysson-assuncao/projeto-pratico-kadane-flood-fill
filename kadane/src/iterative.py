"""Implementação iterativa pura do Algoritmo de Kadane.

Complexidade de Tempo: O(n)
Complexidade de Espaço Auxiliar: O(1)
"""

from __future__ import annotations

from typing import Any

from kadane.src.types import CallStackFrame, StepEvent, SubarrayResult


def kadane_iterative(arr: list[int], tracer: Any | None = None) -> SubarrayResult:
    """Calcula a soma máxima de subarranjo contíguo usando o Algoritmo de Kadane.

    Executa em uma única passada (single pass) pelo vetor mantendo apenas variáveis
    escalares de controle em memória, garantindo complexidade espacial constante O(1).
    Suporta injeção de dependência opcional de um tracer para fins educacionais e testes.

    Args:
        arr: Lista de inteiros contendo números positivos, negativos ou nulos.
        tracer: Objeto de rastreamento opcional (deve implementar o método `record(event)`).

    Returns:
        SubarrayResult: Objeto imutável com max_sum, start_idx e end_idx.

    Raises:
        ValueError: Se a lista `arr` de entrada estiver vazia.
    """
    if not arr:
        raise ValueError("O array de entrada não pode ser vazio.")

    # Inicialização do primeiro elemento (k = 0)
    max_global = arr[0]
    best_start = 0
    best_end = 0

    max_current = arr[0]
    curr_start = 0

    if tracer is not None:
        frame = CallStackFrame(
            frame_id=0,
            fn_name="kadane_iterative",
            low=0,
            high=len(arr) - 1,
            depth=0,
        )
        tracer.record(
            StepEvent(
                step=getattr(tracer, "current_step", 0),
                algorithm="iterative",
                current_idx=0,
                max_current=max_current,
                max_global=max_global,
                active_start=curr_start,
                active_end=0,
                call_stack=[frame],
                event_type="step",
                annotation=f"Inicialização no elemento A[0] = {arr[0]}",
            )
        )

    # Laço iterativo O(n) da posição 1 até n - 1
    for k in range(1, len(arr)):
        val = arr[k]

        # Decisão de Programação Dinâmica:
        # Se max_current anterior for negativo, descartar e reiniciar em A[k].
        if max_current < 0:
            max_current = val
            curr_start = k
            annotation = (
                f"Reiniciou subarranjo em A[{k}] = {val} "
                f"(acumulado anterior era negativo)"
            )
        else:
            max_current += val
            annotation = (
                f"Estendeu subarranjo somando A[{k}] = {val} "
                f"(novo acumulado = {max_current})"
            )

        # Atualização do melhor resultado global
        if max_current > max_global:
            max_global = max_current
            best_start = curr_start
            best_end = k
            annotation += (
                f" -> Novo recorde global: {max_global} no intervalo [{best_start}..{best_end}]"
            )

        if tracer is not None:
            frame = CallStackFrame(
                frame_id=0,
                fn_name="kadane_iterative",
                low=0,
                high=len(arr) - 1,
                depth=0,
            )
            tracer.record(
                StepEvent(
                    step=getattr(tracer, "current_step", 0),
                    algorithm="iterative",
                    current_idx=k,
                    max_current=max_current,
                    max_global=max_global,
                    active_start=curr_start,
                    active_end=k,
                    call_stack=[frame],
                    event_type="step",
                    annotation=annotation,
                )
            )

    result = SubarrayResult(
        max_sum=max_global,
        start_idx=best_start,
        end_idx=best_end,
    )

    if tracer is not None:
        frame = CallStackFrame(
            frame_id=0,
            fn_name="kadane_iterative",
            low=0,
            high=len(arr) - 1,
            depth=0,
            partial_result=result,
        )
        tracer.record(
            StepEvent(
                step=getattr(tracer, "current_step", 0),
                algorithm="iterative",
                current_idx=None,
                max_current=max_current,
                max_global=max_global,
                active_start=best_start,
                active_end=best_end,
                call_stack=[frame],
                event_type="result",
                annotation=(
                    f"Execução finalizada com sucesso. Soma máxima = {max_global} "
                    f"no intervalo [{best_start}..{best_end}]."
                ),
            )
        )

    return result
