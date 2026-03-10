import React from "react";
import Button from "@/shared/src/components/ui/Button";
import { BackupCodesDisplayProps } from "./TwoFactorSetup.types";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { downloadBackupCodes } from "./utils";

export default function BackupCodesDisplay({
  codes,
  copyToClipboard,
}: BackupCodesDisplayProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[3.2rem] items-center w-full max-w-[51.2rem] mx-auto">
      <div className="bg-primary border border-input-stroke rounded-[1rem] p-[1.7rem] w-full max-w-[30rem]">
        <div className="grid grid-cols-3 gap-[1rem] justify-items-center">
          {codes.map((code, index) => (
            <div
              key={index}
              className="text-[1.4rem] font-bold text-text-secondary/70 tracking-tight text-center"
            >
              {code}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-[1.2rem] w-full max-w-[28rem] justify-center">
        <button
          onClick={() => copyToClipboard(codes.join("\n"))}
          className="flex-1 flex items-center gap-[1rem] text-[1.4rem] font-400 text-text-primary bg-primary border border-input-stroke w-full px-[1.4rem] py-[.6rem] rounded-[.6rem] text-center justify-between"
        >
          <span>Copy Codes</span>
          <ImageComponent
            src={icons.copy3 || icons.copy}
            alt="Copy"
            width={16}
            height={16}
          />
        </button>
        <button
          onClick={() => downloadBackupCodes(codes)}
          className="flex-1 flex items-center gap-[1rem] text-[1.4rem] font-400 text-text-primary bg-primary border border-input-stroke w-full px-[1.4rem] py-[.6rem] rounded-[.6rem] text-center justify-between"
        >
          <span>Download</span>
          <ImageComponent
            src={icons.download || icons.upload}
            alt="Download"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
