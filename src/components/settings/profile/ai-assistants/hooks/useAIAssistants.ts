import { useAiAssistants as useSharedAiAssistants } from "../../../../../hooks/useAiAssistants";

export function useAIAssistants(autoFetch: boolean = true) {
  const shared = useSharedAiAssistants({ autoFetch });

  const assistantsLeft = shared.usage?.unlimited
    ? Infinity
    : shared.usage?.remaining ?? 0;

  return {
    ...shared,
    assistantsLeft,
    canAddMore: shared.canCreateMore,
    canCreateMore: shared.canCreateMore,
  };
}
