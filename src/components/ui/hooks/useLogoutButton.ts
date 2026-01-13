import { useState, useRef } from "react";
import { useLogout } from "../../../hooks/useLogout";

export const useLogoutButton = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout, isLoading: isLoggingOut } = useLogout();
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirmLogout = () => {
    logout();
  };

  const getModalPosition = () => {
    if (!buttonRef.current) return "bottom-left";

    // We only care about desktop positioning here
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceBottom = window.innerHeight - rect.bottom;

    const vertical = spaceBottom < 300 ? "bottom-0" : "top-0";
    const horizontal = spaceRight < 300 ? "right-0" : "left-0";

    return `${vertical} ${horizontal}`;
  };

  return {
    showLogoutConfirm,
    isLoggingOut,
    handleLogoutClick,
    handleCancelLogout,
    handleConfirmLogout,
    buttonRef,
    getModalPosition,
  };
};
