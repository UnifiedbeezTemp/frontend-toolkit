import { BusinessObjective } from "@/shared/src/types/businessObjectiveTypes";
import { useMediaQuery } from "@/shared/src/hooks/useMediaQuery";

export function useObjectiveDisplay(
  objectives: { title: string; description: string }[]
) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");

  const maxVisible = isDesktop ? 3 : isTablet ? 2 : 1;

  return {
    visibleObjectives: objectives.slice(0, maxVisible),
    hiddenCount: Math.max(0, objectives.length - maxVisible),
    maxVisible,
  };
}
