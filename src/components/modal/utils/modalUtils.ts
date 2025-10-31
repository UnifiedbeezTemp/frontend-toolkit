export function getSizeClasses(size: "sm" | "md" | "lg" | "xl" | "xxl" | "fullscreen"): string {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    xxl: "max-w-6xl",
    fullscreen: "max-w-full max-h-full m-4",
  };

  return sizeClasses[size];
}

export function getAriaAttributes(title?: string) {
  return {
    role: "dialog" as const,
    "aria-modal": "true" as const,
    "aria-labelledby": title ? "modal-title" : undefined,
  };
}

export function validateModalProps(isOpen: boolean, onClose: () => void) {
  if (typeof isOpen !== "boolean") {
    console.warn("Modal: isOpen must be a boolean");
  }
  
  if (typeof onClose !== "function") {
    console.warn("Modal: onClose must be a function");
  }
}