interface Props {
  value: string;
  currentColor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HexInput({ value, currentColor, onChange }: Props) {
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
        className="w-full text-sm bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        placeholder="000000"
        maxLength={6}
      />
    </div>
  );
}