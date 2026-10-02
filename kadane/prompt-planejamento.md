# Prompt de Comando para Agente de Planejamento Robusto

> **Contexto:** Projeto Prático de Comparação de Paradigmas (Iterativo vs. Recursivo)  
> **Problema:** Algoritmo de Kadane (Soma Máxima de Subarranjo)  
> **Módulo:** `kadane/`  
> **Finalidade:** Servir de diretriz completa para geração do plano de implementação detalhado (`kadane/plan.md`) sem código verbatim, estruturado em fases atômicas com contratos precisos para execução por agentes leves.

---

Você é um Engenheiro de Software Sênior e Arquiteto de Sistemas encarregado de elaborar o **Plano de Implementação Completo e Detalhado** para o módulo do **Algoritmo de Kadane** (Problema da Soma Máxima de Subarranjo) dentro do projeto acadêmico de análise comparativa entre os paradigmas **Iterativo** e **Recursivo**.

### 1. CONTEXTO DO PROJETO E DIRETRIZES
- **Objetivo:** Implementar, testar, medir e comparar as soluções iterativa e recursiva do problema da soma máxima de subarranjo, comprovando de forma empírica e analítica a **superioridade da abordagem iterativa** neste problema específico.
- **Linguagem:** Python 3.10+ (código modular, tipado com type hints, documentado e limpo).
- **Abordagem Iterativa:** Algoritmo de Kadane tradicional ($O(n)$ tempo, $O(1)$ espaço auxiliar), rastreando a soma máxima e os índices $[start, end]$.
- **Abordagem Recursiva:** Divisão e Conquista ($O(n \log n)$ tempo, $O(\log n)$ espaço de pilha de chamadas), calculando recursivamente o melhor subarranjo à esquerda, à direita e que cruza o ponto médio.
- **Instrumentação:** Mecanismo desacoplado capaz de emitir eventos de *tracing* (passos de execução, estado das variáveis locais e estado da pilha de chamadas) para alimentar um visualizador.
- **Visualizador UI Interativo:** Página web local standalone (`index.html` com HTML5, Tailwind CSS via CDN e Vanilla JS puro), sem necessidade de servidores complexos, consumindo o trace JSON gerado pelo Python. Deve possuir:
  - Controles de reprodução: Play/Pause, Avançar Passo, Retroceder Passo, Reset e Slider de Velocidade.
  - Visualização gráfica das células do array com realce dinâmico do subarranjo ótimo e ponteiros.
  - **Pilha de Execução Visual (Call Stack Inspector):** Renderização vertical animada de empilhamento (push) e desempilhamento (pop) de frames de chamada na Divisão e Conquista, contrastando com o frame único constante do Kadane.
  - Painel de métricas e variáveis locais em tempo real.
- **Regra de Ouro do Plano:** O plano **NÃO** deve conter código fonte verbatim (corpo inteiro de arquivos), mas sim:
  - Objetivos claros e isolados de cada etapa.
  - Assinaturas de funções, tipos de dados de entrada/saída e contratos de interface.
  - Schema de dados do rastro JSON de visualização.
  - Cenários de teste e critérios de aceitação rigorosos (Definition of Done) para cada etapa, permitindo que agentes leves executem as tarefas de maneira atômica e sem ambiguidades.

---

### 2. ESTRUTURA DE DIRETÓRIOS A SER PLANEJADA
Estruture o plano com base na seguinte arquitetura modular:
```text
kadane/
│
├── README.md                  # Apresentação do problema e fundamentação teórica (já existente)
├── plan.md                    # Este plano de implementação completo
│
├── src/                       # Módulos Python dos algoritmos e instrumentação
│   ├── __init__.py
│   ├── types.py               # Dataclasses de retorno, estado de passo e esquemas de métricas
│   ├── iterative.py           # Kadane iterativo com retorno de índices e suporte a tracer
│   ├── recursive.py           # Divisão e Conquista com suporte a tracer de pilha
│   └── tracer.py              # Coletor de eventos para exportação em JSON
│
├── tests/                     # Bateria de testes automatizados com pytest
│   ├── __init__.py
│   ├── test_iterative.py      # Testes unitários do algoritmo iterativo
│   ├── test_recursive.py      # Testes unitários da divisão e conquista
│   └── test_equivalence.py    # Teste de equivalência estrita (ambos geram o mesmo resultado)
│
├── benchmarks/                # Scripts de medição e comparação de desempenho
│   ├── runner.py              # Bateria de testes de carga (N de 10 a 10^5) com tracemalloc e perf_counter
│   ├── plot.py                # Gerador de gráficos comparativos estáticos (matplotlib)
│   └── results/               # Saída de relatórios Markdown, tabelas LaTeX e gráficos PNG
│
└── visualizer/                # Interface visual interativa desacoplada
    ├── index.html             # UI standalone com Tailwind, controles de animação e call stack visual
    ├── app.js                 # Lógica de renderização de estados, pilha e animação
    ├── style.css              # Estilos personalizados da pilha e células do vetor
    └── data/                  # Diretório para os traces JSON de demonstração
```

---

### 3. FASES DE IMPLEMENTAÇÃO OBRIGATÓRIAS NO PLANO

O seu plano deve ser estruturado em **5 Fases Atômicas e Sequenciais**:

#### Fase 1: Modelagem de Dados, Interfaces e Algoritmos Core
- Definir as estruturas de dados fundamentais em `types.py` (`SubarrayResult`, `StepEvent`, `CallStackFrame`).
- Especificar a implementação do `IterativeKadane`:
  - Entrada: lista de inteiros; Saída: `SubarrayResult(max_sum, start_idx, end_idx)`.
  - Tratamento de casos de borda: listas vazias, unitárias e exclusivamente negativas.
- Especificar a implementação do `RecursiveDivideAndConquer`:
  - Subfunção auxiliar de cruzamento `_max_crossing_subarray(arr, low, mid, high)`.
  - Subfunção recursiva principal `_max_subarray_rec(arr, low, high)`.
  - Saída: `SubarrayResult` idêntico à versão iterativa.
- Especificar o `ExecutionTracer`:
  - Acoplamento não-invasivo ou via decorador/callback para registrar cada passo e push/pop de frame sem degradar o algoritmo base.

#### Fase 2: Bateria de Testes Automatizados e Garantia de Equivalência
- Definir os conjuntos de cenários de teste obrigatórios:
  - Casos didáticos e canônicos (ex: exemplo de Kadane com positivos e negativos intercalados).
  - Casos de borda: array unitário, array com todos os elementos negativos, array com zeros, array com elementos idênticos.
  - Casos de estresse aleatórios gerados programaticamente com sementes reproduzíveis (`seed`).
- Teste de equivalência estrita: invariante de que para qualquer array $A$, `IterativeKadane(A).max_sum == RecursiveKadane(A).max_sum`.
- Critérios de validação e comandos de execução com `pytest`.

#### Fase 3: Framework de Benchmarking e Métricas Empíricas
- Especificar o coletor de métricas em `benchmarks/runner.py`:
  - Medição de tempo: `time.perf_counter()` com múltiplas rodadas e média/desvio padrão.
  - Medição de memória: `tracemalloc` para rastrear o pico de alocação de memória (*peak memory usage*).
  - Medição de profundidade de pilha: contagem do nível máximo de recursão atingido.
- Faixas de entrada $N$: $10^1, 10^2, 10^3, 10^4, 10^5$.
- Geração automática de tabelas comparativas prontas para o relatório final em Markdown e LaTeX.
- Especificar `benchmarks/plot.py` para gerar gráficos PNG salvos em `benchmarks/results/`:
  - Gráfico 1: $N \times$ Tempo de Execução (escala linear e log-log).
  - Gráfico 2: $N \times$ Pico de Memória / Pilha de Chamadas.

#### Fase 4: Visualizador Web Interativo Standalone (UI)
- Especificar o contrato de dados do rastro JSON (`trace.json`) gerado pelo Python e consumido pela UI.
- Arquitetura da UI (`index.html` + `app.js`):
  - Componente de vetor: blocos coloridos com índices e indicadores de início, fim e elemento sob inspeção.
  - **Componente Visual da Call Stack:** representação vertical em forma de pilha de cartas/blocos; a cada chamada recursiva um novo bloco é empilhado com os parâmetros `[low, high]`, e desempilhado no retorno com a solução parcial.
  - Painel de controles de execução (Play, Pause, Step Next, Step Back, Speed Slider, Reset).
  - Seletor de cenários pré-definidos (Canônico, Apenas Negativos, Alternado, Customizado).
  - Indicadores em tempo real das variáveis `max_atual`, `max_global`, `soma_cruzada`.

#### Fase 5: Documentação Técnica, Instruções e Integração
- Elaboração do guia de execução (`HOWTO` / `README` atualizado) cobrindo:
  - Instalação de dependências (`requirements.txt`).
  - Execução dos testes unitários.
  - Execução da bateria de benchmarks e geração dos gráficos.
  - Instruções de inicialização do visualizador web no navegador.
- Roteiro explicativo da justificativa comparativa (para apresentação oral e entrega do trabalho).

---

### 4. SAÍDA ESPERADA
Gere um documento de plano completo, salvo no arquivo `kadane/plan.md`. O plano deve ser claro, pragmático, com seções numeradas, checklists de tarefas `[ ]`, contratos de dados e critérios de aceitação para que agentes de execução subsequentes possam implementar cada fase sem interrupções.
