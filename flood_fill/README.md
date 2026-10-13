# Preenchimento por Difusão (Algoritmo Flood Fill)

> **Projeto Prático:** Análise Comparativa entre Paradigmas Iterativo e Recursivo
> **Tema Designado:** Exploração Espacial e Limites de Pilha — Algoritmo Flood Fill
> **Aluno Responsável:** Moisés Emanuel Reis da Cruz
> **Repositório:** [projeto-pratico-kadane-flood-fill](https://github.com/allysson-assuncao/projeto-pratico-kadane-flood-fill.git)

---

## 1. Visão Geral e Contextualização

O objetivo deste módulo no projeto prático é estudar, implementar e comparar experimental e analiticamente duas soluções — **iterativa** e **recursiva** — para o clássico problema de **Preenchimento por Difusão** (*Flood Fill*).

Dentro da proposta pedagógica do trabalho em dupla:

* **Tema 1 (Kadane - Allysson):** Demonstra um cenário em que a **solução iterativa** é amplamente superior em tempo, consumo de memória e simplicidade estrutural.


* **Tema 2 (Flood Fill - Moisés):** Demonstra um cenário onde a **solução recursiva** reflete naturalmente a exploração espacial (grafo/matriz) via DFS, mas expõe limitações críticas de ambiente de execução (*Call Stack overflow*) frente à pilha explícita alocada no Heap.

---

## 2. Características do Problema

1. **Definição Formal:**
Dada uma grade bidimensional $M$ de dimensões $H \times W$, um ponto inicial $P_0 = (r_0, c_0)$ e uma nova cor $C_{alvo}$, o objetivo é identificar e reescrever a cor de todos os vértices conectados ortogonalmente que compartilham a cor original $C_{orig} = M[r_0][c_0]$:

$$V_{fill} = \{ p \in M \mid M[p] = C_{orig} \land \text{caminho\_4\_conectado}(P_0, p) \}$$


2. **Topologia e Conectividade (4-Conectividade):**
A propagação ocorre estritamente pelos vizinhos ortogonais: Norte $(-1, 0)$, Sul $(1, 0)$, Leste $(0, 1)$ e Oeste $(0, -1)$.
3. **Cenário de Pior Caso (Worst-Case Topology):**
* Ocorre em matrizes homogêneas onde todas as células possuem a mesma cor original.
* Toda a grade constitui um único componente conexo de tamanho $V = N \times N$, exigindo a exploração de todas as arestas ortogonais $E \approx 4V$.


4. **Classificação de Paradigma:**
O algoritmo baseia-se em **Busca em Profundidade (DFS)** sobre grafo implícito, contrastando a alocação de quadros de ativação na pilha nativa (*Call Stack*) contra estruturas dinâmicas contíguas no Heap.

---

## 3. Critérios e Objetivos do Módulo

### 3.1. Critérios de Avaliação e Restrições

* **Corretude Algorítmica:** Ambas as estratégias devem preencher exatamente as células conexas válidas e ignorar execuções redundantes quando $C_{orig} == C_{alvo}$.
* **Isolamento Metrológico:** Medições empíricas devem desacoplar o tempo de CPU (`time.perf_counter`) da contabilidade de Heap (`tracemalloc`) para evitar distorções de benchmark.
* **Tratamento de Borda:** Monitoramento de exceções em tempo de execução para identificar formalmente o limiar de estouro de pilha (`RecursionError`).

### 3.2. Objetivos Específicos

1. Implementar a estratégia **Iterativa** com DFS e pilha explícita alocada no Heap.
2. Implementar a estratégia **Recursiva** com DFS baseada em chamadas de função na Call Stack.
3. Construir infraestrutura de medição (`PerformanceTracer` e `FloodFillRunner`) parametrizada para múltiplas dimensões ($N \in [10, 80]$) com múltiplas rodadas estatísticas.
4. Gerar relatórios automatizados em Markdown e visualizações gráficas de tempo e memória em escala logarítmica.

---

## 4. Funcionamento do Algoritmo Flood Fill (DFS)

### 4.1. Intuição e Regras de Transição

A partir da coordenada $P(r, c)$, a expansão verifica se o vizinho é elegível (`_should_fill`):

1. Está dentro dos limites da grade ($0 \le r < H$ e $0 \le c < W$).
2. Possui a cor idêntica à cor original da semente de disparo.

Ao visitar um nó elegível, sua cor é imediatamente atualizada para $C_{alvo}$ (atuando como marcador de visitação in-place) e seus 4 vizinhos ortogonais são enfileirados/empilhados.

### 4.2. Rastreamento Passo a Passo (Exemplo Prático 3x3)

Seja a matriz homogênea com $C_{orig} = 0$, semente em $(0,0)$ e $C_{alvo} = 1$:

| Passo | Célula Atual | Ação / Atualização | Pilha / Chamadas Pendentes | Células Preenchidas |
| --- | --- | --- | --- | --- |
| 0 | $(0, 0)$ | $M[0][0] \leftarrow 1$ | Vizinhos: $(1, 0), (0, 1)$ | 1 |
| 1 | $(0, 1)$ | $M[0][1] \leftarrow 1$ | Vizinhos: $(0, 2), (1, 1)$ | 2 |
| 2 | $(0, 2)$ | $M[0][2] \leftarrow 1$ | Vizinho: $(1, 2)$ | 3 |
| 3 | $(1, 2)$ | $M[1][2] \leftarrow 1$ | Vizinhos: $(2, 2), (1, 1)$ | 4 |
| ... | ... | ... | ... | 9 |

Ao final, todas as 9 células são convertidas e o algoritmo encerra sem reprocessamento redundante.

---

## 5. Implementação: Iterativo vs. Recursivo

### 5.1. Abordagem Iterativa (Pilha no Heap)

Utiliza uma lista dinâmica de Python (`stack: list[Point]`). Os vértices são adicionados e removidos explicitamente no Heap. Como a memória é limitada apenas pela RAM disponível do sistema, não sofre imposições de profundidade de call stack.

### 5.2. Abordagem Recursiva (Call Stack)

Utiliza as chamadas de método `_dfs(...)` diretamente na pilha de execução do interpretador. Cada chamada aloca um quadro de ativação (`PyFrameObject`) contendo referências locais, variáveis e ponteiros de instrução.

---

## 6. Justificativa Teórica e Limites de Execução

```
+-------------------------------------------------------------------------+
|                  Comparativo Teórico e Estrutural                       |
+------------------------------------+------------------------------------+
|        Flood Fill Iterativo        |        Flood Fill Recursivo        |
+------------------------------------+------------------------------------+
| Complexidade de Tempo: O(V + E)    | Complexidade de Tempo: O(V + E)    |
| (Exploração linear de células)     | (Exploração linear de células)     |
|                                    |                                    |
| Complexidade de Espaço: O(V)       | Complexidade de Espaço: O(V)       |
| (Pilha explícita no Heap)          | (Profundidade máxima na Call Stack)|
|                                    |                                    |
| Overhead Estrutural:               | Overhead Estrutural:               |
| Referências contíguas em list      | Instanciação de PyFrameObjects     |
| (Consumo médio ~46 bytes/nó)       | (Consumo médio ~370 bytes/frame)   |
|                                    |                                    |
| Estabilidade Operacional:          | Estabilidade Operacional:          |
| Suporta matrizes massivas sem      | Colapso por RecursionError         |
| interrupção de runtime             | para N >= 32 sob pior caso (1000f) |
+------------------------------------+------------------------------------+

```

1. **Estouro de Pilha (*Call Stack Overflow*):**
Em CPython, o limite padrão de recursão (`sys.getrecursionlimit()`) é de 1000 quadros. Em uma matriz homogênea de pior caso, a profundidade atinge $N \times N$, disparando `RecursionError` a partir de grades $\approx 32 \times 32$.
2. **Custo por Vértice Alocado:**
O rastreador de memória (`tracemalloc`) evidencia que cada frame recursivo empilhado consome aproximadamente **8x mais memória** que uma referência armazenada na pilha iterativa, devido aos metadados internos de contexto do interpretador.

---

## 7. Estrutura Consolidada do Módulo `floodfill/`

```text
floodfill/
│
├── README.md                  # Este documento (apresentação, teoria e guia de execução)
├── requirements.txt           # Dependências de execução e plotagem (matplotlib)
├── main.py                    # Ponto de entrada para execução do pipeline completo
│
├── domain/                    # Modelagem e interfaces de domínio
│   ├── entities.py            # Entidades Grid e Point (operações de matriz e vizinhança 4C)
│   └── interfaces.py          # Protocolo FloodFillStrategy
│
├── strategies/                # Implementações dos algoritmos
│   ├── iterative.py           # DFS iterativa com lista explícita no Heap
│   └── recursive.py           # DFS recursiva via Call Stack
│
├── utils/                     # Ferramentas auxiliares
│   └── tracer.py              # Monitor de tempo e memória via perf_counter e tracemalloc
│
└── benchmarks/                # Framework de medição empírica de desempenho
    ├── runner.py              # Orquestrador de rodadas e exportador de relatórios
    ├── plotter.py             # Gerador de gráficos PNG comparativos
    └── results/               # Saídas geradas
        ├── report.md          # Relatório tabular consolidado
        ├── grafico_tempo.png  # Gráfico comparativo de tempo (escala log-log)
        └── grafico_memoria.png# Gráfico comparativo de alocação de Heap

```

---

## 8. Resultados Empíricos Obtidos

Métricas coletadas sob pior caso (matriz homogênea), 15 rodadas por dimensão:

| Dimensão ($N$) | Total Células | Iterativo Média (s) | Recursivo Média (s) | Iterativo Pico (KB) | Recursivo Pico (KB) | Razão ($Heap_{rec} / Heap_{iter}$) |
| --- | --- | --- | --- | --- | --- | --- |
| **10x10** | 100 | 0.000224 | 0.000224 | 4.95 | 37.20 | 7.52x |
| **20x20** | 400 | 0.000995 | 0.000965 | 18.56 | 149.70 | 8.06x |
| **25x25** | 625 | 0.001534 | 0.001526 | 27.83 | 234.08 | 8.41x |
| **30x30** | 900 | 0.002242 | 0.002274 | 41.62 | 337.20 | 8.10x |
| **50x50** | 2,500 | 0.006424 | **RecursionError** | 115.66 | **RecursionError** | — |
| **80x80** | 6,400 | 0.016242 | **RecursionError** | 297.61 | **RecursionError** | — |

Os gráficos gerados estão disponíveis em:

* [Gráfico Comparativo de Tempo de Execução](benchmarks/results/grafico_tempo.png)
* [Gráfico Comparativo de Consumo de Memória](benchmarks/results/grafico_memoria.png)

---

## 9. Como Executar

### 🐧 Ambiente Linux (Bash / Shell)

```bash
# 1. Criação e ativação do ambiente virtual
python3 -m venv .venv
source .venv/bin/activate

# 2. Instalação das dependências
pip install -r requirements.txt

# 3. Execução do pipeline de benchmarks e geração dos gráficos
python3 main.py

```

### 🪟 Ambiente Windows (PowerShell)

```powershell
# 1. Criação e ativação do ambiente virtual
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 2. Instalação das dependências
pip install -r requirements.txt

# 3. Execução do pipeline de benchmarks e geração dos gráficos
python main.py

```