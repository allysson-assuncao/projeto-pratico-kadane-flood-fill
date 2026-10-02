"""Testes unitários para a implementação iterativa do Algoritmo de Kadane."""

from __future__ import annotations

import json
import random
from pathlib import Path

import pytest

from kadane.src.iterative import kadane_iterative
from kadane.src.tracer import ExecutionTracer
from kadane.src.types import SubarrayResult


class TestKadaneIterative:
    """Suíte de testes dos cenários canônicos e casos de borda do Kadane iterativo."""

    def test_t01_canonical(self) -> None:
        """T01: Cenário canônico clássico de Kadane."""
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        res = kadane_iterative(arr)
        assert res.max_sum == 6
        assert res.start_idx == 3
        assert res.end_idx == 6
        assert arr[res.start_idx : res.end_idx + 1] == [4, -1, 2, 1]

    def test_t02_all_positive(self) -> None:
        """T02: Todos os números são positivos."""
        arr = [1, 2, 3, 4, 5]
        res = kadane_iterative(arr)
        assert res.max_sum == 15
        assert res.start_idx == 0
        assert res.end_idx == 4

    def test_t03_all_negative(self) -> None:
        """T03: Todos os números são negativos (retorna o maior individual)."""
        arr = [-4, -1, -7, -2]
        res = kadane_iterative(arr)
        assert res.max_sum == -1
        assert res.start_idx == 1
        assert res.end_idx == 1

    def test_t04_single_positive(self) -> None:
        """T04: Array unitário positivo."""
        arr = [42]
        res = kadane_iterative(arr)
        assert res.max_sum == 42
        assert res.start_idx == 0
        assert res.end_idx == 0

    def test_t05_single_negative(self) -> None:
        """T05: Array unitário negativo."""
        arr = [-7]
        res = kadane_iterative(arr)
        assert res.max_sum == -7
        assert res.start_idx == 0
        assert res.end_idx == 0

    def test_t06_contains_zeros(self) -> None:
        """T06: Array contendo zeros intercalados."""
        arr = [0, -1, 2, 0, 3, -2]
        res = kadane_iterative(arr)
        assert res.max_sum == 5
        assert res.start_idx == 2
        assert res.end_idx == 4
        assert sum(arr[res.start_idx : res.end_idx + 1]) == 5

    def test_t07_identical_positive(self) -> None:
        """T07: Elementos idênticos positivos."""
        arr = [3, 3, 3, 3]
        res = kadane_iterative(arr)
        assert res.max_sum == 12
        assert res.start_idx == 0
        assert res.end_idx == 3

    def test_t08_identical_negative(self) -> None:
        """T08: Elementos idênticos negativos."""
        arr = [-2, -2, -2]
        res = kadane_iterative(arr)
        assert res.max_sum == -2
        assert arr[res.start_idx] == -2
        assert res.start_idx == res.end_idx

    def test_t09_empty_array_raises_value_error(self) -> None:
        """T09: Entrada vazia deve levantar ValueError descritivo."""
        with pytest.raises(ValueError, match="vazio"):
            kadane_iterative([])

    def test_t10_large_random_array(self) -> None:
        """T10: Array grande de 1000 elementos gerado com seed fixa."""
        rng = random.Random(42)
        arr = [rng.randint(-50, 50) for _ in range(1000)]
        res = kadane_iterative(arr)
        # Verifica consistência interna: a soma da fatia deve coincidir com max_sum
        assert sum(arr[res.start_idx : res.end_idx + 1]) == res.max_sum


class TestIterativeTracerIntegration:
    """Testes de integração entre o algoritmo iterativo e o coletor ExecutionTracer."""

    def test_tracer_records_events_and_schema(self, tmp_path: Path) -> None:
        """Verifica se o tracer captura eventos e serializa JSON corretamente."""
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        tracer = ExecutionTracer(algorithm="iterative")
        res = kadane_iterative(arr, tracer=tracer)

        events = tracer.get_trace()
        # Deve ter 1 evento de init + 8 eventos de loop + 1 evento final de resultado = 10
        assert len(events) >= len(arr)
        assert all(e.algorithm == "iterative" for e in events)

        # Serialização e validação de JSON
        json_output = tracer.to_json(input_array=arr, final_result=res)
        data = json.loads(json_output)
        assert data["algorithm"] == "iterative"
        assert data["input_array"] == arr
        assert data["final_result"]["max_sum"] == 6
        assert len(data["steps"]) == len(events)

        # Teste de persistência com save()
        file_path = tmp_path / "trace_iter.json"
        tracer.save(file_path, input_array=arr, final_result=res)
        assert file_path.exists()
        loaded = json.loads(file_path.read_text(encoding="utf-8"))
        assert loaded["final_result"]["max_sum"] == 6

        # Teste de reset()
        tracer.reset()
        assert len(tracer.get_trace()) == 0
        assert tracer.current_step == 0
        assert tracer.pop_frame() is None

    def test_types_repr(self) -> None:
        """Verifica o método __repr__ de SubarrayResult."""
        res = SubarrayResult(max_sum=10, start_idx=1, end_idx=2)
        assert "max_sum=10" in repr(res)
        assert "[1..2]" in repr(res)
