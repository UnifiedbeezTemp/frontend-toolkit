import { motion } from "framer-motion";

interface Props {
  hue: number;
  hueRef: React.RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function HueSlider({ hue, hueRef, onMouseDown }: Props) {
  return (
    <div
      ref={hueRef}
      className="w-full h-[8px] rounded-lg cursor-pointer relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
      }}
      onMouseDown={onMouseDown}
    >
      <motion.div
        className="absolute w-[12px] h-[12px] border-2 border-white rounded-full shadow-lg top-[-30%]"
        style={{
          left: `${(hue / 360) * 100}%`,
          background: `hsl(${hue}, 100%, 50%)`,
        }}
        animate={{ x: `${(hue / 360) * 100}%` }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}