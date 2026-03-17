"use client";

import { useRouter } from "next/navigation";

export const useAutomationRedirection = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_AUTOMATIONS_LIBRARY_URL || "";

  const getReturnTo = () => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  };

  const handleRedirection = (type: string, templateId?: string) => {
    let category = "";

    const normalizedType = type.replace("&", "and");

    switch (normalizedType) {
      case "Sales and Lead Generation":
        category = "sales-lead-generation";
        break;
      case "Support and Escalation":
        category = "support-escalation";
        break;
      case "Retention and Nurture":
        category = "retention-nurture";
        break;
      case "Re-engagement and Campaigns":
      case "Re-engagement and Campaign":
        category = "reengagement-campaigns";
        break;
      default:
        category = "";
    }

    if (baseUrl) {
      let query = `?category=${category}`;
      if (templateId) {
        query += `&templateId=${templateId}`;
      }
      const returnTo = getReturnTo();
      if (returnTo) {
        query += `&returnTo=${encodeURIComponent(returnTo)}`;
      }
      router.push(`${baseUrl}/automations/new${query}`);
    }
  };

  const handleGoToDashboard = () => {
    if (baseUrl) {
      const returnTo = getReturnTo();
      const query = returnTo
        ? `?category=reengagement-campaigns&returnTo=${encodeURIComponent(returnTo)}`
        : `?category=reengagement-campaigns`;
      router.push(`${baseUrl}/automations/new${query}`);
    }
  };

  return {
    handleRedirection,
    handleGoToDashboard,
    baseUrl,
  };
};
