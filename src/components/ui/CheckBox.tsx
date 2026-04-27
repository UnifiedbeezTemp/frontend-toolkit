import { createElement } from "react";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";
import ImageComponent from "./ImageComponent";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: string;
  isLoading?: boolean;
  type?: "check" | "radio"
}

export default function Checkbox({
  checked,
  onChange,
  disabled = false,
  className = "",
  size = "md",
  as,
  isLoading = false,
  type = "check",
}: CheckboxProps) {
  const icons = useSupabaseIcons();

  const sizeClasses = {
    sm: "w-[1.6rem] h-[1.6rem]",
    md: "w-[2rem] h-[2rem]",
    lg: "w-[2.4rem] h-[2.4rem]",
  };

  const commonClasses = cn(
    "rounded-[0.5rem] border flex items-center justify-center transition-all duration-200",
    checked
      ? "bg-brand-primary border-brand-primary"
      : "border-input-stroke bg-primary hover:border-brand-primary/50",
    (disabled || isLoading) && "opacity-50 cursor-not-allowed",
    sizeClasses[size],
    className,
  );

  const loaderSize =
    size === "sm" ? "w-3 h-3" : size === "md" ? "w-3.5 h-3.5" : "w-4 h-4";

  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          className={cn(
            "border border-current border-t-transparent rounded-full animate-spin",
            checked ? "text-white" : "text-brand-primary",
            loaderSize,
          )}
        />
      );
    }
    if (checked) {
      return (
        <ImageComponent
          alt="checkbox"
          src={type === "check" ? icons.checkbox : icons.checkboxBase2}
          width={size === "sm" ? 14 : size === "md" ? 16 : 18}
          height={size === "sm" ? 14 : size === "md" ? 16 : 18}
          className="object-cover text-white"
        />
      );
    }
    return null;
  };

  if (as) {
    return createElement(
      as,
      {
        onClick: () => !disabled && !isLoading && onChange(!checked),
        className: commonClasses,
      },
      renderContent(),
    );
  }

  return (
    <button
      onClick={() => !disabled && !isLoading && onChange(!checked)}
      type="button"
      disabled={disabled || isLoading}
      className={commonClasses}
    >
      {renderContent()}
    </button>
  );
}
