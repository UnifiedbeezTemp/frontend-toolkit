import React from "react";
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import CreateListForm from "./CreateListForm";
import { CRMList } from "../types";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  addList: (list: CRMList) => void;
}

export default function CreateListModal({
  isOpen,
  onClose,
  addList,
}: CreateListModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="lg:w-[60rem] p-[1.6rem] sm:p-[2.4rem]"
      bottomSheet
    >
      <ModalHeader
        text="Create list"
        description="Build a fresh contact list to segment, personalize, and run campaigns more effectively."
        action={<CloseModalButton onClick={onClose} />}
        className="pb-[1.6rem]"
      />
      <CreateListForm onClose={onClose} addList={addList} />
    </Modal>
  );
}
