import React, { createElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "../../lib/utils";

/**
 * REUSABLE BUTTON COMPONENT
 *
 * USAGE:
 * <Button>Click me</Button>
 * <Button href="/path">Link Button</Button>
 * ...
 */

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
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
  as?: string
}

export default function Button({
  onClick,
  href,
  target,
  rel,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  children,
  loadingText,
  ref,
  as,
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
      "border-destructive bg-primary text-destructive hover:border-destructive/90 hover:shadow-md border",
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

  const content = loading ? (
    <div className="flex items-center gap-2">
      <div className="w-[2rem] h-[2rem] border border-current border-t-transparent rounded-full animate-spin" />
      {loadingText}
    </div>
  ) : (
    children
  );

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && stateClasses.disabled,
    loading && stateClasses.loading,
    !disabled && !loading && "active:scale-90",
    className
  );

  if (as) {
    return createElement(
      motion(as as any),
      {
        ...props,
        className: classes,
        onClick,
        whileTap: { scale: disabled || loading ? 1 : 0.98 },
      },
      content
    );
  }


  if (href) {
    return (
      <motion.a
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        href={href}
        target={target}
        rel={rel}
        className={cn("w-full lg:w-fit", classes)}
        onClick={onClick}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      ref={ref}
    >
      {content}
    </motion.button>
  );
}
