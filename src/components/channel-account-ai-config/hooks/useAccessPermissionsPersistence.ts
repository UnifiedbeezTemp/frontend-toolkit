import { useCallback } from "react";
import { useAIConfigPersistence } from "./useAIConfigPersistence";
import { AIConfigParams } from "../services/aiConfigService";
import { AIConfigResponse, UpdateAIConfigRequest } from "../types/api";

export interface AccessPermissionsConfig {
  selectedMemberIds: string[];
}

export function useAccessPermissionsPersistence(
  params: AIConfigParams,
  config: AccessPermissionsConfig,
  updateLocalConfig: (updates: Partial<AccessPermissionsConfig>) => void,
) {
  const syncFromApi = useCallback(
    (apiConfig: AIConfigResponse): Partial<AccessPermissionsConfig> => {
      const selectedMemberIds = (apiConfig.teamAccess || [])
        .filter((entry) => entry.canView || entry.canModify)
        .map((entry) => String(entry.teamMemberId));
      return { selectedMemberIds };
    },
    [],
  );

  const compareConfigs = useCallback(
    (current: AccessPermissionsConfig, api: AIConfigResponse): boolean => {
      const apiMemberIds = (api.teamAccess || [])
        .filter((entry) => entry.canView || entry.canModify)
        .map((entry) => String(entry.teamMemberId));

      return (
        JSON.stringify([...current.selectedMemberIds].sort()) !==
        JSON.stringify([...apiMemberIds].sort())
      );
    },
    [],
  );

  const transformToApi = useCallback(
    (current: AccessPermissionsConfig): UpdateAIConfigRequest => {
      return {
        teamAccess: current.selectedMemberIds.map((id) => ({
          teamMemberId: parseInt(id, 10),
          canView: true,
          canModify: true,
        })),
      };
    },
    [],
  );

  return useAIConfigPersistence({
    params,
    config,
    updateLocalConfig,
    syncFromApi,
    compareConfigs,
    transformToApi,
    sectionName: "Access Permissions",
  });
}
