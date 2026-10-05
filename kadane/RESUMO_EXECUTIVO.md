# Super Resumo Executivo: Módulo Kadane (Soma Máxima de Subarranjo)

> **Projeto Prático:** Análise Comparativa entre Paradigmas (Iterativo vs. Recursivo)  
> **Tema Designado:** Vantagem Iterativa — Algoritmo de Kadane  
> **Aluno Responsável:** Allysson Bruno Chaves Assunção  
> **Status:** 🟢 **100% Implementado, Testado e Documentado**  
> **Data:** 02 de Outubro de 2026  

---

## 1. Síntese da Execução do Projeto

O desenvolvimento seguiu rigorosamente o plano estabelecido em [`kadane/plan.md`](plan.md), sem atalhos e com separação estrita de responsabilidades:

| Fase | Escopo | Entregas Técnicas | Resultado Obtido |
| :---: | :--- | :--- | :---: |
| **Fase 1** | **Core Algorítmico & Contratos** | `src/types.py`, `src/iterative.py`, `src/recursive.py`, `src/tracer.py` | Implementação pura de Kadane $O(n)$ / $O(1)$ e Divisão e Conquista $O(n \log n)$ / $O(\log n)$ com coletor desacoplado de eventos. |
| **Fase 2** | **Testes Automatizados & Equivalência** | `tests/test_iterative.py`, `tests/test_recursive.py`, `tests/test_equivalence.py`, `tests/test_cli.py` | **100% de cobertura de código**; 49 testes aprovados; equivalência formal comprovada em 200+ vetores aleatórios. |
| **Fase 3** | **Framework de Benchmarking** | `benchmarks/runner.py`, `benchmarks/plot.py`, `benchmarks/results/` | 30 rodadas de medições com `perf_counter` e `tracemalloc` em $N \in [10..100.000]$. Geração de `report.md`, `table.tex` e gráficos PNG em alta resolução. |
| **Fase 4** | **Visualizador Web Interativo** | `visualizer/index.html`, `visualizer/app.js`, `visualizer/style.css`, `data/` | Aplicação web standalone funcional offline (`file://`), com controles de reprodução, input de vetores customizados e **Call Stack Inspector animado** com push/pop em tempo real. |
| **Fase 5** | **Interface CLI & Documentação Formal** | `src/cli.py`, `__main__.py`, `README.md`, `APRESENTACAO.md`, `scripts/generate_traces.py` | CLI completa com REPL e flags (`--array`, `--verbose`), prova formal de invariante de laço e análise de profundidade balanceada de pilha ($O(\log n)$ vs linear $O(n)$). |

---

## 2. Conclusões Científicas e Resultados Empíricos

Os experimentos demonstraram com clareza a **superioridade da abordagem iterativa** para este problema:

```
+---------------------------------------------------------------------------------------+
|                              Resumo das Métricas Coletadas                            |
+-----------+----------------------+----------------------+------------+----------------+
|     N     | Tempo Iterativo (s)  | Tempo Recursivo (s)  |  Speedup   | Memória (Iter) |
+-----------+----------------------+----------------------+------------+----------------+
|        10 |      0.000005 s      |      0.000022 s      |   4.10x    |   456 bytes    |
|       100 |      0.000033 s      |      0.000234 s      |   7.17x    |   397 bytes    |
|     1.000 |      0.000282 s      |      0.002652 s      |   9.41x    |   402 bytes    |
|    10.000 |      0.002644 s      |      0.028370 s      |  10.73x    |   411 bytes    |
|   100.000 |      0.026452 s      |      0.296927 s      |  11.22x    |   418 bytes    |
+-----------+----------------------+----------------------+------------+----------------+
```

### Principais Constatações
1. **Fator de Aceleração (Speedup):** O Kadane Iterativo foi **mais de 11 vezes mais rápido** para $N = 100.000$, devido à sua complexidade linear $O(n)$ sem sobrecarga de divisão e recombinação $O(n \log n)$.
2. **Consumo de Memória:** O algoritmo iterativo manteve alocação constante em torno de $\approx 410$ bytes ($O(1)$), enquanto a recursão quadruplicou a alocação de memória e exigiu até 19 frames de profundidade na pilha de execução ($O(\log n)$).
3. **Fundamentação Estrutural:** O problema possui natureza linear markoviana (cada elemento só depende do anterior). A pilha de chamadas da recursão introduz overhead puramente artificial, tornando a iteração a escolha natural e definitiva.

---

## 3. Roteiro Prático de Validações Manuais

Para auditar e demonstrar todo o sistema funcionando na sua máquina, siga este roteiro de verificação:

### Validação 1: Testes Unitários e Cobertura (Terminal)
Execute o comando abaixo na raiz do projeto para comprovar a robustez algorítmica:
```powershell
python -m pytest kadane/tests/ -v --cov=kadane.src --cov-report=term-missing
```
- **O que observar:** Todos os 49 testes devem passar com `PASSED` e a tabela de cobertura deve indicar **100%** para todos os módulos (`iterative.py`, `recursive.py`, `tracer.py`, `types.py`, `cli.py`).

---

### Validação 2: Benchmarks e Gráficos (Terminal)
Reexecute a coleta de dados de desempenho e gere novamente os gráficos:
```powershell
python kadane/benchmarks/runner.py
python kadane/benchmarks/plot.py
```
- **O que observar:**
  - O terminal imprimirá os tempos médios e speedup para cada ordem de grandeza de $N$.
  - Serão atualizados os arquivos em [`kadane/benchmarks/results/`](benchmarks/results/):
    - `report.md` (tabelas formatadas)
    - `table.tex` (tabela LaTeX para relatório)
    - `grafico_tempo.png` e `grafico_memoria.png`.

---

### Validação 3: Visualizador Web Interativo e Vetores Customizados (Navegador)
Abra a aplicação web com dois cliques ou via terminal:
```powershell
start kadane/visualizer/index.html
```
- **O que testar:**
  1. **Modo Iterativo:** Com o cenário *Canônico*, clique em **Play** (ou avance no **Next Step**). Veja o subarranjo ativo expandir em azul e reiniciar quando o acumulado fica negativo.
  2. **Modo Recursivo:** Alterne para **Recursivo (D&C)**. Clique em **Play**. Observe os blocos da *Call Stack* empilhando verticalmente (**PUSH**) e desempilhando com os resultados parciais (**POP**).
  3. **Vetor Customizado:** Digite qualquer vetor na barra superior (ex: `1, -2, 3, 4, -1, 2`) e clique em **Visualizar**. O motor client-side gerará o rastro na hora sem requisição externa.
  4. **Cenários de Borda:** Selecione no dropdown os cenários *Apenas Negativos* e *Com Zeros* para verificar o comportamento dinâmico.

---

### Validação 4: Interface de Linha de Comando — CLI (Terminal)
Execute a CLI para testes rápidos com arrays arbitrários via console:
```powershell
# Execução direta com vetor específico
python -m kadane --array "[-2, 1, -3, 4, -1, 2, 1, -5, 4]"

# Exibição detalhada com rastreamento passo a passo
python -m kadane --array "5, -2, 7, -1, 3" --verbose

# Console interativo contínuo (REPL para apresentação ao vivo)
python -m kadane --interactive
```
- **O que observar:** A CLI exibirá a tabela comparativa com as fatias destacadas em cores, validação de equivalência estrita e speedup medido em microssegundos.

---

## 4. Próximos Passos (Relacionados ao Kadane)

1. **Sincronização com o GitHub Remoto:**
   - Enviar todos os commits locais para o repositório no GitHub:
     ```powershell
     git push origin main
     ```
2. **Integração com o Parceiro de Dupla (Moisés):**
   - Notificar Moisés de que o módulo de Kadane está finalizado, com testes, benchmarks e visualizador concluídos.
   - Auxiliar na harmonização dos padrões de entrega para o módulo de *Flood Fill* (pasta `flood_fill/`).
3. **Preparação para a Apresentação Oral / Defesa:**
   - Utilizar o arquivo [`kadane/APRESENTACAO.md`](APRESENTACAO.md) como roteiro da sua fala (tempo sugerido de 10 a 12 minutos).
   - Copiar a tabela [`kadane/benchmarks/results/table.tex`](benchmarks/results/table.tex) e os gráficos PNG para os slides ou relatório final da disciplina.
