import React from "react";
import { SuccessStepProps } from "./TwoFactorSetup.types";
import BackupCodesDisplay from "./BackupCodesDisplay";

export default function BackupCodesStep({
  setupData,
  verifyData,
  copyToClipboard,
}: SuccessStepProps) {
  const codes = verifyData?.backupCodes || setupData.backupCodes;

  return (
    <div className="">
      <BackupCodesDisplay codes={codes} copyToClipboard={copyToClipboard} />
    </div>
  );
}
