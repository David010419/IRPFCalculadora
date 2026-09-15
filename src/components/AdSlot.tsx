"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_ENABLED, ADSENSE_SLOTS } from "@/lib/adsConfig";
import { getStoredConsent, subscribeConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: keyof typeof ADSENSE_SLOTS;
  className?: string;
}

export default function AdSlot({ slot, className }: AdSlotProps) {
  const [consented, setConsented] = useState(false);
  const pushedRef = useRef(false);
  const slotId = ADSENSE_SLOTS[slot];

  useEffect(() => {
    if (getStoredConsent() === "accepted") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser-only storage after mount, required to avoid a hydration mismatch
      setConsented(true);
    }
    return subscribeConsent((value) => setConsented(value === "accepted"));
  }, []);

  useEffect(() => {
    if (!ADSENSE_ENABLED || !slotId || !consented || pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // el script de AdSense aún no ha cargado; se reintentará en el próximo render
    }
  }, [consented, slotId]);

  if (!ADSENSE_ENABLED || !slotId || !consented) return null;

  return (
    <div className={`no-print ${className ?? "my-8"}`}>
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
        Publicidad
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
