"use client";

import Text from "../../../components/ui/Text";
import DesktopSettingsPanel from "./DesktopSettingsPanel";
import DesktopSidebar from "./DesktopSidebar";
import { useDesktopChannelConnection } from "../hooks/useDesktopChannelConnection";
import Heading from "../../../components/ui/Heading";

interface DesktopChannelConnectionProps {
  onRefetchChannels?: () => void;
}

export default function DesktopChannelConnection({
  onRefetchChannels,
}: DesktopChannelConnectionProps) {
  const {
    selectedChannels,
    activeChannel,
    handleSelectChannel,
    isChannelConnected,
    editingConnection,
    handleEditConnection,
    handleClose,
  } = useDesktopChannelConnection();

  return (
    <div className="">
      <div className="">
        <Heading size="lg" className="text-[2.4rem]">
          Connect selected channels
        </Heading>
        <Text size="sm" className="">
          Connect as many channels as you like
        </Text>
      </div>
      <div className="grid grid-cols-10 bg-primary rounded-[.8rem] mt-[2.4rem] h -[calc(100vh-10rem)]">
        <div className="col-span-3 border-r border-border flex flex-col overflow-hidden">
          <div className="p-[1.6rem] py-[2.15rem] border-b border-border flex-shrink-0">
            <Text className="font-[700]">Selected Channels</Text>
          </div>

          <DesktopSidebar
            channels={selectedChannels}
            activeChannelId={activeChannel?.id || ""}
            onSelectChannel={handleSelectChannel}
            onEditConnection={handleEditConnection}
            editingConnectionId={editingConnection?.id ?? null}
          />
        </div>

        <div className="col-span-7 flex flex-col overflow-hidden">
          <DesktopSettingsPanel
            channel={activeChannel || null}
            onClose={handleClose}
            onEditConnection={handleEditConnection}
            editingConnectionId={editingConnection?.id ?? null}
            onRefetchChannels={onRefetchChannels}
          />
        </div>
      </div>
    </div>
  );
}
