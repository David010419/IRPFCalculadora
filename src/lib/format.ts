export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true,
  }).format(value);
}

export function formatYearsMonths(years: number): string {
  const totalMonths = Math.round(years * 12);
  const wholeYears = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (months === 0) return `${wholeYears} años`;
  return `${wholeYears} años y ${months} ${months === 1 ? "mes" : "meses"}`;
}

export function formatPercent(value: number): string {
  return (
    new Intl.NumberFormat("es-ES", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      useGrouping: true,
    }).format(value) + " %"
  );
}
