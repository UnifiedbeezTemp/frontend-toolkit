"use client"

import { useCallback, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux"
import {
  markInvitationsPendingBulk,
  selectFilteredInvitedUsers,
  selectSelectedInvitedUsers,
  setInvitedSelection,
  setInvitedUsers,
  setStatusFilterInvited,
  updateInvitedUserRoleBulk,
} from "../../../store/onboarding/slices/membersSlice"
import { api } from "../../../api"
import { ApiInvitation, ApiRole } from "../../../types/api/memberTypes"
import { extractErrorMessage } from "../../../utils/extractErrorMessage"
import { useToast } from "../../ui/toast/ToastProvider"
import { useOptionalTeamManagementContext } from "../context/TeamManagementContext"
import { useUpdateInvitationRolesBulk } from "./useTeamRoles"
import { transformApiInvitationToTeamMember } from "../utils/transformers"

interface BulkInvitationResponse {
  message?: string
  successful?: Array<ApiInvitation>
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

interface UseInvitedBulkActionsParams {
  roles: ApiRole[]
  mode: "draft" | "cancelled" | null
}

const getResponseCount = (
  summaryCount: number | undefined,
  items: Array<unknown> | undefined,
) => summaryCount ?? items?.length ?? 0

export function useInvitedBulkActions({
  roles,
  mode,
}: UseInvitedBulkActionsParams) {
  const teamManagement = useOptionalTeamManagementContext()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const invited = useAppSelector(selectFilteredInvitedUsers)
  const selectedInvited = useAppSelector(selectSelectedInvitedUsers)
  const [isSending, setIsSending] = useState(false)
  const [isAssigningRole, setIsAssigningRole] = useState(false)
  const [isReAdding, setIsReAdding] = useState(false)
  const [failedInvitations, setFailedInvitations] = useState<
    Array<{ email: string; error: string }>
  >([])
  const { mutateAsync: updateInvitationRolesBulk } =
    useUpdateInvitationRolesBulk()

  const defaultRole = roles.find((r) => r.isDefault) ?? roles[0]
  const selectedDraftInvited = selectedInvited.filter(
    (invitation) => invitation.status === "draft",
  )
  const selectedCancelledInvited = selectedInvited.filter(
    (invitation) => invitation.status === "cancelled",
  )

  const selectAll = useCallback(() => {
    if (teamManagement) {
      teamManagement.selectAllDraftInvites()
      return
    }

    if (!mode) return
    dispatch(
      setInvitedSelection({
        ids: invited.map((user) => user.id),
        selected: true,
      }),
    )
  }, [dispatch, invited, mode, teamManagement])

  const clearSelection = useCallback(() => {
    if (teamManagement) {
      teamManagement.clearDraftInviteSelection()
      return
    }

    if (!mode) return
    dispatch(
      setInvitedSelection({
        ids: invited.map((user) => user.id),
        selected: false,
      }),
    )
  }, [dispatch, invited, mode, teamManagement])

  const clearFeedback = useCallback(() => {
    if (teamManagement) {
      teamManagement.clearInlineStatuses()
      return
    }

    setFailedInvitations([])
  }, [teamManagement])

  const resolveInvitationRoleId = useCallback(
    (roleType: string, invitationRoleId?: number) =>
      invitationRoleId ??
      roles.find((role) => role.type === roleType)?.id ??
      defaultRole?.id ??
      0,
    [defaultRole?.id, roles],
  )

  const assignRole = useCallback(
    async (roleId: number) => {
      if (teamManagement) {
        setIsAssigningRole(true)
        try {
          await teamManagement.assignRoleToSelectedDrafts(roleId)
        } finally {
          setIsAssigningRole(false)
        }
        return
      }

      if (mode !== "draft" || isAssigningRole) return

      const role =
        roles.find((currentRole) => currentRole.id === roleId) ?? defaultRole

      if (!role || selectedDraftInvited.length === 0) {
        return
      }

      try {
        setIsAssigningRole(true)
        setFailedInvitations([])

        const response = await updateInvitationRolesBulk({
          invitations: selectedDraftInvited.map((invitation) => ({
            id: invitation.id,
            roleId: role.id,
          })),
        })

        const successfulIds =
          response.successful?.map((invitation) => invitation.id) ?? []
        const successfulCount = getResponseCount(
          response.summary?.successful,
          response.successful,
        )
        const failedCount = getResponseCount(
          response.summary?.failed,
          response.failed,
        )

        if (successfulIds.length > 0) {
          dispatch(
            updateInvitedUserRoleBulk({
              ids: successfulIds,
              role: role.type,
              roleId: role.id,
            }),
          )
        }

        if (response.failed?.length) {
          setFailedInvitations(
            response.failed.map((failure) => ({
              email: failure.email,
              error: failure.error,
            })),
          )
        }

        await queryClient.invalidateQueries({ queryKey: ["invitations"] })
        await queryClient.invalidateQueries({ queryKey: ["members"] })

        showToast({
          title:
            response.message ??
            (failedCount > 0
              ? "Role update completed with issues"
              : "Roles updated"),
          description:
            failedCount > 0
              ? `${successfulCount} updated, ${failedCount} failed.`
              : `Updated ${successfulCount} draft invitation${
                  successfulCount === 1 ? "" : "s"
                }.`,
          variant:
            failedCount > 0
              ? successfulCount > 0
                ? "warning"
                : "error"
              : "success",
        })
      } catch (error) {
        showToast({
          title: "Failed to update roles",
          description: extractErrorMessage(
            error,
            "Failed to update draft invitation roles",
          ),
          variant: "error",
        })
      } finally {
        setIsAssigningRole(false)
      }
    },
    [
      defaultRole,
      dispatch,
      isAssigningRole,
      mode,
      queryClient,
      roles,
      selectedDraftInvited,
      showToast,
      teamManagement,
      updateInvitationRolesBulk,
    ],
  )

  const bulkSend = useCallback(async () => {
    if (teamManagement) {
      await teamManagement.sendSelectedDraftInvites()
      return
    }

    if (mode !== "draft" || selectedDraftInvited.length === 0 || isSending)
      return

    try {
      setIsSending(true)
      setFailedInvitations([])

      const invitations = selectedDraftInvited.map((invitation) => ({
        email: invitation.email,
        roleId: resolveInvitationRoleId(invitation.role, invitation.roleId),
      }))

      const response = await api.post<
        { invitations: Array<{ email: string; roleId: number }> },
        BulkInvitationResponse
      >("/invitations/bulk", { invitations })

      if ((response.failed ?? []).length > 0) {
        setFailedInvitations(response.failed ?? [])
      }

      const successfulEmails = (response.successful ?? []).map((invitation) =>
        invitation.email.toLowerCase(),
      )
      const successfulInvitationIds = selectedDraftInvited
        .filter((invitation) =>
          successfulEmails.includes(invitation.email.toLowerCase()),
        )
        .map((invitation) => invitation.id)

      if (successfulInvitationIds.length > 0) {
        dispatch(markInvitationsPendingBulk({ ids: successfulInvitationIds }))
      }

      await queryClient.invalidateQueries({ queryKey: ["invitations"] })
      await queryClient.invalidateQueries({ queryKey: ["members"] })
      dispatch(setStatusFilterInvited(null))

      const successfulCount = getResponseCount(
        response.summary?.successful,
        response.successful,
      )
      const failedCount = getResponseCount(
        response.summary?.failed,
        response.failed,
      )

      showToast({
        title:
          failedCount > 0
            ? (response.message ?? "Invitation send completed with issues")
            : "Invitations sent",
        description:
          failedCount > 0
            ? `${successfulCount} sent, ${failedCount} failed`
            : `${successfulCount} invite(s) moved to pending.`,
        variant: failedCount > 0 ? "warning" : "success",
      })
    } catch (error) {
      showToast({
        title: "Error",
        description: extractErrorMessage(
          error,
          "Failed to send bulk invitations",
        ),
        variant: "error",
      })
    } finally {
      setIsSending(false)
    }
  }, [
    dispatch,
    isSending,
    mode,
    queryClient,
    resolveInvitationRoleId,
    selectedDraftInvited,
    showToast,
    teamManagement,
  ])

  const bulkResend = useCallback(async () => {
    if (teamManagement) {
      await teamManagement.reAddSelectedCancelledInvites()
      return
    }

    if (
      mode !== "cancelled" ||
      selectedCancelledInvited.length === 0 ||
      isReAdding
    ) {
      return
    }

    try {
      setIsReAdding(true)
      setFailedInvitations([])

      const invitations = selectedCancelledInvited.map((invitation) => ({
        email: invitation.email,
        roleId: resolveInvitationRoleId(invitation.role, invitation.roleId),
      }))
      const response = await api.post<
        { invitations: Array<{ email: string; roleId: number }> },
        BulkInvitationResponse
      >("/invitations/bulk?addOnly=true", { invitations })
      const successfulCount = getResponseCount(
        response.summary?.successful,
        response.successful,
      )
      const failedCount = getResponseCount(
        response.summary?.failed,
        response.failed,
      )

      if ((response.failed ?? []).length > 0) {
        setFailedInvitations(
          (response.failed ?? []).map((failure) => ({
            email: failure.email,
            error: failure.error,
          })),
        )
      }
      const transformedInvitations =
        response?.successful?.map((item) =>
          transformApiInvitationToTeamMember(item),
        ) || []
      dispatch(setInvitedUsers([...transformedInvitations]))
      await queryClient.invalidateQueries({ queryKey: ["invitations"] })
      await queryClient.invalidateQueries({ queryKey: ["members"] })
      dispatch(
        setInvitedSelection({
          ids: selectedCancelledInvited.map((invitation) => invitation.id),
          selected: false,
        }),
      )

      showToast({
        title:
          response.message ??
          (failedCount > 0
            ? "Cancelled invitation re-add completed with issues"
            : "Cancelled invitations re-added"),
        description:
          failedCount > 0
            ? `${successfulCount} re-added, ${failedCount} failed.`
            : `Re-added ${successfulCount} cancelled invitation${
                successfulCount === 1 ? "" : "s"
              } as draft${successfulCount === 1 ? "" : "s"}.`,
        variant:
          failedCount > 0
            ? successfulCount > 0
              ? "warning"
              : "error"
            : "success",
      })
    } catch (error) {
      showToast({
        title: "Failed to re-add cancelled invitations",
        description: extractErrorMessage(
          error,
          "Failed to re-add cancelled invitations",
        ),
        variant: "error",
      })
    } finally {
      setIsReAdding(false)
    }
  }, [
    dispatch,
    isReAdding,
    mode,
    queryClient,
    resolveInvitationRoleId,
    selectedCancelledInvited,
    showToast,
    teamManagement,
  ])

  return {
    invited,
    selectedInvited,
    selectAll,
    clearSelection,
    assignRole,
    bulkSend,
    bulkResend,
    defaultRoleId: defaultRole?.id ?? 0,
    clearFeedback,
    isAssigningRole,
    isSending: teamManagement
      ? teamManagement.bulkSendState.status === "pending"
      : isSending,
    isReAdding: teamManagement
      ? teamManagement.bulkReAddState.status === "pending"
      : isReAdding,
    failedInvitations: teamManagement
      ? teamManagement.failedInvitations
      : failedInvitations,
  }
}
