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
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "dangerReverse";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
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
  loadingText,
  ref,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-[0.8rem] py-[1rem] text-[1.6rem] transition-all duration-200 focus:outline-none font-[700]";

  const variantClasses = {
    primary:
      "bg-brand-primary text-white border border-brand-primary not-disabled:hover:bg-primary not-disabled:hover:text-brand-primary not-disabled:hover:border-brand-primary hover:shadow-md",
    secondary:
      "border bg-primary border-border text-text-primary hover:shadow-md",
    outline:
      "bg-transparent border border-border text-brand-primary hover:bg-brand-primary hover:text-white",
    ghost: "text-text-primary",
    danger: "bg-destructive text-white hover:bg-destructive/90 hover:shadow-md",
    dangerReverse:
      "border-destructive bg-white text-destructive hover:border-destructive/90 hover:shadow-md border",
  };

  const sizeClasses = {
    sm: "p-[0.8rem] text-[1.4rem]",
    md: "p-[0.8rem] text-[1.6rem]",
    lg: "p-[0.8rem] text-[1.8rem]",
  };

  const stateClasses = {
    disabled: "opacity-50 cursor-not-allowed",
    loading: "cursor-wait",
  };

  return (
    <motion.button
      {...props}
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
      ref={ref}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-[2rem] h-[2rem] border border-current border-t-transparent rounded-full animate-spin" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
