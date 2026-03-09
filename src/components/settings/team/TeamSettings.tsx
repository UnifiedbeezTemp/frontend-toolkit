import React from 'react'
import { useTeamManagement } from '../../members/hooks/useTeamManagement';
import { InviteSection } from '../../members/InviteSection';
import UsersSections from './UsersSection';

export default function TeamSettings() {
      const {
    error,
    emailInput,
    handleAddInvite,
    handleEmailChange,
    isLoadingMembers,
    isLoadingInvitations,
    membersError,
    invitationsError,
    refetchMembers,
    refetchInvitations,
    handleSendInvitation,
    isSendingInvite,
    failedInvitations,
    handleFailedInvitationsChange,
  } = useTeamManagement();
  return (
    <div className="">
         <InviteSection
          emailInput={emailInput}
          error={error}
          onEmailChange={handleEmailChange}
          onAddInvite={handleAddInvite}
          failedInvitations={failedInvitations}
        />

        <UsersSections
          onSendInvite={handleSendInvitation}
          isSendingInvite={isSendingInvite}
          isLoadingInvitations={isLoadingInvitations}
          invitationsError={invitationsError}
          onRetryInvitations={refetchInvitations}
          isLoadingMembers={isLoadingMembers}
          membersError={membersError}
          onRetryMembers={refetchMembers}
          onFailedInvitationsChange={handleFailedInvitationsChange}
        />
    </div>
  )
}
