interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export default function ToggleSwitch({
  isActive,
  onToggle,
  disabled,
}: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      disabled={disabled}
      className={`rounded-full w-8 h-5 p-[.21rem] transition-all duration-300 ${
        isActive ? "bg-brand-primary" : "bg-inactive-color"
      }`}
    >
      <div
        className={`bg-primary rounded-full w-[1.4rem] h-[1.4rem] transition-all duration-300 ${
          isActive ? "translate-x-full" : "translate-x-0"
        }`}
      />
    </button>
  );
}
