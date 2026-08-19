import { TaxBracket } from "./types";

/**
 * Datos fiscales orientativos IRPF España 2024/2025.
 * Los tramos autonómicos se han unificado a los mismos límites de base
 * liquidable que la escala estatal para simplificar el cálculo; los tipos
 * por tramo son aproximados según la normativa autonómica publicada.
 * Verifica siempre los datos oficiales en la Agencia Tributaria o tu
 * Hacienda autonómica antes de tomar decisiones fiscales.
 */

export const ANIO_FISCAL = "2024 / 2025";

// Escala general estatal (idéntica en toda España, mitad estatal del IRPF)
export const ESTATAL_LIMITS = [12450, 20200, 35200, 60000, 300000, Infinity];
export const ESTATAL_RATES = [9.5, 12, 15, 18.5, 22.5, 24.5];

export const ESTATAL_SCALE: TaxBracket[] = ESTATAL_LIMITS.map((limit, i) => ({
  limit,
  rate: ESTATAL_RATES[i],
}));

// Tipos autonómicos aproximados por tramo (mismos límites que la escala estatal)
const AUTONOMIC_RATES: Record<string, number[]> = {
  andalucia: [9.5, 11.2, 13.3, 15.5, 17.9, 22.5],
  aragon: [10.0, 12.5, 15.5, 19.0, 21.5, 23.5],
  asturias: [10.0, 12.5, 15.5, 19.5, 25.0, 25.5],
  baleares: [9.5, 11.75, 14.75, 17.75, 22.0, 23.5],
  canarias: [9.0, 11.5, 14.0, 17.5, 21.5, 23.5],
  cantabria: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  castillaLaMancha: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  castillaLeon: [9.0, 11.5, 14.5, 17.5, 21.5, 23.5],
  cataluna: [10.5, 12.0, 14.0, 17.0, 21.5, 25.5],
  extremadura: [10.5, 12.5, 15.5, 19.5, 23.5, 24.5],
  galicia: [9.0, 11.6, 14.6, 18.2, 21.4, 22.5],
  madrid: [9.0, 11.2, 13.3, 17.4, 18.5, 20.5],
  murcia: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  laRioja: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  valencia: [9.0, 11.0, 13.9, 17.9, 21.0, 23.5],
  paisVasco: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  navarra: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  ceuta: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
  melilla: [9.5, 12.0, 15.0, 18.5, 22.5, 24.5],
};

export interface ComunidadAutonoma {
  id: string;
  nombre: string;
  foral?: boolean;
}

export const COMUNIDADES_AUTONOMAS: ComunidadAutonoma[] = [
  { id: "andalucia", nombre: "Andalucía" },
  { id: "aragon", nombre: "Aragón" },
  { id: "asturias", nombre: "Asturias" },
  { id: "baleares", nombre: "Illes Balears" },
  { id: "canarias", nombre: "Canarias" },
  { id: "cantabria", nombre: "Cantabria" },
  { id: "castillaLaMancha", nombre: "Castilla-La Mancha" },
  { id: "castillaLeon", nombre: "Castilla y León" },
  { id: "cataluna", nombre: "Cataluña" },
  { id: "extremadura", nombre: "Extremadura" },
  { id: "galicia", nombre: "Galicia" },
  { id: "madrid", nombre: "Comunidad de Madrid" },
  { id: "murcia", nombre: "Región de Murcia" },
  { id: "laRioja", nombre: "La Rioja" },
  { id: "valencia", nombre: "Comunitat Valenciana" },
  { id: "paisVasco", nombre: "País Vasco", foral: true },
  { id: "navarra", nombre: "Navarra", foral: true },
  { id: "ceuta", nombre: "Ceuta" },
  { id: "melilla", nombre: "Melilla" },
];

export function getAutonomicScale(comunidadId: string): TaxBracket[] {
  const rates = AUTONOMIC_RATES[comunidadId] ?? ESTATAL_RATES;
  return ESTATAL_LIMITS.map((limit, i) => ({ limit, rate: rates[i] }));
}

// Cotizaciones a la Seguridad Social a cargo del trabajador (estimación 2025)
export const TIPO_SS_TRABAJADOR = 0.0647; // contingencias comunes + desempleo + FP + MEI
export const TOPE_MAX_SS_ANUAL = 58914; // base máxima de cotización anual aproximada

// Gasto deducible genérico (art. 19.2.f LIRPF)
export const GASTO_GENERICO = 2000;

// Mínimo del contribuyente
export const MINIMO_CONTRIBUYENTE_GENERAL = 5550;
export const MINIMO_ADICIONAL_MAYOR65 = 1150;

// Mínimo por descendientes (acumulativo por hijo)
export const MINIMO_HIJOS = [2400, 2700, 4000, 4500]; // 1º, 2º, 3º, 4º y siguientes
export const MINIMO_ADICIONAL_MENOR3 = 2800;

// Reducción por tributación conjunta (pareja/matrimonio no familia monoparental)
export const REDUCCION_CONJUNTA = 3400;

// Reducción por obtención de rendimientos del trabajo (art. 20 LIRPF, vigente desde 2023)
export const REDUCCION_TRABAJO_MAX = 6498;
export const REDUCCION_TRABAJO_UMBRAL_1 = 13115;
export const REDUCCION_TRABAJO_UMBRAL_2 = 16825;
export const REDUCCION_TRABAJO_COEF = 1.75;
