"use client";

import ImageComponent from "../../../components/ui/ImageComponent";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import CloseModalButton from "../../../components/modal/CloseModalButton";
import ChannelConfigWrapper from "../config/ChannelConfigWrapper";
import { DesktopSettingsPanelProps } from "../types";

export default function DesktopSettingsPanel({
  channel,
  onClose,
  onEditConnection,
  editingConnectionId,
  onRefetchChannels,
}: DesktopSettingsPanelProps) {
  if (!channel) {
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
      <div className="px-[1.6rem] py-[1.1rem] border-b border-border flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-[1.6rem]">
          <ImageComponent
            alt={channel.channelName ?? ""}
            src={channel.icon}
            width={40}
            height={40}
          />
          <div>
            <Heading className="text-[1.6rem]">
              {`${channel.channelName ?? ""}`}
            </Heading>
            <Text className="text-[1.4rem]">{channel.description ?? ""}</Text>
          </div>
        </div>
        <CloseModalButton
          onClick={onClose}
          className="bg-input-filled px-[.8rem]"
        />
      </div>

      <div className="overflow-y-auto flex-1">
        <ChannelConfigWrapper
          channel={channel}
          onClose={onClose}
          editingConnectionId={editingConnectionId}
          onRefetchChannels={onRefetchChannels}
        />
      </div>
    </div>
  );
}
