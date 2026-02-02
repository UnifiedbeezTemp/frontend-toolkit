"use client";

import Heading from "../../../../../components/ui/Heading";
import Button from "../../../../../components/ui/Button";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Input from "../../../../../components/forms/Input";

import { TwilioSmsConnectionDetailsProps } from "../types";
import { parseTwilioConfig } from "../utils/twilioUtils";

export default function TwilioSmsConnectionDetails({
  connection,
  onDelete,
  isDeleting = false,
  variant = "desktop",
}: TwilioSmsConnectionDetailsProps) {
  const icons = useSupabaseIcons();
  const { phoneNumber, twilioSid } = parseTwilioConfig(connection);

  const isDesktop = variant === "desktop";

  return (
    <div
      className={
        isDesktop ? "px-[2.8rem] py-[3.1rem]" : "px-[1.6rem] pb-[4rem]"
      }
    >
      <div className="mb-[3.2rem]">
        <Heading className="text-[1.6rem] lg:text-[2rem] mb-[0.8rem]">
          Profile
        </Heading>

        <div className="bg-input-filled border border-input-stroke p-[1.6rem] lg:p-[2.4rem] rounded-[0.8rem] space-y-[1.6rem] lg:space-y-[2.4rem]">
          <Input
            label="Phone Number"
            value={phoneNumber}
            readOnly
            className="bg-transparent"
          />
          <Input
            label="Twilio SID"
            value={twilioSid}
            readOnly
            className="bg-transparent"
          />
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
  );
}
