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

Enquanto o algoritmo de Kadane clássico opera sob o paradigma de **Programação Dinâmica Iterativa**, a solução recursiva canônica para o Problema da Soma Máxima de Subarranjo fundamenta-se no paradigma de **Divisão e Conquista** (*Divide and Conquer*), formalizada por Jon Bentley (1984) e consagrada na literatura por Thomas H. Cormen et al. (*CLRS, Capítulo 4*).

Esta implementação está modularizada em [`kadane/src/recursive.py`](src/recursive.py) e instrumentada com rastreamento de pilha em [`kadane/src/types.py`](src/types.py) (`CallStackFrame` e `StepEvent`).

---

### 5.1. Paradigma e Decomposição Matemática

O princípio da Divisão e Conquista consiste em particionar recursivamente o intervalo de busca $[low..high]$ em subproblemas menores, resolvê-los independentemente e recombinar suas soluções parciais:

1. **Divisão (*Divide*):**  
   Calcula-se o ponto médio do subarranjo corrente:
   $$mid = \left\lfloor \frac{low + high}{2} \right\rfloor$$
   O arranjo é particionado em dois subintervalos disjuntos: $[low..mid]$ (metade esquerda) e $[mid+1..high]$ (metade direita).

2. **Conquista (*Conquer*):**  
   Invoca-se recursivamente o algoritmo para determinar o subarranjo ótimo em cada uma das metades:
   - `left_res` $= \text{busca ótima em } A[low..mid]$
   - `right_res` $= \text{busca ótima em } A[mid+1..high]$

3. **Combinação (*Combine*):**  
   Como um subarranjo contíguo ótimo qualquer pode cruzar a fronteira entre as duas metades, calcula-se a melhor soma que **obrigatoriamente atravessa o ponto central** ($mid$ e $mid+1$):
   - `cross_res` $= \text{busca ótima cruzando a fronteira central em } A[low..high]$

Qualquer subarranjo contíguo não-vazio $A[i..j]$ com $low \le i \le j \le high$ satisfaz exatamente uma das três condições mutuamente exclusivas:
- **Reside inteiramente na metade esquerda:** $low \le i \le j \le mid$
- **Reside inteiramente na metade direita:** $mid+1 \le i \le j \le high$
- **Cruza a fronteira média:** $low \le i \le mid < j \le high$

Portanto, a solução global para o intervalo $[low..high]$ é o máximo entre os três candidatos:
$$\text{resultado} = \max(\text{left\_res.max\_sum},\; \text{right\_res.max\_sum},\; \text{cross\_res.max\_sum})$$

```
                            Intervalo [low .. high]
                                    |
            +-----------------------+-----------------------+
            |                                               |
     Metade Esquerda                                 Metade Direita
      [low .. mid]                                  [mid+1 .. high]
            |                                               |
       (Recursão)                                      (Recursão)
            v                                               v
        left_res                                        right_res
            \                                               /
             \                     Cruzamento              /
              \               [max_left .. max_right]     /
               \                         |               /
                \                        v              /
                 +--------------->   cross_res  <------+
                                         |
                                         v
                         max(left_res, right_res, cross_res)
```

#### Relação de Recorrência e Teorema Mestre
A complexidade temporal do algoritmo é descrita pela equação de recorrência:
$$T(n) = 2T\left(\frac{n}{2}\right) + \Theta(n)$$
Onde:
- $2T(n/2)$ representa a chamada recursiva para as duas metades;
- $\Theta(n)$ representa a varredura linear da etapa de cruzamento (`_max_crossing_subarray`).

Pelo **Caso 2 do Teorema Mestre** ($a = 2$, $b = 2$, $f(n) = \Theta(n)$ com $n^{\log_b a} = n^{\log_2 2} = n^1$):
$$T(n) = \Theta(n \log n)$$

A profundidade da árvore de recursão é estritamente balanceada com altura máxima:
$$h(n) = \lceil \log_2 n \rceil + 1 \implies \mathcal{O}(\log n)$$
garantindo que o consumo de memória na pilha de execução (*Call Stack*) permaneça em $\mathcal{O}(\log n)$.

---

### 5.2. Critérios de Parada (Caso Base)

A condição de término da recursão é definida pelo teste de subarranjo unitário:

```python
if low == high:
    res = SubarrayResult(max_sum=arr[low], start_idx=low, end_idx=low)
    return res
```

#### Fundamentação e Racionalidade do Critério:
1. **Irredutibilidade do Subproblema:**  
   Quando $low == high$, o intervalo contém um único elemento $A[low]$. Um subarranjo unitário não possui ponto médio passível de bipartição e não pode ser subdividido em metades esquerda e direita válidas.
2. **Exaustão Trivial:**  
   O único subarranjo contíguo não-vazio contido em $A[low..low]$ é o próprio elemento individual $[A[low]]$. A sua soma máxima é indubitavelmente $A[low]$, com índices inicial e final estritamente iguais a $low$.
3. **Preservação de Valores Negativos:**  
   Caso o elemento seja negativo (ex.: $[-5]$), o caso base devolve $-5$ como resultado local. O algoritmo não comete o erro de zerar o valor ou inferir um subarranjo vazio, mantendo a semântica de retornar o elemento menos negativo caso todo o vetor seja negativo.
4. **Desempilhamento (*Stack Frame Pop*):**  
   Ao atingir $low == high$, a função conclui sua execução sem efetuar chamadas filhas, registrando um evento `pop` na pilha com o resultado parcial obtido e retornando imediatamente ao frame chamador.

---

### 5.3. A Etapa de Combinação em Detalhes: `_max_crossing_subarray`

A rotina auxiliar `_max_crossing_subarray(arr, low, mid, high)` constitui o núcleo da etapa de combinação da Divisão e Conquista.

#### O Teorema da Independência das Metades Cruzadoras
Se um subarranjo contíguo $A[i..j]$ cruza a fronteira central, ele deve necessariamente conter tanto $A[mid]$ quanto $A[mid+1]$. Logo, sua soma pode ser decomposta em duas partes contíguas com o centro:
$$\sum_{k=i}^j A[k] = \left( \sum_{k=i}^{mid} A[k] \right) + \left( \sum_{k=mid+1}^j A[k] \right)$$

Como o índice $i$ está confinado ao intervalo $[low..mid]$ e o índice $j$ está confinado ao intervalo $[mid+1..high]$, **as escolhas de $i$ e $j$ são completamente independentes**. 

Para maximizar a soma total da combinação, basta maximizar de forma desacoplada:
1. O melhor **sufixo** da metade esquerda terminando em $mid$;
2. O melhor **prefixo** da metade direita começando em $mid+1$.

$$\max_{\substack{low \le i \le mid \\ mid+1 \le j \le high}} \sum_{k=i}^j A[k] = \underbrace{\left( \max_{low \le i \le mid} \sum_{k=i}^{mid} A[k] \right)}_{\text{Sufixo Esquerdo Ótimo}} + \underbrace{\left( \max_{mid+1 \le j \le high} \sum_{k=i}^{mid+1} A[k] \right)}_{\text{Prefixo Direito Ótimo}}$$

```
                       mid               mid + 1
       low              v                   v              high
      [ . . . . . . . . | . . . . . . . . . | . . . . . . . . ]
               <========                    ========>
         Varredura Esquerda            Varredura Direita
      (de mid descendo a low)       (de mid+1 subindo a high)
       acumula e busca max           acumula e busca max
```

#### 1. Varredura Linear à Esquerda (Sufixo):
- **Origem e Sentido:** Inicia em $i = mid$ e decrementa até $low$ (`step = -1`).  
  *Por que de trás para frente?* Porque o subarranjo precisa ser contíguo com $mid$. Iniciar no centro e recuar em direção ao início garante que qualquer soma calculada contenha $A[mid]$ e preserve a contiguidade com a fronteira.
- **Variáveis de Controle:**
  - `left_sum = float("-inf")`: Inicializado com menos infinito para permitir que arrays totalmente negativos encontrem o maior elemento negativo local.
  - `curr_sum = 0`: Acumulador incremental das somas contíguas.
  - `max_left = mid`: Guarda o índice inicial $i$ que gerou a maior soma acumulada até o momento.
- **Regra de Atualização:**
  ```python
  curr_sum += arr[i]
  if curr_sum > left_sum:
      left_sum = curr_sum
      max_left = i
  ```

#### 2. Varredura Linear à Direita (Prefixo):
- **Origem e Sentido:** Inicia em $j = mid + 1$ e incrementa até $high$ (`step = +1`).  
  *Por que do centro para o fim?* Para garantir contiguidade imediata a partir de $A[mid+1]$.
- **Variáveis de Controle:**
  - `right_sum = float("-inf")`: Inicializado com menos infinito.
  - `curr_sum = 0`: Reiniciado para zero antes da varredura direita.
  - `max_right = mid + 1`: Guarda o índice final $j$ que gerou a maior soma acumulada.
- **Regra de Atualização:**
  ```python
  curr_sum += arr[j]
  if curr_sum > right_sum:
      right_sum = curr_sum
      max_right = j
  ```

#### 3. Síntese do Cruzamento:
Ao término dos dois laços, a função retorna um objeto `SubarrayResult` unificado:
```python
return SubarrayResult(
    max_sum=int(left_sum + right_sum),
    start_idx=max_left,
    end_idx=max_right,
)
```
- **Complexidade Local:** A varredura esquerda executa $(mid - low + 1)$ passos e a direita $(high - mid)$ passos. A soma de iterações é exatamente $(high - low + 1) = m$, configurando tempo estritamente linear $\Theta(m)$ e espaço auxiliar $\mathcal{O}(1)$.

---

### 5.4. Gerenciamento de Variáveis, Valores e Call Stack

A integridade da execução recursiva apoia-se no ciclo de vida isolado de variáveis em cada registro de ativação (*stack frame*) e na orquestração da comparação ternária:

#### Tabela de Ciclo de Vida e Papel das Variáveis

| Variável | Escopo | Tipo | Momento de Inicialização | Papel Algorítmico e Regra de Atualização |
| :--- | :--- | :--- | :--- | :--- |
| `arr` | Global / Referência | `list[int]` | Início da execução | Vetor sob análise. Acessado em tempo $O(1)$ sem cópia na memória. |
| `low`, `high` | Local ao Frame | `int` | Parâmetros de chamada | Delimitam os limites inclusivos da partição corrente analisada pela chamada. |
| `mid` | Local ao Frame | `int` | Início do frame | Calculado como `(low + high) // 2`. Ponto de corte para a bipartição. |
| `depth` | Local ao Frame | `int` | Parâmetro incremental | Nível de profundidade na árvore de recursão ($0$ na raiz, incrementa $+1$ a cada chamada filha). |
| `left_res` | Local ao Frame | `SubarrayResult` | Retorno da 1ª chamada filha | Contém $(max\_sum, start, end)$ do subarranjo ótimo restrito a $[low..mid]$. |
| `right_res` | Local ao Frame | `SubarrayResult` | Retorno da 2ª chamada filha | Contém $(max\_sum, start, end)$ do subarranjo ótimo restrito a $[mid+1..high]$. |
| `cross_res` | Local ao Frame | `SubarrayResult` | Retorno de `_max_crossing_subarray` | Contém $(max\_sum, start, end)$ do melhor subarranjo que atravessa a fronteira central. |
| `best_res` | Local ao Frame | `SubarrayResult` | Recombinação ternária | Inicializado com `left_res`; atualizado se `right_res.max_sum > best_res.max_sum` ou `cross_res.max_sum > best_res.max_sum`. |
| `curr_sum` | Local ao Crossing | `int` | Início de cada varredura | Acumulador temporário da soma contígua em direção às extremidades. |
| `left_sum`, `right_sum` | Local ao Crossing | `float / int` | `-inf` antes da varredura | Recordes parciais do melhor sufixo esquerdo e melhor prefixo direito. |
| `max_left`, `max_right` | Local ao Crossing | `int` | `mid` e `mid+1` | Índices das fronteiras externas que atingiram `left_sum` e `right_sum`. |

#### A Decisão Ternária de Recombinação
Após obter os três candidatos parciais, o frame executa uma comparação determinística:

```python
best_res = left_res
if right_res.max_sum > best_res.max_sum:
    best_res = right_res
if cross_res.max_sum > best_res.max_sum:
    best_res = cross_res
return best_res
```
> **Nota de Desempate:** O uso do operador estritamente maior (`>`) prioriza o resultado localizado mais à esquerda em caso de empates numéricos entre subarranjos distintos, assegurando reprodutibilidade estrita.

#### Gerenciamento da Pilha de Execução (*Call Stack Inspector*)
A instrumentação no módulo [`kadane/src/tracer.py`](src/tracer.py) mapeia cada transição de estado da pilha:
- **Evento `PUSH`:** Ocorre imediatamente antes da avaliação do frame. Um objeto `CallStackFrame(frame_id, fn_name, low, high, mid, depth)` é empilhado.
- **Isolamento de Estado:** As variáveis locais `low`, `high`, `mid`, `left_res`, etc. residem na moldura do frame correspondente. Quando uma chamada filha é invocada, a chamada pai congela seu estado na pilha até a conclusão da subárvore.
- **Evento `POP`:** Quando o caso base é atingido ou a decisão ternária conclui, o frame é desempilhado e seu `partial_result` é entregue à função chamadora.
- **Garantia de Não Estouro:** Como a profundidade máxima é $\lceil \log_2 n \rceil + 1$, mesmo para $N = 100.000$ a pilha atinge no máximo 19 frames simultâneos, sem risco de provocar `RecursionError`.

---

### 5.5. Cenários de Execução Detalhados Passo a Passo

A seguir, três cenários práticos dissecam detalhadamente a mecânica de execução, a evolução dos valores e a tomada de decisão da combinação.

---

#### 🧪 Cenário A: Vetor Canônico Misto (Caso Clássico)
**Entrada:** $A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]$ ($n = 9$, índices $0$ a $8$).

```
Índices:   0    1    2    3    4    5    6    7    8
Valores: [-2,   1,  -3,   4,  -1,   2,   1,  -5,   4]
```

##### 1. Árvore de Decomposição Recursiva
A divisão recursiva gera a seguinte hierarquia de partições:

```
                                [0..8] (mid=4)
                               /              \
                 [0..4] (mid=2)                [5..8] (mid=6)
                /              \              /              \
         [0..2] (mid=1)       [3..4] (mid=3) [5..6] (mid=5)  [7..8] (mid=7)
         /            \       /    \         /    \          /    \
    [0..1] (mid=0)   [2..2] [3..3] [4..4]  [5..5] [6..6]   [7..7] [8..8]
    /    \
  [0..0] [1..1]
```

##### 2. Resolução das Subárvores e Casos Base
1. **Folhas (Casos Base $low == high$):**  
   - $[0..0] \implies \text{max}=-2$ em $[0..0]$  
   - $[1..1] \implies \text{max}=1$ em $[1..1]$  
   - $[2..2] \implies \text{max}=-3$ em $[2..2]$  
   - $[3..3] \implies \text{max}=4$ em $[3..3]$  
   - $[4..4] \implies \text{max}=-1$ em $[4..4]$  
   - $[5..5] \implies \text{max}=2$ em $[5..5]$  
   - $[6..6] \implies \text{max}=1$ em $[6..6]$  
   - $[7..7] \implies \text{max}=-5$ em $[7..7]$  
   - $[8..8] \implies \text{max}=4$ em $[8..8]$  

2. **Recombinações nos Níveis Inferiores:**  
   - Em $[0..1]$ ($mid=0$): `left_res` = $-2$, `right_res` = $1$, cruzamento = $-2 + 1 = -1 \implies$ `best_res` = $1$ ($[1..1]$).
   - Em $[0..2]$ ($mid=1$): `left_res` = $1$, `right_res` = $-3$, cruzamento em $[1..1] + [2..2] = 1 - 3 = -2 \implies$ `best_res` = $1$ ($[1..1]$).
   - Em $[3..4]$ ($mid=3$): `left_res` = $4$, `right_res` = $-1$, cruzamento = $4 - 1 = 3 \implies$ `best_res` = $4$ ($[3..3]$).
   - Em $[0..4]$ ($mid=2$): `left_res` = $1$ ($[1..1]$), `right_res` = $4$ ($[3..3]$), cruzamento atinge $4 \implies$ `best_res` = $4$ ($[3..3]$).
   - Em $[5..6]$ ($mid=5$): `left_res` = $2$, `right_res` = $1$, cruzamento = $2 + 1 = 3 \implies$ `best_res` = $3$ ($[5..6]$).
   - Em $[7..8]$ ($mid=7$): `left_res` = $-5$, `right_res` = $4$, cruzamento = $-5 + 4 = -1 \implies$ `best_res` = $4$ ($[8..8]$).
   - Em $[5..8]$ ($mid=6$): `left_res` = $3$ ($[5..6]$), `right_res` = $4$ ($[8..8]$), cruzamento = $3 - 5 + 4 = 2 \implies$ `best_res` = $4$ ($[8..8]$).

##### 3. Dissecação da Combinação Decisiva na Raiz `[0..8]` ($mid = 4$)
Neste ponto, o algoritmo concluiu a avaliação dos dois ramos principais:
- `left_res` (em $[0..4]$) $= \text{SubarrayResult}(max\_sum=4, start=3, end=3)$
- `right_res` (em $[5..8]$) $= \text{SubarrayResult}(max\_sum=4, start=8, end=8)$

Agora executa-se o cruzamento crucial: `_max_crossing_subarray(arr, low=0, mid=4, high=8)` onde $A[mid] = A[4] = -1$:

**A) Varredura Linear à Esquerda ($i$ de $4$ descendo a $0$):**
- Início: `left_sum = -inf`, `curr_sum = 0`, `max_left = 4`.

| Passo | Índice $i$ | Elemento $A[i]$ | Cálculo de `curr_sum` | `curr_sum` | `left_sum` Anterior | Atualiza Recorde? | `left_sum` Atual | `max_left` | Explicação |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | 4 | -1 | $0 + (-1)$ | **-1** | $-\infty$ | **Sim** ($-1 > -\infty$) | **-1** | 4 | Começa em $mid$; $-1$ é o primeiro recorde. |
| 2 | 3 | 4 | $-1 + 4$ | **3** | -1 | **Sim** ($3 > -1$) | **3** | **3** | **Novo recorde!** Prefixo acumulado $[4, -1]$ atinge soma $3$. |
| 3 | 2 | -3 | $3 + (-3)$ | **0** | 3 | Não ($0 \le 3$) | 3 | 3 | A adição de $-3$ reduz a soma acumulada para $0$. |
| 4 | 1 | 1 | $0 + 1$ | **1** | 3 | Não ($1 \le 3$) | 3 | 3 | Soma sobe para $1$, mas não supera o recorde $3$. |
| 5 | 0 | -2 | $1 + (-2)$ | **-1** | 3 | Não ($-1 \le 3$) | 3 | 3 | Soma cai para $-1$. Fim da varredura esquerda. |

*Resultado do Sufixo Esquerdo:* `left_sum = 3`, delimitado pelo índice $max\_left = 3$ (subarranjo $A[3..4] = [4, -1]$).

**B) Varredura Linear à Direita ($j$ de $5$ subindo a $8$):**
- Início: `right_sum = -inf`, `curr_sum = 0`, `max_right = 5`.

| Passo | Índice $j$ | Elemento $A[j]$ | Cálculo de `curr_sum` | `curr_sum` | `right_sum` Anterior | Atualiza Recorde? | `right_sum` Atual | `max_right` | Explicação |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | 5 | 2 | $0 + 2$ | **2** | $-\infty$ | **Sim** ($2 > -\infty$) | **2** | 5 | Começa em $mid+1$; valor inicial $2$. |
| 2 | 6 | 1 | $2 + 1$ | **3** | 2 | **Sim** ($3 > 2$) | **3** | **6** | **Novo recorde!** Subarranjo $[2, 1]$ atinge soma $3$. |
| 3 | 7 | -5 | $3 + (-5)$ | **-2** | 3 | Não ($-2 \le 3$) | 3 | 6 | Elemento negativo degrada a soma para $-2$. |
| 4 | 8 | 4 | $-2 + 4$ | **2** | 3 | Não ($2 \le 3$) | 3 | 6 | Soma recupera para $2$, mas não alcança o recorde $3$. |

*Resultado do Prefixo Direito:* `right_sum = 3`, delimitado pelo índice $max\_right = 6$ (subarranjo $A[5..6] = [2, 1]$).

**C) Fusão do Subarranjo Cruzador:**
$$\text{cross\_res.max\_sum} = left\_sum + right\_sum = 3 + 3 = 6$$
$$\text{start\_idx} = max\_left = 3, \quad \text{end\_idx} = max\_right = 6$$
O subarranjo cruzador é exatamente $A[3..6] = [4, -1, 2, 1]$ com soma $6$.

**D) Comparação Ternária Final na Raiz:**
- `left_res.max_sum` $= 4$ ($A[3..3] = [4]$)
- `right_res.max_sum` $= 4$ ($A[8..8] = [4]$)
- `cross_res.max_sum` $= 6$ ($A[3..6] = [4, -1, 2, 1]$)

Como $6 > 4$, a combinação consagra o subarranjo de cruzamento como o vencedor global:
$$\mathbf{best\_res = SubarrayResult(max\_sum=6, start\_idx=3, end\_idx=6)}$$

> **Insight Pedagógico:** Este cenário evidencia por que a etapa de cruzamento é imprescindível: a resposta ótima global **não pertencia estritamente nem à metade esquerda nem à metade direita**, mas estendia-se exatamente através da fronteira de bipartição!

---

#### 🧪 Cenário B: Vetor Estritamente Negativo
**Entrada:** $A = [-4, -1, -7, -2]$ ($n = 4$, índices $0$ a $3$).

Este caso comprova a robustez do algoritmo em evitar a armadilha de somar números negativos adjacentes e assegura que o elemento menos negativo seja escolhido.

```
Índices:   0    1    2    3
Valores: [-4,  -1,  -7,  -2]
```

##### 1. Árvore de Execução Completa e Tabela de Passos

```
              [0..3] (mid=1)
             /              \
      [0..1] (mid=0)       [2..3] (mid=2)
      /            \       /            \
   [0..0]        [1..1]  [2..2]        [3..3]
```

Abaixo está o rastreamento cronológico exato das 7 chamadas e seus retornos:

| Ordem | Chamada / Ação | Intervalo | $mid$ | Caso | Detalhes do Retorno / Cruzamento | `best_res` Local |
| :---: | :--- | :---: | :---: | :---: | :--- | :--- |
| 1 | `_max_subarray_rec` | $[0..3]$ | 1 | Divisão | Aguarda resolução da subárvore esquerda $[0..1]$... | - |
| 2 | `_max_subarray_rec` | $[0..1]$ | 0 | Divisão | Aguarda resolução do filho esquerdo $[0..0]$... | - |
| 3 | `_max_subarray_rec` | $[0..0]$ | - | **Base** | $low == high \implies$ Retorna `SubarrayResult(-4, 0, 0)` | **-4** em $[0..0]$ |
| 4 | `_max_subarray_rec` | $[1..1]$ | - | **Base** | $low == high \implies$ Retorna `SubarrayResult(-1, 1, 1)` | **-1** em $[1..1]$ |
| 5 | Cruzamento em $[0..1]$ | $[0..1]$ | 0 | Crossing | Varredura esq: $i=0 \to left\_sum=-4$<br>Varredura dir: $j=1 \to right\_sum=-1$<br>Cruzamento: $-4 + (-1) = -5$ em $[0..1]$ | $\max(-4, -1, -5)$ = **-1** em $[1..1]$ |
| 6 | Retorno de $[0..1]$ | $[0..1]$ | - | Retorno | `left_res` de $[0..3]$ recebe `SubarrayResult(-1, 1, 1)` | - |
| 7 | `_max_subarray_rec` | $[2..3]$ | 2 | Divisão | Aguarda resolução da subárvore direita $[2..3]$... | - |
| 8 | `_max_subarray_rec` | $[2..2]$ | - | **Base** | $low == high \implies$ Retorna `SubarrayResult(-7, 2, 2)` | **-7** em $[2..2]$ |
| 9 | `_max_subarray_rec` | $[3..3]$ | - | **Base** | $low == high \implies$ Retorna `SubarrayResult(-2, 3, 3)` | **-2** em $[3..3]$ |
| 10 | Cruzamento em $[2..3]$ | $[2..3]$ | 2 | Crossing | Varredura esq: $i=2 \to left\_sum=-7$<br>Varredura dir: $j=3 \to right\_sum=-2$<br>Cruzamento: $-7 + (-2) = -9$ em $[2..3]$ | $\max(-7, -2, -9)$ = **-2** em $[3..3]$ |
| 11 | Retorno de $[2..3]$ | $[2..3]$ | - | Retorno | `right_res` de $[0..3]$ recebe `SubarrayResult(-2, 3, 3)` | - |
| 12 | Cruzamento na Raiz | $[0..3]$ | 1 | Crossing | **Varredura Esq ($i=1 \to 0$):**<br>- $i=1: A[1]=-1 \implies curr=-1, left\_sum=-1, max\_left=1$<br>- $i=0: A[0]=-4 \implies curr=-5 \le -1$<br>**Varredura Dir ($j=2 \to 3$):**<br>- $j=2: A[2]=-7 \implies curr=-7, right\_sum=-7, max\_right=2$<br>- $j=3: A[3]=-2 \implies curr=-9 \le -7$<br>**Soma Cruzamento:** $-1 + (-7) = -8$ em $[1..2]$ | $\max(-1, -2, -8)$ = **-1** em $[1..1]$ |
| 13 | Retorno Raiz $[0..3]$ | $[0..3]$ | - | Final | `best_res` = `left_res` = `SubarrayResult(-1, 1, 1)` | **-1** em $[1..1]$ |

##### Conclusão do Cenário Negativo:
- O cruzamento produziu $-8$, que é inferior tanto a $-1$ quanto a $-2$.
- O algoritmo descartou a extensão através do meio e preservou com exatidão o elemento unitário de maior valor ($-1$ no índice $1$), comprovando corretude absoluta.

---

#### 🧪 Cenário C: Vetor Unitário (Caso de Borda Mínimo)
**Entrada:** $A = [42]$ ($n = 1$, limites $low = 0, high = 0$).

Este cenário demonstra a eficácia imediata do critério de parada:

1. **Invocação:** `kadane_recursive([42])` chama `_max_subarray_rec(arr, low=0, high=0, depth=0)`.
2. **Avaliação da Guarda:** A condição $low == high$ ($0 == 0$) avalia como verdadeira na primeira instrução.
3. **Execução:**
   ```python
   res = SubarrayResult(max_sum=42, start_idx=0, end_idx=0)
   return res
   ```
4. **Métricas de Execução:**
   - Chamadas recursivas geradas: **0**
   - Execuções de `_max_crossing_subarray`: **0**
   - Profundidade máxima da pilha: **1 frame**
   - Complexidade: $\mathcal{O}(1)$ tempo e espaço.

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

