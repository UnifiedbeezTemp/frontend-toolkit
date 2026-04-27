import { useCallback, useState } from "react";
import { useAppMutation } from "../../../../../api";
import {
  CustomEmailSetupResponse,
  CustomEmailSetupRequest,
  setupCustomEmailReceiving,
  disconnectCustomEmail,
} from "../../../../../services/customEmailService";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";

interface UseCustomEmailIntegrationProps {
  channelId: number;
  onComplete?: (response: CustomEmailSetupResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useCustomEmailIntegration = ({
  channelId,
  onComplete,
  onRefetchChannels,
}: UseCustomEmailIntegrationProps) => {
  const { showToast } = useToast();
  const [dnsRecords, setDnsRecords] = useState<
    Array<{
      type: string;
      name: string;
      value: string;
      priority?: number;
    }>
  >([]);

  const setupMutation = useAppMutation<
    CustomEmailSetupRequest,
    CustomEmailSetupResponse
  >(
    async (data) => {
      return await setupCustomEmailReceiving(data);
    },
    {
      onSuccess: async (response) => {
        if (response.dnsRecords && response.dnsRecords.length > 0) {
          setDnsRecords(response.dnsRecords);
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
        setDnsRecords([]); // Clear DNS records on disconnect
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
    (domain: string) => {
      setupMutation.mutate({
        channelId,
        domain,
      });
    },
    [channelId, setupMutation],
  );

  const handleConfirmDelete = useCallback(
    (accountId: number) => {
      disconnectMutation.mutate(accountId);
    },
    [disconnectMutation],
  );

  return {
    startIntegration,
    isLoading: setupMutation.isPending,
    isDeleting: disconnectMutation.isPending,
    dnsRecords,
    handleConfirmDelete,
  };
};
