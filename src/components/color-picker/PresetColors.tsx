interface Props {
  colors: string[];
  onClick: (color: string) => void;
}

export default function PresetColors({ colors, onClick }: Props) {
  return (
    <div className="flex items-center justify-between">
      {colors.map((color, i) => (
        <button
          key={i}
          className="w-6 h-6 rounded-full border border-border/50 hover:scale-110 transition-transform shadow-sm"
          style={{ backgroundColor: color }}
          onClick={() => onClick(color)}
        />
      ))}
    </div>
  );
}