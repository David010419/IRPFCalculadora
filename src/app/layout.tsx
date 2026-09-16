import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import CookieConsent from "@/components/CookieConsent";
import GoogleAdsense from "@/components/GoogleAdsense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Calculadora IRPF 2025 | Simulador de IRPF y Retenciones España",
    template: "%s | Calculadora IRPF 2025",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "calcular irpf",
    "simulador irpf",
    "retención irpf",
    "calculadora irpf 2025",
    "declaración de la renta",
    "irpf españa",
    "cuánto pago de irpf",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Calculadora de IRPF 2025",
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de IRPF 2025",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d4ed8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <GoogleAdsense />
        <CookieConsent />
      </body>
    </html>
  );
}
