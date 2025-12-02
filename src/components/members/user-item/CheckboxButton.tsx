import Image from "next/image";

interface CheckboxButtonProps {
  isSelected?: boolean;
  onToggle: () => void;
  supabaseIcons: any;
}

export default function CheckboxButton({
  isSelected,
  onToggle,
  supabaseIcons,
}: CheckboxButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-[1.6rem] h-[1.6rem] rounded-[0.3rem] border flex items-center justify-center transition-colors ${
        isSelected
          ? "bg-brand-primary border-brand-primary"
          : "border-input-stroke bg-primary"
      }`}
    >
      {isSelected && (
        <Image
          alt="checkbox"
          src={supabaseIcons.checkbox}
          width={16}
          height={16}
          className="object-cover"
        />
      )}
    </button>
  );
}
