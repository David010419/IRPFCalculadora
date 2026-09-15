import { compararComunidades } from "@/lib/comparador";
import { formatCurrency } from "@/lib/format";
import { IrpfInput } from "@/lib/types";

interface ComunidadComparadorTableProps {
  input: IrpfInput;
  highlightId?: string;
}

export default function ComunidadComparadorTable({
  input,
  highlightId,
}: ComunidadComparadorTableProps) {
  const rows = compararComunidades(input);
  const cheapest = rows[0]?.result.cuotaLiquidaTotal ?? 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2.5 pl-5 pr-3 sm:pl-6">#</th>
              <th className="py-2.5 pr-3">Comunidad autónoma</th>
              <th className="py-2.5 pr-3 text-right">Cuota IRPF</th>
              <th className="py-2.5 pr-5 text-right sm:pr-6">Frente a la más barata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => {
              const isCurrent = row.comunidad.id === highlightId;
              const diff = row.result.cuotaLiquidaTotal - cheapest;
              return (
                <tr
                  key={row.comunidad.id}
                  className={isCurrent ? "bg-blue-50" : undefined}
                >
                  <td className="py-2.5 pl-5 pr-3 text-slate-400 sm:pl-6">
                    {i + 1}
                  </td>
                  <td
                    className={`py-2.5 pr-3 ${
                      isCurrent
                        ? "font-semibold text-blue-700"
                        : "text-slate-800"
                    }`}
                  >
                    {row.comunidad.nombre}
                    {row.comunidad.foral ? (
                      <span className="ml-1.5 text-xs text-slate-400">
                        (foral)
                      </span>
                    ) : null}
                    {isCurrent && (
                      <span className="ml-1.5 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        Tu selección
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 pr-3 text-right font-medium tabular-nums text-slate-900">
                    {formatCurrency(row.result.cuotaLiquidaTotal)}
                  </td>
                  <td className="py-2.5 pr-5 text-right tabular-nums text-slate-500 sm:pr-6">
                    {diff > 0.5 ? `+${formatCurrency(diff)}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
