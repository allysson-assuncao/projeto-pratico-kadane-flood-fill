# Problema do Preenchimento de Região (Algoritmo de Flood Fill)

> **Projeto Prático:** Análise Comparativa entre Paradigmas Iterativo e Recursivo  
> **Tema Designado:** Vantagem Recursiva — Algoritmo de Flood Fill  
> **Aluno Responsável:** Moisés Emanuel Reis da Cruz  
> **Repositório:** [projeto-pratico-kadane-flood-fill](https://github.com/allysson-assuncao/projeto-pratico-kadane-flood-fill.git)

---

## 1. Visão Geral e Contextualização

O objetivo deste módulo no projeto prático é estudar, implementar e comparar experimental e analiticamente duas soluções — **recursiva** e **iterativa** — para o clássico **Problema de Preenchimento de Região** (*Flood Fill Algorithm*).

Dentro da proposta pedagógica do trabalho em dupla:
- **Tema 1 (Kadane - Allysson):** Demonstra um cenário em que a **solução iterativa** é amplamente superior em tempo, consumo de memória e simplicidade estrutural ($O(1)$ de espaço auxiliar).
- **Tema 2 (Flood Fill - Moisés):** Demonstra um cenário em que a **solução recursiva** reflete com naturalidade e elegância a topologia espacial do problema (árvore/grafo implícito de células conexas), permitindo uma implementação concisa e expressiva baseada em Busca em Profundidade (*Depth-First Search - DFS*).

---

## 2. Características do Problema

1. **Definição Formal:**  
   Dada uma matriz bidimensional (ou grade de pixels) de dimensões $M \times N$, representada por $I$, onde cada elemento $I[r][c]$ armazena uma cor ou valor numérico discreto, um ponto inicial de coordenadas $(sr, sc)$ tal que $0 \le sr < M$ e $0 \le sc < N$, e uma nova cor $C_{nova}$, o objetivo é substituir a cor original $C_{orig} = I[sr][sc]$ por $C_{nova}$ em todas as células que pertençam à **componente conexa** do ponto de partida.

2. **Conectividade Espacial e Vizinhança:**  
   O espalhamento da cor depende da definição de adjacência entre células vizinhas:
   - **4-Conectividade (Vizinhança de von Neumann):** Considera apenas os 4 vizinhos ortogonais — Norte $(r-1, c)$, Sul $(r+1, c)$, Leste $(r, c+1)$ e Oeste $(r, c-1)$. Esta é a convenção padrão clássica (adotada no problema LeetCode 733 e em ferramentas gráficas convencionais).
   - **8-Conectividade (Vizinhança de Moore):** Considera os 4 vizinhos ortogonais somados aos 4 diagonais. No escopo deste módulo, adota-se formalmente a **4-conectividade**.

3. **Condições de Parada e Casos Especiais:**  
   - **Idempotência ($C_{orig} == C_{nova}$):** Se a nova cor for idêntica à cor original do pixel de partida, nenhuma alteração deve ser realizada. Sem essa validação de guarda preliminar, algoritmos recursivos entram em recursão infinita (*stack overflow*), pois o pixel nunca adquire uma cor distinta para acionar a condição de retorno do caso base.
   - **Limites da Grade (Fronteira Geográfica):** Coordenadas fora do intervalo $[0, M-1] \times [0, N-1]$ encerram imediatamente a expansão daquele ramo.
   - **Barreiras de Cor:** Células cuja cor difere de $C_{orig}$ atuam como paredes intransponíveis, delimitando o perímetro da região a ser preenchida.
   - **Matrizes Unitárias e Degeneradas:** Matrizes $1 \times 1$, vetores linha $1 \times N$ e vetores coluna $M \times 1$.
   - **Componente Conexa Total:** Matrizes homogêneas onde todas as células possuem a mesma cor original, configurando o pior caso em que todos os $M \times N$ nós são visitados e modificados.

4. **Classificação de Paradigma:**  
   O Flood Fill é essencialmente um problema de **busca e travessia em grafos não-ponderados**, no qual cada célula da matriz representa um vértice e as conexões ortogonais entre células de mesma cor formam as arestas. O paradigma recursivo resolve o problema via **Busca em Profundidade (DFS)** explorando o *call stack*, enquanto o paradigma iterativo pode ser estruturado via **DFS com Pilha Explícita** ou **Busca em Largura (BFS) com Fila**.

---

## 3. Critérios e Objetivos do Módulo

### 3.1. Critérios de Avaliação e Restrições
- **Corretude Algorítmica e Isolamento:** O algoritmo deve alterar com exatidão somente os pixels que possuem um caminho contínuo de células de cor $C_{orig}$ até a origem $(sr, sc)$. Regiões isoladas de mesma cor, mas desconexas da origem, não podem ser afetadas.
- **Mutação In-Place:** A modificação de cor deve ocorrer diretamente na matriz de entrada (ou em uma cópia de trabalho explícita para instrumentação), usando a própria atualização para $C_{nova}$ como marcador de visitação (*in-place visited marking*), eliminando a sobrecarga de alocar matrizes booleanas auxiliares de visitados quando $C_{orig} \ne C_{nova}$.
- **Tratamento de Ciclos e Estouro de Pilha:** Tratamento explícito do caso de borda em que $C_{orig} == C_{nova}$ e controle/mensuração da profundidade máxima atingida na árvore de chamadas ou na pilha/fila explícita.
- **Rastreabilidade e Instrumentação:** Capacidade de emitir eventos detalhados de cada passo (pixel inspecionado, pixel pintado, empilhamento e desempilhamento) para visualização e coleta estatística.
- **Comparabilidade Metrológica:** Ambas as versões (recursiva e iterativa) devem ser submetidas aos mesmos conjuntos de dados de teste (matrizes com densidades variadas, labirintos, padrões xadrez e matrizes homogêneas de dimensões crescentes).

### 3.2. Objetivos Específicos
1. Implementar a versão **Recursiva** (DFS via *Call Stack* implícita, demonstrando a concisão e a correspondência direta com a definição indutiva do problema).
2. Implementar a versão **Iterativa** (DFS com pilha explícita `list`/`deque` alocada na *Heap* ou BFS com fila FIFO), servindo de contraponto arquitetural.
3. Desenvolver bateria abrangente de testes automatizados com pytest para validação de corretude, idempotência, bordas e equivalência estrita entre ambas as abordagens.
4. Construir script de benchmark automatizado para coletar:
   - Tempo médio de execução (CPU / Wall-clock via `time.perf_counter`).
   - Pico de consumo de memória (via `tracemalloc`).
   - Profundidade máxima da pilha de chamadas (*call stack depth*) vs. tamanho máximo da pilha/fila explícita na Heap.
5. Desenvolver visualizador web interativo (com matriz 2D animada, paleta de cores e inspetor de pilha/árvore) alinhado ao padrão do módulo Kadane.
6. Documentar e justificar os resultados teóricos e práticos através de tabelas, gráficos comparativos e relatório final.

---

## 4. Funcionamento do Algoritmo de Flood Fill

### 4.1. Intuição e Princípio da Exploração Espacial (DFS / Caso Base)
O algoritmo simula o comportamento da popular ferramenta "Balde de Tinta" (*Paint Bucket Tool*). Ao selecionar uma célula inicial $(sr, sc)$ com cor $C_{orig}$, a tinta se espalha para os vizinhos imediatos como uma onda controlada por regras bem definidas:

1. **Condições do Caso Base (Critérios de Retorno):**
   - A coordenada $(r, c)$ está fora dos limites da matriz? $\rightarrow$ Retorna sem ação.
   - O pixel $I[r][c]$ tem cor diferente de $C_{orig}$? $\rightarrow$ Retorna sem ação (encontrou uma fronteira ou barreira).
   - O pixel já foi pintado com $C_{nova}$? $\rightarrow$ Retorna sem ação (já visitado).
2. **Ação Local:**
   - Atualiza a cor do pixel atual: $I[r][c] \leftarrow C_{nova}$.
3. **Propagação Recursiva (Subproblemas Auto-Similares):**
   - Invoca recursivamente a função para as quatro direções ortogonais:
     $$\text{FloodFill}(r-1, c), \quad \text{FloodFill}(r+1, c), \quad \text{FloodFill}(r, c-1), \quad \text{FloodFill}(r, c+1)$$

A árvore de chamadas gerada pela recursão percorre toda a componente conexa em profundidade (*DFS*), retornando (*backtracking*) naturalmente assim que encontra os limites da região ou as fronteiras de cor diferente, sem necessidade de lógica de rebobinamento manual.

### 4.2. Rastreamento Passo a Passo (Exemplo Prático)

Considere a matriz $3 \times 3$ abaixo, com ponto de partida $(sr, sc) = (1, 1)$, cor original $C_{orig} = 1$ e nova cor $C_{nova} = 2$:

$$\text{Matriz Inicial: } \begin{bmatrix} 1 & 1 & 0 \\ 1 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

- **Passo 1:** Ponto de partida $(1, 1)$, cor $1$. Pinta com $2$.
- **Passo 2:** Explora Norte $(0, 1)$, cor $1$. Pinta com $2$.
- **Passo 3:** De $(0, 1)$, explora Oeste $(0, 0)$, cor $1$. Pinta com $2$.
- **Passo 4:** De $(0, 0)$, vizinhos Norte e Oeste fora da matriz; vizinho Leste $(0, 1)$ já vale $2$; vizinho Sul $(1, 0)$ tem cor $1$. Pinta $(1, 0)$ com $2$.
- **Passo 5:** De $(1, 0)$, todos os vizinhos elegíveis já foram visitados ou contêm zero. Retrocede (*backtracks*).
- **Passo 6:** O pixel $(2, 2)$ possui cor $1$, mas **não é alcançável** via 4-conectividade por estar cercado de $0$s (outra componente conexa isolada). Permanece inalterado com cor $1$.

$$\text{Matriz Final: } \begin{bmatrix} \mathbf{2} & \mathbf{2} & 0 \\ \mathbf{2} & \mathbf{2} & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

---

## 5. Justificativa Teórica: Análise Comparativa entre Recursão e Iteração

Enquanto no Algoritmo de Kadane a iteração prevalece amplamente em todas as métricas sobre uma recursão forçada, o Flood Fill apresenta uma dinâmica de engenharia fascinante: a **recursão é a expressão natural e pedagogicamente superior**, mas a **iteração possui vantagens de escalabilidade sob certas restrições de arquitetura de sistemas**.

```
+-------------------------------------------------------------------------------+
|                    Comparativo Teórico e Arquitetural                         |
+------------------------------------+------------------------------------------+
|        Flood Fill Recursivo        |           Flood Fill Iterativo           |
+------------------------------------+------------------------------------------+
| Paradigma: DFS via Call Stack      | Paradigma: DFS (Pilha) ou BFS (Fila)     |
|                                    |                                          |
| Complexidade de Tempo: O(M * N)    | Complexidade de Tempo: O(M * N)          |
|                                    |                                          |
| Complexidade de Espaço: O(M * N)   | Complexidade de Espaço: O(M * N)         |
| (Alocado na Call Stack do SO)      | (Alocado na Heap via Lista/Deque)        |
|                                    |                                          |
| Expressividade e Elegância:        | Expressividade e Elegância:              |
| Extremamente conciso (10-15 linhas)| Requer gerenciamento manual da estrutura |
| Raciocínio matemático indutivo puro| de dados (`push`/`pop`), código mais     |
| Sem estruturas auxiliares manuais  | verboso e propenso a erros de índice     |
|                                    |                                          |
| Gerenciamento de Memória:          | Gerenciamento de Memória:                |
| Stack frame por chamada recursiva  | Objetos alocados na memória Heap         |
| Overhead de prólogo/epílogo de CPU | Overhead de alocação de nós/coleção      |
|                                    |                                          |
| Limite Operacional e Segurança:    | Limite Operacional e Segurança:          |
| Suscetível a RecursionError se o   | Imune ao limite de recursão do SO/Python |
| número de pixels conexos for alto  | Limitado exclusivamente pela RAM total   |
+------------------------------------+------------------------------------------+
```

### 5.1. Por que a Recursão é o Paradigma Designado / Preferível Conceitualmente?
1. **Isomorfismo com Grafos e Árvores de Decisão:** O problema de explorar uma componente conexa em uma grade é recursivo em sua essência. Cada célula vizinha elegível representa uma ramificação direta da árvore de busca.
2. **Ausência de Estruturas de Dados Manuais:** Na versão recursiva, não é necessário instanciar, redimensionar ou manipular pilhas ou filas manuais. A própria máquina virtual / sistema operacional gerencia o estado por meio do *Call Stack*, tornando o algoritmo auto-contido e livre de estruturas de dados acessórias.
3. **Backtracking Implícito e Desacoplado:** O retorno ao nó anterior ocorre de forma limpa pela simples devolução do fluxo de controle (`return`), reduzindo a complexidade ciclomática e o risco de erros de ponteiro ou índices inválidos.
4. **Alinhamento Didático:** Para a formação em Ciência da Computação, o Flood Fill recursivo exemplifica como a divisão de um problema espacial em subproblemas idênticos de menor escala produz código límpido e intuitivo.

### 5.2. O Contraponto da Engenharia: Por que e Quando a Iteração é Preferível na Prática?
Apesar da clareza conceitual da recursão, em projetos de engenharia de software de grande porte e processamento de imagens de alta resolução (ex.: fotos de 4K, 8K ou matrizes geográficas de satélite), a **abordagem iterativa torna-se indispensável** pelos seguintes fatores:

1. **Gargalo Crítico de Estouro de Pilha (*Stack Overflow*):**
   - A *Call Stack* de uma thread do sistema operacional (e o interpretador Python com `sys.getrecursionlimit() = 1000`) possui espaço muito reduzido (geralmente entre 1MB e 8MB).
   - Em uma matriz homogênea de $500 \times 500$ ($250.000$ pixels) ou $1000 \times 1000$ ($1.000.000$ de pixels), a recursão em profundidade provocará imediatamente um erro fatal de execução (`RecursionError` em Python ou *segmentation fault* em C/C++), a menos que o limite do sistema seja modificado artificialmente.
2. **Elasticidade da Memória Heap:**
   - A versão iterativa aloca sua pilha ou fila na **Heap** (memória dinâmica), a qual possui gigabytes de espaço disponível. Uma pilha na Heap contendo 1 milhão de tuplas `(r, c)` consome algumas dezenas de megabytes de RAM sem risco algum de quebrar o processo do sistema operacional.
3. **Flexibilidade Algorítmica (DFS vs. BFS):**
   - Na abordagem iterativa, a simples substituição de uma pilha (`LIFO`) por uma fila (`FIFO`) converte o algoritmo de DFS para BFS (Busca em Largura), permitindo preenchimentos uniformes por raio ou cálculo de distância mínima a partir do ponto de origem.

---

## 6. Estrutura Consolidada do Módulo `flood_fill/`

O módulo segue o mesmo padrão modular, auditado e desacoplado estabelecido no módulo `kadane/`:

```text
flood_fill/
│
├── README.md                  # Este documento (apresentação, teoria e guia de execução)
├── APRESENTACAO.md            # Roteiro detalhado para apresentação e defesa oral
├── plan.md                    # Plano de implementação auditado e executado
├── requirements.txt           # Dependências do projeto (pytest, pytest-cov, matplotlib)
│
├── src/                       # Módulos principais dos algoritmos
│   ├── __init__.py            # Exportações públicas do pacote
│   ├── types.py               # Dataclasses imutáveis (FloodFillResult, StepEvent, CallStackFrame)
│   ├── recursive.py           # Flood Fill recursivo (DFS via Call Stack)
│   ├── iterative.py           # Flood Fill iterativo (DFS com Pilha Explícita / BFS com Fila)
│   └── tracer.py              # Coletor desacoplado ExecutionTracer com exportação JSON
│
├── tests/                     # Bateria de testes automatizados com pytest (100% cobertura)
│   ├── __init__.py
│   ├── test_recursive.py      # Testes da abordagem recursiva e limites de profundidade
│   ├── test_iterative.py      # Testes da abordagem iterativa e integridade da pilha/fila
│   └── test_equivalence.py    # Teste de equivalência estrita (200+ matrizes aleatórias)
│
├── benchmarks/                # Framework de medição empírica de desempenho
│   ├── runner.py              # Executor de 30 rodadas com perf_counter e tracemalloc
│   ├── plot.py                # Gerador de gráficos PNG em alta resolução
│   └── results/               # Dados brutos (JSON), relatórios (MD, TeX) e gráficos (PNG)
│       ├── benchmark_data.json
│       ├── report.md
│       ├── table.tex
│       ├── grafico_tempo.png
│       └── grafico_memoria.png
│
├── scripts/                   # Scripts utilitários
│   └── generate_traces.py     # Gerador automatizado de traces JSON e bundle JS
│
└── visualizer/                # Interface web interativa standalone (zero dependência de servidor)
    ├── index.html             # UI com matriz 2D animada, paleta de cores e Stack Inspector
    ├── app.js                 # Motor de renderização reativo e controles de reprodução
    ├── style.css              # Animações de propagação da onda de tinta e layouts
    └── data/                  # Traces JSON pré-processados e bundle standalone
```

---

## 7. Próximos Passos de Execução

1. Especificação e implementação do núcleo algorítmico em `src/types.py`, `src/recursive.py`, `src/iterative.py` e `src/tracer.py`.
2. Criação da suíte de testes com cobertura de 100% em `tests/`.
3. Execução do framework de benchmark metrológico comparando tempo, memória de heap e profundidade de pilha.
4. Desenvolvimento do visualizador interativo em `visualizer/`.
