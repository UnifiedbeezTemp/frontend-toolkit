"use client";

import { TeamMember } from "../../store/onboarding/slices/membersSlice";
import UserItem from "./UserItem";

interface UserListProps {
  users: TeamMember[];
  type: "invited" | "members";
}

export default function UserList({ users, type }: UserListProps) {
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
        <UserItem key={user.id} user={user} type={type} />
      ))}
    </>
  );
}
