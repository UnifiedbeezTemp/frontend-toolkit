import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { store } from "../../../store";
import { setInvitedUsers } from "../../../store/onboarding/slices/membersSlice";
import { api, useAppQuery } from "../../../api";
import { ApiInvitation } from "../../../types/api/memberTypes";
import { transformApiInvitationToTeamMember } from "../utils/transformers";

export const useTeamInvitations = () => {
  const dispatch = useAppDispatch();

  const {
    data: invitationsData,
    isLoading: isLoadingInvitations,
    error: invitationsError,
    refetch: refetchInvitations,
  } = useAppQuery<ApiInvitation[]>(
    ["invitations"],
    () => api.get("/team/invitations"),
    {}
  );

  useEffect(() => {
    if (invitationsData) {
      const transformedInvitations = invitationsData.map((invitation) =>
        transformApiInvitationToTeamMember(invitation)
      );

      const currentState = store.getState();
      const currentInvitedUsers = currentState.members?.invitedUsers || [];
      const draftInvitations = currentInvitedUsers.filter(
        (u) => u.status === "draft"
      );

      dispatch(
        setInvitedUsers([...draftInvitations, ...transformedInvitations])
      );
    }
  }, [invitationsData, dispatch]);

  return {
    isLoadingInvitations,
    invitationsError,
    refetchInvitations,
  };
};
