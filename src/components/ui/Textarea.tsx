import React from "react"
import { cn } from "../../lib/utils"

/**
 * REUSABLE TEXTAREA COMPONENT
 *
 * USAGE:
 * <Textarea value={value} onChange={handleChange} placeholder="Enter text" />
 * <Textarea value={value} onChange={handleChange} error="Error message" />
 * <Textarea value={value} onChange={handleChange} disabled={true} />
 *
 * PROPS:
 * - value: Textarea value (required)
 * - onChange: Change handler (required)
 * - placeholder: Placeholder text (default: '')
 * - error: Error message string (shows red border + message)
 * - helperText: Helper text below textarea
 * - disabled: Disable textarea (default: false)
 * - required: Mark as required (default: false)
 * - label: Label text above textarea
 * - name: Textarea name (for forms)
 * - className: Add custom styles
 * - textareaClassName: Add custom styles to textarea element only
 * - rows: Number of rows (default: 4)
 * - onBlur: Blur handler
 * - onFocus: Focus handler
 *
 * DEFAULTS:
 * - Border focus states
 * - Error states (red border)
 * - Full width container
 * - Accessible labels and error messages
 */

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  label?: string
  name?: string
  className?: string
  textareaClassName?: string
  labelClassName?: string
  rows?: number
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  showRequired?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      onChange,
      placeholder = "",
      error,
      helperText,
      disabled = false,
      required = false,
      label,
      name,
      className = "",
      textareaClassName = "",
      labelClassName = "",
      rows = 4,
      showRequired = false,
      onBlur,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const textareaId = React.useId()
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`
    const hasError = !!error

    return (
      <div className={cn("w-full", className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block text-text-secondary text-[1.6rem] font-bold mb-2",
              labelClassName
            )}
          >
            {label}
            {showRequired && (
              <span className="text-destructive text-[1.3rem]">*</span>
            )}
          </label>
        )}

        {/* Textarea Container */}
        <div className="relative w-full">
          {/* Textarea Field */}
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            onBlur={onBlur}
            onFocus={onFocus}
            aria-invalid={hasError}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full rounded-md py-2 px-2.5",
              "border border-input-stroke bg-primary",
              "focus:border-brand-primary focus:ring-4 focus:ring-[rgba(5,61,39,0.1)] focus:outline-none",
              "shadow-xs",
              "placeholder:text-text-primary placeholder:text-[1.6rem]",
              "text-text-primary text-[1.6rem] bg-primary transition-colors duration-200",
              "resize-none",
              hasError
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-brand-primary",
              disabled && "opacity-50 cursor-not-allowed bg-muted/20",
              textareaClassName
            )}
            {...rest}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className="mt-[0.6rem] text-md text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p
            id={helperId}
            className="mt-[0.6rem] ml-1 text-md text-dark-base-40"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
