"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ADSENSE_CLIENT_ID, ADSENSE_ENABLED } from "@/lib/adsConfig";
import { getStoredConsent, subscribeConsent } from "@/lib/consent";

export default function GoogleAdsense() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === "accepted") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser-only storage after mount, required to avoid a hydration mismatch
      setConsented(true);
    }
    return subscribeConsent((value) => setConsented(value === "accepted"));
  }, []);

  if (!ADSENSE_ENABLED || !consented) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
