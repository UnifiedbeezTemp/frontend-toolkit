"use client";

import React from "react";
import TemplateCreationForm from "./TemplateCreationForm";
import TemplatePreview from "./TemplatePreview";
import { TemplateFormData } from "../types";
import { useTemplateForm } from "../hooks/useTemplateForm";
import { ModalMainHeader } from "./creation/ModalMainHeader";
import { ModalSubHeader } from "./creation/ModalSubHeader";
import { ModalStickyFooter } from "./creation/ModalStickyFooter";
import CloseModalButton from "../../modal/CloseModalButton";
import Modal from "../../modal/Modal";

interface WhatsAppTemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onContinue: (data: TemplateFormData) => void;
  initialData?: TemplateFormData;
}

const DEFAULT_INITIAL_DATA: TemplateFormData = {
  account: "",
  name: "",
  category: "",
  language: "",
  message: "",
  hasAttachment: false,
  headerType: "attachment",
  attachmentType: "image",
  headline: "",
  hasFooter: false,
  footerText: "",
  hasButton: false,
  buttons: [],
  folder: "",
};

export default function WhatsAppTemplateCreationModal({
  isOpen,
  onClose,
  onBack,
  onContinue,
  initialData,
}: WhatsAppTemplateCreationModalProps) {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const {
    formData,
    handleChange,
    activeDropdown,
    toggleDropdown,
    setActiveDropdown,
  } = useTemplateForm(initialData || DEFAULT_INITIAL_DATA);

  const handleTogglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 lg:w-[123rem] h-[99dvh] rounded-t-[1.6rem] sm:rounded-[1.6rem]"
      bottomSheet
    >
      <div className="flex h-full">
        <div className="hidden lg:flex w-[55%] shrink-0">
          <TemplatePreview formData={formData} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-primary relative">
          <div className="absolute top-[2.4rem] right-[2.4rem] z-30">
            <CloseModalButton onClick={onClose} />
          </div>

          <ModalMainHeader />

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            <ModalSubHeader onBack={onBack} />

            <div className="px-[2.4rem] pb-[10rem]">
              <TemplateCreationForm
                formData={formData}
                handleChange={handleChange}
                activeDropdown={activeDropdown}
                toggleDropdown={toggleDropdown}
                setActiveDropdown={setActiveDropdown}
                onTogglePreview={handleTogglePreview}
              />
            </div>
          </div>

          <ModalStickyFooter
            onBack={onBack}
            onContinue={() => onContinue(formData)}
          />
        </div>
      </div>

      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        className="p-0 w-full h-full lg:hidden rounded-0 sm:rounded-0"
        bottomSheet
      >
        <div className="w-full h-full bg-primary relative flex flex-col">
          <div className="absolute top-[.4rem] right-[.4rem] z-50">
            <CloseModalButton onClick={() => setIsPreviewOpen(false)} />
          </div>
          <div className="flex-1">
            <TemplatePreview formData={formData} />
          </div>
        </div>
      </Modal>
    </Modal>
  );
}
