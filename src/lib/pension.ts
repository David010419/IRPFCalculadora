import { TOPE_MAX_SS_ANUAL } from "./taxData";

/**
 * Modelo simplificado de la pensión contributiva de jubilación española
 * (Régimen General). Usa el salario actual como proxy plano de la base
 * reguladora real (que en la práctica se calcula con el historial de
 * bases de cotización de los últimos ~25-29 años, revalorizadas) y una
 * interpolación lineal del porcentaje aplicable entre los 15 años
 * cotizados (50%) y el mínimo de años para el 100% en el periodo de
 * transición vigente. Es una estimación orientativa, no un cálculo
 * oficial de la Seguridad Social.
 */

export const ANOS_MINIMOS_PENSION = 15;
export const ANOS_PARA_PENSION_COMPLETA = 36.5; // años y meses de transición 2024-2027 hacia el 100%
export const PORCENTAJE_MINIMO = 50;
export const PORCENTAJE_MAXIMO = 100;
export const PAGAS_PENSION_ANUAL = 14;
export const TOPE_MAX_BASE_MENSUAL = TOPE_MAX_SS_ANUAL / 12;
export const EDAD_JUBILACION_CON_CARRERA_COMPLETA = 65;
export const EDAD_JUBILACION_GENERAL = 66.67; // 66 años y 8 meses aprox., valor de transición 2025/2026
export const ANOS_CARRERA_COMPLETA_EDAD = 38.25; // 38 años y 3 meses, valor de transición 2025

export interface PensionInput {
  salarioBrutoAnual: number;
  anosCotizados: number;
  edadActual: number;
}

export interface PensionResult {
  input: PensionInput;
  baseReguladoraMensual: number;
  porcentajeAplicable: number;
  pensionMensualEstimada: number;
  pensionAnualEstimada: number;
  salarioMensualActual: number;
  tasaSustitucion: number;
  cumpleMinimo: boolean;
  edadJubilacionEstimadaAnos: number;
  anosParaJubilacion: number;
}

export function calcularPorcentajeAplicable(anosCotizados: number): number {
  if (anosCotizados < ANOS_MINIMOS_PENSION) return 0;
  if (anosCotizados >= ANOS_PARA_PENSION_COMPLETA) return PORCENTAJE_MAXIMO;
  const progreso =
    (anosCotizados - ANOS_MINIMOS_PENSION) /
    (ANOS_PARA_PENSION_COMPLETA - ANOS_MINIMOS_PENSION);
  return PORCENTAJE_MINIMO + progreso * (PORCENTAJE_MAXIMO - PORCENTAJE_MINIMO);
}

export function calcularPension(input: PensionInput): PensionResult {
  const salarioBrutoAnual = Math.max(0, input.salarioBrutoAnual);
  const anosCotizados = Math.max(0, input.anosCotizados);
  const edadActual = Math.max(0, input.edadActual);

  const salarioMensualActual = salarioBrutoAnual / 12;
  const baseReguladoraMensual = Math.min(
    salarioMensualActual,
    TOPE_MAX_BASE_MENSUAL
  );

  const porcentajeAplicable = calcularPorcentajeAplicable(anosCotizados);
  const cumpleMinimo = anosCotizados >= ANOS_MINIMOS_PENSION;

  const pensionMensualEstimada = cumpleMinimo
    ? baseReguladoraMensual * (porcentajeAplicable / 100)
    : 0;
  const pensionAnualEstimada = pensionMensualEstimada * PAGAS_PENSION_ANUAL;

  const tasaSustitucion =
    salarioMensualActual > 0
      ? (pensionMensualEstimada / salarioMensualActual) * 100
      : 0;

  const edadJubilacionEstimadaAnos =
    anosCotizados >= ANOS_CARRERA_COMPLETA_EDAD
      ? EDAD_JUBILACION_CON_CARRERA_COMPLETA
      : EDAD_JUBILACION_GENERAL;
  const anosParaJubilacion = Math.max(
    0,
    edadJubilacionEstimadaAnos - edadActual
  );

  return {
    input: { salarioBrutoAnual, anosCotizados, edadActual },
    baseReguladoraMensual,
    porcentajeAplicable,
    pensionMensualEstimada,
    pensionAnualEstimada,
    salarioMensualActual,
    tasaSustitucion,
    cumpleMinimo,
    edadJubilacionEstimadaAnos,
    anosParaJubilacion,
  };
}
