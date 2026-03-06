"use client";

import React, { useState } from "react";
import PasswordField from "./PasswordField";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import CloseModalButton from "../../modal/CloseModalButton";
import Text from "../../ui/Text";
import Button from "../../ui/Button";

interface TwoFactorDisableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading: boolean;
}

export default function TwoFactorDisableModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: TwoFactorDisableModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="max-h-[90vh] flex flex-col sm:rounded-[1.6rem]"
      bottomSheet
    >
      <ModalHeader
        text="Disable 2FA"
        className="p-[1.6rem] border-b border-border"
        description="Enter your password to disable two-factor authentication"
        action={<CloseModalButton onClick={onClose} />}
      />

      <div className="flex-1 px-[1.6rem] py-[2.4rem] flex flex-col gap-[1.6rem]">
        <Text className="text-destructive">
          Turning off two-factor authentication will make your account less
          secure.
        </Text>

        <PasswordField
          label="Current Password"
          value={password}
          placeholder="Enter your password"
          isVisible={showPassword}
          disabled={isLoading}
          onChange={setPassword}
          onToggleVisibility={() => setShowPassword(!showPassword)}
        />
      </div>

      <div className="p-[1.6rem] border-t border-border flex gap-[1.2rem] justify-end">
        <Button variant="secondary" onClick={onClose} className="px-[2.4rem]">
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => onConfirm(password)}
          loading={isLoading}
          disabled={!password || isLoading}
          className="px-[2.4rem]"
        >
          Disable 2FA
        </Button>
      </div>
    </Modal>
  );
}
