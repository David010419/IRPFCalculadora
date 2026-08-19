export default function DisclaimerBanner() {
  return (
    <div className="no-print rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
      <p>
        <span className="font-semibold">⚠️ Calculadora orientativa.</span>{" "}
        Los tramos autonómicos, cotizaciones y reducciones utilizados son
        estimaciones basadas en la normativa 2024/2025 y pueden no reflejar
        cambios recientes. País Vasco y Navarra disponen de regímenes forales
        propios no modelados aquí. Este simulador no sustituye el asesoramiento
        fiscal profesional ni la declaración oficial ante la Agencia Tributaria.
      </p>
    </div>
  );
}
