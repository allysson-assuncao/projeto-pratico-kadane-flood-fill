# Relatório de Benchmark Comparativo — Flood Fill (DFS)

- **Data da Coleta:** 2026-10-13T08:14:17.675889
- **Rodadas por Dimensão:** 15
- **Cenário de Teste:** Matriz homogênea (pior caso de conectividade completa)
- **Algoritmo Base:** DFS (Busca em Profundidade) — Pilha no Heap vs. Call Stack

## 1. Tabela Comparativa de Tempo de Execução e Aceleração

| Dimensão ($N$) | Total Células | Iterativo Média (s) | Iterativo Desvio Padrão | Recursivo Média (s) | Recursivo Desvio Padrão | Razão ($T_{rec} / T_{iter}$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 10x10 | 100 | 0.000224 | 0.000003 | 0.000224 | 0.000011 | **1.00x** |
| 20x20 | 400 | 0.000995 | 0.000013 | 0.000965 | 0.000031 | **0.97x** |
| 25x25 | 625 | 0.001534 | 0.000052 | 0.001526 | 0.000022 | **0.99x** |
| 30x30 | 900 | 0.002242 | 0.000106 | 0.002274 | 0.000078 | **1.01x** |
| 50x50 | 2,500 | 0.006424 | 0.000159 | **RecursionError** | — | — |
| 80x80 | 6,400 | 0.016242 | 0.000160 | **RecursionError** | — | — |

## 2. Tabela Comparativa de Alocação de Memória (Heap Tracing)

| Dimensão ($N$) | Total Células | Iterativo Pico (KB) | Recursivo Pico (KB) | Razão ($Heap_{rec} / Heap_{iter}$) |
| :---: | :---: | :---: | :---: | :---: |
| 10x10 | 100 | 4.95 | 37.20 | 7.52x |
| 20x20 | 400 | 18.56 | 149.70 | 8.06x |
| 25x25 | 625 | 27.83 | 234.08 | 8.41x |
| 30x30 | 900 | 41.62 | 337.20 | 8.10x |
| 50x50 | 2,500 | 115.66 | **RecursionError** | — |
| 80x80 | 6,400 | 297.61 | **RecursionError** | — |

## 3. Análise dos Resultados e Limites da Pilha

- **Estouro de Pilha (*Stack Overflow*):** Em Python, a profundidade padrão de chamadas (`sys.getrecursionlimit()`) é de 1000 frames. Matrizes a partir de ~30x30 excedem este limiar sob propagação homogênea.
- **Natureza da Memória Rasteada:** O `tracemalloc` contabiliza estruturas alocadas pelos gestores de memória do Python. O custo da recursão reflete a instanciação de objetos `PyFrameObject` no Heap do interpretador, enquanto a abordagem iterativa utiliza uma lista Python contígua dinâmica.
- **Estabilidade Operacional:** A abordagem iterativa com lista/pilha alocada no Heap não sofre a restrição imposta pelo interpretador para a pilha de recursão de funções, completando execuções de maior escala sem interrupção de runtime.
