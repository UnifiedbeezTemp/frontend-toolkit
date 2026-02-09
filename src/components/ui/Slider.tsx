import React from 'react';
import { cn } from "../../lib/utils";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string; // e.g., "100%"
  activeColor?: string;
  trackColor?: string;
  className?: string;
}

export const Slider = ({
  value,
  min,
  max,
  step = 0.01,
  onChange,
  label,
  activeColor = '#D0D5DD',
  trackColor = '#EAECF0',
  className = '',
}: SliderProps) => {

  const calculatePercentage = () => ((value - min) / (max - min)) * 100;

  return (
    <div className={cn(`flex items-center gap-5`, className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="custom-slider w-32 md:w-48 h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${activeColor} ${calculatePercentage()}%, ${trackColor} ${calculatePercentage()}%)`,
          color: activeColor
        }}
      />
      {label && (
        <span className="text-base font-normal text-dark-base-70 min-w-[35px] tabular-nums">
          {label}
        </span>
      )}
    </div>
  );
};