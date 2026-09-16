import Script from "next/script";
import { ADSENSE_CLIENT_ID, ADSENSE_ENABLED } from "@/lib/adsConfig";

/**
 * Loads Google AdSense's auto ads script on every page, unconditionally.
 * Google requires this tag to be present on every page load (including
 * for its own verification crawler, which never grants our cookie
 * banner's consent) and handles EEA/UK consent itself via "Privacy &
 * messaging" in the AdSense dashboard, not via our own consent state.
 */
export default function GoogleAdsense() {
  if (!ADSENSE_ENABLED) return null;

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
