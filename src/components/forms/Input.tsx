import React from "react";
import { cn } from "../../lib/utils";

/**
 * REUSABLE INPUT COMPONENT (Updated for React Hook Form)
 *
 * USAGE:
 * // Controlled component (old way - still works)
 * <Input value={value} onChange={setValue} placeholder="Enter text" />
 *
 * // With React Hook Form (new way)
 * <Input {...register('email')} error={errors.email?.message} />
 *
 * // With icons and error
 * <Input
 *   {...register('password')}
 *   type="password"
 *   leftIcon={<Lock />}
 *   rightIcon={<Eye />}
 *   error={errors.password?.message}
 *   helperText="Must be at least 8 characters"
 * />
 *
 * PROPS:
 * - value: Input value (optional - for controlled mode)
 * - onChange: Change handler (optional - for controlled mode)
 * - placeholder: Placeholder text (default: '')
 * - type: text | email | password | number | tel | url (default: text)
 * - leftIcon: React node for left icon
 * - rightIcon: React node for right icon
 * - error: Error message string (shows red border + message)
 * - helperText: Helper text below input
 * - disabled: Disable input (default: false)
 * - required: Mark as required (default: false)
 * - label: Label text above input
 * - name: Input name (for forms)
 * - className: Add custom styles
 * - inputClassName: Add custom styles to input element only
 * - onBlur: Blur handler
 * - onFocus: Focus handler
 *
 * DEFAULTS:
 * - Border focus states
 * - Error states (red border)
 * - Automatic padding for icons
 * - Full width container
 * - Accessible labels and error messages
 */

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "time";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  showRequired?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder = "",
      type = "text",
      leftIcon,
      rightIcon,
      error,
      helperText,
      disabled = false,
      required = false,
      label,
      name,
      className = "",
      inputClassName = "",
      labelClassName = "",
      showRequired = false,
      onBlur,
      onFocus,
      ...rest
    },
    ref,
  ) => {
    const inputId = React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = !!error;

    return (
      <div className={cn("w-full", className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-text-secondary text-[1.6rem] font-[700] mb-2 flex",
              labelClassName,
            )}
          >
            {label}
            {showRequired && (
              <span className="text-destructive text-[1.3rem]">*</span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative w-full">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onBlur={onBlur}
            onFocus={onFocus}
            aria-invalid={hasError}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full  rounded-[0.8rem] py-[0.8rem] px-[1rem]",
              "border border-(--input-stroke) bg-primary",
              "focus:border-(--primary-90) focus:ring-4 focus:ring-(--focus-ring) focus:outline-none",
              "shadow-xs",
              "placeholder:text-inactive-color placeholder:text-[1.4rem] placeholder:opacity-60",
              "text-text-primary text-[1.6rem] bg-primary transition-colors duration-200",
              "autofill:bg-primary autofill:text-text-primary",
              "[-webkit-text-fill-color:var(--text-primary)]",
              "[-webkit-box-shadow:0_0_0px_1000px_var(--primary)_inset]",
              leftIcon && "pl-[4rem]",
              rightIcon && "pr-10",
              hasError
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-brand-primary",
              disabled && "opacity-50 cursor-not-allowed bg-muted/20",
              inputClassName,
            )}
            {...rest}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-primary">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className="mt-[0.6rem] text-[1.4rem] text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p
            id={helperId}
            className="mt-[0.6rem] ml-1 text-[1.4rem] text-dark-base-40"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
