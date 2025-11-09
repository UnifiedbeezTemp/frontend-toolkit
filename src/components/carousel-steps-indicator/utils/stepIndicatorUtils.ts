export function getSizeClasses(
  variant: "dot" | "pill" | "line",
  size: "sm" | "md" | "lg"
): string {
  const sizeClasses = {
    dot: {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
    },
    pill: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
    line: {
      sm: "h-0.5",
      md: "h-1",
      lg: "h-1.5",
    },
  };

  return sizeClasses[variant][size];
}

export function getPillWidth(
  index: number,
  activeIndex: number,
  size: "sm" | "md" | "lg"
): string {
  // Active step is wider
  if (index === activeIndex) {
    return size === "sm" ? "w-8" : size === "md" ? "w-12" : "w-16";
  }
  // Inactive steps are narrower
  return size === "sm" ? "w-4" : size === "md" ? "w-6" : "w-8";
}

export function getLineWidth(): string {
  return "flex-1";
}
