import type { ReactNode } from "react";

interface EducationItem {
  pregunta: string;
  respuesta: ReactNode;
}

const ITEMS: EducationItem[] = [
  {
    pregunta: "¿Qué diferencia hay entre salario bruto y salario neto?",
    respuesta: (
      <>
        <p>
          El <strong>salario bruto</strong> es lo que figura en tu contrato:
          el total que tu empresa se compromete a pagarte antes de restar
          nada. El <strong>salario neto</strong> es lo que realmente llega a
          tu cuenta cada mes, después de que la empresa te descuente dos
          cosas en la nómina: tus <strong>cotizaciones a la Seguridad
          Social</strong> y tu <strong>retención de IRPF</strong>.
        </p>
        <p>
          Es decir: Neto = Bruto − Seguridad Social − Retención de IRPF. La
          empresa actúa como intermediaria: te descuenta esas cantidades y
          las ingresa directamente a la Seguridad Social y a Hacienda en tu
          nombre.
        </p>
      </>
    ),
  },
  {
    pregunta: "¿Qué son las retenciones y por qué me las quitan cada mes?",
    respuesta: (
      <>
        <p>
          La retención de IRPF es un <strong>adelanto a cuenta</strong> del
          impuesto que Hacienda calcula que probablemente te corresponderá
          pagar ese año, según tu salario, tu situación familiar y tu
          comunidad autónoma. La empresa te la descuenta cada mes y se la
          ingresa a Hacienda por adelantado.
        </p>
        <p>
          Cuando llega la Declaración de la Renta (entre abril y junio del
          año siguiente), Hacienda calcula tu <strong>cuota real</strong> de
          IRPF con los datos definitivos del año. Si lo que te retuvieron es{" "}
          <strong>más</strong> de lo que realmente debías pagar, te devuelven
          la diferencia. Si te retuvieron <strong>menos</strong>, tienes que
          pagar la diferencia. Por eso esta calculadora compara tus
          retenciones con la cuota calculada.
        </p>
      </>
    ),
  },
  {
    pregunta: "¿Qué es la base imponible y la base liquidable?",
    respuesta: (
      <>
        <p>
          Ninguna de las dos es tu salario bruto directamente; ambas son
          resultado de varios ajustes:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Rendimiento neto del trabajo:</strong> tu salario bruto
            menos las cotizaciones a la Seguridad Social, un gasto deducible
            genérico de 2.000 € y, si tienes ingresos bajos-medios, una
            reducción adicional por trabajo.
          </li>
          <li>
            <strong>Base imponible:</strong> la suma de tus rendimientos
            netos (en este simulador, solo el del trabajo).
          </li>
          <li>
            <strong>Base liquidable:</strong> la base imponible menos
            posibles reducciones adicionales (por ejemplo, aportaciones a
            planes de pensiones). Es la cifra sobre la que realmente se
            aplican los tramos del impuesto.
          </li>
        </ul>
      </>
    ),
  },
  {
    pregunta: "¿Qué es el mínimo personal y familiar?",
    respuesta: (
      <p>
        Es un tramo de tus ingresos que Hacienda considera necesario para
        vivir y que, por tanto, <strong>no tributa</strong>. Todo el mundo
        tiene un mínimo del contribuyente (5.550 € al año, o 6.700 € si tienes
        65 años o más), y se incrementa si tienes hijos a cargo o, en el caso
        de matrimonios, si optáis por la tributación conjunta. Cuanto mayor
        sea tu mínimo, menos base tributa y menor será tu cuota de IRPF.
      </p>
    ),
  },
  {
    pregunta: "¿Por qué se habla de tramos? Tipo marginal vs. tipo medio",
    respuesta: (
      <>
        <p>
          El IRPF es un impuesto <strong>progresivo por tramos</strong>: no
          se aplica un único porcentaje a todo tu sueldo, sino que cada
          &quot;tramo&quot; de tu base liquidable paga un tipo distinto, cada
          vez más alto. Por ejemplo, los primeros 12.450 € tributan al tipo
          más bajo, el siguiente tramo a un tipo algo mayor, y así
          sucesivamente.
        </p>
        <p>
          El <strong>tipo marginal</strong> es el porcentaje que se aplica al
          último euro que ganas (el tramo más alto que alcanzas). El{" "}
          <strong>tipo medio efectivo</strong> es el porcentaje real que
          pagas sobre el total de tu salario, y siempre es más bajo que el
          marginal. Es un error muy común pensar que &quot;si subo de tramo,
          pierdo dinero&quot;: solo tributa más el tramo superior, no todo tu
          sueldo.
        </p>
      </>
    ),
  },
  {
    pregunta: "¿Por qué hay una cuota estatal y otra autonómica?",
    respuesta: (
      <p>
        El IRPF está &quot;cedido&quot; parcialmente a las comunidades
        autónomas: el 50 % de la tarifa la fija el Estado (igual en toda
        España) y el otro 50 % lo fija cada comunidad autónoma con sus
        propios tramos y tipos. Por eso, con el mismo salario, la cuota final
        puede variar según dónde resides fiscalmente: comunidades como Madrid
        suelen tener tipos autonómicos más bajos, mientras que otras aplican
        tipos más altos en los tramos superiores.
      </p>
    ),
  },
  {
    pregunta: "¿Qué son las cotizaciones a la Seguridad Social?",
    respuesta: (
      <p>
        Es un descuento distinto al IRPF: no es un impuesto, sino tu
        aportación al sistema público de pensiones, sanidad y prestaciones
        (como el paro). Se calcula como un porcentaje de tu salario
        (aproximadamente un 6,4 % a cargo del trabajador) y se descuenta
        directamente en la nómina, antes incluso de calcular la base sobre la
        que se aplica el IRPF.
      </p>
    ),
  },
  {
    pregunta: "¿Por qué me sale \"a pagar\" o \"a devolver\"?",
    respuesta: (
      <p>
        Simplemente es la diferencia entre lo que ya te retuvieron durante el
        año (adelanto) y lo que realmente te corresponde pagar según el
        cálculo final. Si tus retenciones fueron generosas, Hacienda te debe
        dinero (a devolver). Si te retuvieron poco —por ejemplo, si cambiaste
        de empresa a mitad de año o tuviste varios pagadores— es probable que
        el resultado sea a pagar. Ninguno de los dos casos significa que
        pagues &quot;más&quot; o &quot;menos&quot; impuesto real: la cuota es
        la misma, solo cambia cuánto habías adelantado.
      </p>
    ),
  },
  {
    pregunta: "¿Qué son los gastos deducibles y las reducciones?",
    respuesta: (
      <p>
        Son cantidades que la ley te permite restar antes de calcular el
        impuesto, precisamente para no pagar por dinero que no es
        &quot;disponible&quot; realmente. En este simulador se aplican los
        más comunes para rentas del trabajo: el gasto genérico de 2.000 €
        (representa gastos de tener un empleo) y la reducción por
        rendimientos del trabajo, que beneficia especialmente a quienes
        cobran salarios más bajos y se va reduciendo a medida que el salario
        sube, hasta desaparecer.
      </p>
    ),
  },
];

export default function EducationSection() {
  return (
    <section className="no-print mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Entiende tu IRPF: guía rápida de conceptos
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Todo lo que normalmente nadie te explica sobre la nómina y la
          declaración de la renta, en lenguaje sencillo.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {ITEMS.map((item, i) => (
          <details key={i} className="group py-3" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-medium leading-snug text-slate-800 marker:content-none">
              <span className="pt-0.5">{item.pregunta}</span>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
              {item.respuesta}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
