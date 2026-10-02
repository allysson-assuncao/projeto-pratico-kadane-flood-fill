# Relatório de Benchmark Comparativo — Algoritmo de Kadane

- **Data da Coleta:** 2026-10-02T13:40:12.889574
- **Rodadas por Medição:** 30
- **Semente Pseudoaleatória:** 42
- **Faixa de Valores Inteiros:** `[-1000, 1000]`

## 1. Tabela Comparativa de Tempo de Execução e Speedup

| $N$ | Iterativo Tempo Médio (s) | Iterativo Desvio Padrão | Recursivo Tempo Médio (s) | Recursivo Desvio Padrão | Speedup (Iter/Rec) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 10 | 0.000005 | 0.000002 | 0.000022 | 0.000001 | **4.10x** |
| 100 | 0.000033 | 0.000003 | 0.000234 | 0.000003 | **7.17x** |
| 1,000 | 0.000282 | 0.000014 | 0.002652 | 0.000074 | **9.41x** |
| 10,000 | 0.002644 | 0.000072 | 0.028370 | 0.000538 | **10.73x** |
| 100,000 | 0.026452 | 0.000537 | 0.296927 | 0.001759 | **11.22x** |

## 2. Tabela Comparativa de Consumo de Memória (Heap)

| $N$ | Iterativo Pico Memória (bytes) | Recursivo Pico Memória (bytes) | Relação de Memória (Rec / Iter) |
| :---: | :---: | :---: | :---: |
| 10 | 456 | 520 | 1.14x |
| 100 | 397 | 808 | 2.04x |
| 1,000 | 402 | 1,096 | 2.73x |
| 10,000 | 411 | 1,480 | 3.60x |
| 100,000 | 418 | 1,768 | 4.23x |

## 3. Tabela Comparativa de Profundidade da Pilha de Chamadas (*Call Stack*)

| $N$ | Iterativo Frames Máx | Recursivo Frames Máx | Modelo Teórico Recursivo ($\lceil \log_2 N \rceil + 2$) |
| :---: | :---: | :---: | :---: |
| 10 | 1 (constante) | 6 | ~6 |
| 100 | 1 (constante) | 9 | ~9 |
| 1,000 | 1 (constante) | 12 | ~12 |
| 10,000 | 1 (constante) | 16 | ~16 |
| 100,000 | 1 (constante) | 19 | ~19 |

## 4. Análise dos Resultados e Conclusão Empírica

- **Vantagem de Tempo:** A abordagem iterativa demonstra superioridade sistemática em todas as ordens de grandeza.
- **Complexidade Teórica Confirmada:** O Kadane iterativo opera em $O(n)$, enquanto a Divisão e Conquista opera em $O(n \log n)$, refletindo um fator de lentidão crescente à medida que $N$ escala.
- **Pegada de Memória:** O Kadane iterativo aloca um espaço constante desprezível de registradores, ao passo que a recursão acumula múltiplos frames de ativação na pilha de chamadas do sistema operacional.
