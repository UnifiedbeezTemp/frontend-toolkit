"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useWhatsAppConfig } from "./hooks/useWhatsAppConfig";
import { useWhatsAppHandlers } from "./hooks/useWhatsAppHandlers";
import WhatsAppRequirements from "./components/WhatsAppRequirements";
import WhatsAppForm from "./components/WhatsAppForm";
import DeleteChannelModal from "../../management/DeleteChannelModal";

export default function WhatsAppConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading: loading = false,
  onRefetchChannels,
}: BaseChannelConfigProps) {
  const {
    watch,
    register,
    profileImage,
    profileImageUrl,
    readConfirmation,
    setReadConfirmation,
    handleImageSelect,
    prepareFormData,
  } = useWhatsAppConfig(connection);

  const {
    showRequirements,
    showDeleteModal,
    isLoading,
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useWhatsAppHandlers({
    connection,
    onSave,
    prepareFormData,
    readConfirmation,
    onRefetchChannels: onRefetchChannels,
  });

  if (showRequirements && !connection) {
    return (
      <WhatsAppRequirements onContinue={handleContinue} isLoading={isLoading} />
    );
  }

  return (
    <>
      <WhatsAppForm
        connection={connection}
        onSave={handleSubmit}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
        watch={watch}
        register={register}
        readConfirmation={readConfirmation}
        setReadConfirmation={setReadConfirmation}
      />

      <DeleteChannelModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        channelName={channel.name}
      />
    </>
  );
}
