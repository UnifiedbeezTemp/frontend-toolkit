import { useState, useCallback, useMemo } from "react";

export const useBillingTab = (
  activeTab: string,
  setActiveTab: (tab: string) => void,
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const billingSubTabs = useMemo(
    () => ["Your Plan", "Invoice", "Budget", "Credits", "Usage"],
    [],
  );

  const isBillingTabActive = useMemo(() => {
    return (
      activeTab === "Plans & billings" || billingSubTabs.includes(activeTab)
    );
  }, [activeTab, billingSubTabs]);

  const currentBillingLabel = useMemo(() => {
    if (billingSubTabs.includes(activeTab)) {
      return activeTab;
    }
    return "Plans & billings";
  }, [activeTab, billingSubTabs]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleSelectSubTab = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      closeDropdown();
    },
    [setActiveTab, closeDropdown],
  );

  const getSubTabIcon = useCallback((tab: string) => {
    switch (tab) {
      case "Your Plan":
      case "Credit":
      case "Plans & billings":
        return "CardOutlineIcon";
      case "Invoice":
        return "InvoiceIcon";
      case "Budget":
        return "PresentationProject";
      case "Usage":
        return "DataUsageIcon";
      default:
        return "CardOutlineIcon";
    }
  }, []);

  const currentBillingIcon = useMemo(() => {
    return getSubTabIcon(activeTab);
  }, [activeTab, getSubTabIcon]);

  return {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    isBillingTabActive,
    currentBillingLabel,
    currentBillingIcon,
    handleSelectSubTab,
    billingSubTabs,
    getSubTabIcon,
  };
};
