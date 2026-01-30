import { useState, useCallback, useMemo } from "react";
import { useAppSelector } from "../../../../../store/hooks/useRedux";
import { TeamMember } from "../../../../../store/onboarding/types/memberTypes";

export function useAccessPermissions() {
  const members = useAppSelector(
    (state) => state.members?.members || [],
  ) as TeamMember[];

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  const allMemberIds = useMemo(
    () => members.map((member) => member.id),
    [members],
  );

  const handleToggleMember = useCallback((memberId: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId],
    );
  }, []);

  const handleToggleSelectAll = useCallback(() => {
    setSelectedMemberIds((prev) =>
      prev.length === allMemberIds.length ? [] : [...allMemberIds],
    );
  }, [allMemberIds]);

  return {
    members,
    selectedMemberIds,
    allMemberIds,
    handleToggleMember,
    handleToggleSelectAll,
  };
}
