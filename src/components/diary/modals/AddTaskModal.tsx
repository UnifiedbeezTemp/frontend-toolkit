"use client";

import React from "react";
import Modal from "../../modal/Modal";
import { useAddTask } from "../hooks/useAddTask";
import AddTaskModalHeader from "./sub-components/AddTaskModalHeader";
import AddTaskModalForm from "./sub-components/AddTaskModalForm";
import AddTaskModalFooter from "./sub-components/AddTaskModalFooter";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId?: string;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  contactId,
}: AddTaskModalProps) {
  const {
    formData,
    setField,
    activeDropdown,
    toggleDropdown,
    closeDropdown,
    handleSave,
    refs,
    isValid,
  } = useAddTask(contactId, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0 sm:w-[52.7rem]" bottomSheet>
      <div className="flex flex-col">
        <AddTaskModalHeader onClose={onClose} />

        <AddTaskModalForm
          formData={formData}
          setField={setField}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
          closeDropdown={closeDropdown}
          refs={refs}
        />

        <AddTaskModalFooter
          onCancel={onClose}
          onSave={handleSave}
          isValid={isValid}
        />
      </div>
    </Modal>
  );
}
