"""Tipos de dados, dataclasses e contratos de interface para o módulo Kadane.

Centraliza todas as estruturas de dados compartilhadas entre os algoritmos
iterativo, recursivo, o coletor de rastreamento (tracer) e a visualização.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class SubarrayResult:
    """Resultado imutável de uma busca de subarranjo contíguo de soma máxima.

    Attributes:
        max_sum: Valor numérico da soma máxima encontrada.
        start_idx: Índice inicial (inclusivo, 0-based) do subarranjo ótimo.
        end_idx: Índice final (inclusivo, 0-based) do subarranjo ótimo.
    """

    max_sum: int
    start_idx: int
    end_idx: int

    def __repr__(self) -> str:
        return (
            f"SubarrayResult(max_sum={self.max_sum}, "
            f"indices=[{self.start_idx}..{self.end_idx}])"
        )


@dataclass
class CallStackFrame:
    """Representação de um registro de ativação (frame) na pilha de execução.

    Usado para instrumentação e renderização visual do crescimento da call stack
    na abordagem recursiva (Divisão e Conquista).

    Attributes:
        frame_id: Identificador único incremental do frame de chamada.
        fn_name: Nome da função ou sub-rotina invocada.
        low: Limite inferior do intervalo analisado na chamada corrente.
        high: Limite superior do intervalo analisado na chamada corrente.
        mid: Ponto médio calculado na divisão (se aplicável).
        partial_result: Resultado retornado por esta chamada (preenchido no evento 'pop').
        depth: Nível de profundidade atual na árvore de recursão (0 = chamada raiz).
    """

    frame_id: int
    fn_name: str
    low: int
    high: int
    mid: int | None = None
    partial_result: SubarrayResult | None = None
    depth: int = 0

    def to_dict(self) -> dict[str, Any]:
        """Serializa o frame para dicionário compatível com JSON."""
        return {
            "frame_id": self.frame_id,
            "fn_name": self.fn_name,
            "low": self.low,
            "high": self.high,
            "mid": self.mid,
            "partial_result": (
                {
                    "max_sum": self.partial_result.max_sum,
                    "start_idx": self.partial_result.start_idx,
                    "end_idx": self.partial_result.end_idx,
                }
                if self.partial_result is not None
                else None
            ),
            "depth": self.depth,
        }


@dataclass
class StepEvent:
    """Evento atômico de execução emitido durante a execução de um algoritmo.

    Captura um instantâneo (snapshot) do estado interno das variáveis e da pilha
    de execução para reprodução passo a passo no visualizador interativo.

    Attributes:
        step: Número de sequência incremental do passo (0-based).
        algorithm: Nome da abordagem em execução ('iterative' ou 'recursive').
        current_idx: Índice do elemento sob inspeção no array.
        max_current: Valor de max_atual no passo corrente.
        max_global: Melhor soma global consolidada até o passo corrente.
        active_start: Índice inicial do subarranjo acumulado em avaliação.
        active_end: Índice final do subarranjo acumulado em avaliação.
        call_stack: Lista de frames ativos na pilha no momento do evento.
        event_type: Tipo do evento ('step', 'push', 'pop', 'result').
        annotation: Mensagem descritiva do evento para exibição na UI.
    """

    step: int
    algorithm: str
    current_idx: int | None = None
    max_current: int | None = None
    max_global: int = 0
    active_start: int | None = None
    active_end: int | None = None
    call_stack: list[CallStackFrame] = field(default_factory=list)
    event_type: str = "step"
    annotation: str | None = None

    def to_dict(self) -> dict[str, Any]:
        """Serializa o evento para dicionário compatível com o schema JSON da UI."""
        return {
            "step": self.step,
            "algorithm": self.algorithm,
            "current_idx": self.current_idx,
            "max_current": self.max_current,
            "max_global": self.max_global,
            "active_start": self.active_start,
            "active_end": self.active_end,
            "call_stack": [frame.to_dict() for frame in self.call_stack],
            "event_type": self.event_type,
            "annotation": self.annotation,
        }
