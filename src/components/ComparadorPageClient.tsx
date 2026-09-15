"use client";

import { useState } from "react";
import Link from "next/link";
import ComunidadComparadorTable from "./ComunidadComparadorTable";
import { IrpfInput, SituacionFamiliar, TramoEdad } from "@/lib/types";

const DEFAULT_INPUT: IrpfInput = {
  salarioBruto: 30000,
  comunidadAutonoma: "madrid",
  tramoEdad: "menor65",
  situacionFamiliar: "soltero",
  numHijos: 0,
  hijosMenores3: 0,
  tributacionConjunta: false,
  retenciones: 0,
  aportacionPlanPensiones: 0,
};

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

export default function ComparadorPageClient() {
  const [input, setInput] = useState<IrpfInput>(DEFAULT_INPUT);

  function update<K extends keyof IrpfInput>(key: K, val: IrpfInput[K]) {
    setInput((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:h-fit">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Tus datos
        </h2>

        <div className="mb-4">
          <label className={labelClass} htmlFor="cmp-salario">
            Salario bruto anual
          </label>
          <div className="relative">
            <input
              id="cmp-salario"
              type="number"
              min={0}
              step={100}
              className={inputClass + " pr-10"}
              value={input.salarioBruto}
              onChange={(e) => update("salarioBruto", Math.max(0, Number(e.target.value)))}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              €
            </span>
          </div>
        </div>

        <div className="mb-4">
          <span className={labelClass}>Tramo de edad</span>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { id: "menor65", label: "18 – 65" },
                { id: "mayor65", label: "65 o más" },
              ] as { id: TramoEdad; label: string }[]
            ).map((opt) => (
              <button
                type="button"
                key={opt.id}
                aria-pressed={input.tramoEdad === opt.id}
                onClick={() => update("tramoEdad", opt.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  input.tramoEdad === opt.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass} htmlFor="cmp-situacion">
            Situación familiar
          </label>
          <select
            id="cmp-situacion"
            className={inputClass}
            value={input.situacionFamiliar}
            onChange={(e) =>
              update("situacionFamiliar", e.target.value as SituacionFamiliar)
            }
          >
            <option value="soltero">Soltero/a</option>
            <option value="pareja">Pareja / casado/a</option>
            <option value="hijos">Con hijos a cargo</option>
          </select>
        </div>

        {input.situacionFamiliar === "hijos" && (
          <div className="mb-4">
            <label className={labelClass} htmlFor="cmp-hijos">
              Número de hijos
            </label>
            <input
              id="cmp-hijos"
              type="number"
              min={0}
              max={10}
              className={inputClass}
              value={input.numHijos}
              onChange={(e) => update("numHijos", Math.max(0, Number(e.target.value)))}
            />
          </div>
        )}

        <Link
          href="/"
          className="mt-2 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Ir a la calculadora completa
        </Link>
      </div>

      <div>
        <ComunidadComparadorTable input={input} highlightId={undefined} />
      </div>
    </div>
  );
}
