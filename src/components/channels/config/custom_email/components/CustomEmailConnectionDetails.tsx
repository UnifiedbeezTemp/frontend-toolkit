"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Input from "../../../../forms/Input";
import Button from "../../../../ui/Button";
import Heading from "../../../../ui/Heading";
import { extractCustomEmailDisplayData } from "../utils/customEmailConnectionDisplayUtils";
import { CustomEmailConnectionDetailsProps } from "./shared/types";

export default function CustomEmailConnectionDetails({
  connection,
  onDelete,
  isDeleting = false,
  variant = "desktop",
}: CustomEmailConnectionDetailsProps) {
  const icons = useSupabaseIcons();
  const isMobile = variant === "mobile";
  const containerPadding = isMobile
    ? "px-[1.2rem] pb-[5rem]"
    : "px-[2.8rem] py-[3.1rem] pr-[1.7rem]";
  const innerPadding = "px-[1.6rem] py-[2.4rem]";

  const { email, displayName, customDomain, verificationStatus } =
    extractCustomEmailDisplayData(connection);

  return (
    <div className={containerPadding}>
      <div className="">
        <div className="space-y-[1.6rem] lg:space-y-[2.4rem]">
          <Heading className="text-[1.6rem] lg:text-[2rem] mt-[2rem] lg:mt-0">
            Profile
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
                  className="text-[1.4rem] lg:text-[1.6rem]"
                  inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
                />
              </div>
            )}
          </div>
        </div>

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
      </div>
    </div>
  );
}
