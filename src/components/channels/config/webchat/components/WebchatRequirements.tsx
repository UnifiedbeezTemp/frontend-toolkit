"use client";

import Button from "../../../../../components/ui/Button";
import Text from "../../../../../components/ui/Text";
import ChannelRequirements from "../../../preview/ChannelRequirements";

interface WebchatRequirementsProps {
  onContinue: () => void;
}

export default function WebchatRequirements({
  onContinue,
}: WebchatRequirementsProps) {
  return (
    <ChannelRequirements
      requirements={["Have a website"]}
      footer={
        <Button className="w-full" onClick={onContinue}>
          Connect
        </Button>
      }
    >
      <Text className="text-[1.2rem]">
        Need help installing Web Chat? Learn how to{" "}
        <span className="text-brand-primary underline cursor-pointer">install</span> Web
        Chat on your website
      </Text>
    </ChannelRequirements>
  );
}
