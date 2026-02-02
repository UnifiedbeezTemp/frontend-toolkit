"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface PayPalConnectionDetailsProps {
  connection: ChannelConnection;
  onDelete: () => void;
  isDeleting: boolean;
  variant?: "desktop" | "mobile";
}

export default function PayPalConnectionDetails({
  connection,
  onDelete,
  isDeleting,
  variant = "desktop",
}: PayPalConnectionDetailsProps) {
  const icons = useSupabaseIcons();
  const isMobile = variant === "mobile";
  const containerPadding = isMobile
    ? "px-[1.2rem] pb-[5rem]"
    : "px-[2.8rem] py-[3.1rem] pr-[1.7rem]";
  const innerPadding = "px-[1.6rem] py-[2.4rem]";

  return (
    <div className={containerPadding}>
      <div className="space-y-[1.6rem]">
        <Heading className="text-[1.6rem] lg:text-[2rem] mt-[2rem] lg:mt-0">
          Profile
        </Heading>
        <div
          className={`bg-input-filled border border-input-stroke space-y-[2.4rem] ${innerPadding} rounded-[0.8rem]`}
        >
          <div className="flex items-center gap-4">
            <div>
              <Heading size="lg" className="text-[1.8rem]">
                {connection.name || "PayPal Connected"}
              </Heading>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Text size="sm" className="font-bold whitespace-nowrap">
                PayPal Email
              </Text>
              <div
                className="truncate max-w-[20rem]"
                title={(connection.configuration?.email as string) || ""}
              >
                <Text size="sm" className="text-text-secondary">
                  {(connection.configuration?.email as string) || "N/A"}
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Text size="sm" className="font-bold whitespace-nowrap">
                Merchant ID
              </Text>
              <div
                className="truncate max-w-[20rem]"
                title={
                  (connection.configuration?.paypalMerchantId as string) || ""
                }
              >
                <Text size="sm" className="text-text-secondary">
                  {(connection.configuration?.paypalMerchantId as string) ||
                    "N/A"}
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Text size="sm" className="font-bold">
                Status
              </Text>
              <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                Active
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Text size="sm" className="font-bold">
                Connected On
              </Text>
              <Text size="sm" className="text-text-secondary">
                {new Date(
                  connection.createdAt || Date.now(),
                ).toLocaleDateString()}
              </Text>
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
