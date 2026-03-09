import { useState, useEffect } from "react";
import { notifications } from "../../../../data/notifications";

export const useNotificationSettings = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >({});
  const [initialSettings, setInitialSettings] = useState<
    Record<string, boolean>
  >({});

  const initializeSettings = () => {
    const settings: Record<string, boolean> = {};
    const initial: Record<string, boolean> = {};

    notifications.forEach((notification) => {
      const saved = localStorage.getItem(`notification-${notification.key}`);
      const value =
        saved !== null ? saved === "true" : notification.defaultValue;
      settings[notification.key] = value;
      initial[notification.key] = value;
    });

    setNotificationSettings(settings);
    setInitialSettings(initial);
  };

  useEffect(() => {
    initializeSettings();
  }, []);

  const handleEditClick = () => {
    initializeSettings();
    setIsEditing(true);
  };

  const handleSave = () => {
    Object.entries(notificationSettings).forEach(([key, value]) => {
      localStorage.setItem(`notification-${key}`, value.toString());
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setNotificationSettings({ ...initialSettings });
    setIsEditing(true);
  };

  const handleToggleAll = (enable: boolean) => {
    if (!isEditing) return;

    const newSettings: Record<string, boolean> = {};
    notifications.forEach((notification) => {
      newSettings[notification.key] = enable;
    });
    setNotificationSettings(newSettings);
  };

  const handleIndividualToggle = (key: string) => {
    if (!isEditing) return;
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allEnabled = notifications.every(
    (notification) => notificationSettings[notification.key]
  );
  const allDisabled = notifications.every(
    (notification) => !notificationSettings[notification.key]
  );

  const masterToggleState = allEnabled ? true : allDisabled ? false : "mixed";

  return {
    isEditing,
    notifications,
    notificationSettings,
    allEnabled,
    allDisabled,
    masterToggleState,
    handleEditClick,
    handleSave,
    handleCancel,
    handleToggleAll,
    handleIndividualToggle,
  };
};
