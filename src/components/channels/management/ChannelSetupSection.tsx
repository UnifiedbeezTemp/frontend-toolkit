"use client";

import ImageComponent from "../../../components/ui/ImageComponent";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Checkbox from "../../../components/ui/CheckBox";
import Button from "../../../components/ui/Button";
import CloseModalButton from "../../../components/modal/CloseModalButton";
import { Channel } from "../../../store/onboarding/types/channelTypes";

interface ChannelSetupSectionProps {
  channel: Channel;
  onConnect: () => void;
  onClose: () => void;
}

export default function ChannelSetupSection({
  channel,
  onConnect,
  onClose
}: ChannelSetupSectionProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="p-[1.6rem]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Heading className="text-[1.4rem]">Connect {channel.name}</Heading>
          <Text className="text-[1rem]">
            Receive and reply to {channel.name} messages through your inbox.
          </Text>
        </div>
        <CloseModalButton onClick={onClose} />
      </div>

      <div className="sm:flex md:flex-col lg:flex-row items-start gap-[1.6rem] border border-brand-primary p-[1.6rem] rounded-[0.8rem] bg-soft-green mb-6">
        <ImageComponent
          src={icons.infoGreen}
          alt="info"
          width={24}
          height={24}
          className="md:mx-auto"
        />
        <div>
          <Heading size="sm">What happens next?</Heading>
          <Text size="sm">
            Click "Connect" and we'll redirect you to add {channel.name} with just a few clicks.
          </Text>
        </div>
      </div>

      <div className="mb-6">
        <Heading size="sm" className="mb-[1.5rem]">
          What you need:
        </Heading>

        <div className="space-y-2">
          <div className="border border-input-stroke px-[1.6rem] py-[1rem] flex items-center gap-[1.2rem] rounded-[0.8rem]">
            <Checkbox
              size="sm"
              checked={true}
              onChange={() => {}}
              className="rounded-full shrink-0"
            />
            <Text size="sm">Access to your {channel.name} Business account</Text>
          </div>

          <div className="border border-input-stroke px-[1.6rem] py-[1rem] flex items-center gap-[1.2rem] rounded-[0.8rem]">
            <Checkbox
              size="sm"
              checked={true}
              onChange={() => {}}
              className="rounded-full shrink-0"
            />
            <Text size="sm">Administrator access to your {channel.name} page</Text>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={onConnect}>
        Connect
      </Button>
    </div>
  );
}