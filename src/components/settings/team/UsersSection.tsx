import { useState } from "react"
import InvitedUsersSection from "../../members/InvitedUsersSection"
import TeamMembersSection from "../../members/TeamMembersSection"
import { InvitationFailure, UserInvitePayload } from "../../members/types/teamManagement"
import { MobileTabs } from "./MobileTabs"

interface UsersSectionsProps {
  onSendInvite?: (
    payload: UserInvitePayload | UserInvitePayload[],
  ) => void | Promise<void>
  isSendingInvite?: boolean | ((invitationId: string) => boolean)
  isLoadingInvitations?: boolean
  invitationsError?: unknown
  onRetryInvitations?: () => void
  isLoadingMembers?: boolean
  membersError?: unknown
  onRetryMembers?: () => void
  onFailedInvitationsChange?: (failures: InvitationFailure[]) => void
}

export default function UsersSections({
  onSendInvite,
  isSendingInvite,
  isLoadingInvitations = false,
  invitationsError,
  onRetryInvitations,
  isLoadingMembers = false,
  membersError,
  onRetryMembers,
  onFailedInvitationsChange,
}: UsersSectionsProps) {
  const [activeTab, setActiveTab] = useState<"invited" | "members">("invited")

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
  )
}
