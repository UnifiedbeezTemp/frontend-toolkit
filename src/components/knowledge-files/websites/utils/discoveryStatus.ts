export function normalizeDiscoveryStatus(status?: string): string | undefined {
  const trimmed = status?.trim();
  if (!trimmed) return undefined;
  return trimmed.toUpperCase();
}

export function isDiscoveryCompleted(status?: string): boolean {
  return normalizeDiscoveryStatus(status) === "COMPLETED";
}

export function isDiscoveryInProgress(status?: string): boolean {
  const normalized = normalizeDiscoveryStatus(status);
  return normalized === "PENDING" || normalized === "DISCOVERING";
}

