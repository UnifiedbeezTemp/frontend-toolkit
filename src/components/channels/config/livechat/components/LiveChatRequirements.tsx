"use client";

import Button from "../../../../../components/ui/Button";
import Text from "../../../../../components/ui/Text";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface LiveChatRequirementsProps {
  onContinue: () => void;
}

export default function LiveChatRequirements({
  onContinue,
}: LiveChatRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have a website"]}
      footer={
        <Button className="w-full" onClick={onContinue}>
          Connect
        </Button>
      }
    >
      {/* <Text className="text-[1.2rem]">
        Need help installing Live Chat? Learn how to{" "}
        <span className="text-brand-primary underline cursor-pointer">
          install
        </span>{" "}
        Live Chat on your website
      </Text> */}
    </ChannelRequirements>
  );
}
