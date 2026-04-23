import { useCallback, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/hooks/useRedux"
import {
  updateMemberRole,
  updateInvitedUserRole,
  updateInvitedUserRoleId,
  toggleMemberSelection,
  cancelInvitation,
  removeMember,
  setInvitedSelection,
} from "../../../../store/onboarding/slices/membersSlice"
import { TeamMember } from "../../../../store/onboarding/types/memberTypes"
import useSession from "../../../../providers/hooks/useSession"
import { api, useAppMutation } from "../../../../api"
import { store } from "../../../../store"
import { useToast } from "../../../ui/toast/useToast"
import { extractErrorMessage } from "../../../../utils/extractErrorMessage"
import { UserInvitePayload } from "../../types/teamManagement"

interface BulkInvitationResponse {
  message?: string
  successful?: Array<{
    email: string
  }>
  failed?: Array<{
    email: string
    error: string
  }>
  summary?: {
    total?: number
    successful?: number
    failed?: number
  }
}

export const useUserItem = (
  type: "invited" | "members",
  userId: string,
  onSendInvite?: (payload: UserInvitePayload) => void | Promise<void>,
  user?: TeamMember,
) => {
  const dispatch = useAppDispatch()
  const supabaseIcons = useSupabaseIcons()
  const { data: currentUser } = useSession()
  const { showToast } = useToast()
  const invitedUsers = useAppSelector((state) => state.members.invitedUsers)
  const members = useAppSelector((state) => state.members.members)
  const roles = useAppSelector((state) => state.members.roles)
  const invitedStatusFilter = useAppSelector(
    (state) => state.members.statusFilterInvited,
  )
  const [actionError, setActionError] = useState("")
  const [isReAddingCancelledInvitation, setIsReAddingCancelledInvitation] =
    useState(false)

  const queryClient = useQueryClient()

  const currentMember =
    type === "members"
      ? members.find((m) => m.id === userId)
      : invitedUsers.find((u) => u.id === userId)

  const isCurrentUser = currentMember?.email === currentUser?.email
  const isOwner = currentMember?.role === "OWNER" || currentMember?.isOwner

  const {
    mutateAsync: cancelInvitationMutation,
    isPending: isCancelingInvitation,
  } =
    useAppMutation<string, void>(
      async (invitationId) => {
        return await api.delete(`/invitations/${invitationId}`)
      },
      {
        onSuccess: (_, invitationId) => {
          dispatch(cancelInvitation(invitationId))
          queryClient.invalidateQueries({ queryKey: ["invitations"] })
        },
      },
    )

  const { mutateAsync: removeMemberMutation, isPending: isRemovingMember } =
    useAppMutation<string, void>(
      async (memberId) => {
        return await api.delete(`/team/members/${memberId}`)
      },
      {
        onSuccess: (_, memberId) => {
          dispatch(removeMember(memberId))
          queryClient.invalidateQueries({ queryKey: ["members"] })
        },
      },
    )
  const { mutateAsync: assignRoleMutation, isPending: isAssigningRole } =
    useAppMutation<{ userId: string; roleId: number }, void>(
      async (payload) => {
        return await api.post("/team/assign-role", payload)
      },
      {
        onSuccess: (_, variables) => {
          const currentState = store.getState()
          const member = currentState.members.members.find(
            (m) => m.id === variables.userId,
          )
          if (member) {
            const role = roles.find((r) => r.id === variables.roleId)
            if (role) {
              dispatch(updateMemberRole({ id: member.id, role: role.type }))
            }
          }
          queryClient.invalidateQueries({ queryKey: ["members"] })
        },
      },
    )

  const getStatusStyles = useCallback((status: string) => {
    switch (status) {
      case "pending":
        return "text-warning border-warning bg-warning/10"
      case "denied":
        return "text-destructive border-destructive bg-destructive/10"
      case "draft":
        return "text-text-primary border-input-stroke bg-border/50"
      default:
        return "text-text-primary border-input-stroke bg-border/50"
    }
  }, [])

  const clearActionError = useCallback(() => {
    setActionError("")
  }, [])

  const handleRemove = useCallback(async () => {
    if (isCurrentUser) return

    setActionError("")

    try {
      if (user?.status === "cancelled") {
        const message = "Cancelled invitations can be re-added instead."

        setActionError(message)
        return
      }

      if (user?.status === "accepted") {
        await removeMemberMutation(userId)
        showToast({
          title: "Team member removed",
          description: `${user.email} was removed.`,
          variant: "success",
        })
      } else {
        await cancelInvitationMutation(userId)
        showToast({
          title: "Invitation removed",
          description: `${user?.email ?? "Invitation"} was removed from invitations.`,
          variant: "success",
        })
      }
    } catch (error) {
      const message = extractErrorMessage(
        error,
        user?.status === "accepted"
          ? "Failed to remove team member"
          : "Failed to cancel invitation",
      )

      setActionError(message)
      showToast({
        title:
          user?.status === "accepted"
            ? "Failed to remove team member"
            : "Failed to cancel invitation",
        description: message,
        variant: "error",
      })
    }
  }, [
    user,
    isCurrentUser,
    removeMemberMutation,
    userId,
    cancelInvitationMutation,
    showToast,
  ])

  const handleToggle = useCallback(() => {
    if (
      type === "invited" &&
      invitedStatusFilter !== "draft" &&
      invitedStatusFilter !== "cancelled"
    ) {
      return
    }
    dispatch(toggleMemberSelection(userId))
  }, [type, invitedStatusFilter, userId, dispatch])

  const handleSendInvite = useCallback(() => {
    const currentInvitedUser = invitedUsers.find((u) => u.id === userId)

    setActionError("")

    if (!currentInvitedUser) {
      return
    }

    const safeRoles = roles || []
    const role =
      safeRoles.find((currentRole) => currentRole.type === currentInvitedUser.role) ??
      safeRoles.find((currentRole) => currentRole.isDefault) ??
      safeRoles[0]
    const roleId = role?.id || currentInvitedUser.roleId || 0

    if (currentInvitedUser.status === "cancelled") {
      if (!roleId) {
        const message = "Select a role before re-adding the invite."

        setActionError(message)
        return
      }

      setIsReAddingCancelledInvitation(true)

      void api
        .post<
          { invitations: Array<{ email: string; roleId: number }> },
          BulkInvitationResponse
        >("/invitations/bulk?addOnly=true", {
          invitations: [{ email: currentInvitedUser.email, roleId }],
        })
        .then(async (response) => {
          const failedCount = response.summary?.failed ?? response.failed?.length ?? 0
          const successfulCount =
            response.summary?.successful ?? response.successful?.length ?? 0

          if (failedCount > 0) {
            const message =
              response.failed?.[0]?.error ?? "Failed to re-add invitation"

            setActionError(message)
            showToast({
              title: response.message ?? "Failed to re-add invitation",
              description: message,
              variant: "error",
            })
            return
          }

          dispatch(
            setInvitedSelection({
              ids: [currentInvitedUser.id],
              selected: false,
            }),
          )
          await queryClient.invalidateQueries({ queryKey: ["invitations"] })
          showToast({
            title: response.message ?? "Invitation re-added",
            description: `Re-added ${currentInvitedUser.email} as draft${
              successfulCount === 1 ? "" : "s"
            }.`,
            variant: "success",
          })
        })
        .catch((error) => {
          const message = extractErrorMessage(error, "Failed to re-add invitation")

          setActionError(message)
          showToast({
            title: "Failed to re-add invitation",
            description: message,
            variant: "error",
          })
        })
        .finally(() => {
          setIsReAddingCancelledInvitation(false)
        })
      return
    }

    if (currentInvitedUser.status === "draft" && onSendInvite) {
      if (!roleId) {
        const message = "Select a role before sending the invite."

        setActionError(message)
        return
      }

      Promise.resolve(
        onSendInvite({
          invitationId: userId,
          email: currentInvitedUser.email,
          roleId,
        }),
      ).catch((error) => {
        const message = extractErrorMessage(error, "Failed to send invitation")

        setActionError(message)
        showToast({
          title: "Failed to send invitation",
          description: message,
          variant: "error",
        })
      })
    }
  }, [dispatch, onSendInvite, queryClient, roles, showToast, userId, invitedUsers])

  const handleRoleChangeWithId = useCallback(
    async (role: string) => {
      if (isCurrentUser && isOwner) return

      setActionError("")

      const roleObj = roles.find((r) => r.type === role)

      if (!roleObj) {
        setActionError("Role is unavailable. Please refresh and try again.")
        return
      }

      if (type === "invited") {
        dispatch(updateInvitedUserRole({ id: userId, role: roleObj.type }))
        dispatch(updateInvitedUserRoleId({ id: userId, roleId: roleObj.id }))
        return
      }

      try {
        await assignRoleMutation({ userId, roleId: roleObj.id })
      } catch (error) {
        const message = extractErrorMessage(error, "Failed to update role")

        setActionError(message)
        showToast({
          title: "Failed to update role",
          description: message,
          variant: "error",
        })
      }
    },
    [
      assignRoleMutation,
      dispatch,
      isCurrentUser,
      isOwner,
      roles,
      showToast,
      type,
      userId,
    ],
  )

  return {
    handleRoleChange: handleRoleChangeWithId,
    handleRemove,
    handleToggle,
    handleSendInvite,
    getStatusStyles,
    supabaseIcons,
    isCurrentUser,
    isOwner,
    isRemoving: isRemovingMember,
    isCanceling: isCancelingInvitation,
    isReAddingCancelledInvitation,
    isAssigningRole,
    actionError,
    clearActionError,
  }
}
