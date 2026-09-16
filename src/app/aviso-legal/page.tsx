import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Aviso legal de Calculadora IRPF 2025: identificación del titular, condiciones de uso y responsabilidad.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Aviso legal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Última actualización: septiembre de 2026
          </p>

          <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                1. Datos del titular
              </h2>
              <p className="mt-2">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de
                julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE), se informa de los siguientes
                datos: el sitio web {SITE_URL} (en adelante, &quot;el
                sitio&quot;) es operado por{" "}
                <strong>David</strong>,
                con domicilio a
                efectos de notificaciones en{" "}
                <strong>ESPAÑA</strong>. Para cualquier
                consulta puede contactarse a través de{" "}
                <strong>davidcass97@hotmail.com</strong>.
              </p>
              <p className="mt-2 text-xs text-amber-700">
                Nota: estos datos de identificación deben completarse con la
                información real del titular antes de la publicación
                definitiva del sitio, tal y como exige la LSSI-CE.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                2. Objeto
              </h2>
              <p className="mt-2">
                El sitio ofrece una herramienta gratuita de simulación del
                Impuesto sobre la Renta de las Personas Físicas (IRPF) en
                España, con fines meramente informativos y orientativos. El
                acceso y uso del sitio implica la aceptación de las
                condiciones recogidas en este aviso legal.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                3. Condiciones de uso y exención de responsabilidad
              </h2>
              <p className="mt-2">
                Los cálculos ofrecidos por la calculadora son estimaciones
                basadas en la normativa general del IRPF y en tipos
                autonómicos aproximados; no constituyen asesoramiento fiscal,
                legal ni financiero, y no sustituyen la declaración oficial
                ante la Agencia Estatal de Administración Tributaria ni el
                asesoramiento de un profesional colegiado. El titular no
                garantiza la exactitud, vigencia o exhaustividad de los
                resultados y no será responsable de las decisiones tomadas a
                partir de ellos.
              </p>
              <p className="mt-2">
                Todos los cálculos se realizan localmente en el navegador del
                usuario; el titular no recibe, almacena ni procesa los
                importes o datos fiscales introducidos en el formulario.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                4. Propiedad intelectual e industrial
              </h2>
              <p className="mt-2">
                El diseño, el código fuente, los textos, los gráficos y demás
                contenidos del sitio son propiedad del titular o se utilizan
                con la correspondiente autorización, y están protegidos por
                la normativa de propiedad intelectual e industrial. Queda
                prohibida su reproducción, distribución o comunicación pública
                total o parcial sin autorización expresa, salvo uso personal
                y no comercial.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                5. Enlaces a terceros
              </h2>
              <p className="mt-2">
                El sitio puede mostrar contenido publicitario o enlaces
                gestionados por terceros (por ejemplo, Google AdSense). El
                titular no controla ni se responsabiliza del contenido,
                políticas de privacidad o prácticas de los sitios enlazados.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                6. Legislación aplicable
              </h2>
              <p className="mt-2">
                Este aviso legal se rige por la legislación española. Para
                cualquier controversia derivada del uso del sitio serán
                competentes los juzgados y tribunales que correspondan según
                la normativa vigente en materia de protección de
                consumidores.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
