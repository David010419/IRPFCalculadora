import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { compararComunidades } from "@/lib/comparador";
import { formatCurrency } from "@/lib/format";
import { IrpfInput } from "@/lib/types";

export const metadata: Metadata = {
  title: "IRPF por comunidad autónoma 2025",
  description:
    "Consulta los tramos de IRPF de cada comunidad autónoma española para 2025 y descubre en qué comunidad se paga menos con el mismo salario.",
  alternates: { canonical: "/irpf" },
};

const REFERENCE_INPUT: IrpfInput = {
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

export default function IrpfIndexPage() {
  const rows = compararComunidades(REFERENCE_INPUT);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            IRPF por comunidad autónoma 2025
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            El 50% de tu IRPF depende de tu comunidad autónoma. Elige la tuya
            para ver sus tramos, tipos y un ejemplo de cuota, o usa el{" "}
            <Link
              href="/comparador-comunidades-autonomas"
              className="text-blue-600 hover:underline"
            >
              comparador completo
            </Link>{" "}
            para tu caso concreto.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Ranking de ejemplo con un salario de 30.000 € (soltero/a, menor de
            65 años), de menor a mayor cuota estimada.
          </p>

          <ol className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {rows.map((row, i) => (
              <li key={row.comunidad.id}>
                <Link
                  href={`/irpf/${row.comunidad.slug}`}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-slate-50 sm:px-6"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {row.comunidad.nombre}
                    </span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-slate-900">
                    {formatCurrency(row.result.cuotaLiquidaTotal)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
