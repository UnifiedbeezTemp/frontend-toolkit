"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useWebchatConfig } from "./hooks/useWebchatConfig";
import { useWebchatHandlers } from "./hooks/useWebchatHandlers";
import WebchatRequirements from "./components/WebchatRequirements";
import WebchatForm from "./components/shared/WebchatForm";
import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import ImageComponent from "../../../../components/ui/ImageComponent";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import CloseModalButton from "../../../modal/CloseModalButton";
import DeleteChannelModal from "../../management/DeleteChannelModal";

export default function WebchatConfig({
  channel,
  connection,
  onSave,
  onCancel,
  onEditConnection,
  isLoading = false,
}: BaseChannelConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const channelId = parseInt(channel.id) || 0;

  const {
    control,
    formHandleSubmit,
    watch,
    register,
    prepareFormData,
    websites,
    setValue,
  } = useWebchatConfig(channelId, connection);

  const {
    showRequirements,
    showDeleteModal,
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    isLoading: isCreatingWebchat,
    isDeleting,
  } = useWebchatHandlers({
    connection,
    onSave,
    onCancel,
    onEditConnection,
    prepareFormData,
  });

  if (showRequirements) {
    return <WebchatRequirements onContinue={handleContinue} />;
  }

  const formContent = (
    <WebchatForm
      connection={connection}
      onSave={handleSubmit}
      onDelete={handleDeleteClick}
      isLoading={isLoading || isCreatingWebchat || isDeleting}
      watch={watch}
      register={register}
      control={control}
      variant={isDesktop ? "desktop" : "mobile"}
      websites={websites}
      setValue={setValue}
    />
  );

  if (isDesktop) {
    return (
      <>
        {formContent}
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName || "Web Chat"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between p-[1.6rem] border-b border-border">
        <div className="flex flex-col">
          <Heading className="text-[1.4rem]">Web Chat settings</Heading>
          <Text className="text-text-primary text-[1.2rem]">
            {connection
              ? "Edit Web Chat settings"
              : "Configure Web Chat settings"}
          </Text>
        </div>
        <CloseModalButton
          onClick={onCancel || (() => {})}
          className="bg-input-filled py-[0.5rem] px-[0.7rem]"
        />
      </div>

      <div className="p-[1.6rem]">
        <div className="flex items-center gap-[0.8rem]">
          <ImageComponent
            src={channel.icon}
            alt={channel.availableChannel?.name || "Web Chat"}
            width={35}
            height={35}
          />
          <div>
            <Heading className="text-[1.4rem]">
              {channel.availableChannel?.displayName || channel.channelName}
            </Heading>
            <Text className="text-[1.2rem]">
              {connection
                ? "Edit Web Chat settings"
                : "Configure Web Chat settings"}
            </Text>
          </div>
        </div>
      </div>

      <div className="">{formContent}</div>

      <DeleteChannelModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        channelName={channel.channelName || "Web Chat"}
        isLoading={isDeleting}
      />
    </>
  );
}
