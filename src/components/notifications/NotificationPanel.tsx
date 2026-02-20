import React, { useEffect } from "react";
import { useNotifications } from "./hooks/useNotifications";
import NotificationPanelHeader from "./sub-components/NotificationPanelHeader";
import NotificationFilters from "./sub-components/NotificationFilters";
import NotificationList from "./sub-components/NotificationList";
import NotificationPanelFooter from "./sub-components/NotificationPanelFooter";

export default function NotificationPanel() {
  const {
    isOpen,
    closePanel,
    filter,
    setFilter,
    filteredNotifications,
    markAsRead,
  } = useNotifications();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePanel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity cursor-pointer"
        onClick={closePanel}
      />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-[50rem] h-full bg-primary shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 sm:rounded-ss-[3rem] px-[1rem]">
        <NotificationPanelHeader onClose={closePanel} />

        <NotificationFilters activeFilter={filter} onFilterChange={setFilter} />

        <NotificationList
          notifications={filteredNotifications}
          onNotificationClick={markAsRead}
        />

        <NotificationPanelFooter onViewAll={closePanel} />
      </div>
    </div>
  );
}
