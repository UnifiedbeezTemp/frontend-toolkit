import React from "react";
import { Session } from "../../types/sessionTypes";
import Text from "../ui/Text";
import Button from "../ui/Button";
import { formatDateTime, cn } from "../../lib/utils";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";

interface SessionItemProps {
  session: Session;
  onTerminate: (id: string) => void;
  isTerminating: boolean;
}

export default function SessionItem({
  session,
  onTerminate,
  isTerminating,
}: SessionItemProps) {
  const isCurrent = session.isCurrent;
  const formattedDate = formatDateTime(session.lastActiveAt);
  const { trashRed } = useSupabaseIcons();

  return (
    <div className="flex items-start sm:items-center justify-between py-[2rem] border-b border-border last:border-0 gap-[1.6rem]">
      <div className="flex items-start gap-[1.6rem]">
        <div
          className={cn(
            "w-[4.8rem] h-[4.8rem] rounded-[1.2rem] flex items-center justify-center shrink-0 text-[2.4rem]",
            isCurrent ? "bg-brand-primary/10" : "bg-gray-100"
          )}
        >
          {session.deviceType === "mobile" ? "📱" : "💻"}
        </div>

        <div className="flex flex-col gap-[0.4rem]">
          <div className="flex items-center gap-[1rem] flex-wrap">
            <Text size="md" weight="bold" className="text-text-primary">
              {session.deviceName || "Unknown Device"}
            </Text>
            {isCurrent && (
              <span className="px-[1rem] py-[0.2rem] bg-green-100 text-green-700 text-[1.1rem] font-semibold rounded-full border border-green-200">
                Current Session
              </span>
            )}
            <span className="px-[0.8rem] py-[0.2rem] bg-gray-100 text-text-secondary text-[1rem] font-medium rounded-[0.6rem] border border-gray-200 capitalize">
              {session.loginMethod}
            </span>
          </div>

          <div className="flex items-center gap-[0.8rem] text-text-tertiary flex-wrap">
            <Text size="sm" className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              {formattedDate}
            </Text>
            <Text size="sm" className="flex items-center gap-1">
              {session.location || "Unknown Location"}
            </Text>
            <Text
              size="xs"
              className="px-[0.6rem] py-[0.1rem] bg-gray-50 rounded-[0.4rem] border border-gray-100 font-mono"
            >
              IP: {session.ipAddress}
            </Text>
          </div>
        </div>
      </div>

      {!isCurrent && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onTerminate(session.id)}
          loading={isTerminating}
          className="border-none w-[3.2rem] h-[3.2rem] p-0 flex items-center justify-center rounded-full hover:bg-red-50"
        >
          <ImageComponent
            src={trashRed}
            alt="Revoke session"
            width={18}
            height={18}
          />
        </Button>
      )}
    </div>
  );
}
