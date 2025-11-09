"use client";

import { ReactNode } from "react";
import Heading from "../ui/Heading";
import Text from "../ui/Text";

interface ChildProps {
  text: string;
  description: string;
  action: ReactNode;
  leftContent?: ReactNode;
  borderB?: boolean;
}

export default function ModalHeader({
  text,
  description,
  action,
  borderB = true,
  leftContent,
}: ChildProps) {
  return (
    <div
      className={`${
        borderB ? "border-b" : ""
      } flex items-center justify-between border-border pb-[5px] sticky top-0 pt-[16px] z-[10] bg-primary`}
    >
      <div className="flex items-center gap-[15px]">
        {leftContent}
        <div className=" ">
          <Heading>{text}</Heading>
          <Text size="sm" className="line-height-[19px]">{description}</Text>
        </div>
      </div>

      {action}
    </div>
  );
}
