import ComunidadComparadorTable from "./ComunidadComparadorTable";
import { IrpfInput } from "@/lib/types";

export default function ComunidadComparadorSection({
  input,
}: {
  input: IrpfInput;
}) {
  return (
    <details className="no-print group rounded-2xl border border-slate-200 bg-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-slate-900 marker:content-none sm:px-6">
        <span>
          ¿Cuánto pagarías en otra comunidad autónoma con tu mismo salario?
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-slate-100 p-5 pt-4 sm:p-6 sm:pt-4">
        <p className="mb-4 text-sm text-slate-500">
          Comparativa de la cuota de IRPF en las 19 comunidades y ciudades
          autónomas, manteniendo el resto de tus datos (salario, situación
          familiar y aportaciones) constantes.
        </p>
        <ComunidadComparadorTable
          input={input}
          highlightId={input.comunidadAutonoma}
        />
      </div>
    </details>
  );
}
