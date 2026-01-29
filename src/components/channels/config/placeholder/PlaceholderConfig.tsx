"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { usePlaceholderConfig } from "./hooks/usePlaceholderConfig";
import { usePlaceholderHandlers } from "./hooks/usePlaceholderHandlers";
import PlaceholderRequirements from "./components/PlaceholderRequirements";
import PlaceholderFormDesktop from "./components/PlaceholderFormDesktop";
import PlaceholderFormMobile from "./components/PlaceholderFormMobile";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../management/DeleteChannelModal";

export default function PlaceholderConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
}: BaseChannelConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const {
    control,
    formHandleSubmit,
    watch,
    register,
    prepareFormData,
  } = usePlaceholderConfig(connection);

  const {
    showRequirements,
    showDeleteModal,
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = usePlaceholderHandlers({
    connection,
    onSave,
    prepareFormData,
  });

  if (showRequirements && !connection) {
    return <PlaceholderRequirements onContinue={handleContinue} />;
  }

  return (
    <>
      {isDesktop ? (
        <PlaceholderFormDesktop
          connection={connection}
          onSave={handleSubmit}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
          watch={watch}
          register={register}
        />
      ) : (
        <PlaceholderFormMobile
          channel={channel}
          connection={connection}
          onSave={handleSubmit}
          onDelete={handleDeleteClick}
          onCancel={onCancel || (() => {})}
          isLoading={isLoading}
          control={control}
          watch={watch}
          register={register}
        />
      )}

      <DeleteChannelModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        channelName={channel.name}
      />
    </>
  );
}

