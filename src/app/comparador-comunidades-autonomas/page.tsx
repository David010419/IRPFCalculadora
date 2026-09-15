import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ComparadorPageClient from "@/components/ComparadorPageClient";

export const metadata: Metadata = {
  title: "Comparador de IRPF por comunidad autónoma",
  description:
    "Compara cuánto pagarías de IRPF en cada comunidad autónoma con el mismo salario. Descubre dónde tributa menos tu sueldo en España.",
  alternates: { canonical: "/comparador-comunidades-autonomas" },
};

export default function ComparadorPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Comparador de IRPF por comunidad autónoma
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
            El 50% de tu IRPF lo fija tu comunidad autónoma, así que con el
            mismo salario puedes pagar cientos de euros más o menos según
            dónde residas fiscalmente. Introduce tu salario y compara al
            instante la cuota estimada en las 19 comunidades y ciudades
            autónomas.
          </p>

          <div className="mt-8">
            <ComparadorPageClient />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
