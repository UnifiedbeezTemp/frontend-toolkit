"use client";

import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks/useRedux";
import {
  selectFilteredInvitedUsers,
  selectTotalInvitedUsers,
  selectSelectedInvitedCount,
} from "../../store/onboarding/slices/membersSlice";
import Heading from "../ui/Heading";
import SearchAndFilter from "./SearchAndFilter";
import UserList from "./UserList";
import MembersSkeleton from "./MembersSkeleton";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import { useInvitedBulkActions } from "./hooks/useInvitedBulkActions";
import { InvitedBulkActions } from "./components/InvitedBulkActions";
import { ApiRole } from "../../types/api/memberTypes";

interface InvitedUsersSectionProps {
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  onSendInvite?: (invitationId: string, email: string, roleId: number) => void;
  isSendingInvite?: (invitationId: string) => boolean;
  roles?: ApiRole[];
  onFailedInvitationsChange?: (
    failures: Array<{ email: string; error: string }>
  ) => void;
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
  const invitedUsers = useAppSelector(selectFilteredInvitedUsers);
  const totalInvitedUsers = useAppSelector(selectTotalInvitedUsers);
  const selectedCount = useAppSelector(selectSelectedInvitedCount);
  const hasFilter = useAppSelector(
    (state) => state.members.statusFilterInvited !== null
  );
  const isDraftFilter = useAppSelector(
    (state) => state.members.statusFilterInvited === "draft"
  );
  const {
    selectAll,
    clearSelection,
    assignRole,
    bulkSend,
    isSending,
    failedInvitations,
  } = useInvitedBulkActions({ roles, enable: isDraftFilter });

  useEffect(() => {
    if (onFailedInvitationsChange) {
      onFailedInvitationsChange(failedInvitations);
    }
  }, [failedInvitations, onFailedInvitationsChange]);

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

        {isLoading ? (
          <MembersSkeleton />
        ) : error ? (
          <ErrorState
            type="invitations"
            message={
              error instanceof Error
                ? error.message
                : "Failed to load invitations"
            }
            onRetry={onRetry || (() => {})}
          />
        ) : invitedUsers.length === 0 ? (
          <EmptyState type="invitations" />
        ) : (
          <UserList
            users={invitedUsers}
            type="invited"
            onSendInvite={onSendInvite}
            isSendingInvite={isSendingInvite}
            allowSelection={isDraftFilter}
          />
        )}
      </div>
    </div>
  );
}
