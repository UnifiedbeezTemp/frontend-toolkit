import { useState, useEffect } from "react";
import { ApiWebsite } from "../../../../../types/websiteTypes";

export type WebchatConfigMode = "existing" | "manual";

export function useWebchatMode(
  websites: ApiWebsite[] = [],
  currentUrl: string = "",
) {
  const [mode, setMode] = useState<WebchatConfigMode>("manual");

  useEffect(() => {
    if (websites.length > 0) {
      const match = websites.find((w) => w.baseUrl === currentUrl);
      if (match) {
        setMode("existing");
      } else if (!currentUrl) {
        setMode("existing");
      }
    }
  }, [websites, currentUrl]);

  return {
    mode,
    setMode,
  };
}
