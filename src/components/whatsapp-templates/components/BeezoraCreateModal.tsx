"use client";

import React from "react";
import { useBeezoraModal } from "../hooks/useBeezoraModal";
import { BeezoraHeader } from "./beezora/BeezoraHeader";
import { BeezoraForm } from "./beezora/BeezoraForm";
import { BeezoraFooter } from "./beezora/BeezoraFooter";
import Modal from "../../modal/Modal";

interface BeezoraCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export default function BeezoraCreateModal({
  isOpen,
  onClose,
  onCreate,
}: BeezoraCreateModalProps) {
  const {
    formData,
    handleInputChange,
    activeDropdown,
    setActiveDropdown,
    toggleDropdown,
    resetForm,
  } = useBeezoraModal();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isCreateDisabled = !formData.objective.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="p-[2.4rem] rounded-t-[1.6rem] sm:rounded-[1.6rem] w-[60rem] sm:max-w-[95vw]"
      bottomSheet
    >
      <BeezoraHeader onClose={handleClose} />

      <BeezoraForm
        formData={formData}
        handleInputChange={handleInputChange}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <BeezoraFooter
        onClose={handleClose}
        onCreate={() => onCreate(formData)}
        isCreateDisabled={isCreateDisabled}
      />
    </Modal>
  );
}
