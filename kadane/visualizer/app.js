/**
 * Lógica do Visualizador Interativo — Algoritmo de Kadane
 * Gerencia a reprodução passo a passo, renderização dinâmica do vetor e da Call Stack.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado da Aplicação
  let currentAlgorithm = "iterative"; // "iterative" | "recursive"
  let currentScenario = "canonical";   // "canonical" | "allneg" | "zeros" | "unitary"
  let traceData = null;
  let currentStepIndex = 0;
  let isPlaying = false;
  let timerId = null;
  let speedMs = 600;

  // Elementos do DOM
  const scenarioSelect = document.getElementById("scenarioSelect");
  const btnIterative = document.getElementById("btnIterative");
  const btnRecursive = document.getElementById("btnRecursive");

  const arrayContainer = document.getElementById("arrayContainer");
  const arrayLengthBadge = document.getElementById("arrayLengthBadge");
  const stackContainer = document.getElementById("stackContainer");
  const stackDepthBadge = document.getElementById("stackDepthBadge");
  const iterativeStackNotice = document.getElementById("iterativeStackNotice");

  const stepBadge = document.getElementById("stepBadge");
  const metricEventType = document.getElementById("metricEventType");
  const metricMaxCurrent = document.getElementById("metricMaxCurrent");
  const metricMaxGlobal = document.getElementById("metricMaxGlobal");
  const metricActiveRange = document.getElementById("metricActiveRange");
  const stepAnnotation = document.getElementById("stepAnnotation");
  const complexityTime = document.getElementById("complexityTime");
  const complexitySpace = document.getElementById("complexitySpace");

  const btnReset = document.getElementById("btnReset");
  const btnPrev = document.getElementById("btnPrev");
  const btnPlayPause = document.getElementById("btnPlayPause");
  const btnNext = document.getElementById("btnNext");
  const btnEnd = document.getElementById("btnEnd");
  const playIcon = document.getElementById("playIcon");
  const playText = document.getElementById("playText");
  const speedSlider = document.getElementById("speedSlider");
  const speedValue = document.getElementById("speedValue");

  // Elementos do DOM para input customizado
  const customArrayInput = document.getElementById("customArrayInput");
  const btnApplyCustom = document.getElementById("btnApplyCustom");
  const customErrorMsg = document.getElementById("customErrorMsg");

  // =========================================================================
  // GERAÇÃO CLIENT-SIDE DE TRACES (PARA VETORES CUSTOMIZADOS)
  // =========================================================================
  function showCustomError(msg) {
    if (customErrorMsg) {
      customErrorMsg.textContent = msg;
      customErrorMsg.classList.remove("hidden");
    }
  }

  function clearCustomError() {
    if (customErrorMsg) {
      customErrorMsg.textContent = "";
      customErrorMsg.classList.add("hidden");
    }
  }

  function parseCustomArray(raw) {
    if (!raw || !raw.trim()) {
      throw new Error("Por favor, digite um vetor não vazio.");
    }
    let cleaned = raw.trim().replace(/^[\[\(]\s*/, "").replace(/\s*[\]\)]$/, "");
    if (!cleaned) {
      throw new Error("O vetor não pode ser vazio.");
    }
    const tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0);
    if (tokens.length === 0) {
      throw new Error("O vetor não pode ser vazio.");
    }
    if (tokens.length > 40) {
      throw new Error("Para melhor visualização na tela, limite o vetor a no máximo 40 números.");
    }
    const nums = [];
    for (const t of tokens) {
      const n = Number(t);
      if (!Number.isInteger(n)) {
        throw new Error(`Elemento inválido '${t}'. Digite apenas números inteiros.`);
      }
      nums.push(n);
    }
    return nums;
  }

  function generateClientIterativeTrace(arr) {
    const n = arr.length;
    let maxCurrent = arr[0];
    let maxGlobal = arr[0];
    let activeStart = 0;
    let bestStart = 0;
    let bestEnd = 0;

    const steps = [];
    let stepNum = 0;

    // Inicialização no índice 0
    steps.push({
      step: stepNum++,
      algorithm: "iterative",
      current_idx: 0,
      max_current: maxCurrent,
      max_global: maxGlobal,
      active_start: 0,
      active_end: 0,
      call_stack: [],
      event_type: "step",
      annotation: `Inicialização no elemento A[0] = ${arr[0]}`
    });

    for (let k = 1; k < n; k++) {
      const val = arr[k];
      let desc = "";
      if (maxCurrent < 0) {
        maxCurrent = val;
        activeStart = k;
        desc = `Reiniciou subarranjo em A[${k}] = ${val} (acumulado anterior era negativo)`;
      } else {
        maxCurrent += val;
        desc = `Estendeu subarranjo somando A[${k}] = ${val} (novo acumulado = ${maxCurrent})`;
      }

      if (maxCurrent > maxGlobal) {
        maxGlobal = maxCurrent;
        bestStart = activeStart;
        bestEnd = k;
        desc += ` -> Novo recorde global: ${maxGlobal} no intervalo [${bestStart}..${bestEnd}]`;
      }

      steps.push({
        step: stepNum++,
        algorithm: "iterative",
        current_idx: k,
        max_current: maxCurrent,
        max_global: maxGlobal,
        active_start: activeStart,
        active_end: k,
        call_stack: [],
        event_type: "step",
        annotation: desc
      });
    }

    // Resultado final
    steps.push({
      step: stepNum++,
      algorithm: "iterative",
      current_idx: null,
      max_current: maxCurrent,
      max_global: maxGlobal,
      active_start: bestStart,
      active_end: bestEnd,
      call_stack: [],
      event_type: "result",
      annotation: `Execução finalizada com sucesso. Soma máxima = ${maxGlobal} no intervalo [${bestStart}..${bestEnd}].`
    });

    return {
      algorithm: "iterative",
      input_array: arr,
      final_result: {
        max_sum: maxGlobal,
        start_idx: bestStart,
        end_idx: bestEnd
      },
      steps: steps
    };
  }

  function generateClientRecursiveTrace(arr) {
    const steps = [];
    let stepNum = 0;
    let frameIdCounter = 0;
    const callStack = [];
    let maxGlobal = -Infinity;
    let bestStart = 0;
    let bestEnd = 0;

    function pushFrame(fnName, low, high, mid, depth) {
      const frame = {
        frame_id: frameIdCounter++,
        fn_name: fnName,
        low: low,
        high: high,
        mid: mid,
        partial_result: null,
        depth: depth
      };
      callStack.push(frame);
      return frame;
    }

    function popFrame(partialResult) {
      if (callStack.length === 0) return null;
      const f = callStack.pop();
      f.partial_result = partialResult ? {
        max_sum: partialResult.max_sum,
        start_idx: partialResult.start_idx,
        end_idx: partialResult.end_idx
      } : null;
      return f;
    }

    function getStackSnapshot() {
      return callStack.map(f => ({ ...f }));
    }

    function maxCrossingSubarray(low, mid, high) {
      let leftSum = -Infinity;
      let curr = 0;
      let maxLeft = mid;
      for (let i = mid; i >= low; i--) {
        curr += arr[i];
        if (curr > leftSum) {
          leftSum = curr;
          maxLeft = i;
        }
      }

      let rightSum = -Infinity;
      curr = 0;
      let maxRight = mid + 1;
      for (let j = mid + 1; j <= high; j++) {
        curr += arr[j];
        if (curr > rightSum) {
          rightSum = curr;
          maxRight = j;
        }
      }

      return {
        max_sum: leftSum + rightSum,
        start_idx: maxLeft,
        end_idx: maxRight
      };
    }

    function solve(low, high, depth) {
      const mid = low === high ? null : Math.floor((low + high) / 2);
      pushFrame("_solve", low, high, mid, depth);

      steps.push({
        step: stepNum++,
        algorithm: "recursive",
        current_idx: mid !== null ? mid : low,
        max_current: null,
        max_global: maxGlobal === -Infinity ? arr[low] : maxGlobal,
        active_start: low,
        active_end: high,
        call_stack: getStackSnapshot(),
        event_type: "push",
        annotation: `PUSH: Iniciando recursão no intervalo [${low}..${high}], profundidade=${depth}`
      });

      let res;
      if (low === high) {
        res = { max_sum: arr[low], start_idx: low, end_idx: low };
        if (res.max_sum > maxGlobal) {
          maxGlobal = res.max_sum;
          bestStart = low;
          bestEnd = low;
        }
        popFrame(res);
        steps.push({
          step: stepNum++,
          algorithm: "recursive",
          current_idx: low,
          max_current: res.max_sum,
          max_global: maxGlobal,
          active_start: low,
          active_end: low,
          call_stack: getStackSnapshot(),
          event_type: "pop",
          annotation: `POP: Caso base unitário em A[${low}] = ${arr[low]}`
        });
        return res;
      }

      const leftRes = solve(low, mid, depth + 1);
      const rightRes = solve(mid + 1, high, depth + 1);
      const crossRes = maxCrossingSubarray(low, mid, high);

      // Escolhe o melhor entre esquerda, direita e cruzamento
      res = leftRes;
      if (rightRes.max_sum > res.max_sum) res = rightRes;
      if (crossRes.max_sum > res.max_sum) res = crossRes;

      if (res.max_sum > maxGlobal) {
        maxGlobal = res.max_sum;
        bestStart = res.start_idx;
        bestEnd = res.end_idx;
      }

      popFrame(res);
      steps.push({
        step: stepNum++,
        algorithm: "recursive",
        current_idx: mid,
        max_current: res.max_sum,
        max_global: maxGlobal,
        active_start: res.start_idx,
        active_end: res.end_idx,
        call_stack: getStackSnapshot(),
        event_type: "pop",
        annotation: `POP: Retorno da chamada [${low}..${high}]. Melhor: soma=${res.max_sum} em [${res.start_idx}..${res.end_idx}]`
      });

      return res;
    }

    const finalRes = solve(0, arr.length - 1, 0);

    steps.push({
      step: stepNum++,
      algorithm: "recursive",
      current_idx: null,
      max_current: finalRes.max_sum,
      max_global: finalRes.max_sum,
      active_start: finalRes.start_idx,
      active_end: finalRes.end_idx,
      call_stack: [],
      event_type: "result",
      annotation: `Divisão e Conquista finalizada. Soma máxima = ${finalRes.max_sum} no intervalo [${finalRes.start_idx}..${finalRes.end_idx}].`
    });

    return {
      algorithm: "recursive",
      input_array: arr,
      final_result: finalRes,
      steps: steps
    };
  }

  function handleApplyCustom() {
    clearCustomError();
    const raw = customArrayInput ? customArrayInput.value : "";
    try {
      const arr = parseCustomArray(raw);
      if (!window.KADANE_TRACES) {
        window.KADANE_TRACES = {};
      }
      window.KADANE_TRACES["iterative_custom"] = generateClientIterativeTrace(arr);
      window.KADANE_TRACES["recursive_custom"] = generateClientRecursiveTrace(arr);

      currentScenario = "custom";
      if (scenarioSelect) scenarioSelect.value = "custom";
      loadTrace();
    } catch (err) {
      showCustomError(err.message);
    }
  }

  if (btnApplyCustom) {
    btnApplyCustom.addEventListener("click", handleApplyCustom);
  }
  if (customArrayInput) {
    customArrayInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleApplyCustom();
      }
    });
  }

  // =========================================================================
  // CARREGAMENTO DO RASTRO (TRACE)
  // =========================================================================
  async function loadTrace() {
    pausePlayback();
    const key = `${currentAlgorithm}_${currentScenario}`;

    // 1. Tentar ler do bundle pré-carregado no traces_bundle.js (zero CORS)
    if (window.KADANE_TRACES && window.KADANE_TRACES[key]) {
      traceData = window.KADANE_TRACES[key];
    } else {
      // 2. Fallback para fetch assíncrono caso rodando via servidor HTTP
      try {
        const resp = await fetch(`data/trace_${currentAlgorithm}_${currentScenario}.json`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        traceData = await resp.json();
      } catch (err) {
        stepAnnotation.textContent = `Erro ao carregar dados do cenário: ${err.message}`;
        return;
      }
    }

    currentStepIndex = 0;
    arrayLengthBadge.textContent = `${traceData.input_array.length} elementos`;

    // Atualiza complexidades nos badges
    if (currentAlgorithm === "iterative") {
      complexityTime.textContent = "O(n)";
      complexityTime.className = "font-bold text-blue-600";
      complexitySpace.textContent = "O(1)";
      complexitySpace.className = "font-bold text-blue-600";
    } else {
      complexityTime.textContent = "O(n log n)";
      complexityTime.className = "font-bold text-red-600";
      complexitySpace.textContent = "O(log n) pilha";
      complexitySpace.className = "font-bold text-red-600";
    }

    renderStep();
  }

  // =========================================================================
  // RENDERIZAÇÃO DO PASSO ATUAL
  // =========================================================================
  function renderStep() {
    if (!traceData || !traceData.steps || traceData.steps.length === 0) return;

    const totalSteps = traceData.steps.length;
    const step = traceData.steps[currentStepIndex];
    const arr = traceData.input_array;
    const isFinalResult = step.event_type === "result";

    // 1. Atualizar Badges de Métricas
    stepBadge.textContent = `${currentStepIndex + 1} / ${totalSteps}`;
    metricEventType.textContent = step.event_type.toUpperCase();

    // Estilo do badge de evento
    if (step.event_type === "push") {
      metricEventType.className = "text-xs font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-700";
    } else if (step.event_type === "pop") {
      metricEventType.className = "text-xs font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-700";
    } else if (step.event_type === "result") {
      metricEventType.className = "text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700";
    } else {
      metricEventType.className = "text-xs font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-700";
    }

    metricMaxCurrent.textContent = step.max_current !== null ? step.max_current : "—";
    if (step.max_current !== null && step.max_current < 0) {
      metricMaxCurrent.className = "text-sm font-bold text-red-600 font-mono";
    } else {
      metricMaxCurrent.className = "text-sm font-bold text-slate-800 font-mono";
    }

    metricMaxGlobal.textContent = step.max_global !== null ? step.max_global : "—";

    if (step.active_start !== null && step.active_end !== null) {
      metricActiveRange.textContent = `[${step.active_start} .. ${step.active_end}]`;
    } else {
      metricActiveRange.textContent = "[—]";
    }

    stepAnnotation.textContent = step.annotation || "Passo intermediário da execução.";

    // 2. Renderizar Células do Vetor
    renderArray(arr, step, isFinalResult);

    // 3. Renderizar Call Stack
    renderCallStack(step);
  }

  // =========================================================================
  // RENDERIZAÇÃO DO VETOR COM DESTAQUES DINÂMICOS
  // =========================================================================
  function renderArray(arr, step, isFinalResult) {
    arrayContainer.innerHTML = "";

    const finalStart = traceData.final_result ? traceData.final_result.start_idx : -1;
    const finalEnd = traceData.final_result ? traceData.final_result.end_idx : -1;

    arr.forEach((val, idx) => {
      const cellWrapper = document.createElement("div");
      cellWrapper.className = "flex flex-col items-center";

      const cell = document.createElement("div");
      cell.className = "array-cell w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-sm rounded-lg border shadow-sm transition-all";
      cell.textContent = val;

      // Determinar cor baseada no estado
      if (isFinalResult && idx >= finalStart && idx <= finalEnd) {
        // Subarranjo ótimo final
        cell.className += " bg-emerald-400 text-emerald-950 border-emerald-500 shadow-md scale-105";
      } else if (idx === step.current_idx) {
        // Elemento inspecionado no passo atual
        cell.className += " bg-yellow-400 text-yellow-950 border-yellow-500 ring-4 ring-yellow-200 scale-110 z-10";
      } else if (step.active_start !== null && step.active_end !== null && idx >= step.active_start && idx <= step.active_end) {
        // Subarranjo ativo corrente
        cell.className += " bg-blue-200 text-blue-900 border-blue-400";
      } else {
        // Célula padrão
        cell.className += " bg-slate-100 text-slate-700 border-slate-300";
      }

      // Rótulo do índice abaixo da célula
      const idxLabel = document.createElement("span");
      idxLabel.className = "text-[10px] text-slate-400 mt-1 font-mono";
      idxLabel.textContent = idx;

      // Marcadores especiais start / end
      let pointerText = "";
      if (idx === step.active_start && idx === step.active_end) {
        pointerText = "start/end";
      } else if (idx === step.active_start) {
        pointerText = "start";
      } else if (idx === step.active_end) {
        pointerText = "end";
      }

      const pointerBadge = document.createElement("span");
      pointerBadge.className = "text-[9px] font-bold text-blue-600 uppercase h-3";
      pointerBadge.textContent = pointerText;

      cellWrapper.appendChild(cell);
      cellWrapper.appendChild(idxLabel);
      cellWrapper.appendChild(pointerBadge);
      arrayContainer.appendChild(cellWrapper);
    });
  }

  // =========================================================================
  // RENDERIZAÇÃO DA PILHA DE EXECUÇÃO (CALL STACK)
  // =========================================================================
  function renderCallStack(step) {
    stackContainer.innerHTML = "";

    if (currentAlgorithm === "iterative") {
      iterativeStackNotice.classList.remove("hidden");
      stackDepthBadge.textContent = "1 frame (O(1))";
      stackDepthBadge.className = "text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200";

      const frameBox = document.createElement("div");
      frameBox.className = "p-2.5 rounded-lg border border-slate-200 bg-white text-xs shadow-sm flex items-center justify-between";
      frameBox.innerHTML = `
        <span class="font-bold text-slate-700 font-mono">kadane_iterative</span>
        <span class="text-[10px] font-semibold text-slate-400">Loop [0..${traceData.input_array.length - 1}]</span>
      `;
      stackContainer.appendChild(frameBox);
      return;
    }

    // Modo Recursivo
    iterativeStackNotice.classList.add("hidden");
    const stack = step.call_stack || [];
    stackDepthBadge.textContent = `${stack.length} frame${stack.length === 1 ? "" : "s"}`;

    if (stack.length === 0) {
      const emptyNotice = document.createElement("div");
      emptyNotice.className = "text-center text-xs text-slate-400 py-8";
      emptyNotice.textContent = "(Pilha vazia)";
      stackContainer.appendChild(emptyNotice);
      return;
    }

    // Renderiza cada frame
    stack.forEach((frame, idx) => {
      const isTop = idx === stack.length - 1;
      const frameEl = document.createElement("div");
      frameEl.className = `p-2.5 rounded-lg border text-xs transition-all ${
        isTop ? "stack-frame-top animate-push border-blue-300" : "bg-white border-slate-200 opacity-80"
      }`;

      let partialHtml = "";
      if (frame.partial_result) {
        partialHtml = `
          <div class="mt-1 pt-1 border-t border-slate-100 flex justify-between text-[10px] text-purple-600 font-bold">
            <span>Retorno parcial:</span>
            <span>soma ${frame.partial_result.max_sum}</span>
          </div>
        `;
      }

      frameEl.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-bold font-mono text-slate-800 text-[11px]">${frame.fn_name}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold font-mono">
            prof. ${frame.depth}
          </span>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono">
          <span>[${frame.low} .. ${frame.high}]</span>
          <span>${frame.mid !== null ? `mid: ${frame.mid}` : ""}</span>
        </div>
        ${partialHtml}
      `;

      stackContainer.appendChild(frameEl);
    });
  }

  // =========================================================================
  // CONTROLES DE REPRODUÇÃO (PLAY, PAUSE, STEP)
  // =========================================================================
  function startPlayback() {
    if (isPlaying) return;
    if (currentStepIndex >= traceData.steps.length - 1) {
      currentStepIndex = 0;
    }
    isPlaying = true;
    playIcon.textContent = "⏸";
    playText.textContent = "Pausar";
    btnPlayPause.classList.replace("bg-blue-600", "bg-amber-600");
    btnPlayPause.classList.replace("hover:bg-blue-700", "hover:bg-amber-700");

    timerId = setInterval(() => {
      if (currentStepIndex < traceData.steps.length - 1) {
        currentStepIndex++;
        renderStep();
      } else {
        pausePlayback();
      }
    }, speedMs);
  }

  function pausePlayback() {
    isPlaying = false;
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    playIcon.textContent = "▶";
    playText.textContent = "Reproduzir";
    btnPlayPause.classList.replace("bg-amber-600", "bg-blue-600");
    btnPlayPause.classList.replace("hover:bg-amber-700", "hover:bg-blue-700");
  }

  btnPlayPause.addEventListener("click", () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  });

  btnReset.addEventListener("click", () => {
    pausePlayback();
    currentStepIndex = 0;
    renderStep();
  });

  btnPrev.addEventListener("click", () => {
    pausePlayback();
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderStep();
    }
  });

  btnNext.addEventListener("click", () => {
    pausePlayback();
    if (currentStepIndex < traceData.steps.length - 1) {
      currentStepIndex++;
      renderStep();
    }
  });

  btnEnd.addEventListener("click", () => {
    pausePlayback();
    currentStepIndex = traceData.steps.length - 1;
    renderStep();
  });

  // Slider de velocidade
  speedSlider.addEventListener("input", (e) => {
    speedMs = parseInt(e.target.value, 10);
    speedValue.textContent = `${speedMs}ms`;
    if (isPlaying) {
      pausePlayback();
      startPlayback();
    }
  });

  // =========================================================================
  // SELEÇÃO DE ALGORITMO E CENÁRIO
  // =========================================================================
  btnIterative.addEventListener("click", () => {
    if (currentAlgorithm === "iterative") return;
    currentAlgorithm = "iterative";
    btnIterative.className = "px-3 py-1.5 text-xs font-bold rounded-md bg-blue-600 text-white shadow-sm transition-all";
    btnRecursive.className = "px-3 py-1.5 text-xs font-bold rounded-md text-slate-600 hover:text-slate-900 transition-all";
    loadTrace();
  });

  btnRecursive.addEventListener("click", () => {
    if (currentAlgorithm === "recursive") return;
    currentAlgorithm = "recursive";
    btnRecursive.className = "px-3 py-1.5 text-xs font-bold rounded-md bg-red-600 text-white shadow-sm transition-all";
    btnIterative.className = "px-3 py-1.5 text-xs font-bold rounded-md text-slate-600 hover:text-slate-900 transition-all";
    loadTrace();
  });

  scenarioSelect.addEventListener("change", (e) => {
    currentScenario = e.target.value;
    if (currentScenario === "custom") {
      if (!window.KADANE_TRACES || !window.KADANE_TRACES[`${currentAlgorithm}_custom`]) {
        if (customArrayInput && !customArrayInput.value.trim()) {
          customArrayInput.value = "-2, 1, -3, 4, -1, 2, 1, -5, 4";
        }
        handleApplyCustom();
        return;
      }
    }
    loadTrace();
  });

  // Inicialização inicial
  loadTrace();
});
