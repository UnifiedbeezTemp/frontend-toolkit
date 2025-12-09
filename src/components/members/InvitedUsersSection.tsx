"use client";

import { useAppSelector } from "../../store/hooks/useRedux";
import { selectFilteredInvitedUsers, selectTotalInvitedUsers } from "../../store/onboarding/slices/membersSlice";
import Heading from "../ui/Heading";
import SearchAndFilter from "./SearchAndFilter";
import UserList from "./UserList";
import MembersSkeleton from "./MembersSkeleton";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

interface InvitedUsersSectionProps {
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  onSendInvite?: (invitationId: string, email: string, roleId: number) => void;
  isSendingInvite?: (invitationId: string) => boolean;
}

export default function InvitedUsersSection({
  isLoading = false,
  error,
  onRetry,
  onSendInvite,
  isSendingInvite,
}: InvitedUsersSectionProps) {
  const invitedUsers = useAppSelector(selectFilteredInvitedUsers);
  const totalInvitedUsers = useAppSelector(selectTotalInvitedUsers);

  return (
    <div className="border-border pb-[2.4rem] borde">
      <Heading>
        Invited users
      </Heading>

      <SearchAndFilter section="invited" />

      <div className="space-y-[1.6rem]">
        {isLoading ? (
          <MembersSkeleton />
        ) : error ? (
          <ErrorState
            type="invitations"
            message={error instanceof Error ? error.message : "Failed to load invitations"}
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
          />
        )}
      </div>
    </div>
  );
}