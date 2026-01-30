export interface ColorScheme {
  bg: string;
  text: string;
  border: string;
}

const colorSchemes: Record<string, ColorScheme> = {
  "Professional, Detailed, Professional": {
    bg: "bg-[#29953E]/10",
    text: "text-[#29953E]",
    border: "border-[#29953E]",
  },
  "Friendly, Concise, Professional": {
    bg: "bg-[#155DFC]/10",
    text: "text-[#155DFC]",
    border: "border-[#155DFC]",
  },
  "Friendly, Detailed, Friendly": {
    bg: "bg-[#FAB404]/10",
    text: "text-[#FAB404]",
    border: "border-[#FAB404]",
  },
};

const assistantColorPalette: ColorScheme[] = [
  { bg: "bg-[#29953E]/10", text: "text-[#29953E]", border: "border-[#29953E]" },
  { bg: "bg-[#155DFC]/10", text: "text-[#155DFC]", border: "border-[#155DFC]" },
  { bg: "bg-[#FAB404]/10", text: "text-[#FAB404]", border: "border-[#FAB404]" },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getAssistantColorScheme(index: number): ColorScheme {
  const colorIndex = index % assistantColorPalette.length;
  return assistantColorPalette[colorIndex];
}

export function getColorScheme(selectionText: string): ColorScheme {
  if (colorSchemes[selectionText]) {
    return colorSchemes[selectionText];
  }

  const hash = hashString(selectionText);
  const index = hash % assistantColorPalette.length;
  return assistantColorPalette[index];
}
