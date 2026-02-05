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
  as?: string
}

export default function Checkbox({
  checked,
  onChange,
  disabled = false,
  className = "",
  size = "md",
  as
}: CheckboxProps) {
  const icons = useSupabaseIcons();

  const sizeClasses = {
    sm: "w-[1.6rem] h-[1.6rem]",
    md: "w-[2rem] h-[2rem]",
    lg: "w-[2.4rem] h-[2.4rem]",
  };

  const props = {
    onClick: () => !disabled && onChange(!checked),
    className:
      cn(
        "rounded-[0.5rem] border flex items-center justify-center transition-all duration-200",
        checked
          ? "bg-brand-primary border-brand-primary"
          : "border-input-stroke bg-primary hover:border-brand-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        sizeClasses[size],
        className,
      ),
  }

  if (as) return createElement(as || "button", { ...props },
    checked && (
      <ImageComponent
        alt="checkbox"
        src={icons.checkbox}
        width={size === "sm" ? 14 : size === "md" ? 16 : 18}
        height={size === "sm" ? 14 : size === "md" ? 16 : 18}
        className="object-cover text-white"
      />
    ))

  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      type="button"
      disabled={disabled}
      className={cn(
        "rounded-[0.5rem] border flex items-center justify-center transition-all duration-200",
        checked
          ? "bg-brand-primary border-brand-primary"
          : "border-input-stroke bg-primary hover:border-brand-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        sizeClasses[size],
        className
      )}
    >
      {checked && (
        <ImageComponent
          alt="checkbox"
          src={icons.checkbox}
          width={size === "sm" ? 14 : size === "md" ? 16 : 18}
          height={size === "sm" ? 14 : size === "md" ? 16 : 18}
          className="object-cover text-white"
        />
      )}
    </button>
  );
}
