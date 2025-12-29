import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { setMembers } from "../../../store/onboarding/slices/membersSlice";
import { api, useAppQuery } from "../../../api";
import { ApiMember } from "../../../types/api/memberTypes";
import { transformApiMemberToTeamMember } from "../utils/transformers";

export const useTeamMembers = () => {
  const dispatch = useAppDispatch();

  const {
    data: membersData,
    isLoading: isLoadingMembers,
    error: membersError,
    refetch: refetchMembers,
  } = useAppQuery<ApiMember[]>(["members"], () => api.get("/team/members"), {});

  useEffect(() => {
    if (membersData) {
      const transformedMembers = membersData.map((member) =>
        transformApiMemberToTeamMember(member)
      );
      dispatch(setMembers(transformedMembers));
    }
  }, [membersData, dispatch]);

  return {
    isLoadingMembers,
    membersError,
    refetchMembers,
  };
};
