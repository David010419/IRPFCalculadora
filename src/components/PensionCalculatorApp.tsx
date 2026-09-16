"use client";

import { useEffect, useMemo, useState } from "react";
import PensionForm from "./PensionForm";
import PensionResultPanel from "./PensionResultPanel";
import PensionBreakdownTable from "./PensionBreakdownTable";
import PensionDisclaimer from "./PensionDisclaimer";
import { calcularPension, PensionInput } from "@/lib/pension";

const STORAGE_KEY = "pension-calculator-input-v1";

const DEFAULT_INPUT: PensionInput = {
  salarioBrutoAnual: 30000,
  edadActual: 40,
  anosCotizados: 20,
};

export default function PensionCalculatorApp() {
  const [input, setInput] = useState<PensionInput>(DEFAULT_INPUT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let next = DEFAULT_INPUT;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        next = { ...DEFAULT_INPUT, ...JSON.parse(stored) };
      }
    } catch {
      // localStorage no disponible: se ignora y se usan valores por defecto
    }

    try {
      setInput(next);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    } catch {
      // almacenamiento no disponible (modo privado, cuota superada, etc.)
    }
  }, [input, hydrated]);

  const result = useMemo(() => calcularPension(input), [input]);

  function handleReset() {
    setInput(DEFAULT_INPUT);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_1fr]">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <PensionForm value={input} onChange={setInput} />
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Restablecer
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <PensionResultPanel result={result} />
          <PensionBreakdownTable result={result} />
          <PensionDisclaimer />
        </div>
      </div>
    </div>
  );
}
