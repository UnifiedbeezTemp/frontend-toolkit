interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ToggleSwitch({
  isActive,
  onToggle,
  disabled,
  isLoading = false,
}: ToggleSwitchProps) {
  const isDisabled = Boolean(disabled || isLoading);
  return (
    <button
      onClick={onToggle}
      type="button"
      disabled={isDisabled}
      className={`rounded-full w-[4rem] h-[2rem] p-[.21rem] transition-all duration-300 relative ${
        isActive ? "bg-brand-primary" : "bg-inactive-color"
      } ${isDisabled ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      <div
        className={`bg-primary rounded-full w-[50%] h-[90%] transition-all duration-300 flex items-center justify-center ${
          isActive ? "translate-x-[100%]" : "translate-x-0"
        }`}
      >
        {isLoading ? (
          <div className="w-[1.1rem] h-[1.1rem] border border-input-stroke border-t-transparent rounded-full animate-spin" />
        ) : null}
      </div>
    </button>
  );
}
