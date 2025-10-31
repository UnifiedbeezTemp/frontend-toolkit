"use client";

import { ReactNode } from "react";

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
      } flex items-center justify-between border-border pb-[15px] sticky top-0 z-[10] bg-primary`}
    >
      <div className="flex items-center gap-[10px]">
        {leftContent}
        <div className=" ">
          <p className="text-secondary text-[24px] font-[700]">{text}</p>
          <p className="text-secondary text-[14px]">{description}</p>
        </div>
      </div>

      {action}
    </div>
  );
}
