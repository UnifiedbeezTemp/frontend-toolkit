import Image from "next/image";
import RoleDropdown from "../RoleDropdown";
import CheckboxButton from "./CheckboxButton";
import StatusBadge from "./StatusBadge";
import RemoveButton from "./RemoveButton";
import SendInviteButton from "./SendInviteButton";
import { DesktopSectionProps } from "./types";
import { useAppSelector } from "../../../store/hooks/useRedux";
import { getRoleName } from "../utils/transformers";

export default function DesktopSection({
  user,
  type,
  onRoleChange,
  onRemove,
  onSendInvite,
  isSendingInvite,
  isRemoving,
  isCanceling,
  isAssigningRole,
  onToggle,
  getStatusStyles,
  supabaseIcons,
  isCurrentUser,
  isOwner,
  allowSelection = true,
}: DesktopSectionProps) {
  const isDraft = user.status === "draft";
  const canChangeRole = !(isCurrentUser && isOwner);
  const isLoading = isRemoving || isCanceling || isAssigningRole;
  const hideOwnerControls = type === "members" && isCurrentUser && isOwner;

  return (
    <div className="hidden lg:flex items-center justify-between">
      <div className="flex items-center gap-[1rem]">
        {allowSelection && (
          <CheckboxButton
            isSelected={user.isSelected}
            onToggle={onToggle}
            supabaseIcons={supabaseIcons}
          />
        )}

        <div className="flex items-center gap-[0.7rem]">
          <Image
            alt="avatar"
            src={user.avatar}
            width={35}
            height={35}
            className="object-cover"
          />
          <p className="text-[1.4rem] text-text-primary">{user.email}</p>

          {!isDraft && user.status !== "active" && (
            <StatusBadge
              status={user.status}
              getStatusStyles={getStatusStyles}
            />
          )}

          <DesktopRoleBadge role={user.role} />
        </div>
      </div>

      <div className="flex items-center gap-[1rem]">
        {!hideOwnerControls && (type === "members" || isDraft) && (
          <RoleDropdown
            currentRole={user.role}
            onRoleChange={onRoleChange}
            disabled={
              user.status === "denied" ||
              isSendingInvite ||
              !canChangeRole ||
              isLoading
            }
            loading={isAssigningRole}
          />
        )}
        {!hideOwnerControls && (
          <>
            {isDraft && (
              <SendInviteButton
                onClick={onSendInvite || (() => {})}
                loading={isSendingInvite}
              />
            )}
            <RemoveButton
              type={type}
              status={user.status}
              onRemove={onRemove}
              disabled={isCurrentUser}
              loading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}

function DesktopRoleBadge({ role }: { role: string }) {
  const roles = useAppSelector((state) => state.members.roles);
  const roleName = getRoleName(role, roles);

  return (
    <p className="text-[1.2rem] text-text-primary border border-input-stroke rounded-[0.4rem] p-[0.4rem] px-[0.8rem] bg-border/50">
      {roleName}
    </p>
  );
}
