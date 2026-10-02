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
    loadTrace();
  });

  // Inicialização inicial
  loadTrace();
});
