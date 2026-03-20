"use client";

import { useEffect } from "react";
import { api, useAppQuery } from "../../../api";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import {
  Automation,
  setAutomations,
  setSelectedType,
} from "../../../store/slices/automationSlice";
import { AUTOMATION_CATEGORY_CONFIG } from "../../../constants/automations";
import { useSupabaseImages } from "../../../lib/supabase/useSupabase";

type ApiAutomation = {
  id: number | string;
  name: string;
  description?: string | null;
  category?: string | null;
  status?: string | null;
  icon?: string | null;
  _count?: {
    executions?: number | null;
  };
};

export const useAutomations = (automationType: string) => {
  const dispatch = useAppDispatch();
  const icons = useSupabaseImages();

  const categoryConfig = AUTOMATION_CATEGORY_CONFIG.find(
    (category) => category.label === automationType,
  );

  const categoryQuery = categoryConfig?.apiCategory
    ? `?category=${categoryConfig.apiCategory}`
    : "";

  const { data, isLoading, isFetching } = useAppQuery<ApiAutomation[]>(
    categoryConfig ? ["automations", categoryConfig.apiCategory] : ["automations"],
    () => api.get(`/automations${categoryQuery}`),
    {
      enabled: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    dispatch(setSelectedType(automationType));
  }, [dispatch, automationType]);

  useEffect(() => {
    if (!data) {
      dispatch(setAutomations([]));
      return;
    }

    const mapped = data.map<Automation>((automation) => {
      const status = (automation.status || "").toUpperCase();
      const isActive = status === "ACTIVE" || status === "RUNNING";
      const categoryFromSlug = AUTOMATION_CATEGORY_CONFIG.find(
        (category) => category.slug === automation.category,
      );
      const displayType = categoryFromSlug?.label || automationType;
      const fallbackIconKey = categoryFromSlug?.iconKey || categoryConfig?.iconKey;
      const fallbackIcon = fallbackIconKey ? icons[fallbackIconKey] : "";

      return {
        id: String(automation.id),
        name: automation.name,
        icon: automation.icon || fallbackIcon,
        contact: 0,
        campaign: 0,
        conversion: 0,
        type: displayType,
        description: automation.description ?? undefined,
        status: isActive ? "active" : "inactive",
      };
    });

    dispatch(setAutomations(mapped));
  }, [dispatch, data, automationType, icons, categoryConfig]);

  return {
    isLoading: isLoading || (isFetching && !data),
  };
};
