"use client";

import CloseModalButton from "../../../modal/CloseModalButton";
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import Automations from "../../Automations";

interface CategoryAutomationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function CategoryAutomationsModal({
  isOpen,
  onClose,
  category,
}: CategoryAutomationsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} bottomSheet>
      <div className="flex flex-col h-full overflow-hidden bg-primary">
        <ModalHeader
          text={`${category} Automations`}
          description={`View and manage all automations in the ${category} category.`}
          action={<CloseModalButton onClick={onClose} />}
          className="p-[1.6rem] sm:p-[2rem]"
        />

        <div className="flex-1 overflow-y-auto p-[1.6rem] sm:p-[2.4rem]">
          <Automations automationType={category} />
        </div>
      </div>
    </Modal>
  );
}
