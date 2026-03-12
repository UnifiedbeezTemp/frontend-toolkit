import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { getTemplatesData } from "../utils/data";

export const useTemplateList = (icons: Record<string, string>) => {
  const router = useRouter();

  const templates = useMemo(() => {
    return getTemplatesData(icons);
  }, [icons]);

  const goToLibrary = () => {
    // router.push("/automations/library")
  };

  const goBack = () => {
    router.back();
  };

  const goToDashboard = () => {
    // Navigate to dashboard
  };

  return {
    templates,
    goToLibrary,
    goBack,
    goToDashboard,
  };
};
