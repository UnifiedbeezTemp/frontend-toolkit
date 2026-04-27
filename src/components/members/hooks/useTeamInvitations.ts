import { useEffect } from "react"
import { useAppDispatch } from "../../../store/hooks/useRedux"
import { setInvitedUsers } from "../../../store/onboarding/slices/membersSlice"
import { api, useAppQuery } from "../../../api"
import { ApiInvitation } from "../../../types/api/memberTypes"
import { transformApiInvitationToTeamMember } from "../utils/transformers"

export const useTeamInvitations = () => {
  const dispatch = useAppDispatch()

  const {
    data: invitationsData,
    isLoading: isLoadingInvitations,
    error: invitationsError,
    refetch: refetchInvitations,
  } = useAppQuery<{
    invitations: ApiInvitation[]
    summary: {
      ACCEPTED: number
      CANCELLED: number
      DECLINED: number
      DRAFT: number
      EXPIRED: number
      PENDING: number
    }
  }>(["invitations"], () => api.get("/invitations"), {})

  useEffect(() => {
    if (invitationsData) {
      const transformedInvitations = invitationsData.invitations.map(
        (invitation) => transformApiInvitationToTeamMember(invitation),
      )
      dispatch(setInvitedUsers([...transformedInvitations]))
    }
  }, [invitationsData, dispatch])

  return {
    isLoadingInvitations,
    invitationsError,
    refetchInvitations,
    invitationsData,
  }
}
