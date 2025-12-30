export function isString(val: unknown): val is string {
  return typeof val === "string";
}

export function isNumber(val: unknown): val is number {
  return typeof val === "number" && !isNaN(val);
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === "boolean";
}

export function isArray<T = unknown>(val: unknown): val is T[] {
  return Array.isArray(val);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

export function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === "undefined";
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

