import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

/**
 * REUSABLE INPUT COMPONENT
 *
 * USAGE:
 * <Input value={value} onChange={setValue} placeholder="Enter text" />
 * <Input type="email" leftIcon={<MailIcon />} placeholder="Email" />
 * <Input type="password" rightIcon={<EyeIcon />} placeholder="Password" />
 * <Input className="custom-styles" placeholder="Custom input" />
 *
 * PROPS:
 * - value: Input value (required)
 * - onChange: Change handler (required)
 * - placeholder: Placeholder text (default: '')
 * - type: text | email | password | number (default: text)
 * - leftIcon: React node for left icon
 * - rightIcon: React node for right icon
 * - className: Add custom styles (overrides defaults)
 * - disabled: Boolean for when input can be used
 *
 * DEFAULTS:
 * - Border focus states
 * - Automatic padding for icons
 * - Customizable placeholder
 * - Full width container
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      placeholder = "",
      type = "text",
      leftIcon,
      rightIcon,
      error,
      helperText,
      className = "",
      id,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId();
    const resolvedId = id ?? inputId;
    const errorId = `${resolvedId}-error`;
    const helperId = `${resolvedId}-helper`;
    const hasError = Boolean(error);
    const describedBy =
      [
        ariaDescribedBy,
        error ? errorId : undefined,
        !error && helperText ? helperId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="w-full">
        <div className="relative w-full">
          {leftIcon && (
            <div className="absolute left-[1.4rem] top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={resolvedId}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            {...props}
            className={cn(
              "w-full border border-input-stroke rounded-[0.8rem] px-[1.4rem] py-[1rem]",
              "focus:ring-0 focus:outline-0 focus:border-brand-primary focus:shadow-[0_0_0_5px_rgba(5,61,39,0.1)]",
              "placeholder:text-dark-base-40 placeholder:text-[1.6rem]",
              "text-dark-base-70 bg-transparent text-[1.6rem]",
              "leading-[1.6rem] transition-all duration-300",
              hasError &&
                "border-destructive focus:border-destructive focus:shadow-[0_0_0_5px_rgba(220,38,38,0.12)]",
              leftIcon && "pl-[4rem]",
              rightIcon && "pr-[4rem]",
              className,
            )}
          />
          {rightIcon && (
            <div className="absolute right-[1.4rem] top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-[0.6rem] text-[1.4rem] text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-[0.6rem] text-[1.4rem] text-dark-base-40">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
