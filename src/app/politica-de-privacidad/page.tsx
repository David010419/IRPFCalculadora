import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de Calculadora IRPF 2025: qué datos se tratan, con qué finalidad y cómo ejercer tus derechos RGPD.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Política de privacidad
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Última actualización: septiembre de 2026
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                1. Responsable del tratamiento
              </h2>
              <p className="mt-2">
                El responsable del tratamiento de los datos personales
                relacionados con este sitio ({SITE_URL}) es{" "}
                <strong>David</strong>, contactable en{" "}
                <strong>davidcass97@hotmail.com</strong>. Puedes
                consultar el resto de datos de identificación en el{" "}
                <a href="/aviso-legal" className="text-blue-600 hover:underline">
                  aviso legal
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                2. Tus datos fiscales nunca salen de tu navegador
              </h2>
              <p className="mt-2">
                La calculadora de IRPF funciona íntegramente en el lado del
                cliente: el salario, las retenciones, la comunidad autónoma o
                cualquier otro dato que introduzcas en el formulario{" "}
                <strong>no se envía a ningún servidor</strong>, no se
                almacena en bases de datos ni es accesible por el titular del
                sitio. Los cálculos se realizan con JavaScript directamente en
                tu dispositivo. La única persistencia es un guardado local en
                tu propio navegador (localStorage) para que no tengas que
                volver a rellenar el formulario si cierras la pestaña; ese
                guardado nunca sale de tu equipo y puedes borrarlo en
                cualquier momento desde los ajustes de tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                3. Datos que sí podemos tratar
              </h2>
              <p className="mt-2">
                Si aceptas las cookies no esenciales a través del banner de
                consentimiento, se pueden recoger datos de navegación
                (páginas visitadas, dispositivo, ubicación aproximada) con
                fines analíticos y, en su caso, para mostrar publicidad
                personalizada a través de Google AdSense. Estos datos los
                trata Google como encargado o responsable independiente del
                tratamiento, según su propia política de privacidad. Consulta
                el detalle de cookies utilizadas en nuestra{" "}
                <a
                  href="/politica-de-cookies"
                  className="text-blue-600 hover:underline"
                >
                  política de cookies
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                4. Base legal y finalidad
              </h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Consentimiento</strong> (art. 6.1.a RGPD): para
                  cookies analíticas y publicitarias no esenciales.
                </li>
                <li>
                  <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para el
                  funcionamiento básico y la seguridad del sitio.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                5. Conservación de los datos
              </h2>
              <p className="mt-2">
                Los datos de navegación tratados por cookies se conservan
                durante el plazo establecido por cada proveedor (ver política
                de cookies) o hasta que revoques tu consentimiento.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                6. Tus derechos
              </h2>
              <p className="mt-2">
                Puedes ejercer tus derechos de acceso, rectificación,
                supresión, oposición, limitación del tratamiento y
                portabilidad escribiendo a{" "}
                <strong>davidcass97@hotmail.com</strong>. También tienes derecho a
                presentar una reclamación ante la Agencia Española de
                Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.aepd.es
                </a>
                ) si consideras que el tratamiento no se ajusta a la
                normativa vigente.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                7. Cambios en esta política
              </h2>
              <p className="mt-2">
                Esta política puede actualizarse para adaptarse a novedades
                legislativas o cambios en el funcionamiento del sitio. Te
                recomendamos revisarla periódicamente.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
