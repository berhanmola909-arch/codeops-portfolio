export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export function relativeTime(date) {
  const diff = new Date(date) - new Date();
  const minutes = Math.round(diff / 60000);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    minutes,
    "minute"
  );
}