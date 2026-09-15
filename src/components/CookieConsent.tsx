"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setStoredConsent, subscribeConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser-only storage after mount, required to avoid a hydration mismatch
      setVisible(true);
    }
    return subscribeConsent((value) => setVisible(value === null));
  }, []);

  if (!visible) return null;

  function handleChoice(value: "accepted" | "rejected") {
    setStoredConsent(value);
    setVisible(false);
  }

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:p-5">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Usamos cookies propias y de terceros para analizar el uso de la web
          y, si las aceptas, mostrar publicidad personalizada. Puedes
          consultar más información en nuestra{" "}
          <Link href="/politica-de-cookies" className="font-medium text-blue-600 hover:underline">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:flex-none"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 sm:flex-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
