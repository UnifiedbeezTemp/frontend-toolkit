export function getStepAnimation(
  isActive: boolean,
  variant: "dot" | "pill" | "line"
) {
  return {
    scale: isActive && variant === "dot" ? 1.2 : 1,
    opacity: isActive ? 1 : variant === "line" ? 0.3 : 0.5,
  };
}
