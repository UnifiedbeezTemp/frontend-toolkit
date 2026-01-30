import { useState, useCallback, useMemo } from "react";
import { useAppSelector } from "../../../../../store/hooks/useRedux";
import { TeamMember } from "../../../../../store/onboarding/types/memberTypes";
import {
  useAccessPermissionsPersistence,
  AccessPermissionsConfig,
} from "../../../../channel-account-ai-config/hooks/useAccessPermissionsPersistence";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";

export function useAccessPermissions(params: AIConfigParams) {
  const members = useAppSelector(
    (state) => state.members?.members || [],
  ) as TeamMember[];

  const [localConfig, setLocalConfig] = useState<AccessPermissionsConfig>({
    selectedMemberIds: [],
  });

  const updateLocalConfig = useCallback(
    (updates: Partial<AccessPermissionsConfig>) => {
      setLocalConfig((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  const persistence = useAccessPermissionsPersistence(
    params,
    localConfig,
    updateLocalConfig,
  );

  const allMemberIds = useMemo(
    () => members.map((member) => member.id),
    [members],
  );

  const handleToggleMember = useCallback(
    (memberId: string) => {
      updateLocalConfig({
        selectedMemberIds: localConfig.selectedMemberIds.includes(memberId)
          ? localConfig.selectedMemberIds.filter((id) => id !== memberId)
          : [...localConfig.selectedMemberIds, memberId],
      });
    },
    [localConfig.selectedMemberIds, updateLocalConfig],
  );

  const handleToggleSelectAll = useCallback(() => {
    updateLocalConfig({
      selectedMemberIds:
        localConfig.selectedMemberIds.length === allMemberIds.length
          ? []
          : [...allMemberIds],
    });
  }, [allMemberIds, localConfig.selectedMemberIds.length, updateLocalConfig]);

  return {
    members,
    selectedMemberIds: localConfig.selectedMemberIds,
    allMemberIds,
    handleToggleMember,
    handleToggleSelectAll,
    ...persistence,
  };
}
