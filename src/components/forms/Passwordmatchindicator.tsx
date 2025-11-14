import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * PASSWORD MATCH INDICATOR COMPONENT
 *
 * USAGE:
 * const password = watch('password');
 * const confirmPassword = watch('confirmPassword');
 *
 * <PasswordMatchIndicator
 *   password={password}
 *   confirmPassword={confirmPassword}
 * />
 *
 * PROPS:
 * - password: string - The original password value
 * - confirmPassword: string - The confirmation password value
 * - showOnlyWhenTyping: boolean - Only show when user is typing (default: false)
 * - className: string - Custom styles
 *
 * FEATURES:
 * - Live validation as user types
 * - Shows match/no-match status
 * - Green checkmark when passwords match
 * - Red X when passwords don't match
 * - Only shows when confirmPassword has content
 */

interface PasswordMatchIndicatorProps {
  password: string;
  confirmPassword: string;
  showOnlyWhenTyping?: boolean;
  className?: string;
}

export default function PasswordMatchIndicator({
  password,
  confirmPassword,
  showOnlyWhenTyping = false,
  className = "",
}: PasswordMatchIndicatorProps) {
  // Don't show if confirmPassword is empty
  if (!confirmPassword) {
    return null;
  }

  // Check if passwords match
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const passwordsDontMatch =
    password !== confirmPassword && confirmPassword.length > 0;

  // Don't show anything if showOnlyWhenTyping is true and neither condition is met
  if (showOnlyWhenTyping && !passwordsMatch && !passwordsDontMatch) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-all duration-200",
        passwordsMatch && "text-brand-primary",
        passwordsDontMatch && "text-destructive",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {passwordsMatch && (
        <>
          <Check className="w-4 h-4" />
          <span>Passwords match! </span>
        </>
      )}
      {passwordsDontMatch && (
        <>
          <X className="w-4 h-4" />
          <span>Passwords do not match</span>
        </>
      )}
    </div>
  );
}
