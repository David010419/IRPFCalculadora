export type TramoEdad = "menor65" | "mayor65";
export type SituacionFamiliar = "soltero" | "pareja" | "hijos";

export interface IrpfInput {
  salarioBruto: number;
  comunidadAutonoma: string;
  tramoEdad: TramoEdad;
  situacionFamiliar: SituacionFamiliar;
  numHijos: number;
  hijosMenores3: number;
  tributacionConjunta: boolean;
  retenciones: number;
}

export interface TaxBracket {
  limit: number;
  rate: number;
}

export interface IrpfResult {
  input: IrpfInput;
  rendimientoIntegro: number;
  cotizacionesSS: number;
  gastoGenerico: number;
  rendimientoNetoPrevio: number;
  reduccionTrabajo: number;
  rendimientoNetoTrabajo: number;
  baseLiquidableGeneral: number;
  minimoContribuyente: number;
  minimoDescendientes: number;
  reduccionConjunta: number;
  minimoTotal: number;
  cuotaIntegraEstatal: number;
  cuotaIntegraAutonomica: number;
  cuotaIntegraTotal: number;
  cuotaLiquidaTotal: number;
  retenciones: number;
  resultado: number;
  esDevolucion: boolean;
  tipoMedioEfectivo: number;
  tipoMarginal: number;
  salarioNetoAnual: number;
  salarioNetoMensual12: number;
  salarioNetoMensual14: number;
  tipoRetencionRecomendado: number;
}
