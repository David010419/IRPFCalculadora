import { formatCurrency } from "@/lib/format";
import { IrpfResult } from "@/lib/types";
import { COMUNIDADES_AUTONOMAS } from "@/lib/taxData";

interface Row {
  label: string;
  value: number;
  bold?: boolean;
  indent?: boolean;
  negative?: boolean;
  divider?: boolean;
}

export default function BreakdownTable({ result }: { result: IrpfResult }) {
  const comunidad = COMUNIDADES_AUTONOMAS.find(
    (c) => c.id === result.input.comunidadAutonoma
  );

  const rows: Row[] = [
    { label: "Salario bruto anual", value: result.rendimientoIntegro, bold: true },
    {
      label: "Cotizaciones a la Seguridad Social",
      value: -result.cotizacionesSS,
      negative: true,
      indent: true,
    },
    {
      label: "Gasto deducible genérico",
      value: -result.gastoGenerico,
      negative: true,
      indent: true,
    },
    {
      label: "Reducción por rendimientos del trabajo",
      value: -result.reduccionTrabajo,
      negative: true,
      indent: true,
    },
    {
      label: "Rendimiento neto del trabajo",
      value: result.rendimientoNetoTrabajo,
      bold: true,
      divider: true,
    },
    ...(result.reduccionPlanPensiones > 0
      ? [
          {
            label: "Reducción por aportaciones a plan de pensiones",
            value: -result.reduccionPlanPensiones,
            negative: true,
            indent: true,
          },
        ]
      : []),
    {
      label: "Base liquidable general",
      value: result.baseLiquidableGeneral,
      bold: true,
      divider: true,
    },
    {
      label: "Mínimo del contribuyente",
      value: -result.minimoContribuyente,
      negative: true,
      indent: true,
    },
    ...(result.minimoDescendientes > 0
      ? [
          {
            label: "Mínimo por descendientes",
            value: -result.minimoDescendientes,
            negative: true,
            indent: true,
          },
        ]
      : []),
    ...(result.reduccionConjunta > 0
      ? [
          {
            label: "Reducción por tributación conjunta",
            value: -result.reduccionConjunta,
            negative: true,
            indent: true,
          },
        ]
      : []),
    {
      label: "Cuota íntegra estatal",
      value: result.cuotaIntegraEstatal,
      divider: true,
    },
    {
      label: `Cuota íntegra autonómica (${comunidad?.nombre ?? ""})`,
      value: result.cuotaIntegraAutonomica,
    },
    {
      label: "Cuota íntegra / líquida total (IRPF)",
      value: result.cuotaLiquidaTotal,
      bold: true,
      divider: true,
    },
    {
      label: "Retenciones ya practicadas",
      value: result.retenciones,
    },
    {
      label: result.esDevolucion ? "Resultado: a devolver" : "Resultado: a pagar",
      value: Math.abs(result.resultado),
      bold: true,
      divider: true,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Desglose detallado
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`${row.divider ? "border-t border-slate-200" : ""} ${
                  row.bold ? "bg-slate-50" : ""
                }`}
              >
                <td
                  className={`py-2.5 pl-5 pr-3 sm:pl-6 ${
                    row.indent ? "text-slate-500" : "text-slate-800"
                  } ${row.bold ? "font-semibold text-slate-900" : ""}`}
                >
                  {row.label}
                </td>
                <td
                  className={`whitespace-nowrap py-2.5 pl-3 pr-5 text-right tabular-nums sm:pr-6 ${
                    row.bold ? "font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  {row.value < 0 ? "− " : ""}
                  {formatCurrency(Math.abs(row.value))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
