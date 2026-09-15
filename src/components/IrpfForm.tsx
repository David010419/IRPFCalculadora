"use client";

import { COMUNIDADES_AUTONOMAS } from "@/lib/taxData";
import { IrpfInput, SituacionFamiliar, TramoEdad } from "@/lib/types";

interface IrpfFormProps {
  value: IrpfInput;
  onChange: (value: IrpfInput) => void;
}

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";
const fieldWrapperClass = "mb-5";
const helpClass = "mt-1 text-xs text-slate-500";

export default function IrpfForm({ value, onChange }: IrpfFormProps) {
  function update<K extends keyof IrpfInput>(key: K, val: IrpfInput[K]) {
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
        <label className={labelClass} htmlFor="salarioBruto">
          Salario bruto anual
        </label>
        <div className="relative">
          <input
            id="salarioBruto"
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            className={inputClass + " pr-10"}
            value={Number.isFinite(value.salarioBruto) ? value.salarioBruto : 0}
            onChange={(e) => update("salarioBruto", Math.max(0, Number(e.target.value)))}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            €
          </span>
        </div>
        <p className={helpClass}>Ingreso bruto total antes de retenciones.</p>
      </div>

      <div className={fieldWrapperClass}>
        <label className={labelClass} htmlFor="comunidad">
          Comunidad autónoma
        </label>
        <select
          id="comunidad"
          className={inputClass}
          value={value.comunidadAutonoma}
          onChange={(e) => update("comunidadAutonoma", e.target.value)}
        >
          {COMUNIDADES_AUTONOMAS.map((ca) => (
            <option key={ca.id} value={ca.id}>
              {ca.nombre}
              {ca.foral ? " (régimen foral)" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className={fieldWrapperClass}>
        <span className={labelClass}>Tramo de edad</span>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { id: "menor65", label: "18 – 65 años" },
              { id: "mayor65", label: "65 años o más" },
            ] as { id: TramoEdad; label: string }[]
          ).map((opt) => (
            <button
              type="button"
              key={opt.id}
              aria-pressed={value.tramoEdad === opt.id}
              onClick={() => update("tramoEdad", opt.id)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                value.tramoEdad === opt.id
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={fieldWrapperClass}>
        <label className={labelClass} htmlFor="situacionFamiliar">
          Situación familiar
        </label>
        <select
          id="situacionFamiliar"
          className={inputClass}
          value={value.situacionFamiliar}
          onChange={(e) =>
            update("situacionFamiliar", e.target.value as SituacionFamiliar)
          }
        >
          <option value="soltero">Soltero/a</option>
          <option value="pareja">Pareja / casado/a</option>
          <option value="hijos">Con hijos a cargo</option>
        </select>
      </div>

      {value.situacionFamiliar === "pareja" && (
        <div className={fieldWrapperClass}>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              checked={value.tributacionConjunta}
              onChange={(e) => update("tributacionConjunta", e.target.checked)}
            />
            Tributación conjunta
          </label>
          <p className={helpClass}>
            Aplica la reducción de 3.400 € del mínimo. Cálculo aproximado: no
            se suman los ingresos de la pareja.
          </p>
        </div>
      )}

      {value.situacionFamiliar === "hijos" && (
        <div className="grid grid-cols-2 gap-3">
          <div className={fieldWrapperClass}>
            <label className={labelClass} htmlFor="numHijos">
              Número de hijos
            </label>
            <input
              id="numHijos"
              type="number"
              min={0}
              max={10}
              className={inputClass}
              value={value.numHijos}
              onChange={(e) =>
                update("numHijos", Math.max(0, Number(e.target.value)))
              }
            />
          </div>
          <div className={fieldWrapperClass}>
            <label className={labelClass} htmlFor="hijosMenores3">
              Menores de 3 años
            </label>
            <input
              id="hijosMenores3"
              type="number"
              min={0}
              max={value.numHijos}
              className={inputClass}
              value={value.hijosMenores3}
              onChange={(e) =>
                update(
                  "hijosMenores3",
                  Math.min(value.numHijos, Math.max(0, Number(e.target.value)))
                )
              }
            />
          </div>
        </div>
      )}

      <div className={fieldWrapperClass}>
        <label className={labelClass} htmlFor="retenciones">
          Retenciones ya practicadas (IRPF)
        </label>
        <div className="relative">
          <input
            id="retenciones"
            type="number"
            inputMode="decimal"
            min={0}
            step={50}
            className={inputClass + " pr-10"}
            value={Number.isFinite(value.retenciones) ? value.retenciones : 0}
            onChange={(e) => update("retenciones", Math.max(0, Number(e.target.value)))}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            €
          </span>
        </div>
        <p className={helpClass}>
          Suma de las retenciones de IRPF de tus nóminas durante el año.
        </p>
      </div>

      <div className={fieldWrapperClass + " mb-0"}>
        <label className={labelClass} htmlFor="aportacionPlanPensiones">
          Aportaciones a plan de pensiones (opcional)
        </label>
        <div className="relative">
          <input
            id="aportacionPlanPensiones"
            type="number"
            inputMode="decimal"
            min={0}
            step={50}
            className={inputClass + " pr-10"}
            value={
              Number.isFinite(value.aportacionPlanPensiones)
                ? value.aportacionPlanPensiones
                : 0
            }
            onChange={(e) =>
              update("aportacionPlanPensiones", Math.max(0, Number(e.target.value)))
            }
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            €
          </span>
        </div>
        <p className={helpClass}>
          Reduce tu base imponible hasta un máximo de 1.500 € anuales.
        </p>
      </div>
    </form>
  );
}
