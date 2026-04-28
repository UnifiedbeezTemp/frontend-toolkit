import React from "react";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";
import CloseModalButton from "../../modal/CloseModalButton";
import { SelectedChannel } from "../../../types/channelApiTypes";

interface DesktopSettingsHeaderProps {
  activeChannel: SelectedChannel;
  icon: string | null;
  onClose: () => void;
}

export default function DesktopSettingsHeader({
  activeChannel,
  icon,
  onClose,
}: DesktopSettingsHeaderProps) {
  return (
    <div className="px-[1.6rem] py-[1.1rem] border-b border-border flex justify-between items-center flex-shrink-0">
      <div className="flex items-center gap-[1.6rem]">
        {icon && (
          <ImageComponent
            alt={activeChannel?.channelName ?? ""}
            src={icon}
            width={40}
            height={40}
          />
        )}
        <div>
          <Heading className="text-[1.6rem]">
            {activeChannel.channelName ?? ""}
          </Heading>
          <Text className="text-[1.4rem]">
            {activeChannel?.availableChannel?.description ?? ""}
          </Text>
        </div>
      </div>
      <CloseModalButton
        onClick={onClose}
        className="bg-input-filled px-[.8rem]"
      />
    </div>
  );
}
