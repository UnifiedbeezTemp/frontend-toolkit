"use client";

import { TeamMember } from "../../store/onboarding/types/memberTypes";
import UserItem from "./user-item/UserItem";

interface UserListProps {
  users: TeamMember[];
  type: "invited" | "members";
  onSendInvite?: (invitationId: string, email: string, roleId: number) => void;
  isSendingInvite?: (invitationId: string) => boolean;
}

export default function UserList({ 
  users, 
  type, 
  onSendInvite, 
  isSendingInvite,
}: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-text-primary">
        No {type === "invited" ? "invited users" : "team members"} found
      </div>
    );
  }

  return (
    <>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          type={type}
          onSendInvite={onSendInvite}
          isSendingInvite={isSendingInvite?.(user.id)}
        />
      ))}
    </>
  );
}
