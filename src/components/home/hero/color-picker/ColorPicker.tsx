interface Props {
  colors: readonly string[];
  selected: string;
  onPick: (e: any) => void;
  onDrag: (e: any) => void;
  pickerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ColorPicker({ colors, selected, onPick, onDrag, pickerRef }: Props) {
  return (
    <div
      ref={pickerRef}
      className="w-[12rem] xl:w-[15rem] h-[1rem] xl:h-[1.342rem] rounded-full cursor-pointer relative "
      style={{ background: `linear-gradient(to right, ${colors.join(", ")})` }}
      onClick={onPick}
      onMouseMove={onDrag}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[1.7rem] h-[1.7rem] rounded-full border-2 border-primary shadow-lg pointer-events-none"
        style={{
          left: `${(colors.indexOf(selected) / (colors.length - 1)) * 100}%`,
          backgroundColor: selected,
        }}
      />
    </div>
  );
}