import React from "react";
import CloseModalButton from "../../../modal/CloseModalButton";

interface DiscoverHeaderProps {
  onClose: () => void;
}

export function DiscoverHeader({ onClose }: DiscoverHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-[0.4rem]">
        <h2 className="lg:text-[2.4rem] text-[1.6rem] font-bold text-text-secondary leading-tight">
          WhatsApp templates, built for real business conversations
        </h2>
        <p className="lg:text-[1.4rem] text-[1rem] text-text-primary">
          Smart, ready-to-use templates designed to sell, support, follow up,
          and automate conversations — across every stage of your customer
          journey.
        </p>
      </div>
      <div className="flex items-center gap-[1.6rem]">
        <CloseModalButton onClick={onClose} />
      </div>
    </div>
  );
}
