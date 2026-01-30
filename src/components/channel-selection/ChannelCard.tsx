import { useState } from "react";

import Button from "../ui/Button";
import EditChannelModal from "./modals/EditChannelModal/EditChannelModal";
import ImageComponent from "../ui/ImageComponent";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";
import { Channel } from "../../store/onboarding/types/channelTypes";

interface ChannelCardProps {
  channel: Channel;
  onToggle: (channelId: string) => void;
  canEdit?: boolean;
  isLoading?: boolean;
}

export default function ChannelCard({
  channel,
  onToggle,
  canEdit = false,
  isLoading = false,
}: ChannelCardProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const icons = useSupabaseIcons();

  const comingSoon = channel.availableChannel?.comingSoon;

  return (
    <>
      <div
        className={cn(
          "border border-border rounded-[1.6rem] p-[1rem] lg:p-[1.6rem] flex flex-col h-full bg-primary transition-all",
          comingSoon && "pointer-events-none select-none",
        )}
      >
        <div className="flex flex-col gap-[1rem] xl:flex-row items-start justify-between">
          <div
            className={`${
              channel.hasBorder ? "border border-border rounded-lg" : ""
            } shrink-0 w-[5rem] h-[5rem]`}
          >
            <ImageComponent
              alt={channel.name}
              src={channel.icon}
              width={60}
              height={60}
              className={cn("w-[100%] h-[100%]", comingSoon && "grayscale")}
            />
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="text-brand-primary underline text-[1.4rem] leading-[2.07rem] font-[700] flex items-center gap-[0.5rem] flex shrink-0 text-[1rem] lg:text-[1.4rem]"
          >
            Add-ons available{" "}
            <ImageComponent
              alt="link"
              className="ml-[-4px]"
              src={icons.linkExternal}
              width={20}
              height={20}
            />
          </Button>
        </div>

        <div className=" mb-[1.5rem] lg:my-[1.5rem] space-y-[3px] flex-grow">
          <div className="bg-border/20 hidden lg:inline-block border border-border rounded-[0.4rem] p-[0.4rem] font-[700] text-[1rem] text-text-primary">
            {channel.info}
          </div>
          <Heading
            className={cn(
              "mt-[0.4rem] text-[1.4rem] lg:text-[2rem] lg:leading-[2.96rem]",
              comingSoon && "text-inactive-color",
            )}
          >
            {channel.name}
          </Heading>
          <Text size="sm">{channel.description}</Text>
        </div>

        <div className="mt-auto">
          {comingSoon ? (
            <Button
              variant="secondary"
              className="w-full border-0 rounded-[0.8rem] bg-input-filled text-text-secondary cursor-not-allowed"
              disabled
            >
              Select
            </Button>
          ) : canEdit ? (
            <Button
              variant={channel.isSelected ? "secondary" : "primary"}
              className={cn(
                "w-full rounded-[0.8rem] text-[1.4rem] py-[1rem]",
                channel.isSelected ? "bg-input-filled" : "",
              )}
              onClick={() => {
                channel.isSelected
                  ? setOpenEditModal(true)
                  : onToggle(channel.id);
              }}
              loading={isLoading && !channel.isSelected}
              disabled={isLoading}
            >
              {channel.isSelected ? (
                <>
                  <ImageComponent
                    alt="edit"
                    className="ml-[-4px]"
                    src={icons.tablerEdit}
                    width={30}
                    height={30}
                  />{" "}
                  Edit settings
                </>
              ) : (
                "Select"
              )}
            </Button>
          ) : (
            <Button
              variant={channel.isSelected ? "secondary" : "primary"}
              className="w-full rounded-[0.8rem]"
              onClick={() => onToggle(channel.id)}
              loading={isLoading}
              disabled={isLoading}
            >
              {channel.isSelected ? "Unselect" : "Select"}
            </Button>
          )}
        </div>
      </div>
      <EditChannelModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        channel={channel}
      />
    </>
  );
}
