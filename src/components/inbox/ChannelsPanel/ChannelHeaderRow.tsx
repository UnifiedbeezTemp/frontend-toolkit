import ChevronRight from "../../../assets/icons/ChevronRight";
import { useToggle } from "../../../hooks/useToggle";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

import { cn } from "../../../lib/utils";
import ExpandableCard from "../../expandable-card/ExpandableCard";
import Button from "../../ui/Button";
import Checkbox from "../../ui/CheckBox";
import ImageComponent from "../../ui/ImageComponent";
import ChannelItemCard from "./ChannelItemCard";
import ConnectChannelsModal from "../ConnectChannelsModal"

export default function ChannelHeaderRow({
  channel,
}: {
  channel: { label: string };
}) {
  const icons = useSupabaseIcons()
  const { value: isOpen, toggle: onToggle } = useToggle()
  const {
    value: showConnectModal,
    setTrue: openConnectModal,
    setFalse: closeConnectModal,
  } = useToggle()
  return (
    <ExpandableCard
      title={channel.label}
      containerClassName={cn(
        "rounded-2xl px-2 py-3 text-left border border-input-stroke",
        isOpen ? "bg-gradient-yellow-1" : "bg-primary"
      )}
      useDefaultDetailsStyling={false}
      summary={
        <div className="flex w-full items-center gap-3 pl-2">
          <div>
            <ImageComponent
              width={25}
              height={25}
              src={icons.whatsappIcon}
              alt={channel.label}
            />
          </div>
          <div className="text-dark-base-70 truncate flex-1 text-md">
            {channel.label}
          </div>
          <div className="text-dark-base-70 p-2">
            <ChevronRight
              width={7.5}
              height={15}
              className={cn(isOpen ? "rotate-90" : "")}
            />
          </div>
        </div>
      }
      isExpanded={isOpen}
      toggleExpanded={onToggle}
    >
      <div className="flex flex-col gap-2">
        <div className="ml-auto flex items-center gap-1">
          <Checkbox checked={false} onChange={() => {}} />
          <span className="text-[1rem] text-dark-base-70">Select all</span>
        </div>
        <ChannelItemCard
          channelIcon={
            <ImageComponent
              width={25}
              height={25}
              src={icons.whatsappIcon}
              alt={channel.label}
            />
          }
          item={{
            status: "connected",
            disabled: false,
            title: "+234 902 922 0646",
            subTitle: "Brian George",
          }}
          onClick={() => {}}
        />
        <div>
          <Button
            variant="primary"
            className="text-[1rem] font-bold py-2 w-full"
            onClick={openConnectModal}
          >
            See all
          </Button>
        </div>
      </div>
      <ConnectChannelsModal
        isOpen={showConnectModal}
        onClose={closeConnectModal}
        selectedChannelId={
          channel.label.toLowerCase() === "whatsapp"
            ? "whatsapp"
            : channel.label.toLowerCase().replace(/\s+/g, "-")
        }
      />
    </ExpandableCard>
  );
}
