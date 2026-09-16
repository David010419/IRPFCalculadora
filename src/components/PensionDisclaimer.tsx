export default function PensionDisclaimer() {
  return (
    <div className="no-print rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
      <p>
        <span className="font-semibold">
          ⚠️ Estimación muy orientativa, no un cálculo oficial.
        </span>{" "}
        La pensión real se calcula con tu <strong>historial completo</strong>{" "}
        de bases de cotización de los últimos ~25-29 años (según el periodo
        de transición vigente), revalorizadas según el IPC, no con tu
        salario actual. Aquí usamos tu salario actual como aproximación
        plana de esa base reguladora, lo que puede alejarse bastante del
        resultado real si tu salario ha variado a lo largo de tu vida
        laboral. Tampoco se calculan complementos (maternidad, mínimos),
        coeficientes reductores/de jubilación anticipada o demorada, ni el
        tope máximo/mínimo legal de pensión. Para una cifra fiable, usa el{" "}
        <a
          href="https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10963"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
        >
          simulador oficial de la Seguridad Social
        </a>
        , que sí accede a tu historial real de cotizaciones.
      </p>
    </div>
  );
}
