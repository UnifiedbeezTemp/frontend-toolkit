export function compareValues(a: unknown, b: unknown): boolean {
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase() === b.toLowerCase();
  }
  if (a == null || b == null) {
    return a === b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a === b;
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    return a === b;
  }
  return String(a).toLowerCase() === String(b).toLowerCase();
}

export function filterDuplicateStrings(stringList: string[]) {
    const uniqueStringsSet = new Set();
    for (const item of stringList) {
        if (typeof item === 'string') {
            const normalizedString = item.trim().toLowerCase();
            uniqueStringsSet.add(normalizedString);
        }
    }
    return Array.from(uniqueStringsSet);
}