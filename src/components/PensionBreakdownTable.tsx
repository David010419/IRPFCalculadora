import { formatCurrency, formatPercent, formatYearsMonths } from "@/lib/format";
import { PensionResult } from "@/lib/pension";

export default function PensionBreakdownTable({
  result,
}: {
  result: PensionResult;
}) {
  const rows: { label: string; value: string; bold?: boolean }[] = [
    {
      label: "Salario mensual actual",
      value: formatCurrency(result.salarioMensualActual),
    },
    {
      label: "Base reguladora mensual estimada",
      value: formatCurrency(result.baseReguladoraMensual),
    },
    {
      label: "Años cotizados considerados",
      value: `${result.input.anosCotizados} años`,
    },
    {
      label: "Porcentaje aplicable sobre la base reguladora",
      value: formatPercent(result.porcentajeAplicable),
    },
    {
      label: "Pensión mensual estimada (14 pagas)",
      value: formatCurrency(result.pensionMensualEstimada),
      bold: true,
    },
    {
      label: "Pensión anual estimada",
      value: formatCurrency(result.pensionAnualEstimada),
      bold: true,
    },
    {
      label: "Tiempo estimado hasta la edad de jubilación",
      value: formatYearsMonths(result.anosParaJubilacion),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Desglose del cálculo
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-t border-slate-100 first:border-t-0 ${
                  row.bold ? "bg-slate-50" : ""
                }`}
              >
                <td
                  className={`py-2.5 pl-5 pr-3 sm:pl-6 ${
                    row.bold
                      ? "font-semibold text-slate-900"
                      : "text-slate-700"
                  }`}
                >
                  {row.label}
                </td>
                <td
                  className={`whitespace-nowrap py-2.5 pl-3 pr-5 text-right tabular-nums sm:pr-6 ${
                    row.bold ? "font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
