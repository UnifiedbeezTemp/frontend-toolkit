"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAppMutation } from "../../../../../api";
import { TelegramConnectResponse, telegramService } from "../../../../../services/telegramService";
import { useToast } from "../../../../ui/toast/ToastProvider";

export type TelegramAuthMethod = "phone" | "qr" | null;
export type PhoneSteps = "phone" | "code" | "2fa";

interface UseTelegramIntegrationProps {
  onComplete?: (response: TelegramConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useTelegramIntegration = ({
  onComplete,
  onRefetchChannels,
}: UseTelegramIntegrationProps) => {
  const { showToast } = useToast();
  const [authMethod, setAuthMethod] = useState<TelegramAuthMethod>(null);
  const [phoneStep, setPhoneStep] = useState<PhoneSteps>("phone");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mutations
  const sendPhoneMutation = useAppMutation(telegramService.sendPhoneCode, {
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      setPhoneStep("code");
      showToast({
        title: "Verification Sent",
        description: "Please check your Telegram for a code.",
        variant: "success",
      });
    },
    onError: () => {
      showToast({
        title: "Error",
        description: "Failed to send verification code.",
        variant: "error",
      });
    },
  });

  const verifyCodeMutation = useAppMutation(
    (data: { sessionId: string; code: string }) =>
      telegramService.verifyCode(data.sessionId, data.code),
    {
      onSuccess: async (data) => {
        if (data.passwordNeeded) {
          setPhoneStep("2fa");
        } else {
          showToast({
            title: "Success",
            description: "Telegram connected!",
            variant: "success",
          });
          if (onRefetchChannels) await onRefetchChannels();
          onComplete?.({
            success: true,
            connectedAt: new Date().toISOString(),
          });
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Invalid verification code.",
          variant: "error",
        });
      },
    },
  );

  const verify2FAMutation = useAppMutation(
    (data: { sessionId: string; password: string }) =>
      telegramService.verify2FA(data.sessionId, data.password),
    {
      onSuccess: async (data) => {
        showToast({
          title: "Success",
          description: "Telegram connected!",
          variant: "success",
        });
        if (onRefetchChannels) await onRefetchChannels();
        onComplete?.(data);
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Invalid 2FA password.",
          variant: "error",
        });
      },
    },
  );

  const generateQRMutation = useAppMutation(telegramService.generateQR, {
    onSuccess: (data) => {
      setQrUrl(data.qrUrl);
      setSessionId(data.sessionId);
      startPolling(data.sessionId);
    },
    onError: () => {
      showToast({
        title: "Error",
        description: "Failed to generate QR code.",
        variant: "error",
      });
    },
  });

  // Polling logic for QR
  const startPolling = (sid: string) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await telegramService.checkQRStatus(sid);
        if (res.success) {
          stopPolling();
          showToast({
            title: "Success",
            description: "Telegram connected via QR!",
            variant: "success",
          });
          if (onRefetchChannels) await onRefetchChannels();
          onComplete?.({
            success: true,
            connectedAt: new Date().toISOString(),
          });
        }
      } catch (e) {
        // Continue polling unless explicit error
      }
    }, 2000);
  };

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const selectMethod = (method: TelegramAuthMethod) => {
    setAuthMethod(method);
    setPhoneStep("phone");
    setQrUrl(null);
    setSessionId(null);
    stopPolling();

    if (method === "qr") {
      generateQRMutation.mutate({});
    }
  };

  const handleSendCode = (phoneNumber: string) => {
    sendPhoneMutation.mutate(phoneNumber);
  };

  const handleVerifyCode = (code: string) => {
    if (sessionId) {
      verifyCodeMutation.mutate({ sessionId, code });
    }
  };

  const handleVerify2FA = (password: string) => {
    if (sessionId) {
      verify2FAMutation.mutate({ sessionId, password });
    }
  };

  const disconnectMutation = useAppMutation(
    (accountId: number) => telegramService.disconnectAccount(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Telegram account disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Telegram account",
          variant: "error",
        });
      },
    },
  );

  const handleConfirmDelete = (accountId: number) => {
    disconnectMutation.mutate(accountId);
  };

  return {
    authMethod,
    phoneStep,
    qrUrl,
    isLoading:
      sendPhoneMutation.isPending ||
      verifyCodeMutation.isPending ||
      verify2FAMutation.isPending ||
      generateQRMutation.isPending,
    isDeleting: disconnectMutation.isPending,
    selectMethod,
    handleSendCode,
    handleVerifyCode,
    handleVerify2FA,
    handleConfirmDelete,
    reset: () => selectMethod(null),
  };
};
