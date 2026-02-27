import React from "react";
import { GeneralTemplateForm } from "./GeneralTemplateForm";
import { GeneralTemplateFormData } from "../hooks/useGeneralTemplateForm";
import CloseModalButton from "../../modal/CloseModalButton";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";

interface GeneralTemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: GeneralTemplateFormData) => void;
}

export default function GeneralTemplateCreationModal({
  isOpen,
  onClose,
  onCreate,
}: GeneralTemplateCreationModalProps) {
  const formId = "general-template-form";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 sm:w-[50rem] h-[90vh] rounded-[1.6rem] overflow-hidden"
      bottomSheet
    >
      <div className="flex flex-col h-full bg-primary relative px-[1rem]">
        <div className="flex items-center justify-between px-[1.4rem] py-[2rem] border-b border-border shrink-0">
          <h2 className="text-[1.8rem] font-bold text-text-secondary">
            Create Templates
          </h2>
          <CloseModalButton onClick={onClose} />
        </div>

        <div className="flex-1 p-[1.4rem] overflow-y-auto custom-scrollbar min-h-0">
          <GeneralTemplateForm onCreate={onCreate} formId={formId} />
        </div>

        <div className="flex items-center gap-[1.6rem] p-[2.4rem] border-border shrink-0">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1 justify-center py-[1.2rem] text-[1.6rem] font-bold"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            // form={formId}
            type="submit"
            className="flex-1 justify-center py-[1.2rem] text-[1.6rem] font-bold border-0"
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}
