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
      className={`rounded-full w-[4rem] h-[2rem] p-[.21rem] transition-all duration-300 ${
        isActive ? "bg-brand-primary" : "bg-inactive-color"
      }`}
    >
      <div
        className={`bg-white rounded-full w-[50%] h-[90%] transition-all duration-300 ${
          isActive ? "translate-x-[100%]" : "translate-x-0"
        }`}
      />
    </button>
  );
}
