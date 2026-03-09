import React, { useRef, useEffect } from "react";
import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import { VerifyStepProps } from "./TwoFactorSetup.types";
import { handleOtpInput, handleOtpKeyDown, handleOtpPaste } from "./utils";

export default function VerifyStep({ token, setToken }: VerifyStepProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const firstEmptyIndex = token.length < 6 ? token.length : 5;
    inputRefs.current[firstEmptyIndex]?.focus();
  }, []);

  return (
    <div className="flex flex-col bg-primary px-[2.4rem] gap-[1.4rem] py-[1rem]">
      <div className="flex flex-col">
        <Heading
          size="sm"
          className="text-[1.8rem] font-bold text-text-secondary"
        >
          Verify your setup
        </Heading>
        <Text className="text-[1.2rem] text-text-primary">
          Enter the 6-digit code from your authenticator app.
        </Text>
      </div>

      <div
        className="flex justify-between items-center gap-[0.8rem] w-full"
        onPaste={(e) => handleOtpPaste(e, setToken, inputRefs)}
      >
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={token[i] || ""}
            onChange={(e) => handleOtpInput(e, i, token, setToken, inputRefs)}
            onKeyDown={(e) => handleOtpKeyDown(e, i, token, inputRefs)}
            className="w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] lg:w-[7.7rem] lg:h-[7.7rem] text-center text-[2.4rem] font-bold bg-primary border border-input-stroke rounded-[0.8rem] focus:border-brand-primary focus:outline-none transition-all"
          />
        ))}
      </div>
    </div>
  );
}
