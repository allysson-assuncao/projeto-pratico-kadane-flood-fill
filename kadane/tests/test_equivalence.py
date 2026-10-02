"""Testes de equivalência formal entre as abordagens Iterativa e Recursiva.

Garante que para qualquer vetor arbitrário de inteiros:
kadane_iterative(arr).max_sum == kadane_recursive(arr).max_sum
"""

from __future__ import annotations

import random
import pytest

from kadane.src.iterative import kadane_iterative
from kadane.src.recursive import kadane_recursive


# Conjunto canônico dos cenários manuais definidos no plano
MANUAL_SCENARIOS = [
    ("T01_canonico", [-2, 1, -3, 4, -1, 2, 1, -5, 4]),
    ("T02_todos_positivos", [1, 2, 3, 4, 5]),
    ("T03_todos_negativos", [-4, -1, -7, -2]),
    ("T04_unitario_positivo", [42]),
    ("T05_unitario_negativo", [-7]),
    ("T06_com_zeros", [0, -1, 2, 0, 3, -2]),
    ("T07_identicos_positivos", [3, 3, 3, 3]),
    ("T08_identicos_negativos", [-2, -2, -2]),
    ("T10_alternados", [1, -1, 1, -1, 1, -1]),
]


@pytest.mark.parametrize("name,arr", MANUAL_SCENARIOS)
def test_manual_scenarios_equivalence(name: str, arr: list[int]) -> None:
    """Verifica equivalência estrita de max_sum em todos os cenários manuais."""
    res_iter = kadane_iterative(arr)
    res_rec = kadane_recursive(arr)

    # Invariante 1: O valor da soma máxima deve ser estritamente idêntico
    assert res_iter.max_sum == res_rec.max_sum, (
        f"Divergência no cenário {name}: "
        f"Iter={res_iter.max_sum} vs Rec={res_rec.max_sum} para array {arr}"
    )

    # Invariante 2: A soma da fatia delimitada pelos índices deve coincidir com max_sum
    assert sum(arr[res_iter.start_idx : res_iter.end_idx + 1]) == res_iter.max_sum
    assert sum(arr[res_rec.start_idx : res_rec.end_idx + 1]) == res_rec.max_sum


def test_200_random_cases_equivalence() -> None:
    """Testa equivalência estrita em 200 casos aleatórios reproduzíveis (seeds 0 a 199)."""
    for seed in range(200):
        rng = random.Random(seed)
        size = rng.randint(1, 50)
        arr = [rng.randint(-100, 100) for _ in range(size)]

        res_iter = kadane_iterative(arr)
        res_rec = kadane_recursive(arr)

        assert res_iter.max_sum == res_rec.max_sum, (
            f"Divergência na seed {seed} (tamanho {size}): "
            f"Iter={res_iter} vs Rec={res_rec} para arr={arr}"
        )

        # Checagem de integridade das fatias
        assert sum(arr[res_iter.start_idx : res_iter.end_idx + 1]) == res_iter.max_sum
        assert sum(arr[res_rec.start_idx : res_rec.end_idx + 1]) == res_rec.max_sum
