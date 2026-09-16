"use client";

import { PensionInput } from "@/lib/pension";

interface PensionFormProps {
  value: PensionInput;
  onChange: (value: PensionInput) => void;
}

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";
const fieldWrapperClass = "mb-5";
const helpClass = "mt-1 text-xs text-slate-500";

export default function PensionForm({ value, onChange }: PensionFormProps) {
  function update<K extends keyof PensionInput>(key: K, val: PensionInput[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Tus datos
      </h2>

      <div className={fieldWrapperClass}>
        <label className={labelClass} htmlFor="pension-salario">
          Salario bruto anual actual
        </label>
        <div className="relative">
          <input
            id="pension-salario"
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            className={inputClass + " pr-10"}
            value={Number.isFinite(value.salarioBrutoAnual) ? value.salarioBrutoAnual : 0}
            onChange={(e) =>
              update("salarioBrutoAnual", Math.max(0, Number(e.target.value)))
            }
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            €
          </span>
        </div>
        <p className={helpClass}>
          Se usa como referencia de tu base de cotización media.
        </p>
      </div>

      <div className={fieldWrapperClass}>
        <label className={labelClass} htmlFor="pension-edad">
          Tu edad actual
        </label>
        <input
          id="pension-edad"
          type="number"
          min={16}
          max={80}
          className={inputClass}
          value={Number.isFinite(value.edadActual) ? value.edadActual : 0}
          onChange={(e) => update("edadActual", Math.max(0, Number(e.target.value)))}
        />
      </div>

      <div className={fieldWrapperClass + " mb-0"}>
        <label className={labelClass} htmlFor="pension-anos">
          Años cotizados (o que prevés cotizar hasta jubilarte)
        </label>
        <input
          id="pension-anos"
          type="number"
          min={0}
          max={55}
          step={0.5}
          className={inputClass}
          value={Number.isFinite(value.anosCotizados) ? value.anosCotizados : 0}
          onChange={(e) =>
            update("anosCotizados", Math.max(0, Number(e.target.value)))
          }
        />
        <p className={helpClass}>
          Necesitas al menos 15 años cotizados para tener derecho a
          pensión contributiva.
        </p>
      </div>
    </form>
  );
}
