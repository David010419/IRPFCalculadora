import { formatCurrency } from "@/lib/format";
import { IrpfResult } from "@/lib/types";

interface SalaryBarProps {
  result: IrpfResult;
}

export default function SalaryBar({ result }: SalaryBarProps) {
  const bruto = result.rendimientoIntegro || 1;
  const ss = (result.cotizacionesSS / bruto) * 100;
  const impuestos = (result.cuotaLiquidaTotal / bruto) * 100;
  const neto = Math.max(0, 100 - ss - impuestos);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        Distribución del salario bruto
      </h3>
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-slate-400" style={{ width: `${ss}%` }} />
        <div className="h-full bg-rose-400" style={{ width: `${impuestos}%` }} />
        <div className="h-full bg-blue-500" style={{ width: `${neto}%` }} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
        <Legend
          color="bg-slate-400"
          label="Seguridad Social"
          value={formatCurrency(result.cotizacionesSS)}
        />
        <Legend
          color="bg-rose-400"
          label="IRPF"
          value={formatCurrency(result.cuotaLiquidaTotal)}
        />
        <Legend
          color="bg-blue-500"
          label="Neto anual"
          value={formatCurrency(result.salarioNetoAnual)}
        />
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${color}`} />
      <span className="text-slate-500">{label}</span>
      <span className="ml-auto font-medium text-slate-900">{value}</span>
    </div>
  );
}
