// Month names are formatted in UTC so the calendar month is never shifted by the runtime time zone
const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Formats a date string into a short month and year (e.g. "Jan 2024").
 * The year and month are read exactly as written in the string (e.g. "2024-01-01" or
 * "2024-01-31T23:30:00+05:30"), so the output is identical in every time zone.
 */
export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";

  const match = /^(\d{4})-(\d{2})/.exec(dateStr);
  if (!match) return dateStr;

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return dateStr;

  return monthYearFormatter.format(new Date(Date.UTC(year, monthIndex, 1)));
}

/**
 * Formats a career or project date range with an en dash (e.g. "Jan 2023 – Present" or "Jan 2023 – May 2024").
 */
export function formatDateRange(
  startDate?: string | null,
  endDate?: string | null,
  customEndDate?: string | null
): string {
  const start = formatDate(startDate);
  if (!start) return "";
  const end =
    endDate === "current"
      ? "Present"
      : formatDate(customEndDate) || "Present";
  return `${start} – ${end}`;
}
