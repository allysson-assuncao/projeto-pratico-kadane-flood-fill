"""Testes unitários para a implementação recursiva por Divisão e Conquista."""

from __future__ import annotations

import json
import math
import random
from pathlib import Path

import pytest

from kadane.src.recursive import (
    _max_crossing_subarray,
    _max_subarray_rec,
    kadane_recursive,
)
from kadane.src.tracer import ExecutionTracer
from kadane.src.types import SubarrayResult


class TestKadaneRecursive:
    """Suíte de testes dos cenários canônicos e casos de borda da Divisão e Conquista."""

    def test_t01_canonical(self) -> None:
        """T01: Cenário canônico clássico de Kadane."""
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        res = kadane_recursive(arr)
        assert res.max_sum == 6
        assert res.start_idx == 3
        assert res.end_idx == 6
        assert sum(arr[res.start_idx : res.end_idx + 1]) == 6

    def test_t02_all_positive(self) -> None:
        """T02: Todos os números positivos."""
        arr = [1, 2, 3, 4, 5]
        res = kadane_recursive(arr)
        assert res.max_sum == 15
        assert res.start_idx == 0
        assert res.end_idx == 4

    def test_t03_all_negative(self) -> None:
        """T03: Todos os números negativos (retorna o maior individual)."""
        arr = [-4, -1, -7, -2]
        res = kadane_recursive(arr)
        assert res.max_sum == -1
        assert res.start_idx == 1
        assert res.end_idx == 1

    def test_t04_single_positive(self) -> None:
        """T04: Array unitário positivo."""
        arr = [42]
        res = kadane_recursive(arr)
        assert res.max_sum == 42
        assert res.start_idx == 0
        assert res.end_idx == 0

    def test_t05_single_negative(self) -> None:
        """T05: Array unitário negativo."""
        arr = [-7]
        res = kadane_recursive(arr)
        assert res.max_sum == -7
        assert res.start_idx == 0
        assert res.end_idx == 0

    def test_t06_contains_zeros(self) -> None:
        """T06: Array contendo zeros intercalados."""
        arr = [0, -1, 2, 0, 3, -2]
        res = kadane_recursive(arr)
        assert res.max_sum == 5
        assert res.start_idx == 2
        assert res.end_idx == 4

    def test_t07_identical_positive(self) -> None:
        """T07: Elementos idênticos positivos."""
        arr = [3, 3, 3, 3]
        res = kadane_recursive(arr)
        assert res.max_sum == 12
        assert res.start_idx == 0
        assert res.end_idx == 3

    def test_t08_identical_negative(self) -> None:
        """T08: Elementos idênticos negativos."""
        arr = [-2, -2, -2]
        res = kadane_recursive(arr)
        assert res.max_sum == -2
        assert arr[res.start_idx] == -2
        assert res.start_idx == res.end_idx

    def test_t09_empty_array_raises_value_error(self) -> None:
        """T09: Entrada vazia deve levantar ValueError."""
        with pytest.raises(ValueError, match="vazio"):
            kadane_recursive([])

    def test_t10_large_random_array(self) -> None:
        """T10: Array grande de 1000 elementos gerado com seed fixa."""
        rng = random.Random(42)
        arr = [rng.randint(-50, 50) for _ in range(1000)]
        res = kadane_recursive(arr)
        assert sum(arr[res.start_idx : res.end_idx + 1]) == res.max_sum

    def test_crossing_subarray_direct(self) -> None:
        """Testa diretamente a função auxiliar _max_crossing_subarray."""
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        # mid = 4 (valor -1)
        res = _max_crossing_subarray(arr, low=0, mid=4, high=8)
        assert res.max_sum == 6
        assert res.start_idx == 3
        assert res.end_idx == 6


class TestRecursiveTracerIntegration:
    """Testes de integração entre o algoritmo recursivo e o coletor ExecutionTracer."""

    def test_tracer_records_balanced_push_pop_and_call_stack(
        self, tmp_path: Path
    ) -> None:
        """Valida que o tracer registra push/pop balanceados e profundidade O(log n)."""
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        tracer = ExecutionTracer(algorithm="recursive")
        res = kadane_recursive(arr, tracer=tracer)

        events = tracer.get_trace()
        pushes = [e for e in events if e.event_type == "push"]
        pops = [e for e in events if e.event_type == "pop"]

        # Push e pop devem ser estritamente balanceados
        assert len(pushes) == len(pops)
        assert len(pushes) > 0

        # Profundidade máxima observada deve ser <= ceil(log2(n)) + 2
        max_depth = max(
            (max(f.depth for f in e.call_stack) for e in events if e.call_stack),
            default=0,
        )
        expected_max_depth = math.ceil(math.log2(len(arr))) + 2
        assert max_depth <= expected_max_depth

        # Validação do arquivo JSON
        file_path = tmp_path / "trace_rec.json"
        tracer.save(file_path, input_array=arr, final_result=res)
        assert file_path.exists()
        loaded = json.loads(file_path.read_text(encoding="utf-8"))
        assert loaded["algorithm"] == "recursive"
        assert loaded["final_result"]["max_sum"] == 6
