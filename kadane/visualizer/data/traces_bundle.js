// Bundle gerado automaticamente contendo todos os cenários de trace pré-carregados
window.KADANE_TRACES = {
  "iterative_canonical": {
    "algorithm": "iterative",
    "input_array": [
      -2,
      1,
      -3,
      4,
      -1,
      2,
      1,
      -5,
      4
    ],
    "final_result": {
      "max_sum": 6,
      "start_idx": 3,
      "end_idx": 6
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "iterative",
        "current_idx": 0,
        "max_current": -2,
        "max_global": -2,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Inicialização no elemento A[0] = -2"
      },
      {
        "step": 1,
        "algorithm": "iterative",
        "current_idx": 1,
        "max_current": 1,
        "max_global": 1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Reiniciou subarranjo em A[1] = 1 (acumulado anterior era negativo) -> Novo recorde global: 1 no intervalo [1..1]"
      },
      {
        "step": 2,
        "algorithm": "iterative",
        "current_idx": 2,
        "max_current": -2,
        "max_global": 1,
        "active_start": 1,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[2] = -3 (novo acumulado = -2)"
      },
      {
        "step": 3,
        "algorithm": "iterative",
        "current_idx": 3,
        "max_current": 4,
        "max_global": 4,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Reiniciou subarranjo em A[3] = 4 (acumulado anterior era negativo) -> Novo recorde global: 4 no intervalo [3..3]"
      },
      {
        "step": 4,
        "algorithm": "iterative",
        "current_idx": 4,
        "max_current": 3,
        "max_global": 4,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[4] = -1 (novo acumulado = 3)"
      },
      {
        "step": 5,
        "algorithm": "iterative",
        "current_idx": 5,
        "max_current": 5,
        "max_global": 5,
        "active_start": 3,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[5] = 2 (novo acumulado = 5) -> Novo recorde global: 5 no intervalo [3..5]"
      },
      {
        "step": 6,
        "algorithm": "iterative",
        "current_idx": 6,
        "max_current": 6,
        "max_global": 6,
        "active_start": 3,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[6] = 1 (novo acumulado = 6) -> Novo recorde global: 6 no intervalo [3..6]"
      },
      {
        "step": 7,
        "algorithm": "iterative",
        "current_idx": 7,
        "max_current": 1,
        "max_global": 6,
        "active_start": 3,
        "active_end": 7,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[7] = -5 (novo acumulado = 1)"
      },
      {
        "step": 8,
        "algorithm": "iterative",
        "current_idx": 8,
        "max_current": 5,
        "max_global": 6,
        "active_start": 3,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[8] = 4 (novo acumulado = 5)"
      },
      {
        "step": 9,
        "algorithm": "iterative",
        "current_idx": null,
        "max_current": 5,
        "max_global": 6,
        "active_start": 3,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 8,
            "mid": null,
            "partial_result": {
              "max_sum": 6,
              "start_idx": 3,
              "end_idx": 6
            },
            "depth": 0
          }
        ],
        "event_type": "result",
        "annotation": "Execução finalizada com sucesso. Soma máxima = 6 no intervalo [3..6]."
      }
    ]
  },
  "recursive_canonical": {
    "algorithm": "recursive",
    "input_array": [
      -2,
      1,
      -3,
      4,
      -1,
      2,
      1,
      -5,
      4
    ],
    "final_result": {
      "max_sum": 6,
      "start_idx": 3,
      "end_idx": 6
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..8], profundidade=0"
      },
      {
        "step": 1,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..4], profundidade=1"
      },
      {
        "step": 2,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..2], profundidade=2"
      },
      {
        "step": 3,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..1], profundidade=3"
      },
      {
        "step": 4,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 0,
            "mid": null,
            "partial_result": null,
            "depth": 4
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..0], profundidade=4"
      },
      {
        "step": 5,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -2,
        "max_global": -2,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[0] = -2"
      },
      {
        "step": 6,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": null,
        "max_global": 0,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          },
          {
            "frame_id": 5,
            "fn_name": "_max_subarray_rec",
            "low": 1,
            "high": 1,
            "mid": null,
            "partial_result": null,
            "depth": 4
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [1..1], profundidade=4"
      },
      {
        "step": 7,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": 1,
        "max_global": 1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[1] = 1"
      },
      {
        "step": 8,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -2,
        "max_global": -2,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = -2, acumulado = -2, melhor à esquerda = -2"
      },
      {
        "step": 9,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": 1,
        "max_global": 1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[1] = 1, acumulado = 1, melhor à direita = 1"
      },
      {
        "step": 10,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 1,
        "max_global": 1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..1]: melhor soma = 1 em [1..1]"
      },
      {
        "step": 11,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": null,
        "max_global": 0,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 2,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [2..2], profundidade=3"
      },
      {
        "step": 12,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": -3,
        "max_global": -3,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[2] = -3"
      },
      {
        "step": 13,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": 1,
        "max_global": 1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[1] = 1, acumulado = 1, melhor à esquerda = 1"
      },
      {
        "step": 14,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -1,
        "max_global": 1,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = -2, acumulado = -1, melhor à esquerda = 1"
      },
      {
        "step": 15,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": -3,
        "max_global": -3,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[2] = -3, acumulado = -3, melhor à direita = -3"
      },
      {
        "step": 16,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 1,
        "max_global": 1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..2]: melhor soma = 1 em [1..1]"
      },
      {
        "step": 17,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": null,
        "max_global": 0,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [3..4], profundidade=2"
      },
      {
        "step": 18,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": null,
        "max_global": 0,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 8,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [3..3], profundidade=3"
      },
      {
        "step": 19,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 4,
        "max_global": 4,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[3] = 4"
      },
      {
        "step": 20,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": null,
        "max_global": 0,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 9,
            "fn_name": "_max_subarray_rec",
            "low": 4,
            "high": 4,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [4..4], profundidade=3"
      },
      {
        "step": 21,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": -1,
        "max_global": -1,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[4] = -1"
      },
      {
        "step": 22,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 4,
        "max_global": 4,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[3] = 4, acumulado = 4, melhor à esquerda = 4"
      },
      {
        "step": 23,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": -1,
        "max_global": -1,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[4] = -1, acumulado = -1, melhor à direita = -1"
      },
      {
        "step": 24,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 4,
        "max_global": 4,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [3..4]: melhor soma = 4 em [3..3]"
      },
      {
        "step": 25,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": -3,
        "max_global": -3,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[2] = -3, acumulado = -3, melhor à esquerda = -3"
      },
      {
        "step": 26,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -2,
        "max_global": -2,
        "active_start": 1,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[1] = 1, acumulado = -2, melhor à esquerda = -2"
      },
      {
        "step": 27,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -4,
        "max_global": -2,
        "active_start": 0,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = -2, acumulado = -4, melhor à esquerda = -2"
      },
      {
        "step": 28,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 4,
        "max_global": 4,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[3] = 4, acumulado = 4, melhor à direita = 4"
      },
      {
        "step": 29,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": 3,
        "max_global": 4,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 4,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[4] = -1, acumulado = 3, melhor à direita = 4"
      },
      {
        "step": 30,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 4,
        "max_global": 4,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..4]: melhor soma = 4 em [3..3]"
      },
      {
        "step": 31,
        "algorithm": "recursive",
        "current_idx": 6,
        "max_current": null,
        "max_global": 0,
        "active_start": 5,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [5..8], profundidade=1"
      },
      {
        "step": 32,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": null,
        "max_global": 0,
        "active_start": 5,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [5..6], profundidade=2"
      },
      {
        "step": 33,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": null,
        "max_global": 0,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 12,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [5..5], profundidade=3"
      },
      {
        "step": 34,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": 2,
        "max_global": 2,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[5] = 2"
      },
      {
        "step": 35,
        "algorithm": "recursive",
        "current_idx": 6,
        "max_current": null,
        "max_global": 0,
        "active_start": 6,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 13,
            "fn_name": "_max_subarray_rec",
            "low": 6,
            "high": 6,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [6..6], profundidade=3"
      },
      {
        "step": 36,
        "algorithm": "recursive",
        "current_idx": 6,
        "max_current": 1,
        "max_global": 1,
        "active_start": 6,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[6] = 1"
      },
      {
        "step": 37,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": 2,
        "max_global": 2,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[5] = 2, acumulado = 2, melhor à esquerda = 2"
      },
      {
        "step": 38,
        "algorithm": "recursive",
        "current_idx": 6,
        "max_current": 1,
        "max_global": 1,
        "active_start": 6,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 11,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 6,
            "mid": 5,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[6] = 1, acumulado = 1, melhor à direita = 1"
      },
      {
        "step": 39,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 3,
        "max_global": 3,
        "active_start": 5,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [5..6]: melhor soma = 3 em [5..6]"
      },
      {
        "step": 40,
        "algorithm": "recursive",
        "current_idx": 7,
        "max_current": null,
        "max_global": 0,
        "active_start": 7,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [7..8], profundidade=2"
      },
      {
        "step": 41,
        "algorithm": "recursive",
        "current_idx": 7,
        "max_current": null,
        "max_global": 0,
        "active_start": 7,
        "active_end": 7,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 15,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 7,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [7..7], profundidade=3"
      },
      {
        "step": 42,
        "algorithm": "recursive",
        "current_idx": 7,
        "max_current": -5,
        "max_global": -5,
        "active_start": 7,
        "active_end": 7,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[7] = -5"
      },
      {
        "step": 43,
        "algorithm": "recursive",
        "current_idx": 8,
        "max_current": null,
        "max_global": 0,
        "active_start": 8,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 16,
            "fn_name": "_max_subarray_rec",
            "low": 8,
            "high": 8,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [8..8], profundidade=3"
      },
      {
        "step": 44,
        "algorithm": "recursive",
        "current_idx": 8,
        "max_current": 4,
        "max_global": 4,
        "active_start": 8,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[8] = 4"
      },
      {
        "step": 45,
        "algorithm": "recursive",
        "current_idx": 7,
        "max_current": -5,
        "max_global": -5,
        "active_start": 7,
        "active_end": 7,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[7] = -5, acumulado = -5, melhor à esquerda = -5"
      },
      {
        "step": 46,
        "algorithm": "recursive",
        "current_idx": 8,
        "max_current": 4,
        "max_global": 4,
        "active_start": 8,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 14,
            "fn_name": "_max_subarray_rec",
            "low": 7,
            "high": 8,
            "mid": 7,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[8] = 4, acumulado = 4, melhor à direita = 4"
      },
      {
        "step": 47,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 4,
        "max_global": 4,
        "active_start": 8,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [7..8]: melhor soma = 4 em [8..8]"
      },
      {
        "step": 48,
        "algorithm": "recursive",
        "current_idx": 6,
        "max_current": 1,
        "max_global": 1,
        "active_start": 6,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[6] = 1, acumulado = 1, melhor à esquerda = 1"
      },
      {
        "step": 49,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": 3,
        "max_global": 3,
        "active_start": 5,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[5] = 2, acumulado = 3, melhor à esquerda = 3"
      },
      {
        "step": 50,
        "algorithm": "recursive",
        "current_idx": 7,
        "max_current": -5,
        "max_global": -5,
        "active_start": 7,
        "active_end": 7,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[7] = -5, acumulado = -5, melhor à direita = -5"
      },
      {
        "step": 51,
        "algorithm": "recursive",
        "current_idx": 8,
        "max_current": -1,
        "max_global": -1,
        "active_start": 7,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 8,
            "mid": 6,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[8] = 4, acumulado = -1, melhor à direita = -1"
      },
      {
        "step": 52,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 4,
        "max_global": 4,
        "active_start": 8,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [5..8]: melhor soma = 4 em [8..8]"
      },
      {
        "step": 53,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": -1,
        "max_global": -1,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[4] = -1, acumulado = -1, melhor à esquerda = -1"
      },
      {
        "step": 54,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 3,
        "max_global": 3,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[3] = 4, acumulado = 3, melhor à esquerda = 3"
      },
      {
        "step": 55,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": 0,
        "max_global": 3,
        "active_start": 2,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[2] = -3, acumulado = 0, melhor à esquerda = 3"
      },
      {
        "step": 56,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": 1,
        "max_global": 3,
        "active_start": 1,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[1] = 1, acumulado = 1, melhor à esquerda = 3"
      },
      {
        "step": 57,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -1,
        "max_global": 3,
        "active_start": 0,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = -2, acumulado = -1, melhor à esquerda = 3"
      },
      {
        "step": 58,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": 2,
        "max_global": 2,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[5] = 2, acumulado = 2, melhor à direita = 2"
      },
      {
        "step": 59,
        "algorithm": "recursive",
        "current_idx": 6,
        "max_current": 3,
        "max_global": 3,
        "active_start": 5,
        "active_end": 6,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[6] = 1, acumulado = 3, melhor à direita = 3"
      },
      {
        "step": 60,
        "algorithm": "recursive",
        "current_idx": 7,
        "max_current": -2,
        "max_global": 3,
        "active_start": 5,
        "active_end": 7,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[7] = -5, acumulado = -2, melhor à direita = 3"
      },
      {
        "step": 61,
        "algorithm": "recursive",
        "current_idx": 8,
        "max_current": 2,
        "max_global": 3,
        "active_start": 5,
        "active_end": 8,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 8,
            "mid": 4,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[8] = 4, acumulado = 2, melhor à direita = 3"
      },
      {
        "step": 62,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 6,
        "max_global": 6,
        "active_start": 3,
        "active_end": 6,
        "call_stack": [],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..8]: melhor soma = 6 em [3..6]"
      },
      {
        "step": 63,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 6,
        "max_global": 6,
        "active_start": 3,
        "active_end": 6,
        "call_stack": [],
        "event_type": "result",
        "annotation": "Execução recursiva finalizada. Soma máxima = 6 no intervalo [3..6]."
      }
    ]
  },
  "iterative_allneg": {
    "algorithm": "iterative",
    "input_array": [
      -4,
      -1,
      -7,
      -2
    ],
    "final_result": {
      "max_sum": -1,
      "start_idx": 1,
      "end_idx": 1
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "iterative",
        "current_idx": 0,
        "max_current": -4,
        "max_global": -4,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Inicialização no elemento A[0] = -4"
      },
      {
        "step": 1,
        "algorithm": "iterative",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Reiniciou subarranjo em A[1] = -1 (acumulado anterior era negativo) -> Novo recorde global: -1 no intervalo [1..1]"
      },
      {
        "step": 2,
        "algorithm": "iterative",
        "current_idx": 2,
        "max_current": -7,
        "max_global": -1,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Reiniciou subarranjo em A[2] = -7 (acumulado anterior era negativo)"
      },
      {
        "step": 3,
        "algorithm": "iterative",
        "current_idx": 3,
        "max_current": -2,
        "max_global": -1,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Reiniciou subarranjo em A[3] = -2 (acumulado anterior era negativo)"
      },
      {
        "step": 4,
        "algorithm": "iterative",
        "current_idx": null,
        "max_current": -2,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 3,
            "mid": null,
            "partial_result": {
              "max_sum": -1,
              "start_idx": 1,
              "end_idx": 1
            },
            "depth": 0
          }
        ],
        "event_type": "result",
        "annotation": "Execução finalizada com sucesso. Soma máxima = -1 no intervalo [1..1]."
      }
    ]
  },
  "recursive_allneg": {
    "algorithm": "recursive",
    "input_array": [
      -4,
      -1,
      -7,
      -2
    ],
    "final_result": {
      "max_sum": -1,
      "start_idx": 1,
      "end_idx": 1
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..3], profundidade=0"
      },
      {
        "step": 1,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..1], profundidade=1"
      },
      {
        "step": 2,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 0,
            "mid": null,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..0], profundidade=2"
      },
      {
        "step": 3,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -4,
        "max_global": -4,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[0] = -4"
      },
      {
        "step": 4,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": null,
        "max_global": 0,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 1,
            "high": 1,
            "mid": null,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [1..1], profundidade=2"
      },
      {
        "step": 5,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[1] = -1"
      },
      {
        "step": 6,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -4,
        "max_global": -4,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = -4, acumulado = -4, melhor à esquerda = -4"
      },
      {
        "step": 7,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[1] = -1, acumulado = -1, melhor à direita = -1"
      },
      {
        "step": 8,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..1]: melhor soma = -1 em [1..1]"
      },
      {
        "step": 9,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": null,
        "max_global": 0,
        "active_start": 2,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [2..3], profundidade=1"
      },
      {
        "step": 10,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": null,
        "max_global": 0,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 5,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 2,
            "mid": null,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [2..2], profundidade=2"
      },
      {
        "step": 11,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": -7,
        "max_global": -7,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[2] = -7"
      },
      {
        "step": 12,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": null,
        "max_global": 0,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [3..3], profundidade=2"
      },
      {
        "step": 13,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": -2,
        "max_global": -2,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[3] = -2"
      },
      {
        "step": 14,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": -7,
        "max_global": -7,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[2] = -7, acumulado = -7, melhor à esquerda = -7"
      },
      {
        "step": 15,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": -2,
        "max_global": -2,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 3,
            "mid": 2,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[3] = -2, acumulado = -2, melhor à direita = -2"
      },
      {
        "step": 16,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": -2,
        "max_global": -2,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [2..3]: melhor soma = -2 em [3..3]"
      },
      {
        "step": 17,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[1] = -1, acumulado = -1, melhor à esquerda = -1"
      },
      {
        "step": 18,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -5,
        "max_global": -1,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = -4, acumulado = -5, melhor à esquerda = -1"
      },
      {
        "step": 19,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": -7,
        "max_global": -7,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[2] = -7, acumulado = -7, melhor à direita = -7"
      },
      {
        "step": 20,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": -9,
        "max_global": -7,
        "active_start": 2,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 3,
            "mid": 1,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[3] = -2, acumulado = -9, melhor à direita = -7"
      },
      {
        "step": 21,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..3]: melhor soma = -1 em [1..1]"
      },
      {
        "step": 22,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [],
        "event_type": "result",
        "annotation": "Execução recursiva finalizada. Soma máxima = -1 no intervalo [1..1]."
      }
    ]
  },
  "iterative_unitary": {
    "algorithm": "iterative",
    "input_array": [
      42
    ],
    "final_result": {
      "max_sum": 42,
      "start_idx": 0,
      "end_idx": 0
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "iterative",
        "current_idx": 0,
        "max_current": 42,
        "max_global": 42,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 0,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Inicialização no elemento A[0] = 42"
      },
      {
        "step": 1,
        "algorithm": "iterative",
        "current_idx": null,
        "max_current": 42,
        "max_global": 42,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 0,
            "mid": null,
            "partial_result": {
              "max_sum": 42,
              "start_idx": 0,
              "end_idx": 0
            },
            "depth": 0
          }
        ],
        "event_type": "result",
        "annotation": "Execução finalizada com sucesso. Soma máxima = 42 no intervalo [0..0]."
      }
    ]
  },
  "recursive_unitary": {
    "algorithm": "recursive",
    "input_array": [
      42
    ],
    "final_result": {
      "max_sum": 42,
      "start_idx": 0,
      "end_idx": 0
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 0,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..0], profundidade=0"
      },
      {
        "step": 1,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": 42,
        "max_global": 42,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[0] = 42"
      },
      {
        "step": 2,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 42,
        "max_global": 42,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [],
        "event_type": "result",
        "annotation": "Execução recursiva finalizada. Soma máxima = 42 no intervalo [0..0]."
      }
    ]
  },
  "iterative_zeros": {
    "algorithm": "iterative",
    "input_array": [
      0,
      -1,
      2,
      0,
      3,
      -2
    ],
    "final_result": {
      "max_sum": 5,
      "start_idx": 2,
      "end_idx": 4
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "iterative",
        "current_idx": 0,
        "max_current": 0,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Inicialização no elemento A[0] = 0"
      },
      {
        "step": 1,
        "algorithm": "iterative",
        "current_idx": 1,
        "max_current": -1,
        "max_global": 0,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[1] = -1 (novo acumulado = -1)"
      },
      {
        "step": 2,
        "algorithm": "iterative",
        "current_idx": 2,
        "max_current": 2,
        "max_global": 2,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Reiniciou subarranjo em A[2] = 2 (acumulado anterior era negativo) -> Novo recorde global: 2 no intervalo [2..2]"
      },
      {
        "step": 3,
        "algorithm": "iterative",
        "current_idx": 3,
        "max_current": 2,
        "max_global": 2,
        "active_start": 2,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[3] = 0 (novo acumulado = 2)"
      },
      {
        "step": 4,
        "algorithm": "iterative",
        "current_idx": 4,
        "max_current": 5,
        "max_global": 5,
        "active_start": 2,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[4] = 3 (novo acumulado = 5) -> Novo recorde global: 5 no intervalo [2..4]"
      },
      {
        "step": 5,
        "algorithm": "iterative",
        "current_idx": 5,
        "max_current": 3,
        "max_global": 5,
        "active_start": 2,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Estendeu subarranjo somando A[5] = -2 (novo acumulado = 3)"
      },
      {
        "step": 6,
        "algorithm": "iterative",
        "current_idx": null,
        "max_current": 3,
        "max_global": 5,
        "active_start": 2,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "kadane_iterative",
            "low": 0,
            "high": 5,
            "mid": null,
            "partial_result": {
              "max_sum": 5,
              "start_idx": 2,
              "end_idx": 4
            },
            "depth": 0
          }
        ],
        "event_type": "result",
        "annotation": "Execução finalizada com sucesso. Soma máxima = 5 no intervalo [2..4]."
      }
    ]
  },
  "recursive_zeros": {
    "algorithm": "recursive",
    "input_array": [
      0,
      -1,
      2,
      0,
      3,
      -2
    ],
    "final_result": {
      "max_sum": 5,
      "start_idx": 2,
      "end_idx": 4
    },
    "steps": [
      {
        "step": 0,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..5], profundidade=0"
      },
      {
        "step": 1,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..2], profundidade=1"
      },
      {
        "step": 2,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..1], profundidade=2"
      },
      {
        "step": 3,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": null,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 3,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 0,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [0..0], profundidade=3"
      },
      {
        "step": 4,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": 0,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[0] = 0"
      },
      {
        "step": 5,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": null,
        "max_global": 0,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 4,
            "fn_name": "_max_subarray_rec",
            "low": 1,
            "high": 1,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [1..1], profundidade=3"
      },
      {
        "step": 6,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[1] = -1"
      },
      {
        "step": 7,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": 0,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = 0, acumulado = 0, melhor à esquerda = 0"
      },
      {
        "step": 8,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 2,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 1,
            "mid": 0,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[1] = -1, acumulado = -1, melhor à direita = -1"
      },
      {
        "step": 9,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 0,
        "max_global": 0,
        "active_start": 0,
        "active_end": 0,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..1]: melhor soma = 0 em [0..0]"
      },
      {
        "step": 10,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": null,
        "max_global": 0,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 5,
            "fn_name": "_max_subarray_rec",
            "low": 2,
            "high": 2,
            "mid": null,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [2..2], profundidade=2"
      },
      {
        "step": 11,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": 2,
        "max_global": 2,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[2] = 2"
      },
      {
        "step": 12,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": -1,
        "max_global": -1,
        "active_start": 1,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[1] = -1, acumulado = -1, melhor à esquerda = -1"
      },
      {
        "step": 13,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": -1,
        "max_global": -1,
        "active_start": 0,
        "active_end": 1,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = 0, acumulado = -1, melhor à esquerda = -1"
      },
      {
        "step": 14,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": 2,
        "max_global": 2,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 1,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 2,
            "mid": 1,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[2] = 2, acumulado = 2, melhor à direita = 2"
      },
      {
        "step": 15,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 2,
        "max_global": 2,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..2]: melhor soma = 2 em [2..2]"
      },
      {
        "step": 16,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": null,
        "max_global": 0,
        "active_start": 3,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [3..5], profundidade=1"
      },
      {
        "step": 17,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": null,
        "max_global": 0,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [3..4], profundidade=2"
      },
      {
        "step": 18,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": null,
        "max_global": 0,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 8,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 3,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [3..3], profundidade=3"
      },
      {
        "step": 19,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 0,
        "max_global": 0,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[3] = 0"
      },
      {
        "step": 20,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": null,
        "max_global": 0,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          },
          {
            "frame_id": 9,
            "fn_name": "_max_subarray_rec",
            "low": 4,
            "high": 4,
            "mid": null,
            "partial_result": null,
            "depth": 3
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [4..4], profundidade=3"
      },
      {
        "step": 21,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": 3,
        "max_global": 3,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[4] = 3"
      },
      {
        "step": 22,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 0,
        "max_global": 0,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[3] = 0, acumulado = 0, melhor à esquerda = 0"
      },
      {
        "step": 23,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": 3,
        "max_global": 3,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 7,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 4,
            "mid": 3,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[4] = 3, acumulado = 3, melhor à direita = 3"
      },
      {
        "step": 24,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 3,
        "max_global": 3,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [3..4]: melhor soma = 3 em [4..4]"
      },
      {
        "step": 25,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": null,
        "max_global": 0,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          },
          {
            "frame_id": 10,
            "fn_name": "_max_subarray_rec",
            "low": 5,
            "high": 5,
            "mid": null,
            "partial_result": null,
            "depth": 2
          }
        ],
        "event_type": "push",
        "annotation": "PUSH: Iniciando recursão no intervalo [5..5], profundidade=2"
      },
      {
        "step": 26,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": -2,
        "max_global": -2,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "pop",
        "annotation": "POP (Caso Base): elemento unitário A[5] = -2"
      },
      {
        "step": 27,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": 3,
        "max_global": 3,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[4] = 3, acumulado = 3, melhor à esquerda = 3"
      },
      {
        "step": 28,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 3,
        "max_global": 3,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[3] = 0, acumulado = 3, melhor à esquerda = 3"
      },
      {
        "step": 29,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": -2,
        "max_global": -2,
        "active_start": 5,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          },
          {
            "frame_id": 6,
            "fn_name": "_max_subarray_rec",
            "low": 3,
            "high": 5,
            "mid": 4,
            "partial_result": null,
            "depth": 1
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[5] = -2, acumulado = -2, melhor à direita = -2"
      },
      {
        "step": 30,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 3,
        "max_global": 3,
        "active_start": 4,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [3..5]: melhor soma = 3 em [4..4]"
      },
      {
        "step": 31,
        "algorithm": "recursive",
        "current_idx": 2,
        "max_current": 2,
        "max_global": 2,
        "active_start": 2,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[2] = 2, acumulado = 2, melhor à esquerda = 2"
      },
      {
        "step": 32,
        "algorithm": "recursive",
        "current_idx": 1,
        "max_current": 1,
        "max_global": 2,
        "active_start": 1,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[1] = -1, acumulado = 1, melhor à esquerda = 2"
      },
      {
        "step": 33,
        "algorithm": "recursive",
        "current_idx": 0,
        "max_current": 1,
        "max_global": 2,
        "active_start": 0,
        "active_end": 2,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à esquerda: A[0] = 0, acumulado = 1, melhor à esquerda = 2"
      },
      {
        "step": 34,
        "algorithm": "recursive",
        "current_idx": 3,
        "max_current": 0,
        "max_global": 0,
        "active_start": 3,
        "active_end": 3,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[3] = 0, acumulado = 0, melhor à direita = 0"
      },
      {
        "step": 35,
        "algorithm": "recursive",
        "current_idx": 4,
        "max_current": 3,
        "max_global": 3,
        "active_start": 3,
        "active_end": 4,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[4] = 3, acumulado = 3, melhor à direita = 3"
      },
      {
        "step": 36,
        "algorithm": "recursive",
        "current_idx": 5,
        "max_current": 1,
        "max_global": 3,
        "active_start": 3,
        "active_end": 5,
        "call_stack": [
          {
            "frame_id": 0,
            "fn_name": "_max_subarray_rec",
            "low": 0,
            "high": 5,
            "mid": 2,
            "partial_result": null,
            "depth": 0
          }
        ],
        "event_type": "step",
        "annotation": "Cruzamento à direita: A[5] = -2, acumulado = 1, melhor à direita = 3"
      },
      {
        "step": 37,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 5,
        "max_global": 5,
        "active_start": 2,
        "active_end": 4,
        "call_stack": [],
        "event_type": "pop",
        "annotation": "POP: Retorno do intervalo [0..5]: melhor soma = 5 em [2..4]"
      },
      {
        "step": 38,
        "algorithm": "recursive",
        "current_idx": null,
        "max_current": 5,
        "max_global": 5,
        "active_start": 2,
        "active_end": 4,
        "call_stack": [],
        "event_type": "result",
        "annotation": "Execução recursiva finalizada. Soma máxima = 5 no intervalo [2..4]."
      }
    ]
  }
};
