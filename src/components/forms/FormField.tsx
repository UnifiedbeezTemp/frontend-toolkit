import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Input from "./Input";
import { cn } from "../../lib/utils";

/**
 * FORM FIELD WRAPPER COMPONENT
 *
 * Wraps Input component with React Hook Form Controller for easy integration
 *
 * USAGE:
 * <FormField
 *   name="email"
 *   control={control}
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   leftIcon={<Mail />}
 * />
 *
 * <FormField
 *   name="password"
 *   control={control}
 *   label="Password"
 *   type="password"
 *   rightIcon={showPassword ? <EyeOff /> : <Eye />}
 *   helperText="Must be at least 8 characters"
 * />
 *
 * PROPS:
 * - name: Field name (must match your form schema)
 * - control: React Hook Form control object
 * - label: Label text
 * - All other Input component props
 *
 * FEATURES:
 * - Automatic error handling from React Hook Form
 * - Connects to form validation (Zod schemas)
 * - Maintains all Input component features
 */

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

export default function FormField<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
  helperText,
  disabled = false,
  required = false,
  className,
  inputClassName,
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label={label}
          placeholder={placeholder}
          type={type}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          helperText={helperText}
          error={error?.message}
          disabled={disabled}
          required={required}
          className={className}
          inputClassName={inputClassName}
        />
      )}
    />
  );
}
