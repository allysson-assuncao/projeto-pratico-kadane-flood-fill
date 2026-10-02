"""Pacote de algoritmos e ferramentas para o problema da Soma Máxima de Subarranjo (Kadane)."""

from kadane.src.iterative import kadane_iterative
from kadane.src.recursive import kadane_recursive
from kadane.src.tracer import ExecutionTracer
from kadane.src.types import CallStackFrame, StepEvent, SubarrayResult

__all__ = [
    "SubarrayResult",
    "CallStackFrame",
    "StepEvent",
    "kadane_iterative",
    "kadane_recursive",
    "ExecutionTracer",
]
