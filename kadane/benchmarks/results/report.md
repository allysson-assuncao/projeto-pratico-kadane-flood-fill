# Relatório de Benchmark Comparativo — Algoritmo de Kadane

- **Data da Coleta:** 2026-10-02T19:31:04.516288
- **Rodadas por Medição:** 30
- **Semente Pseudoaleatória:** 42
- **Faixa de Valores Inteiros:** `[-1000, 1000]`

## 1. Tabela Comparativa de Tempo de Execução e Speedup

| $N$ | Iterativo Tempo Médio (s) | Iterativo Desvio Padrão | Recursivo Tempo Médio (s) | Recursivo Desvio Padrão | Speedup (Iter/Rec) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 10 | 0.000005 | 0.000001 | 0.000023 | 0.000001 | **4.24x** |
| 100 | 0.000035 | 0.000003 | 0.000255 | 0.000025 | **7.30x** |
| 1,000 | 0.000308 | 0.000014 | 0.002877 | 0.000242 | **9.35x** |
| 10,000 | 0.002918 | 0.000108 | 0.030291 | 0.000853 | **10.38x** |
| 100,000 | 0.029087 | 0.001085 | 0.329631 | 0.014071 | **11.33x** |

## 2. Tabela Comparativa de Consumo de Memória (Heap)

| $N$ | Iterativo Pico Memória (bytes) | Recursivo Pico Memória (bytes) | Relação de Memória (Rec / Iter) |
| :---: | :---: | :---: | :---: |
| 10 | 520 | 704 | 1.35x |
| 100 | 493 | 1,096 | 2.22x |
| 1,000 | 594 | 2,696 | 4.54x |
| 10,000 | 603 | 3,616 | 6.00x |
| 100,000 | 610 | 4,520 | 7.41x |

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
