"use client";

import { Channel } from "../../../../store/onboarding/types/channelTypes";
import Modal from "../../../modal/Modal";
import EditChannelHeader from "./components/EditChannelHeader";
import EditChannelFooter from "./components/EditChannelFooter";
import EditChannelLiveChat from "./components/EditChannelLiveChat";
import EditChannelConfiguration from "./components/EditChannelConfiguration";
import { useChannelConnectionsData } from "../../../channels/hooks/useChannelConnectionsData";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";
import Button from "../../../ui/Button";
import PreLoader from "../../../ui/PreLoader";
import { useState } from "react";
import { useAccountSelector } from "./hooks/useAccountSelector";
import { useConnectionAIConfig } from "./hooks/useConnectionAIConfig";
import EditChannelTabs from "./components/EditChannelTabs";

interface EditChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: Channel;
}

export default function EditChannelModal({
  isOpen,
  onClose,
  channel,
}: EditChannelModalProps) {
  const { connections, isLoading: isLoadingConnections } =
    useChannelConnectionsData(channel);
  const icons = useSupabaseIcons();

  const {
    isDropdownOpen,
    selectedConnection,
    selectedConnectionId,
    toggleDropdown,
    closeDropdown,
    selectConnection,
  } = useAccountSelector(connections);

  const {
    params,
    isLoading: isLoadingConfig,
    assistants,
    handleAssistantChange,
  } = useConnectionAIConfig({
    channelId: channel.id,
    connection: selectedConnection,
  });

  const activeAssistant = assistants.find(
    (a) => Number(a.id) === Number(params.aiId),
  );

  const hasConnections = connections.length > 0;

  const [activeTab, setActiveTab] = useState<"settings" | "preview">(
    "settings",
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-[98dvh] rounded-t-[2rem] sm:rounded-[1.6rem] sm:w-[64rem] p-[1.6rem] lg:p-[4rem] lg:w-[117rem]"
      bottomSheet
    >
      <div className="flex flex-col h-full bg-primary overflow-hidden">
        <EditChannelHeader channel={channel} onClose={onClose} />

        <div className="flex-1 overflow-hidden flex flex-col">
          {isLoadingConnections ? (
            <PreLoader isPage={false} height={150} />
          ) : !hasConnections ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-[2.4rem] lg:p-[4rem] space-y-[2.4rem]">
              <div className="w-[12rem] h-[12rem] rounded-full bg-input-filled flex items-center justify-center">
                <ImageComponent
                  src={icons.beeZoraWelcome}
                  alt="No Connection"
                  width={64}
                  height={64}
                />
              </div>
              <div className="space-y-[1rem]">
                <Heading className="text-[2.4rem] text-center">
                  Connection Required
                </Heading>
                <Text className="text-[1.6rem] text-text-secondary max-w-[48rem] text-center">
                  To configure AI behavior and escalation rules for this
                  channel, you must first connect at least one account.
                  Connections allow the AI to interact with your platform.
                </Text>
              </div>
              <Button
                onClick={onClose}
                variant="secondary"
                className="px-[4rem]"
              >
                Go back to Channels
              </Button>
            </div>
          ) : (
            <>
              <EditChannelTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <div className="flex flex-col lg:flex-row gap-[2.4rem] h-full overflow-hidden">
                <div
                  className={`flex-1 overflow-y-auto py-[2.4rem] ${
                    activeTab === "preview" ? "hidden lg:block" : "block"
                  }`}
                >
                  <EditChannelConfiguration
                    channel={channel}
                    connections={connections}
                    selectedConnectionId={selectedConnectionId ?? ""}
                    onSelectConnection={selectConnection}
                    isDropdownOpen={isDropdownOpen}
                    onToggleDropdown={toggleDropdown}
                    onCloseDropdown={closeDropdown}
                    params={params}
                    assistants={assistants}
                    onAssistantChange={handleAssistantChange}
                    isLoadingConfig={isLoadingConfig}
                  />
                </div>

                <div
                  className={`flex-1 overflow-y-auto py-[2.4rem] bg-input-filled/5 ${
                    activeTab === "settings" ? "hidden lg:block" : "block"
                  }`}
                >
                  <EditChannelLiveChat
                    key={params.aiId}
                    params={params}
                    selectedAssistant={activeAssistant || null}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <EditChannelFooter onDone={onClose} onBack={onClose} />
      </div>
    </Modal>
  );
}
