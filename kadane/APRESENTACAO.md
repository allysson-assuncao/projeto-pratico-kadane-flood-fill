# Roteiro de Apresentação e Defesa Oral — Algoritmo de Kadane

> **Projeto Prático:** Análise Comparativa Iterativo vs. Recursivo  
> **Tema:** Soma Máxima de Subarranjo (Algoritmo de Kadane)  
> **Apresentador:** Allysson Bruno Chaves Assunção  
> **Duração Estimada Total:** 10 a 12 minutos  

---

## 🎯 Objetivo da Apresentação
Demonstrar, teórica e experimentalmente, que o **Problema da Soma Máxima de Subarranjo** é um caso exemplar de **vantagem do paradigma iterativo**. Enquanto problemas topológicos (como o *Flood Fill* apresentado por Moisés) se beneficiam naturalmente da recursão, o Kadane opera sobre uma estrutura estritamente linear e markoviana, onde a iteração atinge o mínimo teórico de tempo $O(n)$ e memória constante $O(1)$.

---

## ⏱️ Estrutura e Divisão do Tempo

| # | Tópico | Duração | Foco Principal | Artefato de Apoio |
|---|--------|---------|----------------|-------------------|
| 1 | **Definição Formal e Desafio** | 2 min | Subarranjo contíguo, números negativos e decisão de reinício | Quadro / Slide teórico |
| 2 | **Demonstração: Kadane Iterativo** | 2.5 min | Passo a passo no visualizador web: acumulado, reinício e recorde global | [`visualizer/index.html`](file:///C:/Users/anybo/Documents/Projects/projeto-pratico-kadane-flood-fill/kadane/visualizer/index.html) |
| 3 | **Demonstração: Divisão e Conquista** | 2.5 min | Call Stack Inspector: crescimento da pilha, divisão em metades e cruzamento | [`visualizer/index.html`](file:///C:/Users/anybo/Documents/Projects/projeto-pratico-kadane-flood-fill/kadane/visualizer/index.html) |
| 4 | **Evidências Empíricas e Benchmarks** | 3 min | Speedup de até 11.22x, consumo constante de RAM vs. crescimento da recursão | Gráficos PNG e Tabela LaTeX |
| 5 | **Conclusão e Contraste com Flood Fill** | 2 min | Síntese de complexidade e encerramento | Tabela comparativa final |

---

## 📝 Guia Passo a Passo por Tópico

### Tópico 1: Definição Formal e Desafio (2 min)
- **Definição:** Dado um array $A$ de tamanho $n$, encontrar $i, j$ tal que $\sum_{k=i}^j A[k]$ seja máximo.
- **O Dilema dos Negativos:** Se todos fossem positivos, somava-se tudo. Se todos forem negativos, o resultado ótimo é o maior elemento isolado. O desafio reside em saber quando carregar um número negativo temporário para colher um positivo maior adiante.
- **A Sacada de Kadane:** Se o acumulado anterior for menor que zero ($max\_atual < 0$), ele nunca ajudará o elemento seguinte. Portanto, descarta-se o passado e reinicia o subarranjo.

### Tópico 2: Demonstração Prática — Kadane Iterativo (2.5 min)
- **Ação:** Abrir o visualizador no navegador (`kadane/visualizer/index.html`), selecionar o **Cenário Canônico** no modo **Iterativo**.
- **O que mostrar:**
  1. Clique em **Play** ou avance com **Next Step** para mostrar o array `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`.
  2. Destaque o momento em que o algoritmo processa o `1` (índice 1): o acumulado anterior era `-2`, logo o algoritmo reinicia o subarranjo em `1`.
  3. Destaque o índice 3 (valor `4`): o acumulado anterior era `-2`, reinicia em `4` e atinge a soma máxima `6` no intervalo `[3..6]`.
  4. Aponte para a coluna **Call Stack**: ela permanece com **1 único frame constante**, evidenciando o espaço auxiliar $O(1)$.

### Tópico 3: Demonstração Prática — Divisão e Conquista (2.5 min)
- **Ação:** No mesmo visualizador, alternar para o botão **Recursivo (D&C)**.
- **O que mostrar:**
  1. Aponte para a coluna **Call Stack Inspector**: observe os frames empilhando verticalmente (**PUSH**) conforme o array é dividido ao meio.
  2. Mostre o badge de profundidade atingindo múltiplos frames até bater no caso base unitário.
  3. Mostre os eventos de **POP** retornando os resultados parciais e a execução da sub-rotina de cruzamento central (`_max_crossing_subarray`).
  4. Enfatize: para resolver exatamente o mesmo problema, a recursão precisou de **64 passos e múltiplos registros de ativação na pilha**, enquanto o iterativo resolveu em apenas **10 passos com 1 frame**.

### Tópico 4: Evidências Empíricas e Benchmarks (3 min)
- **Ação:** Projetar os gráficos gerados em [`kadane/benchmarks/results/`](file:///C:/Users/anybo/Documents/Projects/projeto-pratico-kadane-flood-fill/kadane/benchmarks/results/).
- **Destaques quantitativos dos testes reais (30 rodadas):**
  - **Tempo:** Para $N = 100$, o iterativo já é **7.17x mais rápido**. Para $N = 100.000$, o tempo iterativo é de apenas **0.026s** contra **0.297s** do recursivo (**Speedup de 11.22x**).
  - **Gráfico de Tempo (Log-Log):** A curva do Kadane cola na reta teórica $O(n)$, enquanto a Divisão e Conquista descola para cima seguindo a curva $O(n \log n)$.
  - **Memória:** O Kadane manteve consumo plano em $\approx 410$ bytes em todos os valores de $N$. A recursão consumiu mais de **1.768 bytes** com 19 frames de profundidade.

### Tópico 5: Conclusão e Contraste com o Parceiro (2 min)
- **Por que a iteração venceu no Kadane?** O problema tem dependência linear e local (markoviana). Não existe árvore de caminhos nem necessidade de backtracking. Qualquer pilha de chamadas aqui é overhead puro.
- **Conexão com o Flood Fill (Moisés):** No Flood Fill, o cenário se inverte: o espaço é uma matriz 2D/grafo onde um pixel precisa propagar para 4 ou 8 vizinhos com retorno quando encontra bordas. A recursão (DFS) reflete diretamente a topologia do problema.
- **Fechamento:** Kadane ilustra com perfeição que escolher a ferramenta certa para a estrutura do problema é o princípio central da eficiência de algoritmos.
