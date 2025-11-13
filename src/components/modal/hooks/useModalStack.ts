import { useState, useEffect } from "react";

let modalStack: number[] = [];
let baseZIndex = 1000;

export function useModalStack(isOpen: boolean, priority: number = 0) {
  const [zIndex, setZIndex] = useState(baseZIndex);

  useEffect(() => {
    if (isOpen) {
      const stackPosition = modalStack.length;
      modalStack.push(priority);
      
      const newZIndex = baseZIndex + (stackPosition * 10) + priority;
      setZIndex(newZIndex);

      return () => {
        modalStack = modalStack.filter((_, index) => index !== stackPosition);
      };
    }
  }, [isOpen, priority]);

  const getZIndex = () => zIndex;

  return { getZIndex };
}