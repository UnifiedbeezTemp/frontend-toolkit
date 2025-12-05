import { useEffect, useRef } from "react";
import { UseAutoScrollLoopOptions } from "./types";

export function useAutoScrollLoop({ speed = 1 }: UseAutoScrollLoopOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const offsetRef = useRef(0);
  const resetInProgressRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const step = () => {
      if (!isPausedRef.current && container && !resetInProgressRef.current) {
        const singleSetWidth = container.scrollWidth / 2;
        
        offsetRef.current -= speed;

        // Reset when we've scrolled one full set
        if (Math.abs(offsetRef.current) >= singleSetWidth) {
          resetInProgressRef.current = true;
          
          // Instantly jump back to start without animation
          offsetRef.current = 0;
          container.style.transition = 'none';
          container.style.transform = `translateX(${offsetRef.current}px)`;
          
          // Force reflow
          container.offsetHeight;
          
          // Re-enable transition
          container.style.transition = '';
          resetInProgressRef.current = false;
        } else {
          container.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return {
    containerRef,
    isPausedRef,
    offsetRef,
  };
}