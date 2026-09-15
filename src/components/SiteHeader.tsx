import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Calculadora" },
  { href: "/comparador-comunidades-autonomas", label: "Comparador CC.AA." },
  { href: "/irpf", label: "IRPF por comunidad" },
];

export default function SiteHeader() {
  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            €
          </div>
          <div>
            <p className="text-base font-bold leading-tight tracking-tight text-slate-900 sm:text-lg">
              Calculadora IRPF 2025
            </p>
            <p className="text-xs text-slate-500 sm:text-sm">
              IRPF y retenciones para España
            </p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
