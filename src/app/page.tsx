import IrpfCalculatorApp from "@/components/IrpfCalculatorApp";
import { ANIO_FISCAL } from "@/lib/taxData";
import { FAQ_ENTRIES } from "@/lib/faqData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  inLanguage: "es-ES",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ENTRIES.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              €
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Calculadora de IRPF 2025
              </h1>
              <p className="text-sm text-slate-500">
                Calcula tu IRPF y retenciones de forma rápida y precisa para
                España
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <IrpfCalculatorApp />
      </main>

      <footer className="no-print border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <p>
          Ejercicio fiscal {ANIO_FISCAL} · Herramienta orientativa, no
          constituye asesoramiento fiscal.
        </p>
      </footer>
    </div>
  );
}
