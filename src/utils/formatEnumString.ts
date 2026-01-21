
export function formatEnumString(input: string | undefined | null): string {
  if (!input) return "";

  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
