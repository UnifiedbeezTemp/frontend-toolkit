"use client";

import { useRouter } from "next/navigation";

export const useAutomationRedirection = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_AUTOMATIONS_LIBRARY_URL || "";

  const handleRedirection = (type: string) => {
    let path = "";

    const normalizedType = type.replace("&", "and");

    switch (normalizedType) {
      case "Sales and Lead Generation":
        path = "/sales-and-lead-generation";
        break;
      case "Support and Escalation":
        path = "/support-and-escalation";
        break;
      case "Retention and Nurture":
        path = "/retention-and-nurture";
        break;
      case "Re-engagement and Campaigns":
      case "Re-engagement and Campaign":
        path = "";
        break;
      default:
        path = "";
    }

    if (baseUrl) {
      router.push(`${baseUrl}${path}`);
    }
  };

  const handleGoToDashboard = () => {
    if (baseUrl) {
      router.push(baseUrl);
    }
  };

  return {
    handleRedirection,
    handleGoToDashboard,
    baseUrl,
  };
};
