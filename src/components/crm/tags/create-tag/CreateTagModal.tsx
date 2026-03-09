import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import CreateTagForm from "./CreateTagForm";
import { CRMTag } from "../types";
import TagIcon from "../../../../assets/icons/TagIcon";

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  addTag: (tag: CRMTag) => void;
}

export default function CreateTagModal({
  isOpen,
  onClose,
  addTag,
}: CreateTagModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="lg:w-[60rem] p-[1.6rem] sm:p-[2.4rem]"
      bottomSheet
    >
      <ModalHeader
        text="Create Tag"
        description=""
        action={<CloseModalButton onClick={onClose} />}
        leftContent={<TagIcon size={24} className="text-text-primary" />}
        className="pb-[1.6rem]"
      />
      <CreateTagForm onClose={onClose} addTag={addTag} />
    </Modal>
  );
}
