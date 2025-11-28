"use client";

import InvitedUsersSection from "./InvitedUsersSection";
import TeamMembersSection from "./TeamMembersSection";

export default function UsersSections() {
  return (
    <div className="border border-border rounded-[0.74rem] p-[1.6rem]">
      <InvitedUsersSection />
      <TeamMembersSection />
    </div>
  );
}