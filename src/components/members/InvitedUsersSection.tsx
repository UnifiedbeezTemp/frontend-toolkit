"use client"

import { useEffect } from "react"
import { useAppSelector } from "../../store/hooks/useRedux"
import {
  selectFilteredInvitedUsers,
  selectSelectedInvitedCount,
} from "../../store/onboarding/slices/membersSlice"
import Heading from "../ui/Heading"
import SearchAndFilter from "./SearchAndFilter"
import UserList from "./UserList"
import MembersSkeleton from "./MembersSkeleton"
import ErrorState from "./ErrorState"
import EmptyState from "./EmptyState"
import { useInvitedBulkActions } from "./hooks/useInvitedBulkActions"
import { InvitedBulkActions } from "./components/InvitedBulkActions"
import { ApiRole } from "../../types/api/memberTypes"
import { useOptionalTeamManagementContext } from "./context/TeamManagementContext"
import { InvitationFailure, UserInvitePayload } from "./types/teamManagement"

interface InvitedUsersSectionProps {
  isLoading?: boolean
  error?: unknown
  onRetry?: () => void
  onSendInvite?: (
    payload: UserInvitePayload | UserInvitePayload[],
  ) => void | Promise<void>
  isSendingInvite?: boolean | ((invitationId: string) => boolean)
  roles?: ApiRole[]
  onFailedInvitationsChange?: (
    failures: InvitationFailure[],
  ) => void
}

export default function InvitedUsersSection({
  isLoading = false,
  error,
  onRetry,
  onSendInvite,
  isSendingInvite,
  roles = [],
  onFailedInvitationsChange,
}: InvitedUsersSectionProps) {
  const teamManagement = useOptionalTeamManagementContext()
  const invitedUsers = useAppSelector(selectFilteredInvitedUsers)
  const selectedCount = useAppSelector(selectSelectedInvitedCount)
  const isDraftFilter = useAppSelector(
    (state) => state.members.statusFilterInvited === "draft",
  )
  const resolvedRoles = teamManagement?.roles ?? roles
  const resolvedIsLoading =
    teamManagement?.isLoadingInvitations ?? isLoading
  const resolvedError = teamManagement?.invitationsError ?? error
  const resolvedRetry = teamManagement?.refetchInvitations ?? onRetry
  const bulkSendState = teamManagement?.bulkSendState
  const {
    selectAll,
    clearSelection,
    assignRole,
    bulkSend,
    isSending,
    failedInvitations,
  } = useInvitedBulkActions({ roles: resolvedRoles, enable: isDraftFilter })

  useEffect(() => {
    if (onFailedInvitationsChange) {
      onFailedInvitationsChange(failedInvitations)
    }
  }, [failedInvitations, onFailedInvitationsChange])

  return (
    <div className="border-border pb-[2.4rem] border-b">
      <Heading>Invited users</Heading>

      <SearchAndFilter section="invited" />

      <div className="space-y-[1.6rem]">
        <InvitedBulkActions
          selectedCount={selectedCount}
          total={invitedUsers.length}
          hasFilter={isDraftFilter}
          onSelectAll={selectAll}
          onClear={clearSelection}
          onAssignRole={assignRole}
          onBulkSend={bulkSend}
          isSending={isSending}
        />

        {bulkSendState && bulkSendState.status !== "idle" && bulkSendState.message && (
          <p
            className={`text-[1.4rem] ${
              bulkSendState.status === "error"
                ? "text-destructive"
                : bulkSendState.status === "success"
                  ? "text-brand-primary"
                  : "text-secondary"
            }`}
          >
            {bulkSendState.message}
          </p>
        )}

        {failedInvitations.length > 0 && (
          <div className="space-y-[0.6rem]">
            {failedInvitations.map((failure) => (
              <p key={`${failure.email}-${failure.error}`} className="text-[1.4rem] text-destructive">
                <span className="font-[700]">{failure.email}:</span> {failure.error}
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
            onSendInvite={teamManagement?.handleSendInviteToAddedEmail ?? onSendInvite}
            isSendingInvite={isSendingInvite}
            allowSelection={isDraftFilter}
          />
        )}
      </div>
    </div>
  )
}
