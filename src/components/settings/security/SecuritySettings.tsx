"use client";

import React, { useState } from "react";
import SettingsSectionHeader from "../SettingsSectionHeader";
import { useSecuritySettings } from "./hooks/useSecuritySettings";
import PasswordForm from "./PasswordForm";
import SecuritySection from "./SecuritySection";
import { useTwoFactor } from "./hooks/useTwoFactor";
import TwoFactorSetupModal from "./TwoFactorSetupModal";
import TwoFactorDisableModal from "./TwoFactorDisableModal";
import TwoFactorStatusModal from "./TwoFactorStatusModal";
import useSession from "../../../providers/hooks/useSession";
import SessionsModal from "../../security/SessionsModal";
import Button from "../../ui/Button";

export default function SecuritySettings() {
  const {
    formData,
    showPasswords,
    errors,
    isLoading,
    handleInputChange,
    togglePasswordVisibility,
    handleUpdatePassword,
  } = useSecuritySettings();

  const {
    status,
    isLoadingStatus,
    setupData,
    verifyData,
    isSettingUp,
    isVerifying,
    isDisabling,
    isRegenerating,
    regeneratedCodes,
    setRegeneratedCodes,
    isSetupModalOpen,
    isDisableModalOpen,
    setIsDisableModalOpen,
    isStatusModalOpen,
    setIsStatusModalOpen,
    confirmSaved,
    setConfirmSaved,
    token,
    setToken,
    step,
    setStep,
    handleSetup,
    handleVerify,
    handleDisable,
    handleRegenerate,
    closeSetupModal,
    copyToClipboard,
  } = useTwoFactor();

  const { data: user } = useSession();
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  const handleAdd2FA = () => {
    handleSetup();
  };

  const handleDisable2FA = () => {
    setIsDisableModalOpen(true);
  };

  const handleViewSessions = () => {
    setShowSessionsModal(true);
  };

  return (
    <div className="mt-[3rem] sm:mt-[1.5rem] px-[1.6rem] lg:px-0">
      <SettingsSectionHeader title="Password & security" />

      <PasswordForm
        formData={formData}
        showPasswords={showPasswords}
        errors={errors}
        isLoading={isLoading}
        onInputChange={(field: string, value: string) =>
          handleInputChange(field as keyof typeof formData, value)
        }
        onToggleVisibility={(field: string) =>
          togglePasswordVisibility(field as "current" | "new" | "confirm")
        }
        onUpdatePassword={handleUpdatePassword}
      />

      <SecuritySection
        title="Two Factor Authentication"
        description={
          user?.twoFactorEnabled ? (
            <div className="flex items-center gap-[0.8rem]">
              <div className="w-[1rem] h-[1rem] bg-primary-80 rounded-full animate-pulse" />
              <span>2FA is enabled for your account</span>
            </div>
          ) : (
            "Add an extra layer of security to your account"
          )
        }
        action={
          user?.twoFactorEnabled ? (
            <div className="flex items-center gap-[1.2rem]">
              <Button
                variant="secondary"
                size="sm"
                className="px-[2.4rem] py-[0.4rem] rounded-[0.8rem] text-[1.5rem]"
                onClick={() => setIsStatusModalOpen(true)}
              >
                Manage 2FA
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="px-[2.4rem] py-[0.4rem] rounded-[0.8rem] text-[1.5rem]"
              onClick={handleAdd2FA}
              loading={isSettingUp}
            >
              Add 2FA
            </Button>
          )
        }
      />

      <SecuritySection
        title="Active sessions"
        description="Manage your active sessions"
        action={
          <Button
            variant="secondary"
            size="sm"
            className="px-[2.4rem] py-[0.4rem] rounded-[0.8rem] text-[1.5rem]"
            onClick={handleViewSessions}
          >
            View active sessions
          </Button>
        }
      />

      <SessionsModal
        isOpen={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
      />

      <TwoFactorSetupModal
        isOpen={isSetupModalOpen}
        onClose={closeSetupModal}
        setupData={setupData}
        verifyData={verifyData}
        confirmSaved={confirmSaved}
        setConfirmSaved={setConfirmSaved}
        token={token}
        setToken={setToken}
        step={step}
        setStep={setStep}
        onVerify={handleVerify}
        isVerifying={isVerifying}
        copyToClipboard={copyToClipboard}
      />

      <TwoFactorDisableModal
        isOpen={isDisableModalOpen}
        onClose={() => setIsDisableModalOpen(false)}
        onConfirm={handleDisable}
        isLoading={isDisabling}
      />

      <TwoFactorStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status={status}
        isLoading={isLoadingStatus}
        onRegenerate={handleRegenerate}
        isRegenerating={isRegenerating}
        onDisable={() => {
          setIsStatusModalOpen(false);
          setIsDisableModalOpen(true);
        }}
        regeneratedCodes={regeneratedCodes}
        onClearRegenerated={() => setRegeneratedCodes(null)}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}
