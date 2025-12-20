import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import RoleDropdown from "../RoleDropdown";
import Button from "../../ui/Button";
import StatusBadge from "./StatusBadge";
import RemoveButton from "./RemoveButton";
import SendInviteButton from "./SendInviteButton";
import { MobileBottomRowProps } from "./types";

export default function MobileBottomRow({
  user,
  type,
  onRoleChange,
  onRemove,
  onSendInvite,
  isSendingInvite,
  isRemoving,
  isCanceling,
  isAssigningRole,
  getStatusStyles,
  isCurrentUser,
  isOwner,
}: MobileBottomRowProps) {
  const isDraft = user.status === "draft";
  const canChangeRole = !(isCurrentUser && isOwner);
  const isLoading = isRemoving || isCanceling || isAssigningRole;
  const hideOwnerControls = type === "members" && isCurrentUser && isOwner;
  
  return (
    <div className="flex items-center justify-between">
      {user.status !== "active" && user.status !== "draft" ? (
        <StatusBadge status={user.status} getStatusStyles={getStatusStyles} />
      ): <div></div>}

        <div className="flex items-center gap-[0.5rem]">
        {!hideOwnerControls && (isDraft || type === "members") && (
          <RoleDropdown
            currentRole={user.role}
            onRoleChange={onRoleChange}
            disabled={
              user.status === "denied" || isSendingInvite || !canChangeRole || isLoading
            }
            loading={isAssigningRole}
          />
        )}
        {!hideOwnerControls &&
          (isDraft ? (
            <SendInviteButton
              onClick={onSendInvite || (() => {})}
              loading={isSendingInvite}
              mobile
            />
          ) : (
            <RemoveButton
              type={type}
              status={user.status}
              onRemove={onRemove}
              mobile
              disabled={isCurrentUser}
              loading={isLoading}
            />
          ))}
      </div>
    </div>
  );
}
