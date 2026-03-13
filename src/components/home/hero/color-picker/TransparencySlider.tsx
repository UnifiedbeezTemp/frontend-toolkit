import Checkerboard from "./Checkerboard";

interface Props {
  color: string;
  opacity: number;
  onPick: (e: React.MouseEvent<HTMLElement>) => void;
  onDrag: (e: React.MouseEvent<HTMLElement>) => void;
  sliderRef: React.RefObject<HTMLDivElement | null>;
}

export default function TransparencySlider({ color, opacity, onPick, onDrag, sliderRef }: Props) {
  return (
    <div
      ref={sliderRef}
      className="w-[12rem] xl:w-[15rem] h-[1rem] xl:h-[1.342rem] rounded-full cursor-pointer relative"
      onClick={onPick}
      onMouseMove={onDrag}
    >
      <Checkerboard />
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${color})` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[1.7rem] h-[1.7rem] rounded-full border-2 border-white shadow-lg pointer-events-none"
        style={{ left: `${opacity}%`, backgroundColor: color.replace(")", `, ${opacity / 100})`).replace("rgb", "rgba") }}
      />
    </div>
  );
}