import { useEffect, useRef, useCallback } from "react";
import { SmartScrollIntoViewOptions } from "./types";

export default function useSmartScrollIntoView<TElement extends HTMLElement>({
  behavior = "smooth",
  block = "nearest",
  container = null,
  enabled = true,
  requireFullVisibility = false,
  rootMargin = "0px",
}: SmartScrollIntoViewOptions = {}) {
  const elementRef = useRef<TElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollIntoView = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    element.scrollIntoView({
      behavior,
      block,
      inline: "nearest",
    });
  }, [behavior, block]);

  const handleVisibilityChange = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (requireFullVisibility) {
        const notFullyVisible = entry.intersectionRatio < 1;
        if (notFullyVisible) scrollIntoView();
        return;
      }

      const notVisible = !entry.isIntersecting;
      if (notVisible) scrollIntoView();
    },
    [requireFullVisibility, scrollIntoView],
  );

  useEffect(() => {
    if (!enabled) return;
    if (!elementRef.current) return;

    const element = elementRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0]),
      {
        root: container || null,
        rootMargin,
        threshold: requireFullVisibility ? 1 : 0,
      },
    );

    observerRef.current.observe(element);

    return () => observerRef.current?.disconnect();
  }, [
    enabled,
    container,
    rootMargin,
    requireFullVisibility,
    handleVisibilityChange,
  ]);

  return { ref: elementRef, scrollIntoView };
}
