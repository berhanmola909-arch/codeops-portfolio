export const CURRENCY = "Br";

export function formatPrice(amount) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return `${CURRENCY} 0.00`;
  return `${CURRENCY} ${amount.toFixed(2)}`;
}