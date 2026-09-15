import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RegionalBracketTable from "@/components/RegionalBracketTable";
import { calcularIrpf } from "@/lib/calculator";
import { rankComunidad } from "@/lib/comparador";
import { formatCurrency, formatPercent } from "@/lib/format";
import { REGIONAL_SUMMARY } from "@/lib/regionalContent";
import { SITE_URL } from "@/lib/siteConfig";
import {
  COMUNIDADES_AUTONOMAS,
  getCombinedScale,
  getComunidadBySlug,
} from "@/lib/taxData";
import { IrpfInput } from "@/lib/types";

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

export function generateStaticParams() {
  return COMUNIDADES_AUTONOMAS.map((c) => ({ comunidad: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ comunidad: string }>;
}): Promise<Metadata> {
  const { comunidad: slug } = await params;
  const comunidad = getComunidadBySlug(slug);
  if (!comunidad) return {};

  const title = `IRPF en ${comunidad.nombre} 2025: tramos, tipos y cómo calcularlo`;
  const description = `Consulta los tramos de IRPF en ${comunidad.nombre} para 2025, el tipo autonómico aplicable y calcula al instante tu cuota con nuestra calculadora gratuita.`;

  return {
    title,
    description,
    alternates: { canonical: `/irpf/${comunidad.slug}` },
    openGraph: { title, description },
  };
}

export default async function IrpfComunidadPage({
  params,
}: {
  params: Promise<{ comunidad: string }>;
}) {
  const { comunidad: slug } = await params;
  const comunidad = getComunidadBySlug(slug);
  if (!comunidad) notFound();

  const ejemploInput: IrpfInput = {
    ...REFERENCE_INPUT,
    comunidadAutonoma: comunidad.id,
  };
  const ejemploResult = calcularIrpf(ejemploInput);
  const { rank, total } = rankComunidad(comunidad.id, REFERENCE_INPUT);
  const combinedScale = getCombinedScale(comunidad.id);
  const resumen = REGIONAL_SUMMARY[comunidad.id];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "IRPF por comunidad",
        item: `${SITE_URL}/irpf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: comunidad.nombre,
        item: `${SITE_URL}/irpf/${comunidad.slug}`,
      },
    ],
  };

  const otras = COMUNIDADES_AUTONOMAS.filter((c) => c.id !== comunidad.id);

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <nav className="mb-4 text-xs text-slate-400">
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/irpf" className="hover:text-blue-600">
              IRPF por comunidad
            </Link>{" "}
            / <span className="text-slate-600">{comunidad.nombre}</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            IRPF en {comunidad.nombre} 2025: tramos, tipos y cómo calcularlo
          </h1>

          {resumen && (
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {resumen}
            </p>
          )}

          {comunidad.foral && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              {comunidad.nombre} tiene un régimen foral propio. Los tipos que
              mostramos a continuación son una referencia aproximada del
              régimen común y no reflejan la normativa foral real.
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">
                Ejemplo con 30.000 € de salario
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatCurrency(ejemploResult.cuotaLiquidaTotal)}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">de cuota anual de IRPF</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Tipo medio efectivo</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatPercent(ejemploResult.tipoMedioEfectivo)}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">sobre el salario bruto</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Ranking nacional</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {rank}.º de {total}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                de menor a mayor tributación
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-lg font-semibold text-slate-900">
            Tramos de IRPF en {comunidad.nombre} (estatal + autonómico)
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tipo total aplicado a la base liquidable general, sumando la
            escala estatal (igual en toda España) y la escala autonómica de{" "}
            {comunidad.nombre}.
          </p>
          <div className="mt-4">
            <RegionalBracketTable brackets={combinedScale} />
          </div>

          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="text-sm font-medium text-blue-900">
              Calcula tu cuota exacta de IRPF en {comunidad.nombre}, con tu
              salario, situación familiar y retenciones reales.
            </p>
            <Link
              href={`/?comunidad=${comunidad.id}`}
              className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Abrir la calculadora para {comunidad.nombre}
            </Link>
          </div>

          <h2 className="mt-10 text-lg font-semibold text-slate-900">
            Otras comunidades autónomas
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {otras.map((c) => (
              <Link
                key={c.id}
                href={`/irpf/${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
