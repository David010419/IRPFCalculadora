export interface FaqEntry {
  question: string;
  answer: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "¿Qué diferencia hay entre salario bruto y salario neto?",
    answer:
      "El salario bruto es el total que figura en tu contrato, antes de restar nada. El salario neto es lo que realmente llega a tu cuenta cada mes, después de descontar las cotizaciones a la Seguridad Social y la retención de IRPF: Neto = Bruto − Seguridad Social − Retención de IRPF.",
  },
  {
    question: "¿Qué son las retenciones y por qué me las quitan cada mes?",
    answer:
      "La retención de IRPF es un adelanto a cuenta del impuesto que probablemente te corresponderá pagar ese año. La empresa te la descuenta cada mes y la ingresa en Hacienda. En la Declaración de la Renta se calcula la cuota real: si retuvieron de más, te devuelven la diferencia; si retuvieron de menos, tienes que pagarla.",
  },
  {
    question: "¿Qué es la base imponible y la base liquidable?",
    answer:
      "El rendimiento neto del trabajo es el salario bruto menos las cotizaciones a la Seguridad Social, un gasto deducible genérico de 2.000 euros y, si procede, una reducción adicional por trabajo. La base imponible es la suma de tus rendimientos netos, y la base liquidable es la base imponible menos otras reducciones adicionales, como aportaciones a planes de pensiones.",
  },
  {
    question: "¿Qué es el mínimo personal y familiar?",
    answer:
      "Es la parte de tus ingresos que se considera necesaria para vivir y que no tributa. Todos los contribuyentes tienen un mínimo de 5.550 euros anuales (6.700 si tienes 65 años o más), que aumenta si tienes hijos a cargo o, en matrimonios, si optáis por la tributación conjunta.",
  },
  {
    question: "¿Por qué se habla de tramos? Tipo marginal vs. tipo medio",
    answer:
      "El IRPF es progresivo por tramos: cada tramo de tu base liquidable paga un tipo distinto y creciente. El tipo marginal es el porcentaje que se aplica al último euro ganado (el tramo más alto alcanzado). El tipo medio efectivo es el porcentaje real que pagas sobre el total de tu salario, y siempre es más bajo que el marginal.",
  },
  {
    question: "¿Por qué hay una cuota estatal y otra autonómica?",
    answer:
      "El IRPF está cedido parcialmente a las comunidades autónomas: el 50% de la tarifa lo fija el Estado, igual en toda España, y el otro 50% lo fija cada comunidad autónoma con sus propios tramos y tipos. Por eso, con el mismo salario, la cuota final varía según la comunidad autónoma de residencia fiscal.",
  },
  {
    question: "¿Qué son las cotizaciones a la Seguridad Social?",
    answer:
      "Es tu aportación al sistema público de pensiones, sanidad y prestaciones como el paro, distinta del IRPF. Se calcula como un porcentaje del salario (aproximadamente un 6,4% a cargo del trabajador) y se descuenta directamente en la nómina antes de calcular la base sobre la que se aplica el IRPF.",
  },
  {
    question: "¿Por qué me sale \"a pagar\" o \"a devolver\"?",
    answer:
      "Es la diferencia entre lo que ya te retuvieron durante el año y lo que realmente corresponde pagar según el cálculo final. Si las retenciones fueron mayores que la cuota, Hacienda te devuelve la diferencia; si fueron menores, hay que pagarla. La cuota real es la misma en ambos casos, solo cambia cuánto se había adelantado.",
  },
  {
    question: "¿Qué son los gastos deducibles y las reducciones?",
    answer:
      "Son cantidades que la ley permite restar antes de calcular el impuesto. Los más comunes para rentas del trabajo son el gasto genérico de 2.000 euros y la reducción por rendimientos del trabajo, que beneficia especialmente a los salarios más bajos y se reduce a medida que el salario sube, hasta desaparecer.",
  },
];
