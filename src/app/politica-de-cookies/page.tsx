import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ManageCookiesButton from "@/components/ManageCookiesButton";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Qué cookies usa Calculadora IRPF 2025, con qué finalidad y cómo aceptarlas, rechazarlas o revocar tu consentimiento en cualquier momento.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function PoliticaCookiesPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Política de cookies
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Última actualización: septiembre de 2026
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                ¿Qué son las cookies?
              </h2>
              <p className="mt-2">
                Las cookies son pequeños archivos de texto que un sitio web
                guarda en tu dispositivo cuando lo visitas. Incluimos en esta
                política también el almacenamiento local del navegador
                (localStorage), que cumple una función similar y está sujeto
                a la misma normativa (art. 22.2 de la Ley 34/2002, LSSI-CE).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Cookies que utilizamos
              </h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2 pr-4 font-medium">Tipo</th>
                      <th className="py-2 pr-4 font-medium">Finalidad</th>
                      <th className="py-2 font-medium">Requiere consentimiento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-900">
                        Técnicas / necesarias
                      </td>
                      <td className="py-2 pr-4">
                        Guardar tu elección de cookies y los valores que
                        rellenas en la calculadora (localStorage), para que
                        no se pierdan al recargar la página.
                      </td>
                      <td className="py-2">No</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-900">
                        Analíticas
                      </td>
                      <td className="py-2 pr-4">
                        Medir visitas y uso agregado del sitio para mejorarlo.
                      </td>
                      <td className="py-2">Sí</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-slate-900">
                        Publicidad
                      </td>
                      <td className="py-2 pr-4">
                        Mostrar anuncios de Google AdSense, personalizados si
                        aceptas esta categoría.
                      </td>
                      <td className="py-2">Sí</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                Cuando la publicidad esté activa, Google puede instalar
                cookies propias (por ejemplo, para medición de conversiones y
                personalización de anuncios). Puedes consultar el listado
                completo y actualizado en{" "}
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  policies.google.com/technologies/cookies
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                Cómo gestionar tus preferencias
              </h2>
              <p className="mt-2">
                Puedes aceptar o rechazar las cookies no esenciales desde el
                banner que aparece en tu primera visita. Si quieres cambiar tu
                decisión más adelante, usa el botón siguiente para volver a
                mostrar el banner:
              </p>
              <div className="mt-3">
                <ManageCookiesButton />
              </div>
              <p className="mt-3">
                También puedes bloquear o eliminar cookies desde la
                configuración de tu navegador; ten en cuenta que esto puede
                afectar al funcionamiento de otras webs.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
