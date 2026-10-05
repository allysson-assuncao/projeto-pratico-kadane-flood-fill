# Prompt de Diretrizes para Geração do Plano de Implementação — Módulo Flood Fill

> **Destinatário:** Agente Sênior de Planejamento e Arquitetura de Software  
> **Objetivo:** Elaborar o documento `flood_fill/plan.md` com o plano de implementação completo, unificado, detalhado e dividido em fases para o módulo **Flood Fill (Preenchimento de Região)**, espelhando com máxima fidelidade e rigor metodológico o padrão estabelecido em `kadane/plan.md`.  
> **Tema do Módulo:** Vantagem Recursiva (com análise crítica e contraponto prático da abordagem iterativa).  
> **Aluno Responsável:** Moisés Emanuel Reis da Cruz.  
> **Repositório:** [projeto-pratico-kadane-flood-fill](https://github.com/allysson-assuncao/projeto-pratico-kadane-flood-fill.git)

---

## 1. Contexto Geral e Diretrizes Metodológicas

O projeto acadêmico compara de forma analítica e empírica as abordagens **Iterativa** e **Recursiva** aplicadas a dois problemas clássicos da Ciência da Computação:
1. **Algoritmo de Kadane (Tema 1 - Allysson):** Caso representativo da **Vantagem Iterativa** ($O(n)$ tempo, $O(1)$ espaço constante, sem risco de estouro de pilha).
2. **Flood Fill (Tema 2 - Moisés):** Caso representativo da **Vantagem Recursiva**, onde a estrutura indutiva da recursão mapeia diretamente a topologia espacial do problema (Busca em Profundidade em grafos/árvores de células conexas) gerando código conciso, elegante e com *backtracking* implícito, contrastando com o contraponto da engenharia de software onde a abordagem iterativa protege o sistema contra *Stack Overflow* alocando a pilha na memória Heap.

O plano a ser gerado em `flood_fill/plan.md` deve ser **auto-contido, auditável, modular e estruturado em 5 fases sequenciais**, detalhando contratos de dados, assinaturas, casos de teste, arquitetura de benchmarking, esquema do visualizador web e critérios de aceitação estritos (Definition of Done - DoD).

---

## 2. Decisões Arquiteturais e de Design Consolidadas

O agente de planejamento deve incorporar rigorosamente as seguintes decisões técnicas no plano:

1. **Estratégia de Travessia Iterativa:**
   - Implementação iterativa via **DFS com Pilha Explícita (LIFO)** alocada na Heap (`collections.deque` ou `list`).
   - Justificativa técnica: A escolha da DFS com pilha explícita mantém equivalência direta 1:1 na ordem de percurso e visitação de nós em relação à DFS recursiva via Call Stack. Isso viabiliza a comparação metrológica precisa de passos de execução e contraste direto entre a *Call Stack* do sistema operacional e a pilha alocada na memória *Heap*.

2. **Ordem Direcional Canônica de Expansão (Sentido Horário):**
   - Vetor de direções fixado rigorosamente em:
     $$\Delta = [(-1, 0), (0, 1), (1, 0), (0, -1)] \quad \iff \quad [\text{Cima / Norte}, \text{Direita / Leste}, \text{Baixo / Sul}, \text{Esquerda / Oeste}]$$
   - Na implementação iterativa com pilha (LIFO), os vizinhos devem ser empilhados na ordem inversa para que a retirada (`pop`) explore exatamente na mesma sequência da recursão, garantindo rastros de execução (*traces*) passo a passo 100% idênticos.

3. **Contrato de Dados e Mutação Defensiva:**
   - Retorno obrigatório de uma dataclass imutável `FloodFillResult` (`src/types.py`), contendo:
     - `image`: Matriz resultante (`tuple[tuple[int, ...], ...]`), gerada a partir de cópia defensiva profunda sem mutar o input original.
     - `pixels_modified`: Quantidade total de células preenchidas com a nova cor.
     - `original_color`: Cor original da célula de partida $(sr, sc)$.
     - `new_color`: Nova cor aplicada.
     - `visited_count`: Total de células inspecionadas durante o percurso.
     - `max_stack_depth`: Profundidade máxima atingida na pilha (Call Stack ou Pilha Heap).
     - `execution_time_seconds`: Tempo total de processamento medido internamente.

4. **Tratamento de Limite de Recursão nos Benchmarks:**
   - Registrar a barreira física e empírica do `RecursionError`:
     - Testar matrizes crescentes de $10 \times 10$ até $200 \times 200$.
     - Registrar a falha com o limite padrão do Python (`sys.getrecursionlimit() = 1000`) como evidência empírica da vulnerabilidade da Call Stack da CPU.
     - Em bateria controlada com `sys.setrecursionlimit()` ampliado, documentar a curva de tempo e até onde a stack do sistema operacional opera antes do limite crítico, evidenciando que a versão iterativa escala com segurança até o esgotamento da memória RAM.

5. **Topologias de Matrizes para Testes e Benchmarks:**
   - A suíte de validação e testes de estresse deve cobrir obrigatoriamente 6 categorias topológicas:
     1. **Homogênea:** Todas as células com a mesma cor (pior caso para DFS, ramificação máxima contígua).
     2. **Labirinto / Caminho Sinuoso:** Caminho único longo (profundidade contínua extrema sem ramificações imediatas).
     3. **Ilhas Desconexas:** Múltiplas regiões isoladas de mesma cor separadas por barreiras (teste de não-invasão de componentes desconexas).
     4. **Padrão Xadrez:** Cores alternadas em cada célula adjacente (nenhum vizinho elegível, parada imediata no caso base).
     5. **Aleatória / Esparsa:** Grade com obstáculos e distribuições aleatórias controladas por semente (*seed*).
     6. **Matrizes Degeneradas e Casos de Borda:** Matrizes $1 \times 1$, vetores linha $1 \times N$, vetores coluna $M \times 1$ e cenário de idempotência ($C_{orig} == C_{nova}$).

6. **Visualizador Web Interativo Standalone (`visualizer/`):**
   - Padrão arquitetural 100% standalone (HTML5 + Tailwind CDN via `<link>` + JavaScript ES6 puro, sem servidor backend, abrível diretamente via protocolo `file://`).
   - Layout de 3 colunas principais:
     - **Coluna 1 (Grade 2D de Pixels):** Visualização interativa da matriz bidimensional, com animação das células, destaque visual na célula sob inspeção (`ring-2 ring-yellow-400`), células preenchidas (`nova cor`), células na pilha e barreiras.
     - **Coluna 2 (Stack Inspector):** Painel vertical que anima `push` (empilhamento com descida suave) e `pop` (desempilhamento com subida suave), exibindo coordenadas `(r, c)`, cor, profundidade e direção de expansão.
     - **Coluna 3 (Painel de Métricas e Variáveis):** Exibição em tempo real do passo atual ($k / \text{total}$), tipo de evento (`push`, `pop`, `paint`, `skip`), pixels preenchidos, tamanho da pilha e coordenadas ativas.
   - Barra inferior com controles de reprodução completos: `Reset (⏮)`, `Step Back (⏪)`, `Play/Pause (▶/⏸)`, `Step Next (⏩)`, `End (⏭)` e `Speed Slider (100ms a 2000ms)`.
   - Seletor de cenários pré-configurados (`Canônico`, `Labirinto`, `Ilhas Desconexas`, `Xadrez`) e seletor de algoritmo (`Recursivo (DFS Call Stack)` / `Iterativo (DFS Pilha Heap)`).
   - Traces pré-gerados em formato JSON em `visualizer/data/` através do script `scripts/generate_traces.py` (e opcionalmente empacotados em `traces_bundle.js` para contornar restrições de CORS locais em navegadores antigos).

---

## 3. Estrutura Obrigatória das Fases do Plano

O documento `flood_fill/plan.md` deve estruturar o projeto nas 5 fases abaixo, estabelecendo contratos explícitos, esquemas JSON, tabelas de cenários e *Definitions of Done* (DoD) com checkboxes `[ ]`:

### Fase 1 — Modelagem de Dados, Interfaces e Algoritmos Core
- **Diretório:** `flood_fill/src/`
- **Arquivos:**
  - `__init__.py`: Exportações limpas do pacote (`flood_fill_recursive`, `flood_fill_iterative`, `FloodFillResult`, `StepEvent`, `CallStackFrame`, `ExecutionTracer`).
  - `types.py`: Dataclasses imutáveis tipadas (`FloodFillResult`, `StepEvent`, `CallStackFrame`).
  - `recursive.py`: Implementação da DFS recursiva com suporte a injeção desacoplada de `ExecutionTracer` e parada precoce se $C_{orig} == C_{nova}$.
  - `iterative.py`: Implementação da DFS com pilha explícita `collections.deque` mantendo a ordem horária canônica e injeção de tracer.
  - `tracer.py`: Classe `ExecutionTracer` com métodos `record()`, `get_trace()`, `to_json()`, `save()` e `reset()`.

### Fase 2 — Bateria de Testes Automatizados e Garantia de Equivalência
- **Diretório:** `flood_fill/tests/`
- **Arquivos:**
  - `__init__.py`
  - `test_recursive.py`: Testes unitários com as 6 topologias, testes de casos de borda e validação de emissão de eventos push/pop.
  - `test_iterative.py`: Testes unitários independentes para a versão iterativa com as mesmas entradas e verificação de integridade da pilha.
  - `test_equivalence.py`: Prova empírica de invariante de equivalência estrita:
    $$\text{flood\_fill\_iterative}(I, sr, sc, C_{nova}).\text{image} == \text{flood\_fill\_recursive}(I, sr, sc, C_{nova}).\text{image}$$
    com mais de 200 matrizes geradas aleatoriamente com diferentes densidades e dimensões, além dos cenários manuais fixos.
- **Meta de Cobertura:** Cobertura de código $\ge 90\%$ aferida via `pytest --cov=flood_fill.src`.

### Fase 3 — Framework de Benchmarking e Métricas Empíricas
- **Diretório:** `flood_fill/benchmarks/`
- **Arquivos:**
  - `runner.py`: Script de execução automatizada em 30 rodadas por cenário. Mede tempo com `time.perf_counter()`, pico de memória com `tracemalloc` e profundidade máxima da pilha. Captura controlada de `RecursionError`.
  - `plot.py`: Script que consome os dados e gera gráficos de alta resolução em `results/`:
    - `grafico_tempo.png`: Tempo médio (escala logarítmica) vs. Dimensão da matriz ($N \times N$).
    - `grafico_memoria.png`: Pico de consumo de memória Heap (KB) vs. Dimensão da matriz.
    - `grafico_profundidade.png`: Profundidade de pilha (frames na Call Stack vs. elementos na Pilha Heap).
  - `results/`: Geração automática de `benchmark_data.json`, relatório `report.md` formatado e tabela em LaTeX `table.tex`.

### Fase 4 — Visualizador Web Interativo Standalone
- **Diretório:** `flood_fill/visualizer/`
- **Arquivos:**
  - `index.html`: Marcação semântica com layout de 3 colunas via Tailwind CSS CDN.
  - `app.js`: Motor reativo de renderização da grade 2D, sincronização do Stack Inspector e gerenciador dos controles de reprodução.
  - `style.css`: Estilização das células, transições de animação suave da onda de cor e layout da pilha.
  - `data/`: Traces JSON pré-processados para os 4 cenários canônicos (Canônico, Labirinto, Ilhas, Xadrez) tanto para a versão recursiva quanto iterativa.

### Fase 5 — Documentação, Integração e Roteiro de Apresentação
- **Arquivos:**
  - `flood_fill/requirements.txt`: Dependências fixadas (`pytest`, `pytest-cov`, `matplotlib`).
  - `flood_fill/scripts/generate_traces.py`: Script utilitário para gerar os arquivos JSON e bundle JS da pasta `visualizer/data/`.
  - `flood_fill/README.md`: Atualização das seções de execução com instruções completas para ambientes Linux e Windows (`pytest`, benchmarks, geração de traces e abertura da UI).
  - `flood_fill/APRESENTACAO.md`: Roteiro estruturado para defesa oral do trabalho (tempos em minutos, argumentos-chave sobre recursão vs. iteração, demonstração da UI e exibição dos gráficos).

---

## 4. Requisitos de Estilo e Engenharia

1. **Python:** Versão 3.10+, utilizando `from __future__ import annotations`, type hints explícitos, docstrings completas (Google Style) e estrita conformidade com PEP 8.
2. **Desacoplamento do Tracer:** Os algoritmos centrais em `recursive.py` e `iterative.py` não devem depender rigidamente de `tracer.py`. O tracer deve ser opcional e recebido via injeção de dependência (`tracer: ExecutionTracer | None = None`). Quando `tracer is None`, os algoritmos devem executar em velocidade nativa sem overhead de alocação de eventos.
3. **Diagrama de Dependências:** O plano deve incluir um diagrama Mermaid com o fluxo de interdependência entre as fases, explicitando os gates de qualidade (ex.: Fase 2 concluída antes dos benchmarks da Fase 3).
4. **Sem Código Verbatim Extenso no Plano:** O plano deve focar em contratos de interface, assinaturas de funções, tipos de dados, schemas JSON, tabelas de cenários e critérios de aceitação.

---

## 5. Instrução de Saída Esperada

Ao processar este prompt, o agente planejador deve gerar o arquivo **`flood_fill/plan.md`** completo, consistente, no mesmo nível de profundidade analítica, riqueza de detalhes e organização visual do plano de referência em `kadane/plan.md`.
