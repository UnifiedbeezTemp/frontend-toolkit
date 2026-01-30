import { useAppSelector } from "../../../../store/hooks/useRedux";
import { TeamMember } from "../../../../store/onboarding/types/memberTypes";

export const useTeamMembers = () => {
  const members = useAppSelector(
    (state) => state.members?.members || [],
  ) as TeamMember[];

  return {
    members,
  };
};
