import { useState } from "react";
import { BackendChannel } from "../../types/channelApiTypes";
import { cn } from "../../lib/utils";
import { useChannelCardV2 } from "./hooks/useChannelCardV2";
import EditChannelModal from "./modals/EditChannelModal/EditChannelModal";
import { ChannelCardHeader } from "./components/ChannelCardHeader";
import { ChannelCardBody } from "./components/ChannelCardBody";
import { ChannelCardCTA } from "./components/ChannelCardCTA";

interface ChannelCardProps {
  channel: BackendChannel;
  canEdit?: boolean;
}

export default function ChannelCardV2({ channel, canEdit }: ChannelCardProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { isLoading, handleToggle, handleAddonClick, comingSoon, icon, icons } =
    useChannelCardV2(channel);

  return (
    <>
      <div
        className={cn(
          "border border-border rounded-[1.6rem] p-[1rem] lg:p-[1.6rem] flex flex-col h-full bg-primary transition-all",
          comingSoon && "pointer-events-none select-none",
        )}
      >
        <ChannelCardHeader
          name={channel.name}
          icon={icon}
          comingSoon={comingSoon}
          allowed={channel.access?.allowed}
          requiredAddon={channel.access?.requiredAddon}
          linkExternalIcon={icons.linkExternal}
          onAddonClick={handleAddonClick}
        />

        <ChannelCardBody
          displayName={channel.displayName}
          description={channel.description}
          reason={channel.access?.reason}
          comingSoon={comingSoon}
        />

        <div className="mt-auto">
          <ChannelCardCTA
            isSelected={channel.isSelected}
            comingSoon={comingSoon}
            canEdit={canEdit}
            isLoading={isLoading}
            editIcon={icons.tablerEdit}
            onToggle={handleToggle}
            onEdit={() => setOpenEditModal(true)}
          />
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
