"use client";

import Heading from "../../../../../components/ui/Heading";
import Button from "../../../../../components/ui/Button";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { extractOutlookDisplayData } from "../utils/outlookConnectionDisplayUtils";
import { OutlookConnectionDetailsProps } from "./shared/types";
import Input from "../../../../../components/forms/Input";

export default function OutlookConnectionDetails({
  connection,
  onDelete,
  isDeleting = false,
  variant = "desktop",
}: OutlookConnectionDetailsProps) {
  const icons = useSupabaseIcons();
  const isMobile = variant === "mobile";
  const containerPadding = isMobile
    ? "px-[1.2rem] pb-[5rem]"
    : "px-[2.8rem] py-[3.1rem] pr-[1.7rem]";
  const innerPadding = "px-[1.6rem] py-[2.4rem]";

  const { email, displayName } = extractOutlookDisplayData(connection);

  return (
    <div className={containerPadding}>
      <div className="space-y-[1.6rem]">
        <Heading className="text-[1.6rem] lg:text-[2rem] mt-[2rem] lg:mt-0">
          Profile
        </Heading>
        <div
          className={`bg-input-filled border border-input-stroke space-y-[2.4rem] ${innerPadding} rounded-[0.8rem]`}
        >
          <div className="space-y-[2.4rem]">
            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                  Email
                </Heading>
              </label>
              <Input
                value={email}
                onChange={() => {}}
                className="text-[1.4rem] lg:text-[1.6rem]"
                inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
              />
            </div>

            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                  Display name
                </Heading>
              </label>
              <Input
                value={displayName || ""}
                onChange={() => {}}
                className="text-[1.4rem] lg:text-[1.6rem]"
                inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-[4.7rem]">
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
