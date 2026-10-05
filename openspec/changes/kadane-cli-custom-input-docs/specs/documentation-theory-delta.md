# Delta Spec: Documentation and Theoretical Formalization

> **Change ID:** `kadane-cli-custom-input-docs`
> **File:** `kadane/README.md`, `kadane/RESUMO_EXECUTIVO.md`, `kadane/APRESENTACAO.md`
> **Change Type:** Modify

## Changes Description
- `README.md`:
  - Formal loop invariant statement: Initialization, Maintenance, and Termination proof for Kadane's algorithm.
  - Asymptotic recursion depth analysis: Proof that CLRS Divide and Conquer reaches $\lceil \log_2 n \rceil + 1$ depth ($\le 19$ frames for $N=100.000$), contrasting with naive linear recursion $\mathcal{O}(n)$.
  - CLI usage section with syntax examples.
- `RESUMO_EXECUTIVO.md`:
  - Quickstart section for the CLI.
  - Updates to validation checklists.
- `APRESENTACAO.md`:
  - Live demo script for running the CLI and custom web inputs.
