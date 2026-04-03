export const toRgb = (color: string): string | null => {
  const value = color.trim();
  if (!value) return null;

  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex.length >= 6
          ? hex.slice(0, 6)
          : null;

    if (!normalized) return null;
    const int = Number.parseInt(normalized, 16);
    if (!Number.isFinite(int)) return null;

    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgb(${r}, ${g}, ${b})`;
  }

  if (value.toLowerCase().startsWith("rgb")) {
    return value.replace(/\s+/g, " ");
  }

  if (value.toLowerCase().startsWith("hsl")) {
    const match = value
      .replace(/\s+/g, " ")
      .match(
        /^hsla?\(\s*([+-]?\d+(?:\.\d+)?)\s*(?:deg)?\s*,\s*([+-]?\d+(?:\.\d+)?)%\s*,\s*([+-]?\d+(?:\.\d+)?)%\s*(?:,\s*([+-]?\d+(?:\.\d+)?)\s*)?\)$/i,
      );

    if (!match) return null;

    const h = Number.parseFloat(match[1] ?? "");
    const s = Number.parseFloat(match[2] ?? "");
    const l = Number.parseFloat(match[3] ?? "");

    if (!Number.isFinite(h) || !Number.isFinite(s) || !Number.isFinite(l)) {
      return null;
    }

    const hue = ((h % 360) + 360) % 360;
    const sat = Math.min(Math.max(s / 100, 0), 1);
    const light = Math.min(Math.max(l / 100, 0), 1);

    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = light - c / 2;

    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (hue < 60) {
      r1 = c;
      g1 = x;
    } else if (hue < 120) {
      r1 = x;
      g1 = c;
    } else if (hue < 180) {
      g1 = c;
      b1 = x;
    } else if (hue < 240) {
      g1 = x;
      b1 = c;
    } else if (hue < 300) {
      r1 = x;
      b1 = c;
    } else {
      r1 = c;
      b1 = x;
    }

    const r = Math.round((r1 + m) * 255);
    const g = Math.round((g1 + m) * 255);
    const b = Math.round((b1 + m) * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }

  return null;
};
