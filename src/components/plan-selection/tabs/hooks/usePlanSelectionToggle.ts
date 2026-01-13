import { useState, useRef, useEffect } from "react";

export function usePlanSelectionToggle(isYearly: boolean) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = isYearly ? 1 : 0;
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [isYearly]);

  return {
    indicatorStyle,
    tabRefs,
  };
}
