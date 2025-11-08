import { motion } from "framer-motion";

interface Props {
  hue: number;
  saturation: number;
  lightness: number;
  currentColor: string;
  saturationRef: React.RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SaturationLightnessPicker({
  hue,
  saturation,
  lightness,
  currentColor,
  saturationRef,
  onMouseDown,
}: Props) {
  return (
    <div
      ref={saturationRef}
      className="w-full h-32 rounded-lg border border-border/50 cursor-crosshair relative overflow-hidden"
      style={{
        background: `
          linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%)),
          linear-gradient(to top, #000, transparent)
        `,
      }}
      onMouseDown={onMouseDown}
    >
      <motion.div
        className="absolute w-4 h-4 border-2 border-white rounded-full"
        style={{
          left: `${saturation}%`,
          top: `${100 - lightness}%`,
          background: currentColor,
        }}
        animate={{ x: `${saturation}%`, y: `${100 - lightness}%` }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}