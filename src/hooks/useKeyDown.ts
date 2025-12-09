import { useEffect } from "react";

export default function useKeyDown(key: string, callback: () => void, active = true) {
  useEffect(() => {
    if (!active) return;

    function handler(e: KeyboardEvent) {
      if (e.key === key) callback();
    }

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, callback, active]);
}
