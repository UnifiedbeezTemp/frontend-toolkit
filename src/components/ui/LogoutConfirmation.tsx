"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "./Button";


interface LogoutConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function LogoutConfirmation({
  onCancel,
  onConfirm,
  isLoading,
}: LogoutConfirmationProps) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <div className="bg-destructive/5 p-[1rem] rounded-full text-destructive">
            <div className="bg-destructive/10 p-[1rem] rounded-full">
              <ImageComponent
                alt="Logout"
                src={supabaseIcons.logoutRed}
                width={20}
                height={20}
                className="border"
              />
            </div>
          </div>
          <p className="text-[17px] font-[700] text-secondary lg:hidden w-[70%] sm:w-[90%]">
            Are you sure you want to log out of your account?
          </p>
        </div>
        <button
          onClick={onCancel}
          className="rounded text-text-primary border border-border bg-border/40 p-[5px] hover:bg-border/60 transition-colors"
        >
          <ImageComponent
            alt="close"
            src={supabaseIcons.close}
            width={20}
            height={20}
            className="border"
          />
        </button>
      </div>

      <div className="my-[1.5rem]">
        <p className="text-[17px] font-[700] text-secondary hidden lg:block">
          Are you sure you want to log out of your account?
        </p>
        <p className="text-[1.2rem] text-text-primary mt-2">
          You will need to sign in back to access your account.
        </p>
      </div>

      <div className="flex items-center gap-[1rem] mt-[15px]">
        <Button variant="secondary" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="danger"
          className="w-full"
          onClick={onConfirm}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Log Out"}
        </Button>
      </div>
    </>
  );
}
