# Proposal: Kadane CLI, Custom Input Web UI, and Theoretical Formalization

> **Change ID:** `kadane-cli-custom-input-docs`
> **Status:** draft
> **Author:** Allysson Bruno Chaves Assunção / Antigravity
> **Created:** 2026-10-05
> **Last Updated:** 2026-10-05

---

## Summary

This change implements three high-impact enhancements to the Kadane module:
1. A rich Command Line Interface (`cli.py` and `__main__.py`) allowing direct execution, comparison, and step-by-step terminal output.
2. Dynamic client-side custom array input in the Web Visualizer (`index.html` and `app.js`), enabling users to visualize arbitrary arrays with real-time call stack animations directly in the browser without backend dependencies.
3. Formal mathematical loop invariant documentation and asymptotic analysis of the balanced recursion depth ($\mathcal{O}(\log n)$) versus naive linear recursion ($\mathcal{O}(n)$) in `README.md`, `RESUMO_EXECUTIVO.md`, and `APRESENTACAO.md`.

## Motivation

During technical validation of the Kadane module, three minor gaps were identified:
- The module required editing Python scripts or running benchmark scripts to test arrays, lacking an immediate, user-friendly terminal entrypoint.
- The web visualizer only supported 4 pre-compiled scenarios; custom arrays required running an offline trace generator.
- While the recursive implementation has $\mathcal{O}(\log n)$ stack depth (never hitting Python's 1000-frame recursion limit for $N=100.000$), earlier project notes conflated this with linear recursion stack overflow risks. Explicit formalization is needed for academic rigor.

## Scope

### In Scope
- Create `kadane/src/cli.py` and `kadane/__main__.py` with `--array`, `--compare`, `--verbose`, and interactive REPL mode.
- Create automated unit tests for the CLI in `kadane/tests/test_cli.py`.
- Enhance `kadane/visualizer/index.html` and `kadane/visualizer/app.js` with client-side array parsing and trace generation.
- Update `kadane/README.md` with the formal loop invariant and recursion depth analysis.
- Update `kadane/RESUMO_EXECUTIVO.md` and `kadane/APRESENTACAO.md` with CLI instructions and presentation talking points.

### Out of Scope
- Altering the core mathematical logic of `kadane_iterative` or `kadane_recursive` in `src/`.
- Changing the benchmark dataset or benchmark runner methodology.

## Proposed Solution

### Approach
1. **CLI Layer:** Use standard library `argparse` to handle `--array`, `--compare`, `--verbose`, and interactive fallback. Implement a parser for comma/space-separated arrays. Output clean ANSI-colored tables comparing Iterative vs Recursive results, slice values, and execution time.
2. **Client-side Web Engine:** Implement pure JavaScript versions of Kadane DP and CLRS Divide-and-Conquer trace generators in `app.js`. When a user types or pastes an array and clicks "Visualizar", trace events (`STEP`, `PUSH`, `POP`, `RESULT`) are generated in-memory and loaded into the existing playback and Call Stack visualization engine.
3. **Formal Documentation:** Formalize the DP loop invariant using Initialization, Maintenance, and Termination steps. Document that CLRS Divide-and-Conquer achieves $\lceil \log_2 n \rceil + 1$ depth, explaining why it is inherently stack-safe compared to naive linear recursion.

### Impacted Files
| File | Change Type | Notes |
|------|-------------|-------|
| `kadane/src/cli.py` | Create | Command line interface and interactive REPL |
| `kadane/__main__.py` | Create | Package entrypoint for `python -m kadane` |
| `kadane/tests/test_cli.py` | Create | Unit test suite for CLI arguments and edge cases |
| `kadane/visualizer/index.html` | Modify | Add custom array input box and trigger button |
| `kadane/visualizer/app.js` | Modify | Client-side trace generation and dynamic playback |
| `kadane/README.md` | Modify | Formal loop invariant, recursion analysis, CLI guide |
| `kadane/RESUMO_EXECUTIVO.md` | Modify | Update validation guide with CLI instructions |
| `kadane/APRESENTACAO.md` | Modify | Add CLI and custom input live demo cues |

### Data Model Changes
No database or storage schema changes. The trace event structure (`StepEvent`, `CallStackFrame`) is mirrored in JavaScript for client-side evaluation.

## Acceptance Criteria

- [ ] **Given** a user in the terminal **When** executing `python -m kadane --array "[-2, 1, -3, 4]"` **Then** both iterative and recursive results are computed and displayed with matching max sum `4` and indices `[3..3]`.
- [ ] **Given** invalid CLI input (e.g. empty array or non-numeric string) **When** executing the CLI **Then** a clear error message is returned with non-zero exit code without unhandled stacktraces.
- [ ] **Given** the web visualizer **When** a user enters `1, -2, 3, 4, -1, 2` and clicks "Visualizar" **Then** the array visualization updates dynamically and plays back both iterative decisions and recursive call stack frames.
- [ ] **Given** `pytest kadane/tests/` **When** executed **Then** all tests, including the new `test_cli.py`, pass with 100% success.
- [ ] **Given** `kadane/README.md` **When** read by an evaluator **Then** the formal loop invariant and $\mathcal{O}(\log n)$ stack depth proof are mathematically clear and complete.

## Defensive Security & Validation Considerations

### Input Validation
- CLI `--array` validates and strips input using strict regular expressions or tokenization to prevent code injection via `eval()`. Safe integer parsing (`int(token)`) is enforced.
- Web UI sanitizes text input, rejects NaN/empty values, and enforces array length limits (e.g. max 50 items for visual clarity) to prevent browser DOM freezing.

### Secret Isolation
- N/A — No API keys, credentials, or network connections involved.

### Authorization & Authentication Impact
- N/A — Local CLI tool and static web page.

### Other Security Risks
- Memory exhaustion via large input strings is mitigated by bounding the maximum parsed elements in the web visualizer.

## Testing Strategy & Shift-Left Plan

### Happy Path Tests
| Test ID | Scenario | Test Type | Expected Result |
|---------|----------|-----------|-----------------|
| TP-01 | CLI `--array "[-2, 1, -3, 4]"` | Unit/Integration | Returns max sum 4, slice [3..3], exit code 0 |
| TP-02 | CLI `--compare` flag | Unit/Integration | Compares iterative vs recursive side-by-side |
| TP-03 | Web UI custom array trace | Unit/Manual | Generates valid step events matching Python tracer |

### Edge Case & Failure Mode Tests
| Test ID | Scenario | Test Type | Expected Result |
|---------|----------|-----------|-----------------|
| TE-01 | CLI empty array input | Unit | Displays error message, returns exit code 1 |
| TE-02 | CLI malformed string (e.g. `"[1, abc]"`) | Unit | Displays invalid integer error, returns exit code 1 |
| TE-03 | Web UI empty input | Manual/UI | Displays red feedback alert without breaking state |

### Test Commands
- **Run tests:** `pytest kadane/tests/ -v`
- **Coverage check:** `pytest --cov=kadane/src kadane/tests/`

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Discrepancy between JS and Python trace outputs | Low | Med | Mirror Python's `ExecutionTracer` step-for-step in `app.js` and verify against canonical test cases. |
| Incompatible CLI argument syntax | Low | Low | Support multiple input styles: JSON-like `[-2, 1]`, comma-separated `-2, 1`, space-separated `-2 1`. |

## Delta Spec Stubs

### `specs/cli-delta.md`
Specifies `cli.py`, `__main__.py`, and `test_cli.py`.

### `specs/visualizer-custom-input-delta.md`
Specifies UI inputs and client-side trace generation in `index.html` and `app.js`.

### `specs/documentation-theory-delta.md`
Specifies loop invariant and recursion depth formalizations in markdown docs.

## References
- Cormen, Leiserson, Rivest, Stein (CLRS), Introduction to Algorithms, Chapter 4.
- Bentley, J. (1984), Programming Pearls: Algorithm Design Techniques.
