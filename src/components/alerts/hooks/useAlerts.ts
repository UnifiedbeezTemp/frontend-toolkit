import { useState, useCallback, useRef } from "react";
import {
  ALERTS_DATA,
  ALERT_CATEGORIES,
  NEW_ALERTS_COUNT,
} from "../utils/alertsData";

export const useAlerts = () => {
  const [selectedCategory, setSelectedCategory] = useState(ALERT_CATEGORIES[0]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryTriggerRef = useRef<HTMLButtonElement>(null);

  const handleCategorySelect = useCallback((value: string) => {
    const category = ALERT_CATEGORIES.find((c) => c.value === value);
    if (category) {
      setSelectedCategory(category);
    }
    setIsCategoryOpen(false);
  }, []);

  const toggleCategoryDropdown = useCallback(() => {
    setIsCategoryOpen((prev) => !prev);
  }, []);

  const closeCategoryDropdown = useCallback(() => {
    setIsCategoryOpen(false);
  }, []);

  return {
    alerts: ALERTS_DATA,
    categories: ALERT_CATEGORIES,
    selectedCategory,
    isCategoryOpen,
    categoryTriggerRef,
    newCount: NEW_ALERTS_COUNT,
    handleCategorySelect,
    toggleCategoryDropdown,
    closeCategoryDropdown,
  };
};
