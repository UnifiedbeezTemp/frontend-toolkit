import { useCallback, useState, useEffect } from "react";
import { useAppMutation } from "../../../../../api";
import {
  CustomEmailSetupResponse,
  CustomEmailSetupRequest,
  setupCustomEmailReceiving,
  disconnectCustomEmail,
  DNSRecords,
  verifyCustomEmailReceiving,
  CustomEmailVerifyResponse,
} from "../../../../../services/customEmailService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";

interface UseCustomEmailIntegrationProps {
  channelId: number;
  initialEmailAccountId?: number | null;
  onComplete?: (response: CustomEmailSetupResponse) => void;
  onVerificationSuccess?: (response: CustomEmailVerifyResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useCustomEmailIntegration = ({
  channelId,
  initialEmailAccountId,
  onComplete,
  onVerificationSuccess,
  onRefetchChannels,
}: UseCustomEmailIntegrationProps) => {
  const { showToast } = useToast();
  const [dnsRecords, setDnsRecords] = useState<DNSRecords | null>(null);
  const [instructions, setInstructions] = useState<
    CustomEmailSetupResponse["instructions"] | null
  >(null);
  const [emailAccountId, setEmailAccountId] = useState<number | null>(
    initialEmailAccountId || null,
  );
  const [verificationError, setVerificationError] = useState<string>("");
  const [missingReceiving, setMissingReceiving] = useState<string[]>([]);

  useEffect(() => {
    if (initialEmailAccountId) {
      setEmailAccountId(initialEmailAccountId);
    }
  }, [initialEmailAccountId]);

  const setupMutation = useAppMutation<
    CustomEmailSetupRequest,
    CustomEmailSetupResponse
  >(
    async (data) => {
      return await setupCustomEmailReceiving(data);
    },
    {
      onSuccess: async (response) => {
        if (response.dnsRecords) {
          setDnsRecords(response.dnsRecords);
        }
        if (response.instructions) {
          setInstructions(response.instructions);
        }
        if (response.emailAccountId) {
          setEmailAccountId(response.emailAccountId);
        }
        showToast({
          title: "Success",
          description:
            response.message || "Custom email setup initiated successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
        if (onComplete) {
          onComplete(response);
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(
            error,
            "Failed to setup custom email",
          ),
          variant: "error",
        });
      },
    },
  );

  const verifyMutation = useAppMutation<number, CustomEmailVerifyResponse>(
    async (id) => {
      return await verifyCustomEmailReceiving(id);
    },
    {
      onSuccess: async (response) => {
        if (response.success) {
          showToast({
            title: "Verification Successful",
            description: "Your custom email has been verified.",
            variant: "success",
          });
          if (onVerificationSuccess) {
            onVerificationSuccess(response);
          }
          if (onRefetchChannels) {
            await onRefetchChannels();
          }
        } else {
          setMissingReceiving(response.missingReceiving || []);

          if (
            response?.missingReceiving &&
            response?.missingReceiving?.length > 0
          ) {
            setVerificationError(
              `Missing records: ${(response.missingReceiving || []).join(", ")}`,
            );
          }
        }
      },
      onError: (error: unknown) => {
        const message = extractErrorMessage(
          error,
          "Failed to verify custom email",
        );
        setVerificationError(message);
        showToast({
          title: "Verification Error",
          description: message,
          variant: "error",
        });
      },
    },
  );

  const disconnectMutation = useAppMutation<
    number,
    { success: boolean; message?: string }
  >(
    async (accountId) => {
      return await disconnectCustomEmail(accountId);
    },
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Custom email disconnected successfully",
          variant: "success",
        });
        setDnsRecords(null);
        setInstructions(null);
        setEmailAccountId(null);
        setVerificationError("");
        setMissingReceiving([]);
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(
            error,
            "Failed to disconnect custom email",
          ),
          variant: "error",
        });
      },
    },
  );

  const startIntegration = useCallback(
    (fromEmail: string) => {
      setupMutation.mutate({
        fromEmail,
      });
    },
    [setupMutation],
  );

  const handleVerify = useCallback(() => {
    if (emailAccountId) {
      setVerificationError("");
      setMissingReceiving([]);
      verifyMutation.mutate(emailAccountId);
    }
  }, [emailAccountId, verifyMutation]);

  const handleConfirmDelete = useCallback(
    (accountId: number) => {
      disconnectMutation.mutate(accountId);
    },
    [disconnectMutation],
  );

  return {
    startIntegration,
    handleVerify,
    isLoading: setupMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isDeleting: disconnectMutation.isPending,
    dnsRecords,
    instructions,
    verificationError,
    missingReceiving,
    handleConfirmDelete,
  };
};
