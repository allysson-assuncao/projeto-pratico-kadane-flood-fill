"""Script auxiliar para geração automatizada dos traces JSON consumidos pelo visualizador web.

Executa os algoritmos com ExecutionTracer para múltiplos cenários canônicos e exporta
os rastros para kadane/visualizer/data/ tanto em arquivos .json individuais quanto em
um bundle JS para compatibilidade com execução direta via protocolo file://.
"""

from __future__ import annotations

import json
from pathlib import Path
import sys

# Garante que a raiz do projeto esteja no sys.path
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from kadane.src.iterative import kadane_iterative
from kadane.src.recursive import kadane_recursive
from kadane.src.tracer import ExecutionTracer

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "visualizer" / "data"

SCENARIOS: dict[str, list[int]] = {
    "canonical": [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    "allneg": [-4, -1, -7, -2],
    "unitary": [42],
    "zeros": [0, -1, 2, 0, 3, -2],
}


def generate_all_traces() -> None:
    """Gera e salva todos os traces para os algoritmos iterativo e recursivo."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    bundle: dict[str, dict] = {}

    print(f"Gerando traces em: {OUTPUT_DIR}")

    for name, arr in SCENARIOS.items():
        # 1. Rastro Iterativo
        tracer_iter = ExecutionTracer(algorithm="iterative")
        res_iter = kadane_iterative(arr, tracer=tracer_iter)
        iter_json_str = tracer_iter.to_json(input_array=arr, final_result=res_iter)
        iter_data = json.loads(iter_json_str)

        iter_file = OUTPUT_DIR / f"trace_iterative_{name}.json"
        iter_file.write_text(iter_json_str, encoding="utf-8")
        bundle[f"iterative_{name}"] = iter_data
        print(f"  [OK] {iter_file.name} ({len(iter_data['steps'])} passos)")

        # 2. Rastro Recursivo
        tracer_rec = ExecutionTracer(algorithm="recursive")
        res_rec = kadane_recursive(arr, tracer=tracer_rec)
        rec_json_str = tracer_rec.to_json(input_array=arr, final_result=res_rec)
        rec_data = json.loads(rec_json_str)

        rec_file = OUTPUT_DIR / f"trace_recursive_{name}.json"
        rec_file.write_text(rec_json_str, encoding="utf-8")
        bundle[f"recursive_{name}"] = rec_data
        print(f"  [OK] {rec_file.name} ({len(rec_data['steps'])} passos)")

    # 3. Gerar traces_bundle.js para evitar bloqueio de CORS em file://
    bundle_file = OUTPUT_DIR / "traces_bundle.js"
    bundle_js_content = (
        "// Bundle gerado automaticamente contendo todos os cenários de trace pré-carregados\n"
        f"window.KADANE_TRACES = {json.dumps(bundle, indent=2, ensure_ascii=False)};\n"
    )
    bundle_file.write_text(bundle_js_content, encoding="utf-8")
    print(f"  [OK] {bundle_file.name} (Bundle standalone criado para navegação local)\n")


if __name__ == "__main__":
    generate_all_traces()
