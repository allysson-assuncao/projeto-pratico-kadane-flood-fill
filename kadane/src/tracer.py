"""Coletor de eventos e rastreador de execução (ExecutionTracer).

Permite capturar snapshots do estado dos algoritmos durante a execução
e serializá-los no formato JSON especificado para o visualizador interativo.
"""

from __future__ import annotations

import json
from copy import copy
from pathlib import Path
from typing import Any

from kadane.src.types import CallStackFrame, StepEvent, SubarrayResult


class ExecutionTracer:
    """Coletor desacoplado de eventos e gerenciador de pilha de execução.

    Pode ser injetado nos algoritmos iterativo e recursivo para registrar o passo a passo
    sem acoplar a lógica dos algoritmos a detalhes de formatação ou visualização.
    """

    def __init__(self, algorithm: str = "iterative") -> None:
        """Inicializa o coletor de rastreamento.

        Args:
            algorithm: Nome da abordagem sendo rastreada ('iterative' ou 'recursive').
        """
        self.algorithm = algorithm
        self._events: list[StepEvent] = []
        self._call_stack: list[CallStackFrame] = []
        self._step_counter: int = 0
        self._frame_id_counter: int = 0

    @property
    def current_step(self) -> int:
        """Retorna o contador atual de passos."""
        return self._step_counter

    def push_frame(
        self,
        fn_name: str,
        low: int,
        high: int,
        mid: int | None = None,
        depth: int = 0,
    ) -> CallStackFrame:
        """Empilha um novo registro de ativação na call stack.

        Args:
            fn_name: Nome da função invocada.
            low: Limite inferior do intervalo.
            high: Limite superior do intervalo.
            mid: Ponto médio da divisão (se aplicável).
            depth: Profundidade na árvore de recursão.

        Returns:
            O frame de chamada recém-criado e adicionado à pilha.
        """
        frame = CallStackFrame(
            frame_id=self._frame_id_counter,
            fn_name=fn_name,
            low=low,
            high=high,
            mid=mid,
            partial_result=None,
            depth=depth,
        )
        self._frame_id_counter += 1
        self._call_stack.append(frame)
        return frame

    def pop_frame(
        self, partial_result: SubarrayResult | None = None
    ) -> CallStackFrame | None:
        """Desempilha o frame do topo da call stack, atribuindo o resultado parcial.

        Args:
            partial_result: Resultado obtido pela chamada que está retornando.

        Returns:
            O frame desempilhado ou None se a pilha estiver vazia.
        """
        if not self._call_stack:
            return None
        frame = self._call_stack.pop()
        frame.partial_result = partial_result
        return frame

    def get_stack_snapshot(self) -> list[CallStackFrame]:
        """Retorna uma cópia rasa dos frames presentes na pilha no momento."""
        return [copy(f) for f in self._call_stack]

    def record(self, event: StepEvent) -> None:
        """Registra um evento de execução na lista ordenada de passos.

        Args:
            event: Instância de StepEvent contendo os dados do passo.
        """
        self._events.append(event)
        self._step_counter += 1

    def get_trace(self) -> list[StepEvent]:
        """Retorna a lista de eventos registrados até o momento."""
        return list(self._events)

    def to_json(
        self,
        input_array: list[int] | None = None,
        final_result: SubarrayResult | None = None,
        indent: int = 2,
    ) -> str:
        """Serializa o rastro completo para string JSON conforme schema do projeto.

        Args:
            input_array: Array original fornecido ao algoritmo.
            final_result: Resultado final ótimo obtido.
            indent: Quantidade de espaços para indentação do JSON.

        Returns:
            String JSON formatada.
        """
        payload: dict[str, Any] = {
            "algorithm": self.algorithm,
            "input_array": input_array if input_array is not None else [],
            "final_result": (
                {
                    "max_sum": final_result.max_sum,
                    "start_idx": final_result.start_idx,
                    "end_idx": final_result.end_idx,
                }
                if final_result is not None
                else None
            ),
            "steps": [evt.to_dict() for evt in self._events],
        }
        return json.dumps(payload, indent=indent, ensure_ascii=False)

    def save(
        self,
        path: str | Path,
        input_array: list[int] | None = None,
        final_result: SubarrayResult | None = None,
    ) -> None:
        """Salva o trace serializado em um arquivo no sistema de arquivos.

        Args:
            path: Caminho de destino do arquivo JSON.
            input_array: Array original fornecido ao algoritmo.
            final_result: Resultado final ótimo obtido.
        """
        target_path = Path(path)
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(
            self.to_json(input_array=input_array, final_result=final_result),
            encoding="utf-8",
        )

    def reset(self) -> None:
        """Reseta completamente o estado interno do tracer."""
        self._events.clear()
        self._call_stack.clear()
        self._step_counter = 0
        self._frame_id_counter = 0
