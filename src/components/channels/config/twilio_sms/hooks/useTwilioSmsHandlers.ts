import { useState, useCallback } from "react";
import { useTwilioSms } from "./useTwilioSms";
import { NumberType, UseTwilioSmsHandlersProps } from "../types";

export function useTwilioSmsHandlers({
  connection,
  onSave,
  onRefetchChannels,
  onClose,
}: UseTwilioSmsHandlersProps) {
  const [showRequirements, setShowRequirements] = useState(!connection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [areaCode, setAreaCode] = useState("");
  const [numberType, setNumberType] = useState<NumberType>("local");

  const handlePurchaseSuccess = useCallback(() => {
    setShowRequirements(false);
    onRefetchChannels?.();
    onClose?.();
  }, [onRefetchChannels, onClose]);

  const {
    availableNumbers,
    isSearching,
    searchNumbers,
    purchaseNumber,
    clearNumbers,
    purchasingPhoneNumber,
    isReleasing,
    releaseNumber,
  } = useTwilioSms(handlePurchaseSuccess);

  const handleSearch = useCallback(() => {
    searchNumbers(countryCode, numberType, areaCode || undefined, 20);
  }, [countryCode, areaCode, numberType, searchNumbers]);

  const handlePurchase = useCallback(
    async (phoneNumber: string) => {
      await purchaseNumber(phoneNumber, countryCode);
    },
    [countryCode, purchaseNumber]
  );

  const handleCountryChange = useCallback(
    (code: string) => {
      setCountryCode(code);
      clearNumbers();
    },
    [clearNumbers]
  );

  const handleNumberTypeChange = useCallback(
    (type: NumberType) => {
      setNumberType(type);
      clearNumbers();
    },
    [clearNumbers]
  );

  const handleDeleteClick = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (connection?.id) {
      await releaseNumber(Number(connection.id), {
        onSuccess: () => {
          onRefetchChannels?.();
          onClose?.();
          setShowDeleteModal(false);
        },
      });
    }
  }, [connection, releaseNumber, onRefetchChannels, onClose]);

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  return {
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
  };
}
