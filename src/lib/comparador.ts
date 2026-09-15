import { calcularIrpf } from "./calculator";
import { COMUNIDADES_AUTONOMAS, ComunidadAutonoma } from "./taxData";
import { IrpfInput, IrpfResult } from "./types";

export interface ComparadorRow {
  comunidad: ComunidadAutonoma;
  result: IrpfResult;
}

export function compararComunidades(input: IrpfInput): ComparadorRow[] {
  const rows = COMUNIDADES_AUTONOMAS.map((comunidad) => ({
    comunidad,
    result: calcularIrpf({ ...input, comunidadAutonoma: comunidad.id }),
  }));

  return rows.sort((a, b) => a.result.cuotaLiquidaTotal - b.result.cuotaLiquidaTotal);
}

export function rankComunidad(
  comunidadId: string,
  input: IrpfInput
): { rank: number; total: number } {
  const rows = compararComunidades(input);
  const index = rows.findIndex((row) => row.comunidad.id === comunidadId);
  return { rank: index + 1, total: rows.length };
}
