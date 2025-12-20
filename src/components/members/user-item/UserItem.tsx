"use client";

import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import DesktopSection from "./DesktopSection";
import { useUserItem } from "./hooks/useUserItem";
import MobileBottomRow from "./MobileBottomRow";
import MobileRoleBadge from "./MobileRoleBadge";
import MobileTopRow from "./MobileTopRow";
import { UserItemProps } from "./types";

interface UserItemWithSendProps extends UserItemProps {
  onSendInvite?: (invitationId: string, email: string, roleId: number) => void;
  isSendingInvite?: boolean;
}

export default function UserItem({ 
  user, 
  type, 
  onSendInvite, 
  isSendingInvite,
  allowSelection = true,
}: UserItemWithSendProps) {
  const {
    handleRoleChange,
    handleRemove,
    handleToggle,
    handleSendInvite,
    getStatusStyles,
    supabaseIcons,
    isCurrentUser,
    isOwner,
    isRemoving,
    isCanceling,
    isAssigningRole,
  } = useUserItem(type, user.id, onSendInvite);

  return (
    <div className="border border-input-stroke p-[0.8rem] rounded-[0.8rem]">
      <div className="lg:hidden flex flex-col gap-[3.2rem]">
        <MobileTopRow
          user={user}
          onToggle={handleToggle}
          supabaseIcons={supabaseIcons}
          allowSelection={allowSelection}
        />

        {type === "invited" && user.status !== "draft" && <MobileRoleBadge role={user.role} />}

        <MobileBottomRow
          user={user}
          type={type}
          onRoleChange={handleRoleChange}
          onRemove={handleRemove}
          onSendInvite={handleSendInvite}
          isSendingInvite={isSendingInvite}
          isRemoving={isRemoving}
          isCanceling={isCanceling}
          isAssigningRole={isAssigningRole}
          getStatusStyles={getStatusStyles}
          isCurrentUser={isCurrentUser}
          isOwner={isOwner}
        />
      </div>

      <DesktopSection
        user={user}
        type={type}
        onRoleChange={handleRoleChange}
        onRemove={handleRemove}
        onSendInvite={handleSendInvite}
        isSendingInvite={isSendingInvite}
        isRemoving={isRemoving}
        isCanceling={isCanceling}
        isAssigningRole={isAssigningRole}
        onToggle={handleToggle}
        getStatusStyles={getStatusStyles}
        supabaseIcons={supabaseIcons}
        isCurrentUser={isCurrentUser}
        isOwner={isOwner}
        allowSelection={allowSelection}
      />
    </div>
  );
}
