"use client";

import ImageComponent from "../../../components/ui/ImageComponent";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import Button from "../../../components/ui/Button";
import CloseModalButton from "../../../components/modal/CloseModalButton";
import ToggleSwitch from "../../../components/ui/ToggleSwitch";
import { useState } from "react";
import { Channel } from "../../../store/onboarding/types/channelTypes";

interface ChannelSettingsSectionProps {
  channel: Channel;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChannelSettingsSection({
  channel,
  isOpen,
  onToggle
}: ChannelSettingsSectionProps) {
  const [readConfirmation, setReadConfirmation] = useState(false);

  if (!isOpen) {
    return (
      <div className="p-[1.6rem] border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <Heading className="text-[1.4rem]">{channel.name} settings</Heading>
            <Text className="text-[1.4rem] text-text-secondary">
              Edit all {channel.name} settings here
            </Text>
          </div>
          <CloseModalButton onClick={onToggle} className="bg-input-filled" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-[1.6rem]">
      {/* Channel Header */}
      <div className="flex items-center gap-3 py-[2rem] border-b border-border">
        <ImageComponent
          alt={channel.name}
          src={channel.icon}
          width={30}
          height={30}
        />
        <Heading className="text-[1.4rem]">{channel.name}</Heading>
      </div>

      {/* Read Confirmation Setting */}
      <div className="py-[3rem] border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <Heading size="sm">Read confirmation</Heading>
          <ToggleSwitch
            isActive={readConfirmation}
            onToggle={() => setReadConfirmation(!readConfirmation)}
          />
        </div>
        <Text size="sm" className="max-w-[70%]">
          Activate to show contacts that you have read their message
        </Text>
      </div>

      {/* Action Buttons */}
      <div className="pb-[2rem] pt-4 flex items-center gap-[1rem]">
        <Button variant="dangerReverse" className="w-full">
          Delete channel integration
        </Button>
        <Button className="w-[70%]" onClick={onToggle}>
          Save
        </Button>
      </div>
    </div>
  );
}