"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Input from "../../../../forms/Input";
import Button from "../../../../ui/Button";
import Heading from "../../../../ui/Heading";
import { extractCustomEmailDisplayData } from "../utils/customEmailConnectionDisplayUtils";
import { CustomEmailConnectionDetailsProps } from "./shared/types";
import DNSRecordsDisplay from "./DNSRecordsDisplay";

export default function CustomEmailConnectionDetails({
  connection,
  onDelete,
  isDeleting = false,
  variant = "desktop",
  onVerify,
  isVerifying,
  verificationError,
}: CustomEmailConnectionDetailsProps) {
  const icons = useSupabaseIcons();
  const isMobile = variant === "mobile";
  const containerPadding = isMobile
    ? "px-[1.2rem] pb-[5rem]"
    : "px-[2.8rem] py-[3.1rem] pr-[1.7rem]";

  const {
    email,
    displayName,
    customDomain,
    verificationStatus,
    verifiedAt,
    emailConfig,
  } = extractCustomEmailDisplayData(connection);

  const isPending =
    verificationStatus?.toUpperCase() === "PENDING" && !verifiedAt;

  const DEFAULT_INSTRUCTIONS = {
    steps: [
      "Add the MX records to your domain DNS settings",
      "Add the TXT records (SPF and verification)",
      "Add the CNAME records for DKIM",
      "Wait 5-10 minutes for DNS propagation",
      "Click \"Verify\" to complete receiving setup",
    ],
    note: "DNS changes can take up to 48 hours but usually 5-10 minutes.",
  };

  const renderDeleteButton = () => (
    <div className="flex justify-end pt-[2rem] lg:pt-[2.1rem]">
      <Button
        variant="dangerReverse"
        className="flex items-center gap-[1rem]"
        onClick={onDelete}
        disabled={isDeleting}
        loading={isDeleting}
      >
        <ImageComponent
          src={icons.trashRed}
          alt="trash"
          width={20}
          height={20}
        />
        Delete account
      </Button>
    </div>
  );

  if (isPending && emailConfig?.dnsRecords) {
    return (
      <div className={containerPadding}>
        <DNSRecordsDisplay
          dnsRecords={emailConfig.dnsRecords}
          instructions={DEFAULT_INSTRUCTIONS}
          onVerify={onVerify}
          isVerifying={isVerifying}
          verificationError={verificationError}
        />
        {renderDeleteButton()}
      </div>
    );
  }

  return (
    <div className={containerPadding}>
      <div className="">
        <div className="space-y-[1.6rem] lg:space-y-[2.4rem]">
          <Heading className="text-[1.6rem] lg:text-[2rem] mt-[2rem] lg:mt-0">
            Details
          </Heading>
          <div className="bg-input-filled border border-input-stroke space-y-[2rem] lg:space-y-[2.4rem] px-[1.2rem] lg:px-[1.6rem] py-[1.6rem] lg:py-[2.4rem] rounded-[0.8rem]">
            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                  Domain
                </Heading>
              </label>
              <Input
                value={customDomain || displayName || email}
                onChange={() => {}}
                readOnly
                className="text-[1.4rem] lg:text-[1.6rem]"
                inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
              />
            </div>

            {email && (
              <div>
                <label className="block mb-[0.8rem]">
                  <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                    Email Pattern
                  </Heading>
                </label>
                <Input
                  value={email}
                  onChange={() => {}}
                  readOnly
                  className="text-[1.4rem] lg:text-[1.6rem]"
                  inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
                />
              </div>
            )}

            {displayName && (
              <div>
                <label className="block mb-[0.8rem]">
                  <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                    Display Name
                  </Heading>
                </label>
                <Input
                  value={displayName}
                  onChange={() => {}}
                  readOnly
                  className="text-[1.4rem] lg:text-[1.6rem]"
                  inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
                />
              </div>
            )}
          </div>
        </div>
        {renderDeleteButton()}
      </div>
    </div>
  );
}
