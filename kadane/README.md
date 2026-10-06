# Problema da Soma Máxima de Subarranjo (Algoritmo de Kadane)

> **Projeto Prático:** Análise Comparativa entre Paradigmas Iterativo e Recursivo  
> **Tema Designado:** Vantagem Iterativa — Algoritmo de Kadane  
> **Aluno Responsável:** Allysson Bruno Chaves Assunção  
> **Repositório:** [projeto-pratico-kadane-flood-fill](https://github.com/allysson-assuncao/projeto-pratico-kadane-flood-fill.git)

---

## 1. Visão Geral e Contextualização

O objetivo deste módulo no projeto prático é estudar, implementar e comparar experimental e analiticamente duas soluções — **iterativa** e **recursiva** — para o clássico **Problema da Soma Máxima de Subarranjo** (*Maximum Subarray Sum Problem*).

Dentro da proposta pedagógica do trabalho em dupla:
- **Tema 1 (Kadane - Allysson):** Demonstra um cenário em que a **solução iterativa** é amplamente superior em tempo, consumo de memória e simplicidade estrutural.
- **Tema 2 (Flood Fill - Moisés):** Demonstra um cenário onde a **solução recursiva** reflete naturalmente a topologia e exploração espacial (árvore/grafo) com backtracking.

---

## 2. Características do Problema

1. **Definição Formal:**  
   Dado um arranjo unidimensional de $n$ números inteiros $A = [a_0, a_1, a_2, \dots, a_{n-1}]$ contendo valores positivos, negativos e zero, o objetivo é encontrar índices contíguos $i$ e $j$ (com $0 \le i \le j < n$) tais que a soma dos elementos entre esses limites seja máxima:
   $$\max_{0 \le i \le j < n} \sum_{k=i}^{j} A[k]$$

2. **Contiguidade:**  
   Diferente do problema da *Subsequência de Soma Máxima* (que permitiria saltar elementos negativos), o subarranjo exige elementos **estritamente adjacentes**.

3. **Presença de Elementos Negativos:**  
   - Se todos os elementos fossem não-negativos, a solução trivial seria a soma de todo o array.
   - A complexidade e o desafio algorítmico surgem exatamente da necessidade de decidir se compensa ou não manter uma sequência de elementos negativos na esperança de alcançar números positivos maiores adiante.
   - Caso todos os números do array sejam negativos, a soma máxima é simplesmente o maior elemento negativo individual (o número mais próximo de zero).

4. **Classificação de Paradigma:**  
   O algoritmo clássico proposto por Joseph Kadane (1984) é uma aplicação direta e brilhante de **Programação Dinâmica** em tempo linear com otimização espacial para estado escalar.

---

## 3. Critérios e Objetivos do Módulo

### 3.1. Critérios de Avaliação e Restrições
- **Corretude Algorítmica:** O algoritmo deve retornar a soma correta para qualquer configuração de entrada (inclusive arrays estritamente negativos e arrays unitários).
- **Rastreabilidade de Índices:** Além do valor numérico da soma máxima, o algoritmo deve ser capaz de informar os índices $[i, j]$ que delimitam o subarranjo ideal.
- **Comparabilidade Metrológica:** Ambas as versões (iterativa e recursiva) devem ser submetidas aos mesmos conjuntos de dados de teste (massa sintética controlada e casos de borda).

### 3.2. Objetivos Específicos
1. Implementar a versão **Iterativa** (Algoritmo de Kadane clássico $O(n)$ tempo e $O(1)$ espaço).
2. Implementar a versão **Recursiva** (abordagem por Divisão e Conquista $O(n \log n)$ ou abordagem recursiva direta/acumulativa).
3. Desenvolver bateria de testes unitários para verificação de corretude.
4. Construir script de benchmark automatizado para coletar:
   - Tempo médio de execução (CPU / Wall-clock).
   - Uso de memória (heap e profundidade da call stack).
5. Documentar e justificar os resultados através de gráficos e relatório final.

---

## 4. Funcionamento do Algoritmo de Kadane

### 4.1. Intuição e Princípio da Subestrutura Ótima
O algoritmo de Kadane baseia-se na constatação de que a soma máxima do subarranjo que termina na posição $k$ depende apenas:
1. Do elemento atual $A[k]$;
2. Da soma máxima do subarranjo que termina na posição $k-1$.

A cada passo $k$, temos uma decisão local gulosa/dinâmica:
- **Opção A:** Estender o subarranjo anterior somando o elemento atual ($max\_atual + A[k]$).
- **Opção B:** Descartar todo o subarranjo acumulado até então e iniciar um novo subarranjo a partir de $A[k]$.

A regra de transição é dada por:
$$max\_atual[k] = \max(A[k],\; max\_atual[k-1] + A[k])$$

E o recorde global é atualizado continuamente:
$$max\_global = \max(max\_global,\; max\_atual[k])$$

> **Pulo do Gato:** Se $max\_atual[k-1] < 0$, somar esse valor a $A[k]$ só diminuirá o resultado. Portanto, sempre que o acumulado anterior for negativo, o algoritmo descarta a história passada e "reinicia" no elemento atual.

### 4.2. Rastreamento Passo a Passo (Exemplo Prático)

Considere o array:
$$A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]$$

| Índice ($k$) | Elemento $A[k]$ | Cálculo $max\_atual$ | $max\_atual$ | $max\_global$ | Subarranjo Ativo |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | -2 | Inicial | -2 | -2 | `[-2]` |
| 1 | 1 | $\max(1, -2 + 1) = 1$ | 1 | 1 | `[1]` *(reiniciou)* |
| 2 | -3 | $\max(-3, 1 - 3) = -2$ | -2 | 1 | `[1, -3]` |
| 3 | 4 | $\max(4, -2 + 4) = 4$ | 4 | 4 | `[4]` *(reiniciou)* |
| 4 | -1 | $\max(-1, 4 - 1) = 3$ | 3 | 4 | `[4, -1]` |
| 5 | 2 | $\max(2, 3 + 2) = 5$ | 5 | 5 | `[4, -1, 2]` |
| 6 | 1 | $\max(1, 5 + 1) = 6$ | **6** | **6** | `[4, -1, 2, 1]` |
| 7 | -5 | $\max(-5, 6 - 5) = 1$ | 1 | 6 | `[4, -1, 2, 1, -5]` |
| 8 | 4 | $\max(4, 1 + 4) = 5$ | 5 | 6 | `[4, -1, 2, 1, -5, 4]` |

**Resultado Final:**
- Soma Máxima: **6**
- Subarranjo Contíguo Ótimo: `[4, -1, 2, 1]` (índices 3 a 6).

### 4.3. Prova Formal de Correção e Invariante de Laço

A correção do Algoritmo de Kadane é formalmente demonstrada pelo método indutivo de **Invariante de Laço**:

#### Enunciado do Invariante
No início de cada iteração do laço `for` (para o índice $k$, onde $1 \le k \le n$):
1. **Ótimo Local:** $max\_current$ armazena a soma máxima entre todos os subarranjos contíguos não-vazios que terminam exatamente na posição $k-1$:
   $$max\_current = \max_{0 \le i \le k-1} \sum_{m=i}^{k-1} A[m]$$
2. **Ótimo Global:** $max\_global$ armazena a soma máxima entre todos os subarranjos contíguos contidos estritamente no prefixo $A[0..k-1]$:
   $$max\_global = \max_{0 \le i \le j < k} \sum_{m=i}^{j} A[m]$$

#### 1. Inicialização (Base da Indução)
Antes da primeira iteração ($k=1$), $max\_current = A[0]$ e $max\_global = A[0]$. O único subarranjo não-vazio que termina em $0$ e está contido em $A[0..0]$ é o subarranjo unitário $[A[0]]$, cuja soma é $A[0]$. O invariante é válido trivialmente.

#### 2. Manutenção (Passo Indutivo)
Assumindo que o invariante é válido no início da iteração $k$:
- Todo subarranjo contíguo que termina em $k$ ou consiste unicamente de $A[k]$, ou é formado pela extensão do subarranjo que termina em $k-1$ somado a $A[k]$.
- Como por hipótese $max\_current$ continha a soma máxima terminando em $k-1$, a melhor soma terminando em $k$ é dada por $\max(A[k],\; max\_current + A[k])$. A atualização da variável preserva a propriedade (1).
- O melhor subarranjo contido em $A[0..k]$ ou já estava inteiramente contido em $A[0..k-1]$ (já registrado em $max\_global$) ou termina em $k$ (recém-calculado em $max\_current$). A atribuição $max\_global = \max(max\_global, max\_current)$ preserva a propriedade (2) para o início da iteração $k+1$.

#### 3. Término
O laço encerra quando $k = n$. Substituindo $k=n$ no invariante:
$$max\_global = \max_{0 \le i \le j < n} \sum_{m=i}^j A[m]$$
Portanto, ao término da execução, $max\_global$ contém a solução ótima exata do Problema da Soma Máxima de Subarranjo para todo o vetor $A$, provando formalmente a correção do algoritmo.

---

## 5. Implementação Recursiva: Abordagem por Divisão e Conquista (CLRS / Bentley)

Enquanto o algoritmo de Kadane opera iterativamente sob o paradigma de **Programação Dinâmica** em tempo linear $\mathcal{O}(n)$ e memória constante $\mathcal{O}(1)$, a solução recursiva canônica adota o paradigma de **Divisão e Conquista** (*Divide and Conquer*), formalizada por Jon Bentley (1984) e Thomas H. Cormen et al. (*CLRS, Capítulo 4*):

1. **Divisão (*Divide*):** Calcula o ponto médio $mid = \lfloor (low + high) / 2 \rfloor$ e particiona o intervalo em $[low..mid]$ e $[mid+1..high]$.
2. **Conquista (*Conquer*):** Resolve recursivamente os subproblemas esquerdo (`left_res`) e direito (`right_res`).
3. **Combinação (*Combine*):** Executa a rotina auxiliar `_max_crossing_subarray` em tempo linear $\Theta(m)$ para encontrar a melhor soma contígua que obrigatoriamente atravessa o centro ($mid$ e $mid+1$).
4. **Critério de Parada:** Quando $low == high$, o subarranjo é unitário e retorna imediatamente $A[low]$.
5. **Decisão Ternária:** O melhor resultado da partição é determinado por $\max(left\_res,\; right\_res,\; cross\_res)$.

A complexidade temporal resultante é **$\Theta(n \log n)$** (pelo Teorema Mestre, $T(n) = 2T(n/2) + \Theta(n)$) e a profundidade máxima da pilha de chamadas (*Call Stack*) é balanceada em **$h(n) = \lceil \log_2 n \rceil + 1 \implies \mathcal{O}(\log n)$**.

> [!NOTE]
> ### 📖 Documentação Detalhada da Abordagem Recursiva
> Para a documentação aprofundada com a **prova formal da independência das metades**, **dissecação passo a passo da etapa de cruzamento**, **tabela completa de ciclo de vida das variáveis e call stack**, além de **3 cenários práticos rastreados iteração por iteração** (vetor canônico misto, estritamente negativo e caso base unitário), consulte o documento dedicado:  
> 👉 **[RECURSIVO.md](RECURSIVO.md)**

---

## 6. Justificativa: Por que a Iteração é Preferível para o Problema de Kadane?

A escolha do Algoritmo de Kadane como representante da **vantagem iterativa** apoia-se em critérios teóricos e de engenharia de software fundamentais:

```
+-------------------------------------------------------------------------+
|                  Comparativo Teórico e Prático                          |
+------------------------------------+------------------------------------+
|        Kadane Iterativo            |        Abordagem Recursiva         |
+------------------------------------+------------------------------------+
| Complexidade de Tempo: O(n)        | Divisão e Conquista: Θ(n log n)    |
| (Passada única linear)             | (Recombinação linear por nível)    |
|                                    | Recursão Linear Ingênua: O(n)      |
|                                    |                                    |
| Complexidade de Espaço: O(1)       | Divisão e Conquista: O(log n)      |
| (Espaço auxiliar estritamente fixo)| Recursão Linear Ingênua: O(n)      |
|                                    |                                    |
| Overhead de Pilha: Zero            | Frames de ativação na Call Stack   |
| (Opera em registradores de CPU)    | 19 frames p/ N=10^5 (D&C)          |
|                                    | Estouro (RecursionError) na linear |
|                                    |                                    |
| Acesso a Memória: Sequencial linear| Saltos de execução e quebra de     |
| (Excelente cache locality / L1/L2) | prefetcher por divisão de metades  |
+------------------------------------+------------------------------------+
```

### 1. Ausência de Necessidade de Backtracking (Natureza Linear)
O problema do subarranjo máximo tem propriedade estritamente **markoviana**: o melhor subarranjo terminando no índice $k$ depende única e exclusivamente do que ocorreu no índice $k-1$. Não há bifurcações, não há múltiplos ramos a explorar e não há necessidade de desfazer escolhas (*backtracking*). Usar uma pilha de chamadas para um fluxo unidirecional linear é um desperdício de recursos.

### 2. Eficiência de Espaço Auxiliar $O(1)$
Na versão iterativa, são necessárias apenas variáveis escalares para rastrear o estado atual e o máximo global. O consumo de memória é constante, independente se o array possui 10 ou 100 milhões de elementos.

### 3. Análise Assintótica da Profundidade de Pilha e Risco de Stack Overflow
É crucial diferenciar a natureza recursiva empregada:
- **Recursão Linear Ingênua ($T(n) = T(n-1) + \mathcal{O}(1)$):** Exige uma profundidade de pilha estritamente linear $\mathcal{O}(n)$. Em Python, onde o limite padrão (`sys.getrecursionlimit()`) é 1000 chamadas, qualquer vetor com $N \ge 1000$ colapsa imediatamente com `RecursionError`.
- **Divisão e Conquista CLRS ($T(n) = 2T(n/2) + \Theta(n)$):** Como o espaço de busca é biparticionado simetricamente a cada nível, a árvore de recursão é balanceada com profundidade máxima:
  $$h(n) = \lceil \log_2 n \rceil + 1$$
  Para $N = 100.000$, a profundidade atinge no máximo **19 frames**, sendo estruturalmente imune a `RecursionError` em limites convencionais.
- **A desvantagem da Divisão e Conquista:** Apesar de segura quanto ao estouro de pilha, ela exige recombinar o cruzamento central em tempo $\Theta(n)$ em cada um dos $\log_2 n$ níveis, totalizando $\Theta(n \log n)$ tempo e $\mathcal{O}(\log n)$ memória para frames ativos — tornando o Kadane iterativo $\mathcal{O}(n)/\mathcal{O}(1)$ **mais de 11 vezes mais rápido** na prática.

### 4. Localidade de Referência e Hardware Cache
O laço iterativo percorre o vetor em ordem contígua na memória. Isso ativa os mecanismos de *hardware prefetching* do processador moderno e maximiza a taxa de acertos no cache L1/L2. A recursão introduz quebras de fluxo no ponteiro de instrução e operações adicionais de `push`/`pop` na pilha.

---

## 7. Estrutura Consolidada do Módulo `kadane/`

```text
kadane/
│
├── README.md                  # Este documento (apresentação, teoria e guia de execução)
├── RESUMO_EXECUTIVO.md        # Síntese gerencial de métricas e roteiro de validação
├── APRESENTACAO.md            # Roteiro detalhado para apresentação e defesa oral
├── RECURSIVO.md               # Documentação detalhada da abordagem recursiva (D&C, variáveis, cenários)
├── plan.md                    # Plano de implementação auditado e executado
├── requirements.txt           # Dependências do projeto (pytest, pytest-cov, matplotlib)
├── __main__.py                # Ponto de entrada para execução modular (python -m kadane)
│
├── src/                       # Módulos principais dos algoritmos
│   ├── __init__.py            # Exportações públicas do pacote
│   ├── types.py               # Dataclasses imutáveis (SubarrayResult, StepEvent, CallStackFrame)
│   ├── iterative.py           # Algoritmo de Kadane clássico O(n), O(1)
│   ├── recursive.py           # Divisão e Conquista O(n log n), O(log n) pilha
│   ├── tracer.py              # Coletor desacoplado ExecutionTracer com exportação JSON
│   └── cli.py                 # Interface de linha de comando com REPL e flags formatadas
│
├── tests/                     # Bateria de testes automatizados com pytest (100% cobertura)
│   ├── __init__.py
│   ├── test_cli.py            # Testes da interface CLI e parser de argumentos
│   ├── test_iterative.py      # Testes do algoritmo iterativo e tracer
│   ├── test_recursive.py      # Testes da divisão e conquista e call stack
│   └── test_equivalence.py    # Teste de equivalência estrita (200+ casos aleatórios)
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
    ├── index.html             # UI com Tailwind CDN, array animado, input customizado e Call Stack
    ├── app.js                 # Motor de renderização reativo e gerador de traces client-side
    ├── style.css              # Transições suaves e animações de push/pop
    └── data/                  # Traces JSON pré-processados e bundle standalone
```

---

## 8. Resultados Empíricos Obtidos

Bateria de 30 rodadas executadas com arrays pseudoaleatórios de inteiros entre $[-1000, 1000]$:

| $N$ | Kadane Iterativo (Tempo) | Divisão e Conquista (Tempo) | **Speedup Iterativo** | Pico Memória (Iterativo) | Pico Memória (Recursivo) | Call Stack (Recursivo) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **10** | 0.000005 s | 0.000022 s | **4.10x** | 456 bytes | 520 bytes | 6 frames |
| **100** | 0.000033 s | 0.000234 s | **7.17x** | 397 bytes | 808 bytes | 9 frames |
| **1.000** | 0.000282 s | 0.002652 s | **9.41x** | 402 bytes | 1.096 bytes | 12 frames |
| **10.000** | 0.002644 s | 0.028370 s | **10.73x** | 411 bytes | 1.480 bytes | 16 frames |
| **100.000** | 0.026452 s | 0.296927 s | **11.22x** | 418 bytes | 1.768 bytes | 19 frames |

Os gráficos gerados estão disponíveis em:
- [Gráfico Comparativo de Tempo de Execução](benchmarks/results/grafico_tempo.png)
- [Gráfico Comparativo de Consumo de Memória](benchmarks/results/grafico_memoria.png)

---

## 9. Como Executar

> **Dica Multiplataforma:** Para evitar problemas de caminho (`PATH`) com ferramentas instaladas via pip, utilize sempre o prefixo do interpretador (`python -m` no Windows ou `python3 -m` no Linux).

### 🐧 Ambiente Linux (Bash / Shell)

```bash
# 1. Criação e ativação de ambiente virtual (recomendado em distros modernas / PEP 668)
python3 -m venv .venv
source .venv/bin/activate

# 2. Instalação das dependências
pip install -r kadane/requirements.txt

# 3. Execução dos testes automatizados com cobertura
python3 -m pytest kadane/tests/ -v --cov=kadane.src --cov-report=term-missing

# 4. Execução dos benchmarks e geração de gráficos
python3 kadane/benchmarks/runner.py
python3 kadane/benchmarks/plot.py

# 5. Geração de traces para o visualizador
python3 kadane/scripts/generate_traces.py

# 6. Abrir visualizador web
xdg-open kadane/visualizer/index.html || open kadane/visualizer/index.html
# Ou, se estiver em ambiente headless / sem interface gráfica:
# python3 -m http.server 8000
```

### 🪟 Ambiente Windows (PowerShell)

```powershell
# 1. Instalação das dependências
pip install -r kadane/requirements.txt

# 2. Execução dos testes automatizados com cobertura
python -m pytest kadane/tests/ -v --cov=kadane.src --cov-report=term-missing

# 3. Execução dos benchmarks e geração de gráficos
python kadane/benchmarks/runner.py
python kadane/benchmarks/plot.py

# 4. Geração de traces para o visualizador
python kadane/scripts/generate_traces.py

# 5. Abrir visualizador web
start kadane/visualizer/index.html
```

### 💻 Interface de Linha de Comando (CLI)

O módulo dispõe de uma CLI completa para execução direta, testes arbitrários e modo interativo via terminal:

```bash
# Execução direta informando um vetor
python -m kadane --array "[-2, 1, -3, 4, -1, 2, 1, -5, 4]"

# Exibição detalhada das decisões passo a passo (--verbose)
python -m kadane --array "5, -2, 7, -1, 3" --verbose

# Console interativo contínuo (REPL para demonstração ao vivo)
python -m kadane --interactive
```

---

## 10. Roteiro para Apresentação Oral
Para o roteiro detalhado com tempos e argumentos para a defesa do trabalho, consulte o documento:  
👉 **[APRESENTACAO.md](APRESENTACAO.md)**

