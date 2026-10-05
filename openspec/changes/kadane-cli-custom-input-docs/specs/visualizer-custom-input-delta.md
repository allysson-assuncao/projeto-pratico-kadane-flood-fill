# Delta Spec: Web Visualizer Custom Input

> **Change ID:** `kadane-cli-custom-input-docs`
> **File:** `kadane/visualizer/index.html`, `kadane/visualizer/app.js`
> **Change Type:** Modify

## Changes Description
- `index.html`: Add an input box for custom array input with a "Visualizar" button and inline error message badge.
- `app.js`: Implement client-side `parseCustomArray(raw)` and client-side trace generators:
  - `generateClientIterativeTrace(arr)`
  - `generateClientRecursiveTrace(arr)`
- Connect the custom input to the playback engine without requiring server interaction or pre-generated JSON files.
