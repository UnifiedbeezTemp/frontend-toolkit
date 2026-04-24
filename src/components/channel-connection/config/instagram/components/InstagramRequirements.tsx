"use client";

import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import Checkbox from "../../../../../components/ui/CheckBox";
import Button from "../../../../../components/ui/Button";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../../components/ui/ImageComponent";

interface InstagramRequirementsProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export default function InstagramRequirements({
  onConnect,
  isLoading = false,
}: InstagramRequirementsProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="px-[1.6rem] pt-[1.6rem] pb-[4rem]">
      <div className="lg:hidden">
        <div className="flex flex-col">
          <Heading className="text-[1.4rem]">Connect Instagram</Heading>
          <Text className="text-text-primary text-[1.2rem]">
            Receive and reply to Instagram messages through your inbox.
          </Text>
        </div>
      </div>

      <div className="my-6">
        <div className="space-y-4 rounded-[.8rem] py-[1.6rem] lg:py-[0]">

          <Heading className="mb-[1.5rem]" size="sm">
            Requirements
          </Heading>

         <div className="bg-input-filled p-[1.6rem] rounded-[0.8rem] space-y-[1.2rem]">
          <Heading className="text-[1.6rem]">Ensure that you:</Heading>
         <div className="flex items-center gap-[1.2rem]">
            <Checkbox
              size="sm"
              checked={true}
              onChange={() => {}}
              className="rounded-full shrink-0"
            />
            <Text size="sm">Access to your Instagram Business account</Text>
          </div>

          <div className="flex items-center gap-[1.2rem]">
            <Checkbox
              size="sm"
              checked={true}
              onChange={() => {}}
              className="rounded-full shrink-0"
            />
            <Text size="sm">Administrator access to your Facebook page</Text>
          </div>

          <div className="flex items-center gap-[1.2rem]">
            <Checkbox
              size="sm"
              checked={true}
              onChange={() => {}}
              className="rounded-full shrink-0"
            />
            <Text size="sm">
              Your Facebook page and Instagram account must be linked together
            </Text>
          </div>
         </div>
        </div>

        <Button
          className="w-full mt-[4rem]"
          onClick={onConnect}
          disabled={isLoading}
          loading={isLoading}
        >
          Connect with Instagram
        </Button>
      </div>
    </div>
  );
}

