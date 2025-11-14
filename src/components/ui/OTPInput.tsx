import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";

/**
 * REUSABLE OTP INPUT COMPONENT
 *
 * USAGE:
 * <OTPInput
 *   length={6}
 *   value={otp}
 *   onChange={setOtp}
 *   onComplete={(code) => console.log('Complete:', code)}
 * />
 *
 * PROPS:
 * - length: number - Number of OTP digits (default: 6)
 * - value: string - Current OTP value
 * - onChange: (value: string) => void - Value change handler (required)
 * - onComplete: (value: string) => void - Called when all digits filled
 * - disabled: boolean - Disable input (default: false)
 * - error: boolean - Show error state (default: false)
 * - autoFocus: boolean - Auto focus first input (default: true)
 * - className: string - Custom styles for container
 *
 * FEATURES:
 * - Auto-focus next input on digit entry
 * - Auto-focus previous on backspace
 * - Paste support (pastes full code)
 * - Keyboard navigation (arrow keys)
 * - Number-only input
 * - Error states
 * - Mobile-friendly
 */

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = true,
  className = "",
}: OTPInputProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize value as array of digits
  const digits = value.padEnd(length, "").split("").slice(0, length);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Call onComplete when all digits are filled
  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (index: number, digit: string) => {
    // Only allow numbers
    if (digit && !/^\d$/.test(digit)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join("").replace(/\s/g, "");

    onChange(newValue);

    // Auto-focus next input if digit was entered
    if (digit && index < length - 1) {
      focusInput(index + 1);
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Backspace: clear current or move to previous
    if (e.key === "Backspace") {
      e.preventDefault();

      if (digits[index]) {
        // Clear current digit
        handleChange(index, "");
      } else if (index > 0) {
        // Move to previous and clear
        focusInput(index - 1);
        setActiveIndex(index - 1);
        handleChange(index - 1, "");
      }
    }

    // Arrow Left
    else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
      setActiveIndex(index - 1);
    }

    // Arrow Right
    else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
      setActiveIndex(index + 1);
    }

    // Delete: same as backspace
    else if (e.key === "Delete") {
      e.preventDefault();
      handleChange(index, "");
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text/plain").trim();
    const pastedDigits = pastedData.replace(/\D/g, "").slice(0, length);

    if (pastedDigits) {
      onChange(pastedDigits);

      // Focus last filled input or last input
      const nextIndex = Math.min(pastedDigits.length, length - 1);
      focusInput(nextIndex);
      setActiveIndex(nextIndex);
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleClick = (index: number) => {
    // Select the input content on click
    const input = inputRefs.current[index];
    if (input) {
      input.select();
    }
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onClick={() => handleClick(index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-12 h-14 text-center text-[2.4rem] font-bold",
            "border-2 rounded-lg",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
            error
              ? "border-destructive text-destructive bg-destructive/5"
              : activeIndex === index
              ? "border-brand-primary text-brand-primary bg-primary"
              : digits[index]
              ? "border-text-secondary text-text-secondary bg-primary"
              : "border-border text-text-secondary bg-primary",
            disabled && "opacity-50 cursor-not-allowed bg-muted/20",
            !disabled && "hover:border-brand-primary/50"
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
