"use client";

import { ReactNode } from "react";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { cn } from "../../lib/utils";

interface ChildProps {
  text: string;
  description: string;
  action: ReactNode;
  leftContent?: ReactNode;
  borderB?: boolean;
  className?: string;
}

export default function ModalHeader({
  text,
  description,
  action,
  borderB = true,
  leftContent,
  className,
}: ChildProps) {
  return (
    <div
      className={cn(
        borderB ? "border-b" : "",
        "flex items-center justify-between border-border sticky top-[0] z-[10] bg-primary z-[100]",
        className
      )}
    >
      <div className="flex items-center gap-[1.5rem]">
        {leftContent}
        <div className=" ">
          <Heading className="text-[1.8rem] lg:text-[2.4rem]">{text}</Heading>
          <Text className="line-height-[1.9rem] text-[1.4rem]">
            {description}
          </Text>
        </div>
      </div>

      {action}
    </div>
  );
}
