"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useLiveChatConfig } from "./hooks/useLiveChatConfig";
import { useLiveChatHandlers } from "./hooks/useLiveChatHandlers";
import LiveChatRequirements from "./components/LiveChatRequirements";
import Heading from "../../../../components/ui/Heading";
import Text from "../../../../components/ui/Text";
import ImageComponent from "../../../../components/ui/ImageComponent";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import CloseModalButton from "../../../modal/CloseModalButton";
import DeleteChannelModal from "../../management/DeleteChannelModal";
import LiveChatIntegration from "./components/shared/LiveChatIntegration";

export default function LiveChatConfig({
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
    setValue,
    prepareCreateFormData,
    prepareUpdatePayload,
  } = useLiveChatConfig(channelId, connection);

  const {
    showRequirements,
    showDeleteModal,
    handleContinue,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    isLoading: isCreatingLiveChat,
    isDeleting,
  } = useLiveChatHandlers({
    connection,
    onSave,
    onCancel,
    onEditConnection,
    prepareCreateFormData,
    prepareUpdatePayload,
  });

  if (showRequirements) {
    return <LiveChatRequirements onContinue={handleContinue} />;
  }

  const formContent = (
    <LiveChatIntegration
      connection={connection}
      onSave={handleSubmit}
      onDelete={handleDeleteClick}
      isLoading={isLoading || isCreatingLiveChat}
      isDeleting={isDeleting}
      watch={watch}
      control={control}
      formHandleSubmit={formHandleSubmit}
      variant={isDesktop ? "desktop" : "mobile"}
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
          channelName={channel.channelName || "Live Chat"}
          isLoading={isDeleting}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between p-[1.6rem] border-b border-border">
        <div className="flex flex-col">
          <Heading className="text-[1.4rem]">Live Chat settings</Heading>
          <Text className="text-text-primary text-[1.2rem]">
            {connection
              ? "Edit Live Chat settings"
              : "Configure Live Chat settings"}
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
            alt={channel.availableChannel?.name || "Live Chat"}
            width={35}
            height={35}
          />
          <div>
            <Heading className="text-[1.4rem]">
              {channel.availableChannel?.displayName || channel.channelName}
            </Heading>
            <Text className="text-[1.2rem]">
              {connection
                ? "Edit Live Chat settings"
                : "Configure Live Chat settings"}
            </Text>
          </div>
        </div>
      </div>

      <div className="">{formContent}</div>

      <DeleteChannelModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        channelName={channel.channelName || "Live Chat"}
        isLoading={isDeleting}
      />
    </>
  );
}
