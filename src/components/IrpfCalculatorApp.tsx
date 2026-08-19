"use client";

import { useEffect, useMemo, useState } from "react";
import IrpfForm from "./IrpfForm";
import ResultPanel from "./ResultPanel";
import BreakdownTable from "./BreakdownTable";
import SalaryBar from "./SalaryBar";
import DisclaimerBanner from "./DisclaimerBanner";
import { calcularIrpf } from "@/lib/calculator";
import { buildWhatsappShareUrl } from "@/lib/share";
import { IrpfInput } from "@/lib/types";
import EducationSection from "./EducationSection";

const STORAGE_KEY = "irpf-calculator-input-v1";

const DEFAULT_INPUT: IrpfInput = {
  salarioBruto: 30000,
  comunidadAutonoma: "madrid",
  tramoEdad: "menor65",
  situacionFamiliar: "soltero",
  numHijos: 0,
  hijosMenores3: 0,
  tributacionConjunta: false,
  retenciones: 4500,
};

export default function IrpfCalculatorApp() {
  const [input, setInput] = useState<IrpfInput>(DEFAULT_INPUT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setInput({ ...DEFAULT_INPUT, ...JSON.parse(stored) });
      }
    } catch {
      // localStorage no disponible: se ignora y se usan valores por defecto
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

  const result = useMemo(() => calcularIrpf(input), [input]);

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    setInput(DEFAULT_INPUT);
  }

  function handleShareWhatsapp() {
    const siteUrl = typeof window !== "undefined" ? window.location.href : undefined;
    const url = buildWhatsappShareUrl(result, siteUrl);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_1fr]">
        <div className="no-print lg:sticky lg:top-6 lg:self-start">
          <IrpfForm value={input} onChange={setInput} />
          <div className="no-print mt-4 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-slate-300 bg-white px-2 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:text-sm"
            >
              Restablecer
            </button>
            <button
              type="button"
              onClick={handleShareWhatsapp}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-2 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#20bd5a] sm:text-sm"
            >
              <WhatsappIcon />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-lg bg-blue-600 px-2 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700 sm:text-sm"
            >
              Descargar PDF
            </button>
          </div>
        </div>

        <div id="print-area" className="flex flex-col gap-6">
          <ResultPanel result={result} />
          <SalaryBar result={result} />
          <BreakdownTable result={result} />
          <DisclaimerBanner />
        </div>
      </div>

      <EducationSection />
    </div>
  );
}

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-current"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.994.586 3.847 1.596 5.404L2 22l4.723-1.564A9.958 9.958 0 0 0 12.004 22C17.522 22 22 17.514 22 12.004 22 6.486 17.522 2 12.004 2zm0 18.19a8.15 8.15 0 0 1-4.157-1.14l-.298-.177-2.804.929.937-2.734-.194-.28a8.144 8.144 0 0 1-1.284-4.384c0-4.518 3.678-8.196 8.2-8.196 4.518 0 8.196 3.678 8.196 8.196 0 4.522-3.678 8.196-8.196 8.196z" />
    </svg>
  );
}
