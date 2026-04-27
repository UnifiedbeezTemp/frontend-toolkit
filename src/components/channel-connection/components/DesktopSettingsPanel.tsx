"use client";

import React from "react";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import DesktopSettingsHeader from "./DesktopSettingsHeader";
import { useDesktopSettingsPanel } from "../hooks/useDesktopSettingsPanel";
import ChannelConfigWrapper from "../config/ChannelConfigWrapper";

export default function DesktopSettingsPanel() {
  const {
    activeChannel,
    icon,
    editingAccount,
    handleClose,
    handleEditAccount,
    refetch,
  } = useDesktopSettingsPanel();

  if (!activeChannel) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-center px-[2.4rem]">
          <Heading className="text-[1.6rem] mb-[0.8rem] text-center">
            No channel selected
          </Heading>
          <Text size="sm" className=" text-center">
            Select a channel from the sidebar to configure it
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DesktopSettingsHeader
        activeChannel={activeChannel}
        icon={icon}
        onClose={handleClose}
      />

      <div className="overflow-y-auto flex-1">
        <ChannelConfigWrapper
          channel={activeChannel}
          onClose={handleClose}
          onEditAccount={handleEditAccount}
          editingAccountId={editingAccount?.id ?? null}
          onRefetchChannels={refetch}
        />
      </div>
    </div>
  );
}
