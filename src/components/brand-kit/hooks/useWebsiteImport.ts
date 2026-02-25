"use client";

import { useState } from "react";

export function useWebsiteImport() {
  const [url, setUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!url) return;
    setIsImporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Importing from:", url);
    } catch (error) {
      console.error("Import failed:", error);
    } finally {
      setIsImporting(false);
    }
  };

  return {
    url,
    setUrl,
    handleImport,
    isImporting,
  };
}
