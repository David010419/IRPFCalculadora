import Link from "next/link";
import { ANIO_FISCAL } from "@/lib/taxData";

const FOOTER_LINKS = [
  { href: "/comparador-comunidades-autonomas", label: "Comparador por CC.AA." },
  { href: "/irpf", label: "IRPF por comunidad autónoma" },
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/politica-de-cookies", label: "Política de cookies" },
  { href: "/aviso-legal", label: "Aviso legal" },
];

export default function SiteFooter() {
  return (
    <footer className="no-print border-t border-slate-200 bg-white py-8 text-xs text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-500">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-center">
          Ejercicio fiscal {ANIO_FISCAL} · Herramienta orientativa, no
          constituye asesoramiento fiscal.
        </p>
      </div>
    </footer>
  );
}
