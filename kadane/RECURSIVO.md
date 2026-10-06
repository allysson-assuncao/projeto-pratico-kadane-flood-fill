# Implementação Recursiva: Abordagem por Divisão e Conquista (CLRS / Bentley)

> **Módulo:** Algoritmo de Kadane e Soma Máxima de Subarranjo  
> **Tema Designado:** Vantagem Iterativa vs. Divisão e Conquista Recursiva  
> **Aluno Responsável:** Allysson Bruno Chaves Assunção  
> **Código-fonte Principal:** [`kadane/src/recursive.py`](src/recursive.py)  
> **Documento Principal:** [`kadane/README.md`](README.md)  

---

## 1. Visão Geral e Contextualização

Enquanto a versão linear clássica proposta por Joseph Kadane (1984) opera sob o paradigma de **Programação Dinâmica**, a abordagem recursiva canônica para o **Problema da Soma Máxima de Subarranjo** (*Maximum Subarray Sum Problem*) apoia-se no paradigma de **Divisão e Conquista** (*Divide and Conquer*), formulado por Jon Bentley (1984) e formalizado por Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest e Clifford Stein (*Introduction to Algorithms - CLRS, Capítulo 4*).

Esta documentação detalha a arquitetura lógica, os critérios de parada, o gerenciamento de variáveis na pilha de chamadas (*call stack*) e, com ênfase especial, a **etapa de combinação** (`_max_crossing_subarray`), acompanhada de cenários práticos de execução dissecados passo a passo.

---

## 2. Paradigma e Decomposição Matemática

O princípio da Divisão e Conquista decompõe o espaço de busca contíguo $[low..high]$ em três etapas essenciais:

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

1. **Divisão (*Divide*):**  
   Calcula-se o ponto médio do subarranjo corrente:
   $$mid = \left\lfloor \frac{low + high}{2} \right\rfloor$$
   O arranjo é particionado em dois subintervalos disjuntos: $[low..mid]$ (metade esquerda) e $[mid+1..high]$ (metade direita).

2. **Conquista (*Conquer*):**  
   Invoca-se recursivamente o algoritmo para determinar o subarranjo ótimo em cada uma das metades:
   - `left_res` $= \text{busca ótima em } A[low..mid]$
   - `right_res` $= \text{busca ótima em } A[mid+1..high]$

3. **Combinação (*Combine*):**  
   Como um subarranjo contíguo ótimo qualquer pode atravessar a fronteira central, calcula-se a melhor soma que **obrigatoriamente cruza o ponto médio** ($mid$ e $mid+1$):
   - `cross_res` $= \text{busca ótima cruzando a fronteira central em } A[low..high]$

### Propriedade de Partição Disjunta
Qualquer subarranjo contíguo não-vazio $A[i..j]$ com $low \le i \le j \le high$ satisfaz exatamente uma das três condições mutuamente exclusivas:
- **Reside inteiramente na metade esquerda:** $low \le i \le j \le mid$
- **Reside inteiramente na metade direita:** $mid+1 \le i \le j \le high$
- **Cruza a fronteira média:** $low \le i \le mid < j \le high$

Portanto, a solução global para o intervalo $[low..high]$ é o máximo entre os três candidatos:
$$\text{resultado} = \max(\text{left\_res.max\_sum},\; \text{right\_res.max\_sum},\; \text{cross\_res.max\_sum})$$

### Relação de Recorrência e Teorema Mestre
A complexidade temporal do algoritmo é descrita pela equação de recorrência clássica:
$$T(n) = 2T\left(\frac{n}{2}\right) + \Theta(n)$$
Onde:
- $2T(n/2)$ representa a chamada recursiva para as duas metades simétricas;
- $\Theta(n)$ representa a varredura linear da etapa de cruzamento central (`_max_crossing_subarray`).

Pelo **Caso 2 do Teorema Mestre** ($a = 2$, $b = 2$, $f(n) = \Theta(n)$ com $n^{\log_b a} = n^{\log_2 2} = n^1$):
$$T(n) = \Theta(n \log n)$$

A profundidade da árvore de recursão é estritamente balanceada com altura máxima:
$$h(n) = \lceil \log_2 n \rceil + 1 \implies \mathcal{O}(\log n)$$
garantindo que o consumo de memória na pilha de execução (*Call Stack*) permaneça em $\mathcal{O}(\log n)$.

---

## 3. Critérios de Parada (Caso Base)

A condição de término da recursão é definida pelo teste de subarranjo unitário:

```python
# kadane/src/recursive.py
if low == high:
    res = SubarrayResult(max_sum=arr[low], start_idx=low, end_idx=low)
    return res
```

### Fundamentação e Racionalidade do Critério:
1. **Irredutibilidade do Subproblema:**  
   Quando $low == high$, o intervalo contém um único elemento $A[low]$. Um subarranjo unitário não possui ponto médio passível de bipartição e não pode ser subdividido em metades esquerda e direita válidas.
2. **Exaustão Trivial:**  
   O único subarranjo contíguo não-vazio contido em $A[low..low]$ é o próprio elemento individual $[A[low]]$. A sua soma máxima é indubitavelmente $A[low]$, com índices inicial e final estritamente iguais a $low$.
3. **Preservação de Valores Negativos:**  
   Caso o elemento seja negativo (ex.: $[-5]$), o caso base devolve $-5$ como resultado local. O algoritmo não zera o valor nem infere um subarranjo vazio, mantendo a semântica estrita de retornar o elemento menos negativo caso todo o vetor seja negativo.
4. **Desempilhamento (*Stack Frame Pop*):**  
   Ao atingir $low == high$, a função conclui sua execução sem efetuar chamadas filhas, registrando um evento `pop` na pilha com o resultado parcial obtido e retornando imediatamente ao frame chamador.

---

## 4. A Etapa de Combinação em Detalhes: `_max_crossing_subarray`

A rotina auxiliar `_max_crossing_subarray(arr, low, mid, high)` constitui o núcleo algorítmico da etapa de combinação da Divisão e Conquista.

### O Teorema da Independência das Metades Cruzadoras
Se um subarranjo contíguo $A[i..j]$ cruza a fronteira central, ele deve necessariamente conter tanto $A[mid]$ quanto $A[mid+1]$. Logo, sua soma pode ser decomposta em duas partes contíguas conectadas no centro:
$$\sum_{k=i}^j A[k] = \left( \sum_{k=i}^{mid} A[k] \right) + \left( \sum_{k=mid+1}^j A[k] \right)$$

Como o índice $i$ está confinado ao intervalo $[low..mid]$ e o índice $j$ está confinado ao intervalo $[mid+1..high]$, **as escolhas de $i$ e $j$ são completamente independentes**. 

Para maximizar a soma total da combinação, basta maximizar de forma desacoplada:
1. O melhor **sufixo** da metade esquerda terminando em $mid$;
2. O melhor **prefixo** da metade direita começando em $mid+1$.

$$\max_{\substack{low \le i \le mid \\ mid+1 \le j \le high}} \sum_{k=i}^j A[k] = \underbrace{\left( \max_{low \le i \le mid} \sum_{k=i}^{mid} A[k] \right)}_{\text{Sufixo Esquerdo Ótimo}} + \underbrace{\left( \max_{mid+1 \le j \le high} \sum_{k=mid+1}^j A[k] \right)}_{\text{Prefixo Direito Ótimo}}$$

```
                       mid               mid + 1
       low              v                   v              high
      [ . . . . . . . . | . . . . . . . . . | . . . . . . . . ]
               <========                    ========>
         Varredura Esquerda            Varredura Direita
      (de mid descendo a low)       (de mid+1 subindo a high)
       acumula e busca max           acumula e busca max
```

### 1. Varredura Linear à Esquerda (Sufixo):
- **Origem e Sentido:** Inicia em $i = mid$ e decrementa até $low$ (`step = -1`).  
  *Por que de trás para frente?* Porque o subarranjo precisa ser contíguo com $mid$. Iniciar no centro e recuar em direção ao início garante que qualquer soma calculada contenha $A[mid]$ e preserve a contiguidade com a fronteira.
- **Variáveis de Controle:**
  - `left_sum = float("-inf")`: Inicializado com menos infinito para permitir que vetores totalmente negativos encontrem o maior elemento negativo local.
  - `curr_sum = 0`: Acumulador incremental das somas contíguas.
  - `max_left = mid`: Guarda o índice inicial $i$ que gerou a maior soma acumulada até o momento.
- **Regra de Atualização:**
  ```python
  curr_sum += arr[i]
  if curr_sum > left_sum:
      left_sum = curr_sum
      max_left = i
  ```

### 2. Varredura Linear à Direita (Prefixo):
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

### 3. Síntese do Cruzamento:
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

## 5. Gerenciamento de Variáveis, Valores e Call Stack

A integridade da execução recursiva apoia-se no ciclo de vida isolado de variáveis em cada registro de ativação (*stack frame*) e na orquestração da comparação ternária:

### Tabela de Ciclo de Vida e Papel das Variáveis

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

### A Decisão Ternária de Recombinação
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

### Gerenciamento da Pilha de Execução (*Call Stack Inspector*)
A instrumentação no módulo [`kadane/src/tracer.py`](src/tracer.py) mapeia cada transição de estado da pilha:
- **Evento `PUSH`:** Ocorre imediatamente antes da avaliação do frame. Um objeto `CallStackFrame(frame_id, fn_name, low, high, mid, depth)` é empilhado.
- **Isolamento de Estado:** As variáveis locais `low`, `high`, `mid`, `left_res`, etc. residem na moldura do frame correspondente. Quando uma chamada filha é invocada, a chamada pai congela seu estado na pilha até a conclusão da subárvore.
- **Evento `POP`:** Quando o caso base é atingido ou a decisão ternária conclui, o frame é desempilhado e seu `partial_result` é entregue à função chamadora.
- **Garantia de Não Estouro:** Como a profundidade máxima é $\lceil \log_2 n \rceil + 1$, mesmo para $N = 100.000$ a pilha atinge no máximo 19 frames simultâneos, sem risco de provocar `RecursionError`.

---

## 6. Cenários de Execução Detalhados Passo a Passo

A seguir, três cenários práticos dissecam detalhadamente a mecânica de execução, a evolução dos valores e a tomada de decisão da combinação.

---

### 🧪 Cenário A: Vetor Canônico Misto (Caso Clássico)
**Entrada:** $A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]$ ($n = 9$, índices $0$ a $8$).

```
Índices:   0    1    2    3    4    5    6    7    8
Valores: [-2,   1,  -3,   4,  -1,   2,   1,  -5,   4]
```

#### 1. Árvore de Decomposição Recursiva
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

#### 2. Resolução das Subárvores e Casos Base
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

#### 3. Dissecação da Combinação Decisiva na Raiz `[0..8]` ($mid = 4$)
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

### 🧪 Cenário B: Vetor Estritamente Negativo
**Entrada:** $A = [-4, -1, -7, -2]$ ($n = 4$, índices $0$ a $3$).

Este caso comprova a robustez do algoritmo em evitar a armadilha de somar números negativos adjacentes e assegura que o elemento menos negativo seja escolhido.

```
Índices:   0    1    2    3
Valores: [-4,  -1,  -7,  -2]
```

#### 1. Árvore de Execução Completa e Tabela de Passos

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

#### Conclusão do Cenário Negativo:
- O cruzamento produziu $-8$, que é inferior tanto a $-1$ quanto a $-2$.
- O algoritmo descartou a extensão através do meio e preservou com exatidão o elemento unitário de maior valor ($-1$ no índice $1$), comprovando corretude absoluta.

---

### 🧪 Cenário C: Vetor Unitário (Caso de Borda Mínimo)
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

## 7. Referências e Navegação

- **Implementação do Algoritmo:** [`kadane/src/recursive.py`](src/recursive.py)
- **Documento Principal do Projeto:** [`kadane/README.md`](README.md)
- **Resumo Executivo com Métricas:** [`kadane/RESUMO_EXECUTIVO.md`](RESUMO_EXECUTIVO.md)
- **Roteiro de Apresentação:** [`kadane/APRESENTACAO.md`](APRESENTACAO.md)
- **Visualizador Web Interativo:** [`kadane/visualizer/index.html`](visualizer/index.html)
