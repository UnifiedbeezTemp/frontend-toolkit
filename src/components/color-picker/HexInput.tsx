interface Props {
  value: string;
  currentColor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommit?: (value: string) => void;
}

export default function HexInput({ value, currentColor, onChange, onCommit }: Props) {
  const commitIfValid = () => {
    const hex = `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      onCommit?.(hex);
    }
  };
  return (
    <div className="border border-border rounded-[10px] flex items-center p-[8px]">
      <div
        className="w-6 h-6 rounded-full shadow-sm flex-shrink-0 mr-[10px]"
        style={{ background: currentColor }}
      />
      <div className="text-text-primary">#</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={commitIfValid}
        onKeyDown={(e) => {
          if (e.key === "Enter") commitIfValid();
        }}
        className="w-full text-sm bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        placeholder="000000"
        maxLength={6}
      />
    </div>
  );
}