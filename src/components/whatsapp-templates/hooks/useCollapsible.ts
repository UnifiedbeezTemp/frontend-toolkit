"use client";

import { useState } from "react";

export function useCollapsible(initialState = true) {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const toggle = () => setIsExpanded((prev) => !prev);

  return {
    isExpanded,
    toggle,
    setIsExpanded,
  };
}
