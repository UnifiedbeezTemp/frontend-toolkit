const DEFAULT_ALLOWED_REDIRECT_ENV_KEYS = [
  "NEXT_PUBLIC_BASE",
  "NEXT_PUBLIC_AUTH_BASE",
  "NEXT_PUBLIC_BEEHIVE_BASE_URL",
  "NEXT_PUBLIC_BEEHIVE_URL",
  "NEXT_PUBLIC_MANUAL_ONBOARDING_BASE_URL",
  "NEXT_PUBLIC_AUTOMATIONS_LIBRARY_URL",
] as const;

interface SafeReturnToOptions {
  fallback?: string;
  allowedOrigins?: readonly string[];
}

function getBrowserOrigin(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.origin;
}

function decodeMaybeEncoded(value: string): string {
  let decoded = value.trim();

  for (let index = 0; index < 2; index += 1) {
    try {
      const nextDecoded = decodeURIComponent(decoded);
      if (nextDecoded === decoded) break;
      decoded = nextDecoded;
    } catch {
      break;
    }
  }

  return decoded;
}

function getOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function getEnvRedirectOrigins(): string[] {
  if (typeof process === "undefined") return [];

  const explicitOrigins = process.env.NEXT_PUBLIC_ALLOWED_RETURN_TO_ORIGINS
    ? process.env.NEXT_PUBLIC_ALLOWED_RETURN_TO_ORIGINS.split(/[\s,]+/)
    : [];

  return [
    ...DEFAULT_ALLOWED_REDIRECT_ENV_KEYS.map((key) => process.env[key]),
    ...explicitOrigins,
  ]
    .filter((value): value is string => Boolean(value))
    .map(getOrigin)
    .filter((origin): origin is string => Boolean(origin));
}

function getAllowedOrigins(extraOrigins: readonly string[] = []): Set<string> {
  const origins = new Set<string>();
  const browserOrigin = getBrowserOrigin();

  if (browserOrigin) origins.add(browserOrigin);

  for (const origin of [...getEnvRedirectOrigins(), ...extraOrigins]) {
    const normalizedOrigin = getOrigin(origin) ?? origin;
    if (normalizedOrigin) origins.add(normalizedOrigin);
  }

  return origins;
}

function isRelativePath(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//");
}

export function safeReturnTo(
  value: string | null | undefined,
  options: SafeReturnToOptions = {},
): string | null {
  const fallback = options.fallback ?? null;
  if (!value) return fallback;

  const trimmedValue = decodeMaybeEncoded(value);
  if (!trimmedValue || /[\u0000-\u001F\u007F]/.test(trimmedValue)) {
    return fallback;
  }

  const browserOrigin = getBrowserOrigin();
  const allowedOrigins = getAllowedOrigins(options.allowedOrigins);

  try {
    const url = browserOrigin
      ? new URL(trimmedValue, browserOrigin)
      : new URL(trimmedValue);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return fallback;
    }

    if (!allowedOrigins.has(url.origin)) return fallback;

    if (isRelativePath(trimmedValue)) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return url.href;
  } catch {
    return fallback;
  }
}

export function getCurrentLocationReturnTo(fallback = "/"): string {
  if (typeof window === "undefined") return fallback;
  return safeReturnTo(window.location.href, { fallback }) ?? fallback;
}

export function buildUrlWithReturnTo(
  baseUrl: string,
  path: string,
  returnTo = getCurrentLocationReturnTo(),
): string {
  const base = baseUrl || getBrowserOrigin() || "http://localhost";
  const url = new URL(path, base);
  const safeValue = safeReturnTo(returnTo, { fallback: "/" }) ?? "/";
  url.searchParams.set("returnTo", safeValue);
  return url.toString();
}

export function buildUrlWithParams(
  baseUrl: string,
  params: Record<string, string | number | null | undefined>,
): string {
  const base = baseUrl || getBrowserOrigin() || "http://localhost";
  const url = new URL(base);

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    url.searchParams.set(key, String(value));
  }

  return url.toString();
}
