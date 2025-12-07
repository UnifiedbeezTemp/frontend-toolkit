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
      disabled={disabled}
      className={`rounded-full w-7 h-4 p-[.21rem] transition-all duration-300 ${
        isActive ? "bg-brand-primary" : "bg-inactive-color"
      }`}
    >
      <div
        className={`bg-white rounded-full w-[1.24rem] h-[1.24rem] transition-all duration-300 ${
          isActive ? "translate-x-full" : "translate-x-0"
        }`}
      />
    </button>
  );
}
