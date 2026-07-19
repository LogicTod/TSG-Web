const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const timeFormatter = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",
});

export function formatEventDate(dateString: string) {
  return dateFormatter.format(new Date(dateString));
}

export function formatEventDateTime(dateString: string) {
  const date = new Date(dateString);
  return `${timeFormatter.format(date)} WIB - ${dateFormatter.format(date)}`;
}
