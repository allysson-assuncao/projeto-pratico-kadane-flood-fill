# Tasks: Kadane CLI, Custom Input Web UI, and Theoretical Formalization

> **Change ID:** `kadane-cli-custom-input-docs`
> **Linked Proposal:** [proposal.md](./proposal.md)
> **Status:** in-progress
>
> All tasks must be `[x]` before this change can be archived via `sdd-spec-archive`.

---

## Implementation Tasks

- [x] Create `kadane/src/cli.py` with argument parsing (`--array`, `--compare`, `--verbose`, `--repl`) and ANSI formatting
- [x] Create `kadane/__main__.py` as package entry point for `python -m kadane`
- [x] Update `kadane/visualizer/index.html` to add custom array input controls and validation messages
- [x] Update `kadane/visualizer/app.js` with client-side trace generators (`generateClientIterativeTrace`, `generateClientRecursiveTrace`) and event handlers

## Test Tasks

- [x] Create `kadane/tests/test_cli.py` with unit tests for valid inputs, invalid strings, empty arrays, and verbose mode
- [x] Run full test suite with `pytest kadane/tests/ -v` to ensure 100% pass and no regressions

## Documentation Tasks

- [x] Update `kadane/README.md` with formal loop invariant, recursion stack depth analysis, and CLI documentation
- [x] Update `kadane/RESUMO_EXECUTIVO.md` with CLI quickstart and updated verification checklist
- [x] Update `kadane/APRESENTACAO.md` with CLI live demo instructions and talking points

## Review Gate

- [x] All implementation tasks complete
- [x] All tests passing
- [x] Proposal acceptance criteria verified
- [x] Ready for `sdd-spec-archive`
