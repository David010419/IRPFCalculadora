export interface FaqEntry {
  question: string;
  answer: string;
}

export const PENSION_FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "¿Cómo se calcula realmente la base reguladora?",
    answer:
      "Se calcula con la media de tus bases de cotización mensuales de un periodo de referencia (que se está ampliando progresivamente de 25 a 29 años entre 2026 y 2044, descartando los peores meses), revalorizadas según la evolución del IPC. No es tu salario actual: si tu sueldo ha subido o bajado a lo largo de tu vida laboral, la base reguladora real puede diferir bastante de esta estimación, que solo usa tu salario actual como aproximación.",
  },
  {
    question: "¿Cuántos años tengo que cotizar para cobrar el 100%?",
    answer:
      "Durante el periodo de transición actual, hacen falta aproximadamente 36 años y 6 meses cotizados para alcanzar el 100% de la base reguladora; esta cifra subirá hasta 37 años en 2027. Con 15 años cotizados (el mínimo legal) se accede a un 50% de la base reguladora.",
  },
  {
    question: "¿A qué edad me puedo jubilar?",
    answer:
      "En el periodo de transición actual, con al menos 38 años y 3 meses cotizados puedes jubilarte a los 65 años; con menos años cotizados, la edad ordinaria de jubilación es de 66 años y 8 meses aproximadamente. Ambas cifras siguen subiendo cada año hasta 2027, y existen además modalidades de jubilación anticipada o demorada no calculadas aquí.",
  },
  {
    question: "¿Por qué mi pensión real puede ser distinta a esta estimación?",
    answer:
      "Porque el cálculo oficial usa tu historial real de cotizaciones (no un salario plano), aplica el tope máximo y mínimo legal de pensión, e incluye complementos (por ejemplo, por brecha de género o por demora en la jubilación) y coeficientes reductores si te jubilas antes de la edad ordinaria. Ninguno de esos ajustes se calcula en este simulador.",
  },
  {
    question: "¿Dónde consulto mi cálculo oficial?",
    answer:
      "En la sede electrónica de la Seguridad Social (Tu Seguridad Social) puedes consultar tu vida laboral completa y un simulador que sí usa tus datos reales de cotización, mucho más preciso que cualquier estimación genérica como esta.",
  },
];
