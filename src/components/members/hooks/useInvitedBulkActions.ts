"use client"

import { useCallback, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux"
import {
  markInvitationsPendingBulk,
  removeInvitedUsers,
  selectFilteredInvitedUsers,
  selectSelectedInvitedUsers,
  setInvitedSelection,
  setStatusFilterInvited,
  updateInvitedUserRoleBulk,
} from "../../../store/onboarding/slices/membersSlice"
import { api } from "../../../api"
import { ApiRole } from "../../../types/api/memberTypes"
import { extractErrorMessage } from "../../../utils/extractErrorMessage"
import { useToast } from "../../ui/toast/ToastProvider"
import { useOptionalTeamManagementContext } from "../context/TeamManagementContext"
import {
  useDeleteCancelledInvitationsBulk,
  useUpdateInvitationRolesBulk,
} from "./useTeamRoles"

interface BulkInvitationResponse {
  message: string
  successful: Array<{
    email: string
    role: string
    expiresAt: string
    userId: number
  }>
  failed: Array<{
    email: string
    error: string
  }>
  summary: {
    total: number
    successful: number
    failed: number
  }
}

interface BulkDeleteInvitationsResponse {
  message?: string
  successful?: Array<{
    id?: string
    email?: string
  }>
  failed?: Array<{
    id?: string
    email?: string
    error?: string
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

const buildFailureMap = (
  failed: Array<{ id?: string; email?: string; error?: string }> | undefined,
) =>
  new Map(
    (failed ?? []).flatMap((failure) => {
      const entries: Array<readonly [string, string]> = []

      if (failure.id) {
        entries.push([failure.id, failure.error ?? "Request failed"])
      }

      if (failure.email) {
        entries.push([
          failure.email.toLowerCase(),
          failure.error ?? "Request failed",
        ])
      }

      return entries
    }),
  )

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
  const [isDeleting, setIsDeleting] = useState(false)
  const [failedInvitations, setFailedInvitations] = useState<
    Array<{ email: string; error: string }>
  >([])
  const { mutateAsync: updateInvitationRolesBulk } =
    useUpdateInvitationRolesBulk()
  const { mutateAsync: deleteCancelledInvitationsBulk } =
    useDeleteCancelledInvitationsBulk()

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
      setInvitedSelection({ ids: invited.map((user) => user.id), selected: true }),
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

      const role = roles.find((currentRole) => currentRole.id === roleId) ?? defaultRole

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

        showToast({
          title:
            response.message ??
            (failedCount > 0 ? "Role update completed with issues" : "Roles updated"),
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

    if (mode !== "draft" || selectedDraftInvited.length === 0 || isSending) return

    try {
      setIsSending(true)
      setFailedInvitations([])

      const invitations = selectedDraftInvited.map((invitation) => {
        const roleId = invitation.roleId ?? defaultRole?.id ?? roles[0]?.id ?? 0

        return { email: invitation.email, roleId }
      })

      const response = await api.post<
        { invitations: Array<{ email: string; roleId: number }> },
        BulkInvitationResponse
      >("/invitations/bulk", { invitations })

      if (response.failed.length > 0) {
        setFailedInvitations(response.failed)
      }

      const successfulEmails = response.successful.map((invitation) =>
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
      dispatch(setStatusFilterInvited(null))

      showToast({
        title: response.summary.failed > 0 ? response.message : "Invitations sent",
        description:
          response.summary.failed > 0
            ? `${response.summary.successful} sent, ${response.summary.failed} failed`
            : `${response.summary.successful} invite(s) moved to pending.`,
        variant: response.summary.failed > 0 ? "warning" : "success",
      })
    } catch (error) {
      showToast({
        title: "Error",
        description: extractErrorMessage(error, "Failed to send bulk invitations"),
        variant: "error",
      })
    } finally {
      setIsSending(false)
    }
  }, [
    defaultRole,
    dispatch,
    isSending,
    mode,
    queryClient,
    roles,
    selectedDraftInvited,
    showToast,
    teamManagement,
  ])

  const bulkDelete = useCallback(async () => {
    if (teamManagement) {
      await teamManagement.deleteSelectedCancelledInvites()
      return
    }

    if (mode !== "cancelled" || selectedCancelledInvited.length === 0 || isDeleting) {
      return
    }

    try {
      setIsDeleting(true)
      setFailedInvitations([])

      const response =
        await deleteCancelledInvitationsBulk({
          invitationIds: selectedCancelledInvited.map((invitation) => invitation.id),
        })

      const typedResponse: BulkDeleteInvitationsResponse =
        typeof response === "object" && response !== null ? response : {}
      const failedByKey = buildFailureMap(typedResponse.failed)
      const successfulIds =
        typedResponse.successful
          ?.map((invitation) => invitation.id)
          .filter((id): id is string => Boolean(id)) ?? []
      const removedIds =
        successfulIds.length > 0
          ? successfulIds
          : selectedCancelledInvited
              .filter((invitation) => {
                const byId = failedByKey.has(invitation.id)
                const byEmail = failedByKey.has(invitation.email.toLowerCase())

                return !byId && !byEmail
              })
              .map((invitation) => invitation.id)
      const successfulCount =
        typedResponse.summary?.successful ?? removedIds.length
      const failedCount =
        typedResponse.summary?.failed ?? typedResponse.failed?.length ?? 0

      if (typedResponse.failed?.length) {
        setFailedInvitations(
          typedResponse.failed.map((failure) => ({
            email: failure.email ?? "Unknown email",
            error: failure.error ?? "Failed to delete invitation",
          })),
        )
      }

      if (removedIds.length > 0) {
        dispatch(removeInvitedUsers(removedIds))
      }

      await queryClient.invalidateQueries({ queryKey: ["invitations"] })

      showToast({
        title:
          typedResponse.message ??
          (failedCount > 0
            ? "Cancelled invitation delete completed with issues"
            : "Cancelled invitations deleted"),
        description:
          failedCount > 0
            ? `${successfulCount} deleted, ${failedCount} failed.`
            : `Deleted ${successfulCount} cancelled invitation${
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
        title: "Failed to delete cancelled invitations",
        description: extractErrorMessage(
          error,
          "Failed to delete cancelled invitations",
        ),
        variant: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }, [
    deleteCancelledInvitationsBulk,
    dispatch,
    isDeleting,
    mode,
    queryClient,
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
    bulkDelete,
    defaultRoleId: defaultRole?.id ?? 0,
    clearFeedback,
    isAssigningRole,
    isSending: teamManagement
      ? teamManagement.bulkSendState.status === "pending"
      : isSending,
    isDeleting: teamManagement
      ? teamManagement.bulkDeleteState.status === "pending"
      : isDeleting,
    failedInvitations: teamManagement
      ? teamManagement.failedInvitations
      : failedInvitations,
  }
}
