import React from "react";
import { RegeneratedSuccessStepProps } from "./TwoFactorStatus.types";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import Button from "../../../ui/Button";

export default function RegeneratedSuccessStep({
  regeneratedCodes,
  copyToClipboard,
}: RegeneratedSuccessStepProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col items-center gap-[1.6rem] text-center">
        <div className="w-[6.4rem] h-[6.4rem] bg-success/10 rounded-full flex items-center justify-center">
          <ImageComponent
            src={icons.check}
            alt="Success"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col gap-[0.4rem]">
          <Heading size="md">Codes Regenerated!</Heading>
          <Text className="text-text-primary">
            Save these new backup codes in a safe place. Your old codes are now
            invalid.
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[0.8rem] p-[1.6rem] bg-input-filled rounded-[1.2rem] border border-border">
        {regeneratedCodes.map((code, index) => (
          <div
            key={index}
            className="p-[0.8rem] bg-primary border border-border rounded-[0.6rem] text-center font-mono text-[1.4rem]"
          >
            {code}
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => copyToClipboard(regeneratedCodes.join("\n"))}
        className="w-full"
      >
        Copy All Codes
      </Button>
    </div>
  );
}
