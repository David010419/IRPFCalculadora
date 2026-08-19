import { formatCurrency, formatPercent } from "@/lib/format";
import { IrpfResult } from "@/lib/types";

interface ResultPanelProps {
  result: IrpfResult;
}

export default function ResultPanel({ result }: ResultPanelProps) {
  const { esDevolucion, resultado } = result;

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${
        esDevolucion
          ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white"
          : "border-rose-200 bg-gradient-to-br from-rose-50 to-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-500">
        {esDevolucion ? "Resultado: a devolver" : "Resultado: a pagar"}
      </p>
      <p
        className={`mt-1 text-4xl font-bold tracking-tight sm:text-5xl ${
          esDevolucion ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {formatCurrency(Math.abs(resultado))}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {esDevolucion
          ? "Hacienda te devolverá esta cantidad en tu declaración."
          : "Deberás ingresar esta cantidad en tu declaración."}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Cuota IRPF total" value={formatCurrency(result.cuotaLiquidaTotal)} />
        <Stat label="Tipo medio efectivo" value={formatPercent(result.tipoMedioEfectivo)} />
        <Stat label="Tipo marginal" value={formatPercent(result.tipoMarginal)} />
        <Stat
          label="Neto mensual (x12)"
          value={formatCurrency(result.salarioNetoMensual12)}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/70 p-3 ring-1 ring-slate-900/5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}
