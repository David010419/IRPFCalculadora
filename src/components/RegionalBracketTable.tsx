import { formatCurrency } from "@/lib/format";
import { TaxBracket } from "@/lib/types";

export default function RegionalBracketTable({
  brackets,
}: {
  brackets: TaxBracket[];
}) {
  const rows: { label: string; rate: number }[] = [];
  let prevLimit = 0;
  for (const bracket of brackets) {
    const label =
      bracket.limit === Infinity
        ? `Más de ${formatCurrency(prevLimit)}`
        : `${formatCurrency(prevLimit)} — ${formatCurrency(bracket.limit)}`;
    rows.push({ label, rate: bracket.rate });
    prevLimit = bracket.limit;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2.5 pl-5 pr-3 sm:pl-6">Base liquidable</th>
              <th className="py-2.5 pr-5 text-right sm:pr-6">
                Tipo total (estatal + autonómico)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="py-2.5 pl-5 pr-3 text-slate-700 sm:pl-6">
                  {row.label}
                </td>
                <td className="py-2.5 pr-5 text-right font-medium tabular-nums text-slate-900 sm:pr-6">
                  {row.rate.toFixed(2).replace(".", ",")} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
