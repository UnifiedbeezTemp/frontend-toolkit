"use client";

import ActionButtons from "../profile/profile-details/ActionButtons";
import SettingsSectionHeader from "../SettingsSectionHeader";
import { useNotificationSettings } from "./hooks/useNotificationsSettings";
import MasterToggle from "./MasterToggle";
import NotificationItem from "./NotificationItem";

export default function NotificationsSettings() {
  const {
    isEditing,
    notifications,
    notificationSettings,
    masterToggleState,
    handleEditClick,
    handleSave,
    handleCancel,
    handleToggleAll,
    handleIndividualToggle,
  } = useNotificationSettings();

  return (
    <div className="mt-[3rem] sm:mt-[1.5rem] px-[1.6rem] lg:px-0">
      <SettingsSectionHeader
        isEditing={isEditing}
        handleEditClick={handleEditClick}
        title="Notifications"
      />

      <div className="mt-[2rem]">
        {isEditing && (
          <MasterToggle
            isEditing={isEditing}
            masterToggleState={masterToggleState}
            onToggleAll={handleToggleAll}
          />
        )}

        {notifications.map((notification, idx) => (
          <NotificationItem
            key={notification.key}
            notification={notification}
            isActive={notificationSettings[notification.key] || false}
            isEditing={isEditing}
            onToggle={handleIndividualToggle}
            showBorder={idx < notifications.length - 1}
          />
        ))}
      </div>

      <ActionButtons
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={isEditing}
      />
    </div>
  );
}
