import React from "react";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { cn } from "../../../lib/utils";
import { formatEnumString } from "../../../utils";

interface ChannelCardBodyProps {
  displayName: string;
  description: string;
  reason: string | null;
  comingSoon: boolean;
}

export const ChannelCardBody: React.FC<ChannelCardBodyProps> = ({
  displayName,
  description,
  reason,
  comingSoon,
}) => {
  const reasonText = formatEnumString(reason) || "Available channel";

  return (
    <div className="mb-[1.5rem] lg:my-[1.5rem] space-y-[3px] flex-grow">
      <div
        className="bg-border/20 hidden overflow-hidden max-w-full lg:inline-block border border-border rounded-[0.4rem] p-[0.4rem] font-[700] text-[1.2rem] text-text-primary truncate"
        title={reasonText}
      >
        {reasonText}
      </div>
      <Heading
        className={cn(
          "mt-[0.4rem] text-[1.4rem] lg:text-[2rem] lg:leading-[2.96rem]",
          comingSoon && "text-inactive-color",
        )}
      >
        {displayName}
      </Heading>
      <Text size="sm">{description}</Text>
    </div>
  );
};
