import Modal from "../../modal/Modal";
import { ModalHeader } from "./ModalHeader";
import { QuantitySelector } from "./QuantitySelector";
import { InfoSection } from "./InfoSection";
import { ModalActions } from "./ModalActions";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { useState } from "react";
import { MultiLanguageManager } from "./multi-language/MultiLanguageManager";
import { useMultiLanguage } from "../hooks/useMultiLanguage";
import { useToast } from "../../ui/toast/ToastProvider";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAddAddonModal } from "./hooks/useAddAddonModal";

interface AddAddonModalProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
  currentQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onAdd: () => void;
  canAddMore: boolean;
  errorText?: string | null;
}

export const AddAddonModal: React.FC<AddAddonModalProps> = ({
  isOpen,
  onClose,
  addon,
  currentQuantity,
  onQuantityChange,
  onAdd,
  canAddMore,
  errorText,
}) => {
  const {
    selectedLanguages,
    setSelectedLanguages,
    handleConfirmAdd,
    isUpdatingPreferences,
    isMultiLanguage,
    delta,
    isLanguageSelectionIncomplete,
  } = useAddAddonModal({ onAdd, addon, currentQuantity });

  const isLimitReached = !canAddMore;
  const isAddDisabled = addon?.limit
    ? !canAddMore && currentQuantity > addon.limit
    : false;

  const isDisabled =
    isAddDisabled || isLanguageSelectionIncomplete || isUpdatingPreferences;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isBlur
      bottomSheet
      className="px-[2.6rem] sm:px-[4rem] sm:py-[4rem] rounded-t-[2.6rem] py-[1.5rem] sm:rounded-[1.6rem] sm:max-w-[56rem] md:max-w-[87.9rem] lg:max-w-[60rem]"
    >
      <ModalHeader addon={addon} onClose={onClose} />

      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
        <div className="md:grid grid-cols-2 gap-[2.4rem] md:py-[4rem] lg:flex lg:flex-col md:mb-[6rem] lg:mb-[0rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <QuantitySelector
              currentQuantity={currentQuantity}
              onQuantityChange={onQuantityChange}
              canAddMore={canAddMore}
              isLimitReached={isLimitReached}
              errorText={errorText}
            />
            {isMultiLanguage && addon && (
              <MultiLanguageManager
                addon={addon}
                params={{
                  currentQuantity,
                  purchasedQuantity: addon.used || 0,
                }}
                selectedLanguages={selectedLanguages}
                onSelectionChange={setSelectedLanguages}
              />
            )}
          </div>

          <div className="md:w-full md:h-full">
            <InfoSection addon={addon} canAddMore={canAddMore} />
          </div>
        </div>
      </div>

      <ModalActions
        onAdd={onAdd}
        onClose={onClose}
        isAddDisabled={isAddDisabled}
      />
    </Modal>
  );
};
