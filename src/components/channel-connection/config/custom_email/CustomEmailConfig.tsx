"use client";

import { useRef, useEffect } from "react";
import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useCustomEmailHandlers } from "./hooks/useCustomEmailHandlers";
import CustomEmailRequirements from "./components/CustomEmailRequirements";
import { useCustomEmailIntegration } from "./hooks/useCustomEmailIntegration";
import DNSRecordsDisplay from "./components/DNSRecordsDisplay";
import CustomEmailConnectionDetails from "./components/CustomEmailConnectionDetails";
import DeleteChannelModal from "../../components/DeleteChannelModal";

interface CustomEmailConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => void;
}

export default function CustomEmailConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
  onRefetchChannels,
  onEditConnection,
}: CustomEmailConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const startIntegrationRef = useRef<((domain: string) => void) | undefined>(
    undefined,
  );

  const channelId = Number(channel.id) || 0;

  const {
    startIntegration,
    isLoading: isCustomEmailConnecting,
    isDeleting,
    dnsRecords,
    handleConfirmDelete: handleIntegrationDelete,
  } = useCustomEmailIntegration({
    channelId,
    onComplete: (response) => {
      if (response.success) {
        handleConnectionSuccess();
      }
    },
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleConnect,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleConnectionSuccess,
  } = useCustomEmailHandlers({
    connection,
    onSave,
    startCustomEmailIntegration: startIntegrationRef.current,
    onConnectionSuccess: () => {
      if (onRefetchChannels) {
        onRefetchChannels();
      }
    },
    onEditConnection,
    onConfirmDelete: handleIntegrationDelete,
  });

  useEffect(() => {
    startIntegrationRef.current = startIntegration;
  }, [startIntegration]);

  if (showRequirements && !connection) {
    return (
      <div>
        {dnsRecords.length > 0 ? (
          <div
            className={`${isDesktop ? "px-[2.8rem] py-[3.1rem] pr-[1.7rem]" : "px-[1.6rem] pb-[4rem]"}`}
          >
            <DNSRecordsDisplay dnsRecords={dnsRecords} />
          </div>
        ) : (
          <CustomEmailRequirements
            onConnect={handleConnect}
            isLoading={isCustomEmailConnecting}
          />
        )}
      </div>
    );
  }

  if (connection) {
    return (
      <>
        <CustomEmailConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? ""}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return null;
}
