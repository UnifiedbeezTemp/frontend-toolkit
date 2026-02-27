import React from "react";
import MergeBlockIcon from "@/shared/src/assets/icons/MergeBlockIcon";

export const MergeBlocksInfo = () => (
  <div className="bg-input-filled border border-input-stroke rounded-[1rem] p-[1.6rem] flex items-start gap-[1.2rem]">
    <div className="flex items-center justify-center w-[2.4rem] h-[2.4rem] bg-white border border-border rounded-[0.6rem] shrink-0">
      <MergeBlockIcon size={16} className="text-brand-primary" />
    </div>
    <div className="flex flex-col gap-[0.4rem]">
      <span className="text-[1.3rem] font-bold text-text-secondary">
        Use merge blocks as variable placeholders.
      </span>
      <p className="text-[1.2rem] text-text-secondary/70 leading-relaxed">
        They'll be automatically replaced with the correct contact information
        when your message is sent.
      </p>
    </div>
  </div>
);
