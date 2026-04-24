import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { api } from "../../../api"
import { useToast } from "../../../components/ui/toast/useToast"
import useSession from "../../../providers/hooks/useSession"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux"
import {
  removeMember,
  selectFilteredInvitedUsers,
  selectSelectedInvitedUsers,
  setEmailInput,
  setInvitedSelection,
  updateMembers,
  setSelectedRole,
  setStatusFilterInvited,
  toggleMemberSelection,
  updateInvitedUserRole,
  updateInvitedUserRoleBulk,
  updateInvitedUserRoleId,
  updateMemberRole,
  upsertInvitedUsers,
} from "../../../store/onboarding/slices/membersSlice"
import { TeamMember } from "../../../store/onboarding/types/memberTypes"
import { ApiInvitation, ApiRole } from "../../../types/api/memberTypes"
import { extractErrorMessage } from "../../../utils/extractErrorMessage"
import {
  transformApiInvitationToTeamMember,
  tryTransformApiInvitationToTeamMember,
} from "../utils/transformers"
import { useTeamInvitations } from "./useTeamInvitations"
import { useTeamMembers } from "./useTeamMembers"
import {
  useTeamRoles,
  useUpdateInvitationRole,
  useUpdateInvitationRolesBulk,
} from "./useTeamRoles"
import {
  AsyncActionState,
  createIdleAsyncActionState,
  createIdleUserActionStates,
  DispatchInvitationPayload,
  InvitationFailure,
  SendInvitationPayload,
  TeamManagementController,
  TeamManagementTab,
  UserActionKey,
  UserActionStates,
} from "../types/teamManagement"

const MEMBERS_QUERY_KEY = ["members"] as const
const INVITATIONS_QUERY_KEY = ["invitations"] as const

interface ApiInvitationFailure {
  email?: string
  error?: string
}

interface BulkInvitationResponse {
  message?: string
  successful?: ApiInvitation[]
  failed?: ApiInvitationFailure[]
  summary?: {
    total?: number
    successful?: number
    failed?: number
  }
}

interface DispatchInvitationsResponse {
  message?: string
  dispatched?: ApiInvitation[]
  failed?: ApiInvitationFailure[]
  missing?: ApiInvitationFailure[]
  summary?: {
    requested?: number
    found?: number
    missing?: number
    dispatched?: number
    failed?: number
  }
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const uniqueEmails = (emails: string[]) => {
  const seen = new Set<string>()

  return emails.filter((email) => {
    const normalizedEmail = email.toLowerCase()

    if (seen.has(normalizedEmail)) {
      return false
    }

    seen.add(normalizedEmail)
    return true
  })
}

const normalizeInvitationFailures = (
  failures: ApiInvitationFailure[] | undefined,
  fallbackMessage: string,
): InvitationFailure[] =>
  (failures ?? []).map((failure) => ({
    email: failure.email ?? "Unknown email",
    error: failure.error ?? fallbackMessage,
  }))

const buildDraftSuccessMessage = (
  createdCount: number,
  skippedCount: number,
): string => {
  const draftLabel =
    createdCount === 1 ? "draft invitation" : "draft invitations"
  const skippedMessage =
    skippedCount > 0
      ? ` Skipped ${skippedCount} email${skippedCount === 1 ? "" : "s"} that ${skippedCount === 1 ? "is" : "are"} already in progress.`
      : ""

  return `Added ${createdCount} ${draftLabel}.${skippedMessage}`
}

const getFallbackRole = (roles: ApiRole[], selectedRole: string) =>
  roles.find((role) => role.type === selectedRole) ??
  roles.find((role) => role.isDefault) ??
  roles[0]

const isSelectableInvitedStatus = (statusFilter: string | null) =>
  statusFilter === "draft" || statusFilter === "cancelled"

const getBulkCount = (
  summaryCount: number | undefined,
  items: Array<unknown> | undefined,
) => summaryCount ?? items?.length ?? 0

export const useTeamManagement = (): TeamManagementController => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { data: currentUser } = useSession()

  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<TeamManagementTab>("invited")
  const [failedInvitations, setFailedInvitations] = useState<
    InvitationFailure[]
  >([])
  const [addDraftState, setAddDraftState] = useState<AsyncActionState>(
    createIdleAsyncActionState(),
  )
  const [bulkSendState, setBulkSendState] = useState<AsyncActionState>(
    createIdleAsyncActionState(),
  )
  const [bulkReAddState, setBulkReAddState] = useState<AsyncActionState>(
    createIdleAsyncActionState(),
  )
  const [legacySendingInvitationIds, setLegacySendingInvitationIds] = useState<
    string[]
  >([])
  const [dispatchingInvitationIds, setDispatchingInvitationIds] = useState<
    string[]
  >([])
  const [userActionStates, setUserActionStates] = useState<
    Record<string, UserActionStates>
  >({})

  const {
    invitedUsers,
    members,
    emailInput,
    selectedRole,
    roles,
    statusFilterInvited,
  } = useAppSelector((state) => state.members)
  const filteredInvitedUsers = useAppSelector(selectFilteredInvitedUsers)
  const selectedInvitedUsers = useAppSelector(selectSelectedInvitedUsers)

  const hasDraftedUsers = invitedUsers.some((user) => user.status === "draft")

  const { isLoadingMembers, membersError, refetchMembers } = useTeamMembers()
  const { isLoadingInvitations, invitationsError, refetchInvitations } =
    useTeamInvitations()
  const { isLoadingRoles, rolesError, refetchRoles } = useTeamRoles()
  const { mutateAsync: updateInvitationRole } = useUpdateInvitationRole()
  const { mutateAsync: updateInvitationRolesBulk } =
    useUpdateInvitationRolesBulk()

  const updateUserActionState = useCallback(
    (userId: string, action: UserActionKey, nextState: AsyncActionState) => {
      setUserActionStates((currentStates) => ({
        ...currentStates,
        [userId]: {
          ...(currentStates[userId] ?? createIdleUserActionStates()),
          [action]: nextState,
        },
      }))
    },
    [],
  )

  const clearUserActionError = useCallback(
    (userId: string, action?: UserActionKey) => {
      setUserActionStates((currentStates) => {
        const existingState = currentStates[userId]

        if (!existingState) {
          return currentStates
        }

        if (!action) {
          const nextStates = { ...currentStates }
          delete nextStates[userId]
          return nextStates
        }

        return {
          ...currentStates,
          [userId]: {
            ...existingState,
            [action]: createIdleAsyncActionState(),
          },
        }
      })
    },
    [],
  )

  const getUserActionState = useCallback(
    (userId: string) =>
      userActionStates[userId] ?? createIdleUserActionStates(),
    [userActionStates],
  )

  const invalidateInvitations = useCallback(
    () => queryClient.invalidateQueries({ queryKey: INVITATIONS_QUERY_KEY }),
    [queryClient],
  )

  const invalidateMembers = useCallback(
    () => queryClient.invalidateQueries({ queryKey: MEMBERS_QUERY_KEY }),
    [queryClient],
  )

  const resetInlineStatuses = useCallback(() => {
    setError("")
    setAddDraftState(createIdleAsyncActionState())
    setBulkSendState(createIdleAsyncActionState())
    setBulkReAddState(createIdleAsyncActionState())
    setFailedInvitations([])
  }, [])

  const resolveInvitationRoleId = useCallback(
    (user: Pick<TeamMember, "role" | "roleId">) =>
      user.roleId ??
      roles.find((role) => role.type === user.role)?.id ??
      getFallbackRole(roles, selectedRole)?.id ??
      0,
    [roles, selectedRole],
  )

  const createDraftInvitations = useCallback(
    async (invitations: Array<{ email: string; roleId: number }>) =>
      api.post<
        { invitations: Array<{ email: string; roleId: number }> },
        BulkInvitationResponse
      >("/invitations/bulk?addOnly=true", {
        invitations,
      }),
    [],
  )

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setEmailInput(event.target.value))
      if (error) {
        setError("")
      }
      if (addDraftState.status !== "idle") {
        setAddDraftState(createIdleAsyncActionState())
      }
    },
    [addDraftState.status, dispatch, error],
  )

  const handleRoleSelect = useCallback(
    (role: string) => {
      dispatch(setSelectedRole(role))
    },
    [dispatch],
  )

  const handleTabClick = useCallback((tab: TeamManagementTab) => {
    setActiveTab(tab)
  }, [])

  const handleToggleSelection = useCallback(
    (type: "invited" | "members", userId: string) => {
      if (
        type === "invited" &&
        !isSelectableInvitedStatus(statusFilterInvited)
      ) {
        return
      }

      dispatch(toggleMemberSelection(userId))
    },
    [dispatch, statusFilterInvited],
  )

  const handleAddInvite = useCallback(async () => {
    if (addDraftState.status === "pending") {
      return
    }

    const fallbackRole = getFallbackRole(roles, selectedRole)

    if (!fallbackRole) {
      setError("Roles are still loading. Please try again.")
      return
    }

    if (!emailInput.trim()) {
      setError("Please enter email addresses")
      return
    }

    const parsedEmails = uniqueEmails(
      emailInput
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    )

    if (parsedEmails.length === 0) {
      setError("Please enter valid email addresses")
      return
    }

    const invalidEmails = parsedEmails.filter((email) => !validateEmail(email))

    if (invalidEmails.length > 0) {
      setError(`Invalid email addresses: ${invalidEmails.join(", ")}`)
      return
    }

    const currentUserEmail = currentUser?.email?.toLowerCase()
    const existingEmails = new Set(
      [...members, ...invitedUsers].map((user) => user.email.toLowerCase()),
    )

    const selfInvites = parsedEmails.filter(
      (email) => email.toLowerCase() === currentUserEmail,
    )
    const duplicateEmails = parsedEmails.filter((email) =>
      existingEmails.has(email.toLowerCase()),
    )
    const emailsToCreate = parsedEmails.filter(
      (email) => email.toLowerCase() !== currentUserEmail,
    )

    if (emailsToCreate.length === 0) {
      if (selfInvites.length > 0) {
        setError("You cannot invite yourself")
        return
      }
    }

    setError("")
    resetInlineStatuses()
    setAddDraftState({
      status: "pending",
      message:
        emailsToCreate.length === 1
          ? "Adding draft invitation..."
          : `Adding ${emailsToCreate.length} draft invitations...`,
    })

    try {
      const response = await createDraftInvitations(
        emailsToCreate.map((email) => ({
          email,
          roleId: fallbackRole.id,
        })),
      )

      const successfulInvitations = (response.successful ?? []).flatMap(
        (invitation) => {
          const transformedInvitation =
            tryTransformApiInvitationToTeamMember(invitation)

          return transformedInvitation ? [transformedInvitation] : []
        },
      )
      const skippedCount = selfInvites.length + duplicateEmails.length
      const successfulCount =
        response.summary?.successful ??
        response.successful?.length ??
        successfulInvitations.length
      const failureCount = response.failed?.length ?? 0

      if (successfulInvitations.length > 0) {
        dispatch(upsertInvitedUsers(successfulInvitations))
      }

      dispatch(setEmailInput(""))
      setFailedInvitations(
        normalizeInvitationFailures(response.failed, "Unable to add draft"),
      )
      setAddDraftState({
        status: successfulCount > 0 ? "success" : "error",
        message:
          successfulCount > 0
            ? buildDraftSuccessMessage(successfulCount, skippedCount)
            : (response.message ?? "No draft invitations were added."),
      })

      if (successfulCount > 0) {
        showToast({
          title: "Drafts added",
          description: buildDraftSuccessMessage(successfulCount, skippedCount),
          variant: failureCount > 0 ? "warning" : "success",
        })
      }

      if (selfInvites.length > 0) {
        showToast({
          title: "Skipped your email",
          description: "You cannot invite yourself.",
          variant: "warning",
        })
      }

      if (failureCount > 0) {
        showToast({
          title: response.message ?? "Some drafts could not be added",
          description: `${failureCount} email${
            failureCount === 1 ? "" : "s"
          } could not be added.`,
          variant: "warning",
        })
      }

      await invalidateInvitations()
    } catch (requestError) {
      const message = extractErrorMessage(
        requestError,
        "Failed to add draft invitations",
      )

      setAddDraftState({
        status: "error",
        message,
      })
      showToast({
        title: "Failed to add drafts",
        description: message,
        variant: "error",
      })
    }
  }, [
    addDraftState.status,
    currentUser?.email,
    dispatch,
    emailInput,
    invitedUsers,
    invalidateInvitations,
    members,
    resetInlineStatuses,
    roles,
    selectedRole,
    showToast,
    createDraftInvitations,
  ])

  const handleSendInvitation = useCallback(
    async (
      payload: SendInvitationPayload | SendInvitationPayload[],
      addOnly = false,
    ) => {
      const invitations = Array.isArray(payload) ? payload : [payload]

      if (invitations.length === 0) {
        return
      }

      setLegacySendingInvitationIds((currentIds) => [
        ...new Set([
          ...currentIds,
          ...invitations.map((invitation) => invitation.invitationId),
        ]),
      ])

      try {
        if (addOnly) {
          const response = await createDraftInvitations(
            invitations.map((invitation) => ({
              email: invitation.email,
              roleId: invitation.roleId,
            })),
          )

          const successfulInvitations = (response.successful ?? []).flatMap(
            (invitation) => {
              const transformedInvitation =
                tryTransformApiInvitationToTeamMember(invitation)

              return transformedInvitation ? [transformedInvitation] : []
            },
          )

          if (successfulInvitations.length > 0) {
            dispatch(upsertInvitedUsers(successfulInvitations))
          }

          await invalidateInvitations()
          return
        }

        if (invitations.length === 1) {
          await api.post<
            { email: string; roleId: number; message: string },
            ApiInvitation
          >("/invitations", {
            email: invitations[0].email,
            roleId: invitations[0].roleId,
            message:
              "You have been invited to join an organisation on UnifiedBeez",
          })
        } else {
          await api.post<
            {
              invitations: Array<{
                email: string
                roleId: number
                message: string
              }>
            },
            BulkInvitationResponse
          >("/invitations/bulk", {
            invitations: invitations.map((invitation) => ({
              email: invitation.email,
              roleId: invitation.roleId,
              message:
                "You have been invited to join an organisation on UnifiedBeez",
            })),
          })
        }

        showToast({
          title: "Invitation sent",
          description:
            invitations.length === 1
              ? `Invited ${invitations[0].email}`
              : `Sent ${invitations.length} invitations.`,
          variant: "success",
        })
        await invalidateInvitations()
      } catch (requestError) {
        const message = extractErrorMessage(
          requestError,
          "Failed to send invitation",
        )

        showToast({
          title: "Failed to send invitation",
          description: message,
          variant: "error",
        })
      } finally {
        setLegacySendingInvitationIds((currentIds) =>
          currentIds.filter(
            (invitationId) =>
              !invitations.some(
                (invitation) => invitation.invitationId === invitationId,
              ),
          ),
        )
      }
    },
    [createDraftInvitations, dispatch, invalidateInvitations, showToast],
  )

  const handleSendInviteToAddedEmail = useCallback(
    async (
      payload: DispatchInvitationPayload | DispatchInvitationPayload[],
    ) => {
      const invitations = Array.isArray(payload) ? payload : [payload]

      if (invitations.length === 0) {
        return
      }

      const currentInvitationsById = new Map(
        invitedUsers.map((user) => [user.id, user] as const),
      )

      setDispatchingInvitationIds((currentIds) => [
        ...new Set([
          ...currentIds,
          ...invitations.map((invitation) => invitation.invitationId),
        ]),
      ])

      invitations.forEach((invitation) => {
        updateUserActionState(invitation.invitationId, "sendInvite", {
          status: "pending",
          message: "Sending invite...",
        })
      })

      if (invitations.length > 1) {
        setBulkSendState({
          status: "pending",
          message: `Sending ${invitations.length} invites...`,
        })
        setFailedInvitations([])
      }

      try {
        const response = await api.post<
          {
            invitations: Array<{ invitationId: string; roleId: number }>
          },
          DispatchInvitationsResponse
        >("/invitations/dispatch", {
          invitations: invitations.map((invitation) => ({
            invitationId: invitation.invitationId,
            roleId: invitation.roleId,
          })),
        })

        const dispatchedInvitations = (response.dispatched ?? []).map(
          transformApiInvitationToTeamMember,
        )
        dispatch(updateMembers(dispatchedInvitations))
        const dispatchedIds = dispatchedInvitations.map(
          (invitation) => invitation.id,
        )
        const failedResults = [
          ...normalizeInvitationFailures(
            response.failed,
            "Failed to send invite",
          ),
          ...normalizeInvitationFailures(
            response.missing,
            "Draft invitation not found",
          ),
        ]
        const failedEmails = new Set(
          failedResults.map((failure) => failure.email.toLowerCase()),
        )

        if (dispatchedInvitations.length > 0) {
          dispatch(upsertInvitedUsers(dispatchedInvitations))
          dispatch(
            setInvitedSelection({
              ids: dispatchedIds,
              selected: false,
            }),
          )
        }

        invitations.forEach((invitation) => {
          const user = currentInvitationsById.get(invitation.invitationId)
          const wasSuccessful =
            user?.email && !failedEmails.has(user.email.toLowerCase())

          updateUserActionState(invitation.invitationId, "sendInvite", {
            status: wasSuccessful ? "success" : "error",
            message: wasSuccessful
              ? "Invite sent"
              : (failedResults.find(
                  (failure) =>
                    failure.email.toLowerCase() === user?.email?.toLowerCase(),
                )?.error ?? "Failed to send invite"),
          })
        })

        if (invitations.length > 1) {
          setFailedInvitations(failedResults)
          setBulkSendState({
            status: failedResults.length > 0 ? "error" : "success",
            message:
              failedResults.length > 0
                ? `${dispatchedInvitations.length} sent, ${failedResults.length} failed.`
                : `${dispatchedInvitations.length} invite${
                    dispatchedInvitations.length === 1 ? "" : "s"
                  } sent.`,
          })
          dispatch(setStatusFilterInvited(null))
        }

        if (dispatchedInvitations.length > 0) {
          const dispatchedEmails = dispatchedInvitations
            .map((invitation) => invitation.email)
            .join(", ")

          showToast({
            title:
              invitations.length > 1 ? "Invitations sent" : "Invitation sent",
            description:
              invitations.length > 1
                ? `${dispatchedInvitations.length} invite${
                    dispatchedInvitations.length === 1 ? "" : "s"
                  } sent.`
                : `Invited ${dispatchedEmails}`,
            variant: failedResults.length > 0 ? "warning" : "success",
          })
        }

        if (failedResults.length > 0 && dispatchedInvitations.length === 0) {
          showToast({
            title: response.message ?? "Failed to send invitations",
            description: failedResults
              .map((failure) => `${failure.email}: ${failure.error}`)
              .join(", "),
            variant: "error",
          })
        }

        await invalidateInvitations()
      } catch (requestError) {
        const message = extractErrorMessage(
          requestError,
          "Failed to send invitation",
        )

        invitations.forEach((invitation) => {
          updateUserActionState(invitation.invitationId, "sendInvite", {
            status: "error",
            message,
          })
        })

        if (invitations.length > 1) {
          setBulkSendState({
            status: "error",
            message,
          })
        }

        showToast({
          title: "Failed to send invitation",
          description: message,
          variant: "error",
        })
      } finally {
        setDispatchingInvitationIds((currentIds) =>
          currentIds.filter(
            (currentId) =>
              !invitations.some(
                (invitation) => invitation.invitationId === currentId,
              ),
          ),
        )
      }
    },
    [
      dispatch,
      invalidateInvitations,
      invitedUsers,
      showToast,
      updateUserActionState,
    ],
  )

  const handleSendDraftInvite = useCallback(
    async (user: TeamMember) => {
      const roleId = resolveInvitationRoleId(user)

      if (!roleId) {
        updateUserActionState(user.id, "sendInvite", {
          status: "error",
          message: "Select a role before sending the invite.",
        })
        return
      }

      await handleSendInviteToAddedEmail({
        invitationId: user.id,
        roleId,
      })
    },
    [
      handleSendInviteToAddedEmail,
      resolveInvitationRoleId,
      updateUserActionState,
    ],
  )

  const handleReAddCancelledInvitation = useCallback(
    async (user: TeamMember) => {
      if (user.status !== "cancelled") {
        return
      }

      const roleId = resolveInvitationRoleId(user)

      if (!roleId) {
        updateUserActionState(user.id, "sendInvite", {
          status: "error",
          message: "Select a role before re-adding the invite.",
        })
        return
      }

      updateUserActionState(user.id, "sendInvite", {
        status: "pending",
        message: "Re-adding invitation as draft...",
      })

      try {
        const response = await createDraftInvitations([
          {
            email: user.email,
            roleId,
          },
        ])
        const failedResult = normalizeInvitationFailures(
          response.failed,
          "Failed to re-add invitation",
        )[0]
        const successfulCount = getBulkCount(
          response.summary?.successful,
          response.successful,
        )

        if (failedResult) {
          updateUserActionState(user.id, "sendInvite", {
            status: "error",
            message: failedResult.error,
          })
          showToast({
            title: response.message ?? "Failed to re-add invitation",
            description: failedResult.error,
            variant: "error",
          })
          return
        }

        const successfulInvitations = (response.successful ?? []).flatMap(
          (invitation) => {
            const transformedInvitation =
              tryTransformApiInvitationToTeamMember(invitation)

            return transformedInvitation ? [transformedInvitation] : []
          },
        )

        if (successfulInvitations.length > 0) {
          dispatch(upsertInvitedUsers(successfulInvitations))
          dispatch(
            setInvitedSelection({
              ids: [user.id],
              selected: false,
            }),
          )
        }

        updateUserActionState(user.id, "sendInvite", {
          status: "success",
          message: "Invitation re-added as draft",
        })

        showToast({
          title: response.message ?? "Invitation re-added",
          description: `Re-added ${user.email} as draft${
            successfulCount === 1 ? "" : "s"
          }.`,
          variant: "success",
        })

        await invalidateInvitations()
      } catch (requestError) {
        const message = extractErrorMessage(
          requestError,
          "Failed to re-add invitation",
        )

        updateUserActionState(user.id, "sendInvite", {
          status: "error",
          message,
        })
        showToast({
          title: "Failed to re-add invitation",
          description: message,
          variant: "error",
        })
      }
    },
    [
      createDraftInvitations,
      dispatch,
      invalidateInvitations,
      resolveInvitationRoleId,
      showToast,
      updateUserActionState,
    ],
  )

  const handleRemoveUser = useCallback(
    async (user: TeamMember, type: "invited" | "members") => {
      if (type !== "members" && user.status === "cancelled") {
        updateUserActionState(user.id, "remove", {
          status: "error",
          message: "Cancelled invitations can be re-added instead.",
        })
        return
      }

      updateUserActionState(user.id, "remove", {
        status: "pending",
        message:
          type === "members" || user.status === "accepted"
            ? "Removing team member..."
            : "Cancelling invitation...",
      })

      try {
        if (type === "members" || user.status === "accepted") {
          await api.delete(`/team/members/${user.id}`)
          dispatch(removeMember(user.id))
          showToast({
            title: "Team member removed",
            description: `${user.email} was removed.`,
            variant: "success",
          })
          await Promise.all([invalidateMembers(), invalidateInvitations()])
        } else {
          await api.delete(`/invitations/${user.id}`)
          showToast({
            title: "Invitation removed",
            description: `${user.email} was removed from invitations.`,
            variant: "success",
          })
          await invalidateInvitations()
        }

        updateUserActionState(user.id, "remove", createIdleAsyncActionState())
      } catch (requestError) {
        const message = extractErrorMessage(
          requestError,
          type === "members"
            ? "Failed to remove team member"
            : "Failed to cancel invitation",
        )

        updateUserActionState(user.id, "remove", {
          status: "error",
          message,
        })
        showToast({
          title:
            type === "members"
              ? "Failed to remove team member"
              : "Failed to cancel invitation",
          description: message,
          variant: "error",
        })
      }
    },
    [
      dispatch,
      invalidateInvitations,
      invalidateMembers,
      showToast,
      updateUserActionState,
    ],
  )

  const handleRoleChange = useCallback(
    async (user: TeamMember, type: "invited" | "members", role: string) => {
      const roleOption =
        roles.find((availableRole) => availableRole.type === role) ??
        getFallbackRole(roles, role)

      if (!roleOption) {
        updateUserActionState(user.id, "assignRole", {
          status: "error",
          message: "Role is unavailable. Please refresh and try again.",
        })
        return
      }

      updateUserActionState(user.id, "assignRole", {
        status: "pending",
        message: "Saving role...",
      })

      try {
        if (type === "members") {
          await api.post("/team/assign-role", {
            userId: user.id,
            roleId: roleOption.id,
          })

          dispatch(updateMemberRole({ id: user.id, role: roleOption.type }))
          await invalidateMembers()
        } else {
          await updateInvitationRole({
            invitationId: user.id,
            roleId: roleOption.id,
          })

          dispatch(
            updateInvitedUserRole({ id: user.id, role: roleOption.type }),
          )
          dispatch(
            updateInvitedUserRoleId({ id: user.id, roleId: roleOption.id }),
          )
          await invalidateInvitations()
        }

        updateUserActionState(
          user.id,
          "assignRole",
          createIdleAsyncActionState(),
        )
      } catch (requestError) {
        const message = extractErrorMessage(
          requestError,
          "Failed to update role",
        )

        updateUserActionState(user.id, "assignRole", {
          status: "error",
          message,
        })
        showToast({
          title: "Failed to update role",
          description: message,
          variant: "error",
        })
      }
    },
    [
      dispatch,
      invalidateInvitations,
      invalidateMembers,
      roles,
      showToast,
      updateInvitationRole,
      updateUserActionState,
    ],
  )

  const selectAllDraftInvites = useCallback(() => {
    if (!isSelectableInvitedStatus(statusFilterInvited)) {
      return
    }

    dispatch(
      setInvitedSelection({
        ids: filteredInvitedUsers.map((user) => user.id),
        selected: true,
      }),
    )
  }, [dispatch, filteredInvitedUsers, statusFilterInvited])

  const clearDraftInviteSelection = useCallback(() => {
    if (!isSelectableInvitedStatus(statusFilterInvited)) {
      return
    }

    dispatch(
      setInvitedSelection({
        ids: filteredInvitedUsers.map((user) => user.id),
        selected: false,
      }),
    )
  }, [dispatch, filteredInvitedUsers, statusFilterInvited])

  const assignRoleToSelectedDrafts = useCallback(
    async (roleId: number) => {
      if (
        statusFilterInvited !== "draft" ||
        selectedInvitedUsers.length === 0
      ) {
        return
      }

      const selectedDraftInvitations = selectedInvitedUsers.filter(
        (user) => user.status === "draft",
      )
      const selectedRoleOption = roles.find((role) => role.id === roleId)

      if (!selectedRoleOption || selectedDraftInvitations.length === 0) {
        return
      }

      selectedDraftInvitations.forEach((user) => {
        updateUserActionState(user.id, "assignRole", {
          status: "pending",
          message: "Saving role...",
        })
      })

      try {
        const response = await updateInvitationRolesBulk({
          invitations: selectedDraftInvitations.map((user) => ({
            id: user.id,
            roleId: selectedRoleOption.id,
          })),
        })
        const failedById = new Map(
          (response.failed ?? []).flatMap((failure) =>
            failure.id ? [[failure.id, failure.error] as const] : [],
          ),
        )
        const successfulIds =
          response.successful?.map((invitation) => invitation.id) ?? []
        const successfulCount = getBulkCount(
          response.summary?.successful,
          response.successful,
        )
        const failedCount = getBulkCount(
          response.summary?.failed,
          response.failed,
        )

        if (successfulIds.length > 0) {
          dispatch(
            updateInvitedUserRoleBulk({
              ids: successfulIds,
              role: selectedRoleOption.type,
              roleId: selectedRoleOption.id,
            }),
          )
        }

        setFailedInvitations(
          (response.failed ?? []).map((failure) => ({
            email: failure.email,
            error: failure.error,
          })),
        )

        selectedDraftInvitations.forEach((user) => {
          const errorMessage = failedById.get(user.id)

          updateUserActionState(
            user.id,
            "assignRole",
            errorMessage
              ? {
                  status: "error",
                  message: errorMessage,
                }
              : createIdleAsyncActionState(),
          )
        })

        await invalidateInvitations()

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
      } catch (requestError) {
        const message = extractErrorMessage(
          requestError,
          "Failed to update draft invitation roles",
        )

        selectedDraftInvitations.forEach((user) => {
          updateUserActionState(user.id, "assignRole", {
            status: "error",
            message,
          })
        })

        showToast({
          title: "Failed to update roles",
          description: message,
          variant: "error",
        })
      }
    },
    [
      dispatch,
      invalidateInvitations,
      roles,
      selectedInvitedUsers,
      showToast,
      statusFilterInvited,
      updateInvitationRolesBulk,
      updateUserActionState,
    ],
  )

  const sendSelectedDraftInvites = useCallback(async () => {
    const selectedDraftInvitations = selectedInvitedUsers.filter(
      (user) => user.status === "draft",
    )

    if (selectedDraftInvitations.length === 0) {
      return
    }

    const fallbackRole = getFallbackRole(roles, selectedRole)
    const invitations = selectedDraftInvitations.map((user) => ({
      invitationId: user.id,
      roleId:
        user.roleId ??
        roles.find((role) => role.type === user.role)?.id ??
        fallbackRole?.id ??
        0,
    }))

    await handleSendInviteToAddedEmail(invitations)
  }, [handleSendInviteToAddedEmail, roles, selectedInvitedUsers, selectedRole])

  const reAddSelectedCancelledInvites = useCallback(async () => {
    if (statusFilterInvited !== "cancelled") {
      return
    }

    const selectedCancelledInvitations = selectedInvitedUsers.filter(
      (user) => user.status === "cancelled",
    )

    if (selectedCancelledInvitations.length === 0) {
      return
    }

    const invitationsToReAdd: Array<{
      user: TeamMember
      email: string
      roleId: number
    }> = []
    const validationFailures: InvitationFailure[] = []

    selectedCancelledInvitations.forEach((user) => {
      const roleId = resolveInvitationRoleId(user)

      if (!roleId) {
        const error = "Select a role before re-adding the invite."

        validationFailures.push({
          email: user.email,
          error,
        })
        updateUserActionState(user.id, "sendInvite", {
          status: "error",
          message: error,
        })
        return
      }

      invitationsToReAdd.push({
        user,
        email: user.email,
        roleId,
      })
      updateUserActionState(user.id, "sendInvite", {
        status: "pending",
        message: "Re-adding invitation as draft...",
      })
    })

    setBulkReAddState({
      status: "pending",
      message: `Re-adding ${selectedCancelledInvitations.length} cancelled invitation${
        selectedCancelledInvitations.length === 1 ? "" : "s"
      } as draft${selectedCancelledInvitations.length === 1 ? "" : "s"}...`,
    })
    setFailedInvitations(validationFailures)

    if (invitationsToReAdd.length === 0) {
      setBulkReAddState({
        status: "error",
        message: "Select a role before re-adding these invitations.",
      })
      return
    }

    try {
      const response = await createDraftInvitations(
        invitationsToReAdd.map((invitation) => ({
          email: invitation.email,
          roleId: invitation.roleId,
        })),
      )
      const successfulInvitations = (response.successful ?? []).flatMap(
        (invitation) => {
          const transformedInvitation =
            tryTransformApiInvitationToTeamMember(invitation)

          return transformedInvitation ? [transformedInvitation] : []
        },
      )
      const responseFailures = normalizeInvitationFailures(
        response.failed,
        "Failed to re-add invitation",
      )
      const allFailures = [...validationFailures, ...responseFailures]
      const failedByEmail = new Map(
        allFailures.map(
          (failure) => [failure.email.toLowerCase(), failure.error] as const,
        ),
      )
      const successfulCount = getBulkCount(
        response.summary?.successful,
        response.successful,
      )
      const failedCount =
        getBulkCount(response.summary?.failed, response.failed) +
        validationFailures.length

      if (successfulInvitations.length > 0) {
        dispatch(upsertInvitedUsers(successfulInvitations))
        dispatch(
          setInvitedSelection({
            ids: selectedCancelledInvitations.map((user) => user.id),
            selected: false,
          }),
        )
      }

      setFailedInvitations(allFailures)

      selectedCancelledInvitations.forEach((user) => {
        const errorMessage = failedByEmail.get(user.email.toLowerCase())

        updateUserActionState(
          user.id,
          "sendInvite",
          errorMessage
            ? {
                status: "error",
                message: errorMessage,
              }
            : {
                status: "success",
                message: "Invitation re-added as draft",
              },
        )
      })

      setBulkReAddState({
        status: failedCount > 0 ? "error" : "success",
        message:
          failedCount > 0
            ? `${successfulCount} re-added, ${failedCount} failed.`
            : `Re-added ${successfulCount} cancelled invitation${
                successfulCount === 1 ? "" : "s"
              } as draft${successfulCount === 1 ? "" : "s"}.`,
      })

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

      await invalidateInvitations()
    } catch (requestError) {
      const message = extractErrorMessage(
        requestError,
        "Failed to re-add cancelled invitations",
      )

      invitationsToReAdd.forEach(({ user }) => {
        updateUserActionState(user.id, "sendInvite", {
          status: "error",
          message,
        })
      })

      setBulkReAddState({
        status: "error",
        message,
      })

      showToast({
        title: "Failed to re-add cancelled invitations",
        description: message,
        variant: "error",
      })
    }
  }, [
    createDraftInvitations,
    dispatch,
    invalidateInvitations,
    resolveInvitationRoleId,
    selectedInvitedUsers,
    showToast,
    statusFilterInvited,
    updateUserActionState,
  ])

  const isSendingInvite = useCallback(
    (invitationId: string) => legacySendingInvitationIds.includes(invitationId),
    [legacySendingInvitationIds],
  )

  const isSendingInviteToAddedEmail = useCallback(
    (invitationId: string) => dispatchingInvitationIds.includes(invitationId),
    [dispatchingInvitationIds],
  )

  const isAnySendingInvite = useMemo(
    () =>
      addDraftState.status === "pending" ||
      bulkSendState.status === "pending" ||
      legacySendingInvitationIds.length > 0 ||
      dispatchingInvitationIds.length > 0,
    [
      addDraftState.status,
      bulkSendState.status,
      dispatchingInvitationIds.length,
      legacySendingInvitationIds.length,
    ],
  )

  return {
    activeTab,
    emailInput,
    error,
    selectedRole,
    roles,
    failedInvitations,
    addDraftState,
    bulkSendState,
    bulkReAddState,
    hasDraftedUsers,
    isLoadingMembers,
    isLoadingInvitations,
    isLoadingRoles,
    membersError,
    invitationsError,
    rolesError,
    handleAddInvite,
    handleEmailChange,
    handleRoleSelect,
    handleTabClick,
    refetchMembers,
    refetchInvitations,
    refetchRoles,
    clearInlineStatuses: resetInlineStatuses,
    handleSendInvitation,
    handleSendInviteToAddedEmail,
    isSendingInvite,
    isSendingInviteToAddedEmail,
    isAnySendingInvite,
    getUserActionState,
    clearUserActionError,
    handleRemoveUser,
    handleRoleChange,
    handleToggleSelection,
    handleSendDraftInvite,
    handleReAddCancelledInvitation,
    selectAllDraftInvites,
    clearDraftInviteSelection,
    assignRoleToSelectedDrafts,
    sendSelectedDraftInvites,
    reAddSelectedCancelledInvites,
  }
}
