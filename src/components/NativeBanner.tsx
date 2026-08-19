import Script from "next/script";

export default function NativeBanner() {
  return (
    <div className="no-print my-8">
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
        Publicidad
      </p>
      <div id="container-d53f8b17eb60474ab749bdd1cc7c7c20" />
      <Script
        id="ad-native-banner"
        src="https://pl30926747.effectivecpmnetwork.com/d53f8b17eb60474ab749bdd1cc7c7c20/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
      />
    </div>
  );
}
