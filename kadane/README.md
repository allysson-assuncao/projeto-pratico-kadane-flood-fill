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

---

## 5. Justificativa: Por que a Iteração é Preferível para o Problema de Kadane?

A escolha do Algoritmo de Kadane como representante da **vantagem iterativa** apoia-se em critérios teóricos e de engenharia de software fundamentais:

```
+-------------------------------------------------------------------------+
|                  Comparativo Teórico e Prático                          |
+------------------------------------+------------------------------------+
|        Kadane Iterativo            |        Abordagem Recursiva         |
+------------------------------------+------------------------------------+
| Complexidade de Tempo: O(n)        | Divisão e Conquista: O(n log n)    |
|                                    | Recursão Direta: O(n)              |
|                                    |                                    |
| Complexidade de Espaço: O(1)       | Divisão e Conquista: O(log n)      |
|                                    | Recursão Direta: O(n)              |
|                                    |                                    |
| Overhead de Pilha: Zero            | Frames de ativação na Stack        |
|                                    | Risco de Stack Overflow para n>10^4|
|                                    |                                    |
| Acesso a Memória: Sequencial linear| Saltos de execução e indireção     |
| (Excelente cache locality / L1/L2) | de ponteiros e variáveis de frame  |
+------------------------------------+------------------------------------+
```

### 1. Ausência de Necessidade de Backtracking (Natureza Linear)
O problema do subarranjo máximo tem propriedade estritamente **markoviana**: o melhor subarranjo terminando no índice $k$ depende única e exclusivamente do que ocorreu no índice $k-1$. Não há bifurcações, não há múltiplos ramos a explorar e não há necessidade de desfazer escolhas (*backtracking*). Usar uma pilha de chamadas para um fluxo unidirecional linear é um desperdício de recursos.

### 2. Eficiência de Espaço Auxiliar $O(1)$
Na versão iterativa, são necessárias apenas variáveis escalares para rastrear o estado atual e o máximo global. O consumo de memória é constante, independente se o array possui 10 ou 100 milhões de elementos.

### 3. Risco Crítico de *Stack Overflow* na Recursão
Em linguagens comuns (como Python, C, Java), cada invocação de função consome um registro de ativação (*stack frame*) na memória. Se implementarmos a recursão linear em um array com $10^5$ elementos:
- Em Python, disparará `RecursionError: maximum recursion depth exceeded`.
- Em C/C++, causará falha de segmentação (*segmentation fault*) por estouro de pilha.
Mesmo na abordagem por Divisão e Conquista ($O(\log n)$ de pilha), ainda existe overhead de divisão e recombinação das metades com custo temporal $O(n \log n)$, pior que o $O(n)$ do Kadane.

### 4. Localidade de Referência e Hardware Cache
O laço iterativo percorre o vetor em ordem contígua na memória. Isso ativa os mecanismos de *hardware prefetching* do processador moderno e maximiza a taxa de acertos no cache L1/L2. A recursão introduz quebras de fluxo no ponteiro de instrução e operações adicionais de `push`/`pop` na pilha.

---

## 6. Proposta de Estrutura do Diretório `kadane/`

```text
kadane/
│
├── README.md               <-- Este documento (apresentação, teoria e justificativas)
├── src/                    <-- Código fonte dos algoritmos
│   ├── __init__.py
│   ├── iterative_kadane.py <-- Implementação iterativa O(n), O(1) com índices
│   └── recursive_kadane.py <-- Implementação recursiva (Divisão & Conquista / Cauda)
│
├── tests/                  <-- Testes unitários de validação
│   ├── __init__.py
│   └── test_kadane.py      <-- Casos normais, negativos, unitários, zeros
│
└── benchmarks/             <-- Scripts de medição empírica e gráficos
    ├── benchmark.py        <-- Medição de tempo e memória com arrays crescentes
    └── results/            <-- Gráficos comparativos (tempo vs n, memória vs n)
```

---

## 7. Próximos Passos Sugeridos
1. **Confirmação da Linguagem:** Validar se a linguagem padrão para a implementação do projeto será **Python**, **C**, **C++** ou **Java** (sugestão: Python para facilitar benchmarks e gráficos com matplotlib, ou C/C++ se o foco do professor for estritamente desempenho nativo).
2. **Implementação dos Algoritmos:** Desenvolver as duas abordagens no diretório `src/`.
3. **Bateria de Testes:** Garantir que ambos os métodos entreguem saídas idênticas para qualquer vetor.
4. **Coleta de Métricas:** Medir o impacto da recursão vs. iteração em cenários com diferentes ordens de grandeza de $n$.
