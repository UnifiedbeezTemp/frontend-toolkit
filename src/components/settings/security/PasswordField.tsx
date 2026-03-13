import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Input from "../../forms/Input";
import Heading from "../../ui/Heading";

interface PasswordFieldProps {
  label: string;
  value: string;
  placeholder: string;
  isVisible: boolean;
  error?: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
}

export default function PasswordField({
  label,
  value,
  placeholder,
  isVisible,
  error,
  disabled,
  onChange,
  onToggleVisibility,
}: PasswordFieldProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="mt-[1.6rem]">
      <Heading className="text-[1.6rem]">{label}</Heading>
      <Input
        value={value}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`mt-[0.8rem] text-[1.4rem] font-[400] ${
          error ? "border-destructive" : ""
        }`}
        rightIcon={
          <button
            type="button"
            onClick={onToggleVisibility}
            disabled={disabled}
            className="p-2 -mr-2 transition-opacity hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ImageComponent
              src={isVisible ? icons.eyeOff : icons.eyeOn}
              alt={isVisible ? "Hide" : "Show"}
              width={20}
              height={20}
            />
          </button>
        }
      />
      {error && <p className="text-destructive text-[1.2rem] mt-1">{error}</p>}
    </div>
  );
}
