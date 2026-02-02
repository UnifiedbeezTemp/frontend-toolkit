"use client";

import { BaseChannelConfigProps } from "../BaseChannelConfig";
import { useTwilioSmsHandlers } from "./hooks/useTwilioSmsHandlers";
import TwilioSmsSetup from "./components/TwilioSmsSetup";
import TwilioSmsConnectionDetails from "./components/TwilioSmsConnectionDetails";
import { TwilioSmsConfigProps } from "./types";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import DeleteChannelModal from "../../management/DeleteChannelModal";

export default function TwilioSmsConfig({
  channel,
  connection,
  onSave,
  onRefetchChannels,
  onCancel,
  isLoading,
}: TwilioSmsConfigProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const {
    showRequirements,
    showDeleteModal,
    countryCode,
    handleCountryChange,
    areaCode,
    setAreaCode,
    numberType,
    handleNumberTypeChange,
    availableNumbers,
    isSearching,
    purchasingPhoneNumber,
    isReleasing,
    handleSearch,
    handlePurchase,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useTwilioSmsHandlers({
    connection,
    onSave,
    onRefetchChannels,
    onClose: onCancel,
  });

  if (showRequirements && !connection) {
    return (
      <TwilioSmsSetup
        countryCode={countryCode}
        onCountryCodeChange={handleCountryChange}
        areaCode={areaCode}
        onAreaCodeChange={setAreaCode}
        numberType={numberType}
        onNumberTypeChange={handleNumberTypeChange}
        availableNumbers={availableNumbers}
        onSearch={handleSearch}
        onPurchase={handlePurchase}
        isSearching={isSearching}
        purchasingPhoneNumber={purchasingPhoneNumber}
        onClose={onCancel}
      />
    );
  }

  if (connection) {
    return (
      <>
        <TwilioSmsConnectionDetails
          connection={connection}
          onDelete={handleDeleteClick}
          isDeleting={isReleasing}
          variant={isDesktop ? "desktop" : "mobile"}
        />
        <DeleteChannelModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          channelName={channel.channelName ?? "Twilio SMS"}
          isLoading={isReleasing}
        />
      </>
    );
  }

  return null;
}
