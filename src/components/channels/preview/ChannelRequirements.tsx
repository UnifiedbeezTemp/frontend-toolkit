"use client";

import { ReactNode } from "react";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import Checkbox from "../../../components/ui/CheckBox";

interface ChannelRequirementsProps {
  title?: string;
  subtitle?: string;
  requirements: string[];
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function ChannelRequirements({
  title = "Requirements",
  subtitle = "Ensure that you:",
  requirements,
  children,
  footer,
  className = "",
}: ChannelRequirementsProps) {
  return (
    <div
      className={`px-[1.6rem] pt-[1.6rem] pb-[4rem] lg:px-[2.8rem] lg:py-[3.1rem] lg:pr-[1.7rem] ${className}`}
    >
      <Heading className="text-[1.6rem] lg:text-[2rem]">{title}</Heading>

      <div className="bg-input-filled border border-input-stroke px-[1.6rem] py-[2.4rem] mt-[1.6rem] rounded-[0.8rem]">
        {subtitle && (
          <Heading className="text-[1.4rem] lg:text-[1.6rem] mb-[1.6rem]">
            {subtitle}
          </Heading>
        )}

        <div className="space-y-[1.6rem]">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-[0.8rem]">
              <Checkbox
                size="sm"
                checked={true}
                onChange={() => {}}
                className="rounded-full shrink-0"
              />
              <Text size="sm">{req}</Text>
            </div>
          ))}
        </div>

        {children && <div className="mt-[1.6rem]">{children}</div>}
      </div>

      {footer && <div className="mt-[4rem]">{footer}</div>}
    </div>
  );
}
