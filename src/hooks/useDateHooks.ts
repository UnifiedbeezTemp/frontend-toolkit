
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const YEARS = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() + i,
);

export const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);

export const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);

export const PERIODS = ["AM", "PM"];

export const TIMES = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour} ${ampm}`;
});

export const getDaysInMonth = (month: string, year: number) => {
  const monthIndex = MONTHS.indexOf(month);
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getSupportedTimezones = () => {
  try {
    return (Intl as any).supportedValuesOf("timeZone") as string[];
  } catch (e) {
    console.error("Browser does not support Intl.supportedValuesOf('timeZone')", e);
    return [
      "UTC",
      "America/New_York",
      "America/Los_Angeles",
      "Europe/London",
      "Asia/Tokyo",
    ];
  }
};
