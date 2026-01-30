"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useTelegramHandlers } from "./hooks/useTelegramHandlers";
import { useTelegramIntegration } from "./hooks/useTelegramIntegration";
import TelegramRequirements from "./components/TelegramRequirements";
import TelegramConnectionDetails from "./components/TelegramConnectionDetails";
import TelegramPhoneFlow from "./components/TelegramPhoneFlow";
import TelegramQRFlow from "./components/TelegramQRFlow";
import Button from "../../../../components/ui/Button";
import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../components/ui/ImageComponent";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../management/DeleteChannelModal";
export default function TelegramConfig({
  channel,
  connection,
  onSave,
  isLoading = false,
  onRefetchChannels,
}: BaseChannelConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const icons = useSupabaseIcons();

  const {
    authMethod,
    phoneStep,
    qrUrl,
    isLoading: isConnecting,
    isDeleting,
    selectMethod,
    handleSendCode,
    handleVerifyCode,
    handleVerify2FA,
    handleConfirmDelete,
    reset,
  } = useTelegramIntegration({
    onComplete: () => onSave({ connected: true }),
    onRefetchChannels,
  });

  const {
    showRequirements,
    showDeleteModal,
    handleContinue,
    handleDeleteClick,
    handleConfirmDelete: onGlobalConfirmDelete,
    handleCloseDeleteModal,
  } = useTelegramHandlers({
    connection,
    onSave,
    onConfirmDelete: handleConfirmDelete,
  });

  if (showRequirements && !connection) {
    return <TelegramRequirements onContinue={handleContinue} />;
  }

  if (connection) {
    return (
      <>
        <TelegramConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={onGlobalConfirmDelete}
          channelName={channel.channelName ?? "Telegram"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  if (!authMethod) {
    return (
      <div className="flex flex-col gap-6 p-6 lg:p-10">
        <div className="text-center space-y-2">
          <Heading size="sm">Choose Connection Method</Heading>
          <Text size="sm" className="text-text-secondary">
            Select how you would like to connect your Telegram account.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => selectMethod("phone")}
            className="flex flex-col items-center gap-4 p-8 bg-input-filled border border-input-stroke rounded-2xl hover:border-primary-10 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-primary-10/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageComponent
                src={icons.phone1}
                alt="Phone"
                width={32}
                height={32}
              />
            </div>
            <div className="text-center">
              <Heading size="xs">Log in by Phone</Heading>
              <Text size="xs" className="text-text-secondary">
                Use your phone number & code
              </Text>
            </div>
          </button>

          <button
            onClick={() => selectMethod("qr")}
            className="flex flex-col items-center gap-4 p-8 bg-input-filled border border-input-stroke rounded-2xl hover:border-primary-10 transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-primary-10/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageComponent
                src={icons.copy}
                alt="QR"
                width={32}
                height={32}
              />
            </div>
            <div className="text-center">
              <Heading size="xs">Log in by QR Code</Heading>
              <Text size="xs" className="text-text-secondary">
                Scan with your mobile app
              </Text>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (authMethod === "phone") {
    return (
      <div className="p-6 lg:p-10">
        <TelegramPhoneFlow
          step={phoneStep}
          onSendCode={handleSendCode}
          onVerifyCode={handleVerifyCode}
          onVerify2FA={handleVerify2FA}
          isLoading={isConnecting}
          onReset={reset}
        />
      </div>
    );
  }

  if (authMethod === "qr") {
    return (
      <div className="p-6 lg:p-10">
        <TelegramQRFlow
          qrUrl={qrUrl}
          isLoading={isConnecting}
          onReset={reset}
        />
      </div>
    );
  }

  return null;
}
