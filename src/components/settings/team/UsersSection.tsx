import { useState } from "react";
import { MobileTabs } from "./MobileTabs";
import InvitedUsersSection from "../../members/InvitedUsersSection";
import TeamMembersSection from "../../members/TeamMembersSection";

interface UsersSectionsProps {
  onSendInvite: (invitationId: string, email: string, roleId: number) => void;
  isSendingInvite: (invitationId: string) => boolean;
  isLoadingInvitations: boolean;
  invitationsError: unknown;
  onRetryInvitations: () => void;
  isLoadingMembers: boolean;
  membersError: unknown;
  onRetryMembers: () => void;
  onFailedInvitationsChange?: (
    failures: Array<{ email: string; error: string }>
  ) => void;
}

export default function UsersSections({
  onSendInvite,
  isSendingInvite,
  isLoadingInvitations,
  invitationsError,
  onRetryInvitations,
  isLoadingMembers,
  membersError,
  onRetryMembers,
  onFailedInvitationsChange,
}: UsersSectionsProps) {
  const [activeTab, setActiveTab] = useState<"invited" | "members">("invited");
  return (
    <div className="sm:border border-border rounded-[0.74rem] sm:p-[1.6rem] lg:mt-[2rem] bg-primary">
      <MobileTabs activeTab={activeTab} onTabClick={setActiveTab} />

      <div className="lg:hidden">
        {activeTab === "invited" ? (
          <InvitedUsersSection
            onSendInvite={onSendInvite}
            isSendingInvite={isSendingInvite}
            isLoading={isLoadingInvitations}
            error={invitationsError}
            onRetry={onRetryInvitations}
            onFailedInvitationsChange={onFailedInvitationsChange}
          />
        ) : (
          <TeamMembersSection
            isLoading={isLoadingMembers}
            error={membersError}
            onRetry={onRetryMembers}
          />
        )}
      </div>

      <div className="hidden lg:block space-y-[2.4rem]">
        <InvitedUsersSection
          onSendInvite={onSendInvite}
          isSendingInvite={isSendingInvite}
          isLoading={isLoadingInvitations}
          error={invitationsError}
          onRetry={onRetryInvitations}
          onFailedInvitationsChange={onFailedInvitationsChange}
        />
        <TeamMembersSection
          isLoading={isLoadingMembers}
          error={membersError}
          onRetry={onRetryMembers}
        />
      </div>
    </div>
  );
}
