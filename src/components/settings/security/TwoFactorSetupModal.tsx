"use client";

import React from "react";
import { TwoFactorSetupModalProps } from "./setup/TwoFactorSetup.types";
import SetupStep from "./setup/SetupStep";
import VerifyStep from "./setup/VerifyStep";
import BackupCodesStep from "./setup/BackupCodesStep";
import { MODAL_CONTENT, getBackButtonAction } from "./setup/utils";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import CloseModalButton from "../../modal/CloseModalButton";
import TwoFactorSuccessIcon from "../../../assets/icons/TwoFactorSuccessIcon";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Button from "../../ui/Button";

export default function TwoFactorSetupModal({
  isOpen,
  onClose,
  setupData,
  verifyData,
  confirmSaved,
  setConfirmSaved,
  token,
  setToken,
  step,
  setStep,
  onVerify,
  isVerifying,
  copyToClipboard,
}: TwoFactorSetupModalProps) {
  if (!setupData) return null;

  const currentContent = MODAL_CONTENT[step] || MODAL_CONTENT.setup;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="lg"
      className="max-h-[90dvh] w-full lg:w-[56.8rem] flex flex-col sm:rounded-[2.4rem] rounded-ss-[2.4rem] rounded-se-[2.4rem] border-none"
      bottomSheet
    >
      {step !== "success" && (
        <ModalHeader
          text={currentContent.title}
          className="px-[2.4rem] pt-[2.4rem] pb-[1.6rem] border-none"
          description={currentContent.description}
          action={
            <CloseModalButton
              onClick={onClose}
              className="bg-input-filled p-[0.8rem] px-[1.6rem]"
            />
          }
        />
      )}

      {step === "success" && (
        <div className="flex justify-end p-[2.4rem]">
          <CloseModalButton
            onClick={onClose}
            className="bg-input-filled p-[0.8rem] px-[1.6rem]"
          />
        </div>
      )}

      {step !== "verify" && step !== "success" && (
        <div className="flex-1 overflow-y-auto pt-[2.4rem] pb-[3.2rem] px-[2.4rem] bg-input-filled">
          {step === "setup" && (
            <SetupStep
              setupData={setupData}
              confirmSaved={confirmSaved}
              setConfirmSaved={setConfirmSaved}
              copyToClipboard={copyToClipboard}
            />
          )}
          {step === "backup" && (
            <BackupCodesStep
              setupData={setupData}
              verifyData={verifyData}
              copyToClipboard={copyToClipboard}
            />
          )}
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center justify-center px-[2.4rem] text-center gap-[2.4rem] bg-primary">
          <TwoFactorSuccessIcon size={140} />
          <div className="flex flex-col">
            <Heading
              size="md"
              className="text-[2.4rem] font-bold text-text-secondary"
            >
              Two-Factor Authentication Enabled
            </Heading>
            <Text className="text-[1.4rem] text-text-primary">
              Your account is now protected with an extra layer of security.
            </Text>
          </div>
        </div>
      )}

      {step === "verify" && <VerifyStep token={token} setToken={setToken} />}

      <div className="px-[2.4rem] pb-[2.4rem] pt-[2.4rem] flex gap-[1.2rem] justify-between items-center bg-primary">
        {(step === "setup" || step === "backup" || step === "verify") && (
          <Button
            variant="secondary"
            onClick={getBackButtonAction(step, onClose, setStep)}
            className="flex-1"
          >
            {step === "setup" ? "Cancel" : "Back"}
          </Button>
        )}

        {step === "setup" && (
          <Button onClick={() => setStep("backup")} className="flex-1">
            Continue
          </Button>
        )}

        {step === "backup" && (
          <Button onClick={() => setStep("verify")} className="flex-1">
            Continue
          </Button>
        )}

        {step === "verify" && (
          <Button
            onClick={onVerify}
            loading={isVerifying}
            disabled={token.length !== 6 || isVerifying}
            className="flex-1"
          >
            Verify & Enable
          </Button>
        )}

        {step === "success" && (
          <>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={onClose} className="flex-1">
              Continue
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
