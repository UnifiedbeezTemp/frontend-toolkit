import React from "react";
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CreateContactForm from "./CreateContactForm";
import CloseModalButton from "../../../modal/CloseModalButton";

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateContactModal({
  isOpen,
  onClose,
}: CreateContactModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" bottomSheet className="lg:w-[60rem] p-[1.6rem] sm:p-[2.4rem]">
      <ModalHeader text="Create Contact" description={""} action={<CloseModalButton onClick={onClose} />}  className="pb-[1.6rem] sm:pb-[2.4rem]"/>
      <div className="">
        <CreateContactForm onClose={onClose} />
      </div>
    </Modal>
  );
}
