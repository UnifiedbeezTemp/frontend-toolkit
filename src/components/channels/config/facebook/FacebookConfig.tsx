"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useFacebookConfig } from "./hooks/useFacebookConfig";
import { useFacebookHandlers } from "./hooks/useFacebookHandlers";
import FacebookRequirements from "./components/FacebookRequirements";
import FacebookForm from "./components/FacebookForm";
import DeleteChannelModal from "../../management/DeleteChannelModal";

export default function FacebookConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading: externalIsLoading = false,
  onRefetchChannels,
}: BaseChannelConfigProps) {
  const {
    formHandleSubmit,
    watch,
    register,
    profileImage,
    profileImageUrl,
    readConfirmation,
    setReadConfirmation,
    handleImageSelect,
    prepareFormData,
  } = useFacebookConfig(connection);

  const {
    showRequirements,
    showDeleteModal,
    isLoading: integrationIsLoading,
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useFacebookHandlers({
    connection,
    onSave,
    prepareFormData,
    readConfirmation,
    channel,
    onClose: onCancel,
    onRefetchChannels,
  });

  const isLoading = externalIsLoading || integrationIsLoading;

  const hasConnection =
    connection && (connection.id || connection.configuration);

  if (showRequirements && !hasConnection) {
    return (
      <FacebookRequirements onContinue={handleContinue} isLoading={isLoading} />
    );
  }

  return (
    <>
      <FacebookForm
        channel={channel}
        connection={connection}
        onSave={handleSubmit}
        onDelete={handleDeleteClick}
        onCancel={onCancel}
        isLoading={isLoading}
        watch={watch}
        register={register}
        readConfirmation={readConfirmation}
        setReadConfirmation={setReadConfirmation}
        profileImageUrl={profileImageUrl}
        profileImage={profileImage}
        onImageSelect={handleImageSelect}
      />

      <DeleteChannelModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        channelName={channel.name}
        isLoading={isLoading}
      />
    </>
  );
}
