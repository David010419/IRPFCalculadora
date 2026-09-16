import { formatCurrency, formatPercent, formatYearsMonths } from "@/lib/format";
import { ANOS_MINIMOS_PENSION, PensionResult } from "@/lib/pension";

export default function PensionResultPanel({
  result,
}: {
  result: PensionResult;
}) {
  if (!result.cumpleMinimo) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium text-slate-500">
          Años cotizados insuficientes
        </p>
        <p className="mt-1 text-2xl font-bold text-amber-700">
          Necesitas al menos {ANOS_MINIMOS_PENSION} años cotizados
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Por debajo de {ANOS_MINIMOS_PENSION} años cotizados no se genera
          derecho a pensión contributiva de jubilación. Podrías tener
          derecho a otras prestaciones (pensión no contributiva) según tu
          situación, no calculadas aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-slate-500">
        Pensión mensual estimada (orientativa)
      </p>
      <p className="mt-1 text-4xl font-bold tracking-tight text-blue-700 sm:text-5xl">
        {formatCurrency(result.pensionMensualEstimada)}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {formatCurrency(result.pensionAnualEstimada)} al año, repartidos en
        14 pagas.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          label="% aplicable"
          value={formatPercent(result.porcentajeAplicable)}
        />
        <Stat
          label="Tasa de sustitución"
          value={formatPercent(result.tasaSustitucion)}
        />
        <Stat
          label="Base reguladora"
          value={formatCurrency(result.baseReguladoraMensual)}
        />
        <Stat
          label="Edad estimada jubilación"
          value={formatYearsMonths(result.edadJubilacionEstimadaAnos)}
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
