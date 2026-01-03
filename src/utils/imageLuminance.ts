export function analyzeImageLuminance(
  img: HTMLImageElement,
): "light" | "dark" | "neutral" {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return "neutral";

    const maxSize = 50;
    const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;

    let totalLuminance = 0;
    let opaquePixelCount = 0;
    let hasTransparency = false;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 255) hasTransparency = true;

      if (a > 127) {
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuminance += luminance;
        opaquePixelCount++;
      }
    }

    if (opaquePixelCount === 0) return "neutral";

    const avgLuminance = totalLuminance / opaquePixelCount;

    if (avgLuminance < 85) return "light";
    if (avgLuminance > 170) return "dark";
    if (hasTransparency) return "light";
    return "neutral";
  } catch {
    return "neutral";
  }
}

