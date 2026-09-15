"use client";

import { resetStoredConsent } from "@/lib/consent";

export default function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => resetStoredConsent()}
      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      Gestionar preferencias de cookies
    </button>
  );
}
