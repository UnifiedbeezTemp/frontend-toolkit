import React from "react";
import { StatusManagementStepProps } from "./TwoFactorStatus.types";
import StatusItem from "./StatusItem";
import Text from "../../../ui/Text";
import Heading from "../../../ui/Heading";
import ImageComponent from "../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { formatDateTime } from "../../../../utils";
import Button from "../../../ui/Button";

export default function StatusManagementStep({
  status,
  onRegenerate,
  isRegenerating,
}: StatusManagementStepProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <div className="flex items-center gap-[1.2rem] p-[1.6rem] bg-success/10 border border-success/20 rounded-[1.2rem]">
          <div className="w-[4rem] h-[4rem] bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
            <ImageComponent
              src={icons.check}
              alt="Enabled"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col">
            <Text className="font-semibold text-success">2FA is Enabled</Text>
            <Text className="text-[1.3rem] text-success">
              Your account is protected with an extra layer of security.
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[1.2rem]">
          <StatusItem
            label="Setup Date"
            value={formatDateTime(status.setupAt)}
          />
          <StatusItem
            label="Last Used"
            value={
              status.lastUsed ? formatDateTime(status.lastUsed) : "Never used"
            }
          />
          <StatusItem
            label="Backup Codes Remaining"
            value={status.backupCodesRemaining}
            badge={status.backupCodesRemaining <= 3 ? "Low count" : undefined}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[1.2rem]">
        <Heading size="sm">Actions</Heading>
        <div className="flex flex-col gap-[0.8rem]">
          <div className="p-[1.6rem] border border-border rounded-[1.2rem] flex items-center justify-between">
            <div className="flex flex-col gap-[0.4rem]">
              <Text className="font-medium">Regenerate Backup Codes</Text>
              <Text className="text-text-primary text-[1.3rem]">
                Old codes will become invalid immediately.
              </Text>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onRegenerate}
              loading={isRegenerating}
            >
              Regenerate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
