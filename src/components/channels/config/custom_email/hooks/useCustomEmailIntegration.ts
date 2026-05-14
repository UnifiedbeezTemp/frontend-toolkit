import { useCallback, useState } from "react";
import { extractErrorMessage } from "../../webchat/utils/errorUtils";
import { useAppMutation } from "../../../../../api";
import { CustomEmailSetupResponse, CustomEmailSetupRequest, setupCustomEmailReceiving } from "../../../../../services/customEmailService";
import { useToast } from "../../../../ui/toast/ToastProvider";

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

  const setupMutation = useAppMutation<CustomEmailSetupRequest, CustomEmailSetupResponse>(
    async (data) => {
      return await setupCustomEmailReceiving(data);
    },
    {
      onSuccess: async (response) => {
        const nextDnsRecords = [
          ...(response.dnsRecords?.mx ?? []).map((r) => ({
            type: "MX",
            name: response.domain,
            value: r.value,
            priority: r.priority,
          })),
          ...(response.dnsRecords?.txt ?? []).map((r) => ({
            type: "TXT",
            name: r.name,
            value: r.value,
          })),
          ...(response.dnsRecords?.cname ?? []).map((r) => ({
            type: "CNAME",
            name: r.name,
            value: r.value,
          })),
        ];

        if (nextDnsRecords.length > 0) {
          setDnsRecords(nextDnsRecords);
        }
        showToast({
          title: "Success",
          description: response.message || "Custom email setup initiated successfully",
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
          description: extractErrorMessage(error, "Failed to setup custom email"),
          variant: "error",
        });
      },
    }
  );

  const startIntegration = useCallback(
    (domain: string) => {
      setupMutation.mutate({
        channelId,
        domain,
      });
    },
    [channelId, setupMutation]
  );

  return {
    startIntegration,
    isLoading: setupMutation.isPending,
    dnsRecords,
  };
};
