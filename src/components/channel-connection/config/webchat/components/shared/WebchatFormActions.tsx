"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import { ChannelConnection } from "../../../../../../types/channelConnectionTypes";
import Button from "../../../../../ui/Button";


interface WebchatFormActionsProps {
  connection?: ChannelConnection | null;
  onDelete: () => void;
  isLoading: boolean;
  variant?: "desktop" | "mobile";
}

export default function WebchatFormActions({
  connection,
  onDelete,
  isLoading,
  variant = "desktop",
}: WebchatFormActionsProps) {
  const icons = useSupabaseIcons();
  const isMobile = variant === "mobile";
  const buttonSize = isMobile ? "text-[1.4rem]" : "text-[1.6rem]";

  if (isMobile) {
    return (
      <div className="flex items-center gap-[1rem] justify-between mt-[4rem]">
        {connection && (
          <Button
            type="button"
            variant="dangerReverse"
            className={`w-full ${buttonSize} flex items-center justify-center gap-[.5rem]`}
            onClick={onDelete}
            disabled={isLoading}
          >
            <ImageComponent
              src={icons.trashRed}
              alt="trash"
              width={18}
              height={18}
            />
            Delete account
          </Button>
        )}
        <Button
          type="submit"
          className={`${connection ? "w-[30%] sm:w-full" : "w-full"} highlight-inside border-0 ${buttonSize}`}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[1rem] justify-end pt-[2.4rem] border-t mt-[2.4rem] border-input-stroke">
      {connection && (
        <Button
          type="button"
          variant="dangerReverse"
          className={`${buttonSize} flex items-center gap-[.5rem] px-[1.6rem]`}
          onClick={onDelete}
          disabled={isLoading}
        >
          <ImageComponent
            src={icons.trashRed}
            alt="trash"
            width={20}
            height={20}
          />
          Delete account
        </Button>
      )}
      <Button
        type="submit"
        className={`highlight-inside border-0 ${buttonSize} px-[3rem]`}
        loading={isLoading}
      >
        Save
      </Button>
    </div>
  );
}
