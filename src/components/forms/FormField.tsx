import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import Input from "./Input";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  showRequired?: boolean;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
  helperText,
  error,
  disabled = false,
  required = false,
  className,
  inputClassName,
  labelClassName,
  showRequired,
  autoComplete,
  value,
  onChange,
  onBlur,
  onFocus,
  onInput,
  ...props
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <Input
          {...field}
          {...props}
          label={label}
          placeholder={placeholder}
          type={type}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          helperText={helperText}
          error={error || fieldError?.message}
          disabled={disabled}
          required={required}
          className={className}
          inputClassName={inputClassName}
          labelClassName={labelClassName}
          showRequired={showRequired}
          autoComplete={autoComplete}
          value={value ?? field.value}
          onInput={onInput}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )}
    />
  );
}
