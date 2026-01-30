import { useState, useCallback } from "react";

export function useFollowupTriggers() {
  const [delayBeforeFollowup, setDelayBeforeFollowup] = useState<string | null>(
    null,
  );
  const [followupContentType, setFollowupContentType] = useState<string | null>(
    null,
  );

  const handleDelayChange = useCallback((value: string) => {
    setDelayBeforeFollowup(value);
  }, []);

  const handleContentTypeChange = useCallback((value: string) => {
    setFollowupContentType(value);
  }, []);

  return {
    delayBeforeFollowup,
    followupContentType,
    handleDelayChange,
    handleContentTypeChange,
  };
}
