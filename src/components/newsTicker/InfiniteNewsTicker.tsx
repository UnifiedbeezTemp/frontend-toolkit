"use client";
import { InfiniteNewsTickerProps } from "./types";
import { useAutoScrollLoop } from "./hooks";
import { useMemo } from "react";

export const InfiniteNewsTicker = ({
  items,
  speed = 1,
  gap = 32,
  className,
  pauseOnHover = true,
}: InfiniteNewsTickerProps) => {
  const { containerRef, isPausedRef } = useAutoScrollLoop({
    speed,
  });

  const duplicatedItems = useMemo(() => {
    return [...items, ...items, ...items, ...items];
  }, [items]);

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      onMouseEnter={() => pauseOnHover && (isPausedRef.current = true)}
      onMouseLeave={() => pauseOnHover && (isPausedRef.current = false)}
    >
      <div
        ref={containerRef}
        className="inline-flex whitespace-nowrap"
        style={{ 
          gap: `${gap}px`,
          // Add will-change for better performance
          willChange: 'transform'
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={`${idx}-${String(item)}`} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};