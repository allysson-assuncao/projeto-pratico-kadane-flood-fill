# Delta Spec: CLI Implementation

> **Change ID:** `kadane-cli-custom-input-docs`
> **File:** `kadane/src/cli.py`, `kadane/__main__.py`, `kadane/tests/test_cli.py`
> **Change Type:** Create

## Changes Description
- Implement `parse_array_arg(raw: str) -> list[int]` supporting JSON-like brackets, comma-delimited, and space-delimited numbers.
- Implement `build_parser()` configuring `--array`, `--compare`, `--verbose`, and `--repl`.
- Implement `format_comparison(arr: list[int], verbose: bool) -> str` showing a formatted ANSI summary table of results.
- Implement `main(argv=None)` entry point returning exit codes (0 for success, 1 for input error).
- Create `kadane/__main__.py` delegating to `kadane.src.cli.main()`.
- Create comprehensive tests in `kadane/tests/test_cli.py`.
