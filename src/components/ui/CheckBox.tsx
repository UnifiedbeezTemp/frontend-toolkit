import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";
import ImageComponent from "./ImageComponent";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Checkbox({
  checked,
  onChange,
  disabled = false,
  className = "",
  size = "md",
}: CheckboxProps) {
  const icons = useSupabaseIcons();

  const sizeClasses = {
    sm: "w-[1.6rem] h-[1.6rem]",
    md: "w-[2rem] h-[2rem]",
    lg: "w-[2.4rem] h-[2.4rem]",
  };

  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      type="button"
      disabled={disabled}
      className={cn(
        "rounded-[0.5rem] border flex items-center justify-center transition-all duration-200",
        checked
          ? "bg-brand-primary border-brand-primary"
          : "border-border bg-primary hover:border-brand-primary/50",
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
