import React from "react";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";

interface SecuritySectionProps {
  title: string;
  description: string | React.ReactNode;
  action?: React.ReactNode;
  isEditing?: boolean;
}

export default function SecuritySection({
  title,
  description,
  action,
  isEditing = false,
}: SecuritySectionProps) {
  return (
    <div className="py-[3.2rem] border-b border-border w-full">
      <div className="flex items-center justify-between w-full">
        <Heading size="sm">{title}</Heading>
        {action}
      </div>
      <Text className="">{description}</Text>
    </div>
  );
}
