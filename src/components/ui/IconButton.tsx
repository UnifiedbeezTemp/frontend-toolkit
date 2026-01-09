import React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

/**
 * REUSABLE BUTTON COMPONENT
 *
 * USAGE:
 * <IconButton><InfoIcon /></IconButton>
 * <IconButton loading>Processing...</IconButton>
 * <IconButton className="custom-styles">Custom</IconButton>
 *
 * PROPS:
 * - variant: primary | secondary | outline | ghost | danger (default: primary)
 * - size: sm | md | lg (default: md)
 * - disabled: boolean (default: false)
 * - loading: boolean (default: false)
 * - type: button | submit | reset (default: button)
 * - onClick: Click handler function
 * - className: Add custom styles (overrides defaults)
 *
 * DEFAULTS:
 * - Smooth hover animations
 * - Scale tap animation
 * - Disabled states
 * - Loading states
 */

interface IconButtonProps {
  onClick?: () => void
  variant?:
    | "primary"
    | "secondary"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
  icon: React.ReactNode
  ref?: React.RefObject<HTMLButtonElement | null>
  ariaLabel: string
}

export default function IconButton({
  onClick,
  variant = "primary",
  size = "sm",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  ariaLabel,
  icon,
  ref,
  ...props
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-[0.8rem] text-[1.6rem] transition-all duration-200 focus:outline-none font-[700]"

  const variantClasses = {
    primary:
      "bg-brand-primary text-white border border-brand-primary not-disabled:hover:bg-primary not-disabled:hover:text-brand-primary not-disabled:hover:border-brand-primary hover:shadow-md",
    secondary:
      "grid place-items-center rounded-xl bg-white text-dark-base-70 border-input-stroke border hover:bg-gray-50 active:scale-[0.98] transition",
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-8 w-8",
  }

  const stateClasses = {
    disabled: "opacity-50 cursor-not-allowed",
    loading: "cursor-wait",
  }

  return (
    <motion.button
      {...props}
      type={type}
      aria-label={ariaLabel}
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
        </div>
      ) : (
        icon
      )}
    </motion.button>
  )
}
