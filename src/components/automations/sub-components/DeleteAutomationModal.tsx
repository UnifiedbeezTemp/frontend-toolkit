"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import CloseModalButton from "../../modal/CloseModalButton";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

interface DeleteAutomationModalProps {
  isOpen: boolean;
  automationName: string;
  isActive: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
}

export default function DeleteAutomationModal({
  isOpen,
  automationName,
  isActive,
  isDeleting,
  onCancel,
  onDeactivate,
  onDelete,
}: DeleteAutomationModalProps) {
  const [confirmationText, setConfirmationText] = useState("");

  const normalizedName = useMemo(() => automationName.trim(), [automationName]);

  const canDelete =
    confirmationText.trim().toLowerCase() === normalizedName.toLowerCase();

  useEffect(() => {
    if (isOpen) {
      setConfirmationText("");
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      size="md"
      className="p-0 sm:w-[48rem]"
      isBlur
    >
      <ModalHeader
        text="Delete automation?"
        description={`You are about to delete "${automationName}".`}
        action={<CloseModalButton onClick={onCancel} />}
        className="px-6 py-4"
      />
      <div className="px-6 py-4 text-md text-muted-foreground space-y-2">
        <p>
          Deleting permanently removes this automation, its workflow, and any
          associated history. This can't be undone.
        </p>
        <p>
          Deactivating stops the automation from running but keeps everything so
          you can resume later.
        </p>
        <div className="pt-2">
          <p className="text-[1.2rem] text-text-primary">
            Type{" "}
            <span className="font-semibold">
              <q>{normalizedName}</q>
            </span>{" "}
            to confirm.
          </p>
          <Input
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            placeholder={normalizedName}
            className="mt-2 bg-primary border-input-stroke text-text-primary placeholder:text-text-primary/40 text-[1.3rem]"
          />
        </div>
      </div>
      <div className="border-t border-input-stroke px-6 py-4 flex flex-wrap items-center gap-2 justify-end">
        <Button
          variant="outline"
          onClick={onDeactivate}
          disabled={!isActive}
          className="text-md"
        >
          Deactivate instead
        </Button>
        <Button
          variant="danger"
          onClick={onDelete}
          loading={isDeleting}
          disabled={isDeleting || !canDelete}
          className="text-md"
        >
          {isDeleting ? "Deleting..." : "Delete automation"}
        </Button>
      </div>
    </Modal>
  );
}
