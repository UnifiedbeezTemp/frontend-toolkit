import React from "react";
import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { SetupStepProps } from "./TwoFactorSetup.types";

export default function SetupStep({
  setupData,
  confirmSaved,
  setConfirmSaved,
  copyToClipboard,
}: SetupStepProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[3.2rem] items-center text-center w-full">
      <div className="flex flex-col gap-[0.8rem] w-full items-center">
        <Heading
          size="sm"
          className="text-[2rem] font-bold text-text-secondary"
        >
          Scan QR Code
        </Heading>
        <Text className="text-[1.4rem] text-text-secondary">
          Scan the QR code below with Google Authenticator, Authy, or similar
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-[2.4rem] bg-input-filled py-[1.2rem] px-[2.4rem] w-full rounded-[1.6rem]">
        <div className="p-[1.5px] bg-[linear-gradient(135deg,var(--brand-primary)_40%,var(--brand-secondary)_100%)] rounded-[1.4rem] flex-shrink-0 shadow-sm">
          <div className="bg-primary rounded-[1.3rem] overflow-hidden p-[1rem]">
            <img
              src={setupData.qrCodeUrl}
              alt="2FA QR Code"
              className="w-[17.8rem] h-[17.8rem]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center h-full sm:pt-[1.4rem] gap-[1rem] flex-1">
          <div className="flex flex-col gap-[0.4rem]">
            <Heading size="sm" className="text-[1.6rem] font-bold">
              Can't scan QR Code?
            </Heading>
            <Text className="text-[1.2rem] text-text-secondary">
              Enter this secret key instead
            </Text>
          </div>

          <div className="flex items-center justify-between p-[0.4rem] pl-[1.2rem] bg-primary border border-input-stroke rounded-[1rem] w-full max-w-[28rem]">
            <code className="text-[1.3rem] font-mono font-medium truncate pr-[0.8rem]">
              {setupData.secret}
            </code>
            <button
              onClick={() => copyToClipboard(setupData.secret)}
              className="p-[0.8rem] hover:bg-black/5 rounded-[0.6rem] transition-colors flex-shrink-0"
            >
              <ImageComponent
                src={icons.copy3}
                alt="Copy"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
