"use client";

import React from "react";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import Button from "../../ui/Button";
import CloseModalButton from "../../modal/CloseModalButton";
import TemplateGrid from "./sub-components/TemplateGrid";
import ModalAction from "./sub-components/ModalAction";
import { useCreateAutomationModal } from "./hooks/useCreateAutomationModal";

export default function CreateAutomationModal() {
  const {
    showCreateModal,
    closeModal,
    templates,
    selectedTemplateIndex,
    setSelectedTemplateIndex,
  } = useCreateAutomationModal();

  const handleContinue = () => {
    const url = process.env.NEXT_PUBLIC_AUTOMATIONS_LIBRARY_URL || "#";
    window.location.href = url;
    closeModal();
  };

  return (
    <Modal
      isOpen={showCreateModal}
      onClose={closeModal}
      bottomSheet
      className="max-h-[90dvh] sm:max-h-[98dvh] rounded-ss-[2rem] rounded-se-[2rem] sm:rounded-[1.6rem] sm:max-w-[61rem] lg:max-w-[108.9rem] bg-white"
    >
      <div className="h-full flex flex-col">
        <ModalHeader
          text="Automation Template Presets"
          className="p-[1.5rem]"
          description="Not Sure Where to Begin? Start with a Template"
          action={<CloseModalButton onClick={closeModal} />}
          borderB={true}
        />

        <div className="p-[1.8rem] flex-1 overflow-y-auto no-scrollbar">
          <TemplateGrid
            templates={templates}
            selectedTemplateIndex={selectedTemplateIndex}
            setSelectedTemplateIndex={setSelectedTemplateIndex}
          />

          <ModalAction onClose={closeModal} onContinue={handleContinue} />
        </div>
      </div>
    </Modal>
  );
}

export function NewAutomationButton() {
  const { openModal } = useCreateAutomationModal();
  return (
    <Button
      className="bg-brand-primary grad-btn text-white lg:w-[18rem] flex items-center justify-center gap-2 rounded-[0.8rem]"
      onClick={openModal}
    >
      <span className="text-[2rem] leading-none mb-1">+</span>
      <span className="hidden lg:inline text-[1.4rem] font-bold">
        New automation
      </span>
    </Button>
  );
}
