import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook to poll for website updates when a website is in a pending state.
 * It invalidates the "websites" query every 5 seconds.
 *
 * @param shouldPoll Whether polling should be active
 */
export function useWebsitePolling(shouldPoll: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!shouldPoll) return;

    const intervalId = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["websites"] });
      queryClient.invalidateQueries({ queryKey: ["assistant-websites"] });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [shouldPoll, queryClient]);
}
