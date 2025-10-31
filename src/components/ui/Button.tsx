import { Loader2 } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  textColor?: string;
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
  textColor,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-90";

  const variantStyles = {
    primary: "bg-brand-primary hover:bg-brand-secondary hover:shadow-md",
    secondary: "border bg-primary border-border hover:shadow-md",
    outline: "bg-transparent border border-border hover:bg-brand-primary",
    ghost: "",
    danger: "bg-destructive hover:bg-destructive/90 hover:shadow-md",
  };

  const getTextColorClass = () => {
    if (textColor) return textColor;

    const defaultColors = {
      primary: "text-white",
      secondary: "text-text-primary",
      outline: "text-brand-primary hover:text-white",
      ghost: "text-text-primary",
      danger: "text-white",
    };

    return defaultColors[variant];
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantStyles[variant]}
    ${getTextColorClass()}
    ${sizeStyles[size]}
    ${className}
    ${loading ? "cursor-wait" : ""}
  `.trim();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      whileTap={{ scale: 0.98 }}
    >
      {loading && <Loader2 className="animate-spin" />}

      {!loading && icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {text && <span>{text}</span>}

      {!loading && icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </motion.button>
  );
}
