import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * REUSABLE BUTTON COMPONENT
 * 
 * USAGE:
 * <Button>Click me</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button loading>Processing...</Button>
 * <Button className="custom-styles">Custom</Button>
 * 
 * PROPS:
 * - variant: primary | secondary | outline | ghost | danger (default: primary)
 * - size: sm | md | lg (default: md)
 * - disabled: boolean (default: false)
 * - loading: boolean (default: false)
 * - type: button | submit | reset (default: button)
 * - onClick: Click handler function
 * - className: Add custom styles (overrides defaults)
 * - children: Button content (text, icons, etc.)
 * 
 * DEFAULTS:
 * - Smooth hover animations
 * - Scale tap animation
 * - Disabled states
 * - Loading states
 */

interface ButtonProps {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  children,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none";

  const variantClasses = {
    primary: "bg-brand-primary text-white border border-brand-primary hover:bg-primary hover:text-brand-primary hover:scale-105 hover:border-brand-primary hover:shadow-md",
    secondary: "border bg-primary border-border text-text-primary hover:shadow-md",
    outline: "bg-transparent border border-border text-brand-primary hover:bg-brand-primary hover:text-white",
    ghost: "text-text-primary",
    danger: "bg-destructive text-white hover:bg-destructive/90 hover:shadow-md",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base",
  };

  const stateClasses = {
    disabled: "opacity-50 cursor-not-allowed",
    loading: "cursor-wait",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && stateClasses.disabled,
        loading && stateClasses.loading,
        !disabled && !loading && "active:scale-90",
        className
      )}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}