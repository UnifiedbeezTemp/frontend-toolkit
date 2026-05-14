import { useCallback, useState } from "react";
import { extractErrorMessage } from "../../webchat/utils/errorUtils";
import { useAppMutation } from "../../../../../api";
import {
  CustomEmailSetupResponse,
  CustomEmailSetupRequest,
  DNSRecords,
  setupCustomEmailReceiving,
} from "../../../../../services/customEmailService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UseCustomEmailIntegrationProps {
  channelId: number;
  onComplete?: (response: CustomEmailSetupResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

const normalizeDnsRecords = (dnsRecords: DNSRecords) => {
  const mx = (dnsRecords.mx ?? []).map((record) => ({
    type: "MX",
    name: "@",
    value: record.value,
    priority: record.priority,
  }));

  const txt = (dnsRecords.txt ?? []).map((record) => ({
    type: "TXT",
    name: record.name,
    value: record.value,
  }));

  const cname = (dnsRecords.cname ?? []).map((record) => ({
    type: "CNAME",
    name: record.name,
    value: record.value,
  }));

  return [...mx, ...txt, ...cname];
};

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
        setDnsRecords(normalizeDnsRecords(response.dnsRecords));
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
