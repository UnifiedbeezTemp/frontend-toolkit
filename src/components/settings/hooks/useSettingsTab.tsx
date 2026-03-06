import { useState, useEffect } from "react";
import ProfileSettings from "../profile/ProfileSettings";
import PreferenceSettings from "../preference/PreferenceSettings";
import NotificationsSettings from "../notifications/NotificationsSettings";
import SecuritySettings from "../security/SecuritySettings";
import ChannelsSettings from "../channels/ChannelsSettings";
import TeamSettings from "../team/TeamSettings";
import BudgetSettings from "../billing/budget/BudgetSettings";
import CreditSettings from "../billing/credits/CreditSettings";
import UsageSettings from "../billing/usage/UsageSettings";
import InvoiceSettings from "../billing/invoice/InvoiceSettings";
// import PreferenceSettings from "../preference/PreferenceSettings";
// import NotificationsSettings from "../notifications/NotificationsSettings";
// import SecuritySettings from "../security/SecuritySettings";
// import ChannelsSettings from "../channels/ChannelsSettings";
// import TeamSettings from "../team/TeamSettings";
// import AddonsPage from "../../addons/AddonsPage";
// import InvoiceSettings from "../billing/invoice/InvoiceSettings";
// import BudgetSettings from "../billing/budget/BudgetSettings";
// import CreditSettings from "../billing/credits/CreditSettings";

export const useSettingsTab = () => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("settings-active-tab") || "Profile";
    }
    return "Profile";
  });

  useEffect(() => {
    localStorage.setItem("settings-active-tab", activeTab);
  }, [activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileSettings />;
      case "Preference":
        return <PreferenceSettings />;
      case "Notifications":
        return <NotificationsSettings />;
      case "Security":
        return <SecuritySettings />;
      case "Channels":
        return <ChannelsSettings />;
      case "Team":
        return <TeamSettings />;
      case "Your Plan":
      case "Plans & billings":
        return "";
        // <AddonsPage
        //   hideHeader
        //   className="!pt-0 !min-h-fit mt-[2rem]"
        //   onBack={() => {}}
        //   isFromSettings={true}
        // />
      case "Invoice":
        return <InvoiceSettings />;
      case "Budget":
        return <BudgetSettings />;
      case "Credits":
        return <CreditSettings />;
      case "Usage":
        return <UsageSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const showAddonsButton = activeTab === "Profile";

  return {
    activeTab,
    setActiveTab,
    renderActiveTab,
    showAddonsButton,
  };
};
