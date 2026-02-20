"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Notification, NotificationCategory } from "../types";
import { NOTIFICATIONS_DATA } from "../utils/notificationsData";

interface NotificationContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  togglePanel: () => void;
  closePanel: () => void;
  filter: NotificationCategory;
  setFilter: (category: NotificationCategory) => void;
  notifications: Notification[];
  filteredNotifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<NotificationCategory>("all");
  const [notifications, setNotifications] =
    useState<Notification[]>(NOTIFICATIONS_DATA);

  const togglePanel = useCallback(() => setIsOpen((prev) => !prev), []);
  const closePanel = useCallback(() => setIsOpen(false), []);

  const filteredNotifications = useMemo(() => {
    if (filter === "all") return notifications;
    return notifications.filter((n) => n.category === filter);
  }, [filter, notifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      togglePanel,
      closePanel,
      filter,
      setFilter,
      notifications,
      filteredNotifications,
      markAsRead,
      markAllAsRead,
      unreadCount,
    }),
    [
      isOpen,
      filter,
      notifications,
      filteredNotifications,
      togglePanel,
      closePanel,
      markAsRead,
      markAllAsRead,
      unreadCount,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
