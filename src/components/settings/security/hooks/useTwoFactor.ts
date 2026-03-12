"use client";

import { useState } from "react";
import { useAppQuery } from "../../../../api";
import { TwoFactorSetupResponse, Verify2FASetupResponse, TwoFactorStatusResponse } from "../../../../api/services/auth";
import { useSetup2FA, useVerify2FASetup, useRegenerateBackupCodes, useDisable2FA } from "../../../../hooks/useAuthMutations";
import useSession from "../../../../providers/hooks/useSession";
import { extractErrorMessage } from "../../../../utils";
import { useToast } from "../../../ui/toast/ToastProvider";

export const useTwoFactor = () => {
  const { showToast } = useToast();
  const { refetch: refetchSession } = useSession();
  const [setupData, setSetupData] = useState<TwoFactorSetupResponse | null>(
    null,
  );
  const [verifyData, setVerifyData] = useState<Verify2FASetupResponse | null>(
    null,
  );
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [confirmSaved, setConfirmSaved] = useState(false);
  const [token, setToken] = useState("");
  const [step, setStep] = useState<"setup" | "backup" | "verify" | "success">(
    "setup",
  );
  const [regeneratedCodes, setRegeneratedCodes] = useState<string[] | null>(
    null,
  );

  const {
    data: status,
    isPending: isLoadingStatus,
    refetch: refetchStatus,
  } = useAppQuery<TwoFactorStatusResponse>(
    ["2fa-status"],
    async () => {
      const { authService } = await import("../../../../../src/api/services/auth");
      return authService.getTwoFactorStatus();
    },
    { enabled: isStatusModalOpen },
  );

  const { mutate: setup2FA, isPending: isSettingUp } = useSetup2FA({
    onSuccess: (data) => {
      setSetupData(data);
      setIsSetupModalOpen(true);
      setConfirmSaved(false);
      setStep("setup");
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error, "Failed to setup 2FA");
      showToast({
        title: "Setup failed",
        description: errorMessage,
        variant: "error",
      });
    },
  });

  const { mutate: verify2FA, isPending: isVerifying } = useVerify2FASetup({
    onSuccess: (data) => {
      setVerifyData(data);
      setStep("success");
      showToast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled successfully.",
        variant: "success",
      });
      refetchSession();
      refetchStatus();
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error, "Invalid token");
      showToast({
        title: "Verification failed",
        description: errorMessage,
        variant: "error",
      });
    },
  });

  const { mutate: regenerateBackupCodes, isPending: isRegenerating } =
    useRegenerateBackupCodes({
      onSuccess: (data) => {
        showToast({
          title: "Backup Codes Regenerated",
          description: "Please save these new backup codes securely.",
          variant: "success",
        });
        setRegeneratedCodes(data.backupCodes);
        refetchStatus();
      },
      onError: (error) => {
        const errorMessage = extractErrorMessage(
          error,
          "Failed to regenerate codes",
        );
        showToast({
          title: "Regeneration failed",
          description: errorMessage,
          variant: "error",
        });
      },
    });

  const { mutate: disable2FA, isPending: isDisabling } = useDisable2FA({
    onSuccess: () => {
      showToast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
        variant: "success",
      });
      setIsDisableModalOpen(false);
      setIsStatusModalOpen(false);
      refetchSession();
    },
    onError: (error) => {
      const errorMessage = extractErrorMessage(error, "Failed to disable 2FA");
      showToast({
        title: "Disable failed",
        description: errorMessage,
        variant: "error",
      });
    },
  });

  const handleSetup = () => {
    setup2FA();
  };

  const handleVerify = () => {
    if (token.length !== 6) {
      showToast({
        title: "Invalid token",
        description: "Please enter a 6-digit code.",
        variant: "error",
      });
      return;
    }
    if (setupData) {
      verify2FA({
        token,
        backupCodes: setupData.backupCodes,
      });
    }
  };

  const handleDisable = (password: string) => {
    disable2FA({ password });
  };

  const closeSetupModal = () => {
    setIsSetupModalOpen(false);
    setSetupData(null);
    setVerifyData(null);
    setToken("");
    setStep("setup");
    refetchSession();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast({
        title: "Copied!",
        description: "Copied to clipboard.",
        variant: "success",
      });
    } catch (err) {
      showToast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "error",
      });
    }
  };

  return {
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
    setIsSetupModalOpen,
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
    handleRegenerate: () => regenerateBackupCodes(),
    closeSetupModal,
    copyToClipboard,
  };
};
