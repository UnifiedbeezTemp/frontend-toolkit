import React from "react";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "./ImageComponent";
import LogoutConfirmation from "./LogoutConfirmation";
import { useLogoutButton } from "./hooks/useLogoutButton";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function LogoutButton() {
  const icons = useSupabaseIcons();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const {
    showLogoutConfirm,
    isLoggingOut,
    handleLogoutClick,
    handleCancelLogout,
    handleConfirmLogout,
    buttonRef,
    getModalPosition,
  } = useLogoutButton();

  return (
    <div className="relative" ref={buttonRef}>
      <button
        onClick={handleLogoutClick}
        className="bg-destructive flex items-center gap-[.5rem] text-primary font-[600] text-[1.5rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] transition-colors hover:bg-destructive/90"
      >
        <ImageComponent src={icons.logout} alt={""} width={20} height={20} />
        <span>Logout</span>
      </button>

      {showLogoutConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={handleCancelLogout}
          />

          <div
            className={
              isDesktop
                ? `absolute ${getModalPosition()} z-[9999] bg-primary p-[2.4rem] shadow-xl rounded-[1.2rem] min-w-[50rem]`
                : "fixed z-[9999] bg-primary p-[2.4rem] shadow-xl transition-all duration-300 w-full sm:w-auto sm:min-w-[50rem] bottom-0 left-0 right-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 rounded-t-[2rem] sm:rounded-[1.2rem]"
            }
          >
            <LogoutConfirmation
              onCancel={handleCancelLogout}
              onConfirm={handleConfirmLogout}
              isLoading={isLoggingOut}
            />
          </div>
        </>
      )}
    </div>
  );
}
