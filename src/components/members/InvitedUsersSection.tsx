"use client"

import { useCallback } from "react"
import { useAppSelector } from "../../store/hooks/useRedux"
import { selectFilteredInvitedUsers } from "../../store/onboarding/slices/membersSlice"
import Heading from "../ui/Heading"
import SearchAndFilter from "./SearchAndFilter"
import UserList from "./UserList"
import MembersSkeleton from "./MembersSkeleton"
import ErrorState from "./ErrorState"
import EmptyState from "./EmptyState"
import { useInvitedBulkActions } from "./hooks/useInvitedBulkActions"
import { useInlineFeedbackDismiss } from "./hooks/useInlineFeedbackDismiss"
import { InvitedBulkActions } from "./components/InvitedBulkActions"
import { ApiRole } from "../../types/api/memberTypes"
import { useOptionalTeamManagementContext } from "./context/TeamManagementContext"
import { UserInvitePayload } from "./types/teamManagement"

interface InvitedUsersSectionProps {
  isLoading?: boolean
  error?: unknown
  onRetry?: () => void
  onSendInvite?: (
    payload: UserInvitePayload | UserInvitePayload[],
  ) => void | Promise<void>
  isSendingInvite?: boolean | ((invitationId: string) => boolean)
  roles?: ApiRole[]
}

export default function InvitedUsersSection({
  isLoading = false,
  error,
  onRetry,
  onSendInvite,
  isSendingInvite,
  roles = [],
}: InvitedUsersSectionProps) {
  const teamManagement = useOptionalTeamManagementContext()
  const invitedUsers = useAppSelector(selectFilteredInvitedUsers)
  const invitedBulkMode = useAppSelector((state) => {
    const statusFilter = state.members.statusFilterInvited

    return statusFilter === "draft" || statusFilter === "cancelled"
      ? statusFilter
      : null
  })
  const selectedCount = invitedUsers.filter((user) => user.isSelected).length
  const allowSelection = invitedBulkMode !== null
  const bulkActionState =
    invitedBulkMode === "cancelled"
      ? teamManagement?.bulkReAddState
      : teamManagement?.bulkSendState
  const resolvedRoles = teamManagement?.roles ?? roles
  const resolvedIsLoading = teamManagement?.isLoadingInvitations ?? isLoading
  const resolvedError = teamManagement?.invitationsError ?? error
  const resolvedRetry = teamManagement?.refetchInvitations ?? onRetry
  const {
    selectAll,
    clearSelection,
    assignRole,
    bulkSend,
    bulkResend,
    isAssigningRole,
    isSending,
    isReAdding,
    failedInvitations,
    clearFeedback,
  } = useInvitedBulkActions({ roles: resolvedRoles, mode: invitedBulkMode })
  const inlineBulkActionState =
    bulkActionState &&
    bulkActionState.status !== "idle" &&
    bulkActionState.message
      ? bulkActionState
      : null
  const hasInlineFeedback =
    Boolean(inlineBulkActionState) || failedInvitations.length > 0
  const clearInlineFeedback = useCallback(() => {
    clearFeedback()
  }, [clearFeedback])
  const dismissInlineFeedbackProps = useInlineFeedbackDismiss({
    enabled: hasInlineFeedback,
    onClear: clearInlineFeedback,
  })

  return (
    <div className="border-border pb-[2.4rem] border-b">
      <Heading>Invited users</Heading>

      <SearchAndFilter section="invited" />

      <div className="space-y-[1.6rem]" {...dismissInlineFeedbackProps}>
        <InvitedBulkActions
          mode={invitedBulkMode}
          selectedCount={selectedCount}
          total={invitedUsers.length}
          onSelectAll={selectAll}
          onClear={clearSelection}
          onAssignRole={assignRole}
          onBulkSend={bulkSend}
          onBulkResend={bulkResend}
          isAssigningRole={isAssigningRole}
          isSending={isSending}
          isReAdding={isReAdding}
        />

        {inlineBulkActionState && (
          <p
            className={`text-[1.4rem] ${
              inlineBulkActionState.status === "error"
                ? "text-destructive"
                : inlineBulkActionState.status === "success"
                  ? "text-brand-primary"
                  : "text-secondary"
            }`}
          >
            {inlineBulkActionState.message}
          </p>
        )}

        {failedInvitations.length > 0 && (
          <div className="space-y-[0.6rem]">
            {failedInvitations.map((failure) => (
              <p
                key={`${failure.email}-${failure.error}`}
                className="text-[1.4rem] text-destructive"
              >
                <span className="font-[700]">{failure.email}:</span>{" "}
                {failure.error}
              </p>
            ))}
          </div>
        )}

        {resolvedIsLoading ? (
          <MembersSkeleton />
        ) : resolvedError ? (
          <ErrorState
            type="invitations"
            message={
              resolvedError instanceof Error
                ? resolvedError.message
                : "Failed to load invitations"
            }
            onRetry={resolvedRetry || (() => {})}
          />
        ) : invitedUsers.length === 0 ? (
          <EmptyState type="invitations" />
        ) : (
          <UserList
            users={invitedUsers}
            type="invited"
            onSendInvite={
              teamManagement?.handleSendInviteToAddedEmail ?? onSendInvite
            }
            isSendingInvite={isSendingInvite}
            allowSelection={allowSelection}
          />
        )}
      </div>
    </div>
  )
}
