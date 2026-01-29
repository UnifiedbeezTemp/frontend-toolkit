"use client";

import { useRef, useEffect } from "react";
import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useInstagramHandlers } from "./hooks/useInstagramHandlers";
import InstagramRequirements from "./components/InstagramRequirements";
import { useInstagramIntegration } from "./hooks/useInstagramIntegration";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../management/DeleteChannelModal";

interface InstagramConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export default function InstagramConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
  onRefetchChannels,
  onEditConnection,
}: InstagramConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const startIntegrationRef = useRef<(() => void) | undefined>(undefined);

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleConnectionSuccess,
  } = useInstagramHandlers({
    connection,
    onSave,
    startInstagramIntegration: startIntegrationRef.current,
    onConnectionSuccess: () => {
      if (onRefetchChannels) {
        onRefetchChannels();
      }
    },
    onEditConnection,
  });

  const { startIntegration, isLoading: isInstagramConnecting } = useInstagramIntegration({
    onComplete: handleConnectionSuccess,
    onRefetchChannels,
  });

  useEffect(() => {
    startIntegrationRef.current = startIntegration;
  }, [startIntegration]);

  if (showRequirements && !connection) {
    return (
      <InstagramRequirements
        onConnect={handleConnect}
        isLoading={isInstagramConnecting}
      />
    );
  }

  if (connection) {
    return (
      <>
        <div className={isDesktop ? "px-[2.8rem] py-[3.1rem] pr-[1.7rem]" : "px-[1.2rem] pb-[5rem]"}>
          <div className="bg-input-filled border border-input-stroke rounded-[0.8rem] px-[1.6rem] py-[2.4rem]">
            <p className="text-text-primary">Instagram connection details will be displayed here</p>
          </div>
        </div>
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? ""}
          isLoading={isLoading}
        />
      </>
    );
  }

  return null;
}
