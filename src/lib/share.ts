import { COMUNIDADES_AUTONOMAS } from "./taxData";
import { formatCurrency, formatPercent } from "./format";
import { IrpfResult } from "./types";

export function buildWhatsappSummary(result: IrpfResult, siteUrl?: string): string {
  const comunidad = COMUNIDADES_AUTONOMAS.find(
    (c) => c.id === result.input.comunidadAutonoma
  );

  const lineas = [
    "📊 Mi cálculo de IRPF 2025",
    "",
    `💰 Salario bruto anual: ${formatCurrency(result.rendimientoIntegro)}`,
    `📍 Comunidad autónoma: ${comunidad?.nombre ?? ""}`,
    `🧾 Cuota IRPF total: ${formatCurrency(result.cuotaLiquidaTotal)}`,
    `📈 Tipo medio efectivo: ${formatPercent(result.tipoMedioEfectivo)}`,
    `💶 Retenciones ya practicadas: ${formatCurrency(result.retenciones)}`,
    "",
    result.esDevolucion
      ? `✅ Resultado: A DEVOLVER ${formatCurrency(Math.abs(result.resultado))}`
      : `⚠️ Resultado: A PAGAR ${formatCurrency(Math.abs(result.resultado))}`,
  ];

  if (siteUrl) {
    lineas.push("", `Calculado con: ${siteUrl}`);
  }

  return lineas.join("\n");
}

export function buildWhatsappShareUrl(result: IrpfResult, siteUrl?: string): string {
  const text = buildWhatsappSummary(result, siteUrl);
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
