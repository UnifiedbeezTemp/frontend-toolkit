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
  const startIntegrationRef = useRef<((email: string) => void) | undefined>(
    undefined,
  );

  const channelId = Number(channel.id) || 0;
  const initialEmailAccountId = (
    connection?.configuration as Record<string, unknown>
  )?.customEmailAccountId as number | undefined;

  const {
    startIntegration,
    handleVerify,
    isLoading: isCustomEmailConnecting,
    isVerifying,
    isDeleting,
    dnsRecords,
    instructions,
    verificationError,
    handleConfirmDelete: handleIntegrationDelete,
  } = useCustomEmailIntegration({
    channelId,
    initialEmailAccountId,
    onComplete: (response) => {
      // if (response.success) {
      //   handleConnectionSuccess();
      // }
    },
    onVerificationSuccess: (response) => {
      if (response.success) {
        if (onRefetchChannels) {
          onRefetchChannels();
        }
        // Only close flow if we were in the initial requirements flow
        if (!connection) {
          onCancel?.();
        }
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
        {dnsRecords ? (
          <div
            className={`${isDesktop ? "px-[2.8rem] py-[3.1rem] pr-[1.7rem]" : "px-[1.6rem] pb-[4rem]"}`}
          >
            <DNSRecordsDisplay
              dnsRecords={dnsRecords}
              instructions={instructions}
              onVerify={handleVerify}
              isVerifying={isVerifying}
              verificationError={verificationError}
            />
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
          onVerify={handleVerify}
          isVerifying={isVerifying}
          verificationError={verificationError}
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
