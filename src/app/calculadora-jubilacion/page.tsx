import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PensionCalculatorApp from "@/components/PensionCalculatorApp";
import FaqAccordion from "@/components/FaqAccordion";
import { PENSION_FAQ_ENTRIES } from "@/lib/pensionFaqData";
import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";

const DESCRIPTION =
  "Calculadora orientativa de la pensión de jubilación en España: estima tu pensión mensual a partir de tu salario y años cotizados. Herramienta gratuita, no sustituye el simulador oficial de la Seguridad Social.";

export const metadata: Metadata = {
  title: "Calculadora de jubilación 2025: estima tu pensión (orientativa)",
  description: DESCRIPTION,
  keywords: [
    "calculadora jubilación",
    "cuánto voy a cobrar de pensión",
    "simulador pensión jubilación",
    "calcular pensión seguridad social",
    "base reguladora jubilación",
  ],
  alternates: { canonical: "/calculadora-jubilacion" },
  openGraph: { title: "Calculadora de jubilación 2025", description: DESCRIPTION },
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `Calculadora de jubilación | ${SITE_NAME}`,
  url: `${SITE_URL}/calculadora-jubilacion`,
  description: DESCRIPTION,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  inLanguage: "es-ES",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PENSION_FAQ_ENTRIES.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: { "@type": "Answer", text: entry.answer },
  })),
};

export default function CalculadoraJubilacionPage() {
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
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Calculadora de jubilación 2025
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Estima tu pensión mensual a partir de tu salario y años
            cotizados. Herramienta orientativa, no un cálculo oficial.
          </p>
        </div>
        <PensionCalculatorApp />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FaqAccordion
            title="Cómo funciona la pensión de jubilación"
            subtitle="Lo básico para entender de dónde sale esta estimación y en qué se diferencia del cálculo real."
            items={PENSION_FAQ_ENTRIES}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
