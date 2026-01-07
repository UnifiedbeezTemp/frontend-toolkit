import Modal from "../../modal/Modal";
import CloseModalButton from "../../modal/CloseModalButton";
import { ModalHeader } from "./ModalHeader";
import { QuantitySelector } from "./QuantitySelector";
import { InfoSection } from "./InfoSection";
import { ModalActions } from "./ModalActions";
import { Addon } from "../../../store/onboarding/types/addonTypes";

interface AddAddonModalProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
  currentQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onAdd: () => void;
  canAddMore: boolean;
}

export const AddAddonModal: React.FC<AddAddonModalProps> = ({
  isOpen,
  onClose,
  addon,
  currentQuantity,
  onQuantityChange,
  onAdd,
  canAddMore,
}) => {
  const isLimitReached = !canAddMore;
  const isAddDisabled = addon?.limit
    ? !canAddMore && currentQuantity > addon.limit
    : false;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isBlur
      bottomSheet
      className="px-[2.6rem] rounded-t-[2.6rem] py-[1.5rem] sm:rounded-[1.6rem] sm:max-w-[56rem] md:max-w-[87.9rem] lg:max-w-[56rem]"
    >
      <div className="flex items-center justify-between">
        <ModalHeader addon={addon} />
        <div className="md:hidden lg:block"></div>
        <CloseModalButton onClick={onClose} />
      </div>

      <div className="md:grid grid-cols-2 gap-[2.4rem] md:py-[4rem] lg:flex lg:flex-col md:mb-[6rem] lg:mb-[0rem]">
        <QuantitySelector
          currentQuantity={currentQuantity}
          onQuantityChange={onQuantityChange}
          canAddMore={canAddMore}
          isLimitReached={isLimitReached}
        />

        <div className="md:w-full md:h-full">
          <InfoSection addon={addon} canAddMore={canAddMore} />
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
