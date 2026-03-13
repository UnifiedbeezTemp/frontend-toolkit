"use client";

import React from "react";
import { TwoFactorStatusModalProps } from "./status/TwoFactorStatus.types";
import RegeneratedSuccessStep from "./status/RegeneratedSuccessStep";
import StatusManagementStep from "./status/StatusManagementStep";
import Modal from "../../modal/Modal";
import Loader from "../../ui/Loader";
import CloseModalButton from "../../modal/CloseModalButton";
import ModalHeader from "../../modal/ModalHeader";
import Button from "../../ui/Button";

export default function TwoFactorStatusModal({
  isOpen,
  onClose,
  status,
  isLoading,
  onRegenerate,
  isRegenerating,
  onDisable,
  regeneratedCodes,
  onClearRegenerated,
  copyToClipboard,
}: TwoFactorStatusModalProps) {
  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} bottomSheet>
        <div className="p-[4rem] flex justify-center items-center">
          <Loader />
        </div>
      </Modal>
    );
  }

  if (!status) return null;

  const handleClose = () => {
    if (regeneratedCodes && onClearRegenerated) {
      onClearRegenerated();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[80dvh] flex flex-col sm:rounded-[1.6rem]"
      bottomSheet
    >
      <ModalHeader
        text={regeneratedCodes ? "Save New Codes" : "2FA Management"}
        className="p-[1.6rem] border-b border-border"
        description={
          regeneratedCodes
            ? "Your new backup codes have been generated"
            : "View and manage your two-factor authentication settings"
        }
        action={<CloseModalButton onClick={handleClose} />}
      />

      <div className="flex-1 overflow-y-auto px-[1.6rem] py-[2.4rem]">
        {regeneratedCodes ? (
          <RegeneratedSuccessStep
            regeneratedCodes={regeneratedCodes}
            copyToClipboard={copyToClipboard}
          />
        ) : (
          <StatusManagementStep
            status={status}
            onRegenerate={onRegenerate}
            isRegenerating={isRegenerating}
          />
        )}
      </div>

      <div className="p-[1.6rem] border-t border-border flex-shrink-0 flex gap-[1.2rem]">
        {regeneratedCodes ? (
          <Button onClick={onClearRegenerated || onClose} className="w-full">
            Done
          </Button>
        ) : (
          <Button variant="danger" onClick={onDisable} className="w-full">
            Disable 2FA
          </Button>
        )}
      </div>
    </Modal>
  );
}
