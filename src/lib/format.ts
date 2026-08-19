export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true,
  }).format(value);
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
