import { useEditAssistantModal } from "./hooks/useEditAssistantModal";
import AssistantFields from "./AssistantFields";
import EditAssistantModalHeader from "./EditAssistantModalHeader";
import { EditAssistantModalProps } from "./utils/types";
import KnowledgeTab from "./knowledge/KnowledgeTab";
import Modal from "../../../../modal/Modal";
import Button from "../../../../ui/Button";

export default function EditAssistantModal({
  assistant,
  isOpen,
  onClose,
  onSave,
}: EditAssistantModalProps) {
  const {
    localAssistant,
    updateField,
    isSaving,
    handleSaveAction,
    fileManagement,
  } = useEditAssistantModal({ assistant, onClose, onSave });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-ss-[2.4rem] rounded-se-[2.4rem] sm:rounded-[2.4rem] p-0 max-h-[95dvh] sm:max-h-[98dvh] w-full sm:w-[90%] md:w-[69.5rem]"
      bottomSheet
    >
      <EditAssistantModalHeader onClose={onClose} />

      <div className="px-[2.4rem] py-[2rem] space-y-[2.4rem]">
        <AssistantFields
          localAssistant={localAssistant}
          updateField={updateField}
        />

        <KnowledgeTab assistant={assistant} fileManagement={fileManagement} />

        <div className="flex items-center justify-end gap-[1rem]">
          <Button
            variant="secondary"
            className="rounded-[0.8rem]"
            onClick={onClose}
            disabled={isSaving}
          >
            Go back
          </Button>
          <Button
            className="highlight-inside border-0 rounded-[0.8rem] px-[1.8rem] py-[.7rem]"
            onClick={handleSaveAction}
            loading={isSaving}
            disabled={isSaving}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
