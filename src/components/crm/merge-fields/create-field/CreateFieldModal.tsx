import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import CreateFieldForm from "./CreateFieldForm";
import { MergeField } from "../types";

interface CreateFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  addField: (field: MergeField) => void;
}

export default function CreateFieldModal({
  isOpen,
  onClose,
  addField,
}: CreateFieldModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="lg:w-[60rem] p-[1.6rem] sm:p-[2.4rem]"
      bottomSheet
    >
      <ModalHeader
        text="Add Field"
        description=""
        action={<CloseModalButton onClick={onClose} />}
        className="pb-[1.6rem]"
      />
      <CreateFieldForm onClose={onClose} addField={addField} />
    </Modal>
  );
}
