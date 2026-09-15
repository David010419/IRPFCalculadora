import {
  ESTATAL_SCALE,
  GASTO_GENERICO,
  LIMITE_REDUCCION_PLAN_PENSIONES,
  MINIMO_ADICIONAL_MAYOR65,
  MINIMO_ADICIONAL_MENOR3,
  MINIMO_CONTRIBUYENTE_GENERAL,
  MINIMO_HIJOS,
  REDUCCION_CONJUNTA,
  REDUCCION_TRABAJO_COEF,
  REDUCCION_TRABAJO_MAX,
  REDUCCION_TRABAJO_UMBRAL_1,
  REDUCCION_TRABAJO_UMBRAL_2,
  TIPO_SS_TRABAJADOR,
  TOPE_MAX_SS_ANUAL,
  getAutonomicScale,
} from "./taxData";
import { IrpfInput, IrpfResult, TaxBracket } from "./types";

function scaleTax(base: number, brackets: TaxBracket[]): number {
  if (base <= 0) return 0;
  let tax = 0;
  let prevLimit = 0;
  for (const bracket of brackets) {
    if (base > bracket.limit) {
      tax += (bracket.limit - prevLimit) * (bracket.rate / 100);
      prevLimit = bracket.limit;
    } else {
      tax += (base - prevLimit) * (bracket.rate / 100);
      return tax;
    }
  }
  return tax;
}

function marginalRate(base: number, brackets: TaxBracket[]): number {
  for (const bracket of brackets) {
    if (base <= bracket.limit) return bracket.rate;
  }
  return brackets[brackets.length - 1].rate;
}

function calcularReduccionTrabajo(rendimientoNetoPrevio: number): number {
  if (rendimientoNetoPrevio <= 0) return 0;
  if (rendimientoNetoPrevio <= REDUCCION_TRABAJO_UMBRAL_1) {
    return REDUCCION_TRABAJO_MAX;
  }
  if (rendimientoNetoPrevio <= REDUCCION_TRABAJO_UMBRAL_2) {
    const reduccion =
      REDUCCION_TRABAJO_MAX -
      REDUCCION_TRABAJO_COEF * (rendimientoNetoPrevio - REDUCCION_TRABAJO_UMBRAL_1);
    return Math.max(0, reduccion);
  }
  return 0;
}

function calcularMinimoDescendientes(numHijos: number, hijosMenores3: number): number {
  if (numHijos <= 0) return 0;
  let total = 0;
  for (let i = 0; i < numHijos; i++) {
    total += MINIMO_HIJOS[Math.min(i, MINIMO_HIJOS.length - 1)];
  }
  total += Math.min(hijosMenores3, numHijos) * MINIMO_ADICIONAL_MENOR3;
  return total;
}

export function calcularIrpf(input: IrpfInput): IrpfResult {
  const salarioBruto = Math.max(0, input.salarioBruto);

  const cotizacionesSS =
    Math.min(salarioBruto, TOPE_MAX_SS_ANUAL) * TIPO_SS_TRABAJADOR;

  const gastoGenerico = GASTO_GENERICO;

  const rendimientoNetoPrevio = Math.max(
    0,
    salarioBruto - cotizacionesSS - gastoGenerico
  );

  const reduccionTrabajo = calcularReduccionTrabajo(rendimientoNetoPrevio);

  const rendimientoNetoTrabajo = Math.max(
    0,
    rendimientoNetoPrevio - reduccionTrabajo
  );

  const reduccionPlanPensiones = Math.min(
    Math.max(0, input.aportacionPlanPensiones),
    LIMITE_REDUCCION_PLAN_PENSIONES,
    rendimientoNetoTrabajo
  );

  const baseLiquidableGeneral = rendimientoNetoTrabajo - reduccionPlanPensiones;

  const minimoContribuyente =
    MINIMO_CONTRIBUYENTE_GENERAL +
    (input.tramoEdad === "mayor65" ? MINIMO_ADICIONAL_MAYOR65 : 0);

  const minimoDescendientes =
    input.situacionFamiliar === "hijos"
      ? calcularMinimoDescendientes(input.numHijos, input.hijosMenores3)
      : 0;

  const reduccionConjunta =
    input.situacionFamiliar === "pareja" && input.tributacionConjunta
      ? REDUCCION_CONJUNTA
      : 0;

  const minimoTotal = minimoContribuyente + minimoDescendientes + reduccionConjunta;

  const autonomicScale = getAutonomicScale(input.comunidadAutonoma);

  const cuotaIntegraEstatal = Math.max(
    0,
    scaleTax(baseLiquidableGeneral, ESTATAL_SCALE) -
      scaleTax(minimoTotal, ESTATAL_SCALE)
  );

  const cuotaIntegraAutonomica = Math.max(
    0,
    scaleTax(baseLiquidableGeneral, autonomicScale) -
      scaleTax(minimoTotal, autonomicScale)
  );

  const cuotaIntegraTotal = cuotaIntegraEstatal + cuotaIntegraAutonomica;
  const cuotaLiquidaTotal = cuotaIntegraTotal;

  const retenciones = Math.max(0, input.retenciones);
  const resultado = retenciones - cuotaLiquidaTotal;
  const esDevolucion = resultado >= 0;

  const tipoMedioEfectivo =
    salarioBruto > 0 ? (cuotaLiquidaTotal / salarioBruto) * 100 : 0;

  const tipoMarginal =
    marginalRate(baseLiquidableGeneral, ESTATAL_SCALE) +
    marginalRate(baseLiquidableGeneral, autonomicScale);

  const salarioNetoAnual = salarioBruto - cotizacionesSS - cuotaLiquidaTotal;
  const salarioNetoMensual12 = salarioNetoAnual / 12;
  const salarioNetoMensual14 = salarioNetoAnual / 14;

  const tipoRetencionRecomendado =
    salarioBruto > 0 ? (cuotaLiquidaTotal / salarioBruto) * 100 : 0;

  return {
    input,
    rendimientoIntegro: salarioBruto,
    cotizacionesSS,
    gastoGenerico,
    rendimientoNetoPrevio,
    reduccionTrabajo,
    rendimientoNetoTrabajo,
    reduccionPlanPensiones,
    baseLiquidableGeneral,
    minimoContribuyente,
    minimoDescendientes,
    reduccionConjunta,
    minimoTotal,
    cuotaIntegraEstatal,
    cuotaIntegraAutonomica,
    cuotaIntegraTotal,
    cuotaLiquidaTotal,
    retenciones,
    resultado,
    esDevolucion,
    tipoMedioEfectivo,
    tipoMarginal,
    salarioNetoAnual,
    salarioNetoMensual12,
    salarioNetoMensual14,
    tipoRetencionRecomendado,
  };
}
