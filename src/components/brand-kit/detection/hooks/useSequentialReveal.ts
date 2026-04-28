"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
  initialDelayMs?: number;
  stepDelayMs?: number;
};

export const useSequentialReveal = (
  isActive: boolean,
  totalSteps: number,
  options?: Options,
) => {
  const initialDelayMs = useMemo(() => options?.initialDelayMs ?? 250, [options]);
  const stepDelayMs = useMemo(() => options?.stepDelayMs ?? 550, [options]);

  const [visibleSteps, setVisibleSteps] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];

    if (!isActive || totalSteps <= 0) {
      setVisibleSteps(0);
      return;
    }

    setVisibleSteps(0);

    for (let i = 0; i < totalSteps; i += 1) {
      const id = window.setTimeout(() => {
        setVisibleSteps((prev) => (prev < i + 1 ? i + 1 : prev));
      }, initialDelayMs + i * stepDelayMs);
      timeoutsRef.current.push(id);
    }

    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, [initialDelayMs, isActive, stepDelayMs, totalSteps]);

  return visibleSteps;
};

