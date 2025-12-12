import { TeamMember } from "../../../../store/onboarding/types/memberTypes";

export interface MobileBottomRowProps {
  user: TeamMember;
  type: "invited" | "members";
  onRoleChange: (role: string) => void;
  onRemove: () => void;
  onSendInvite?: () => void;
  isSendingInvite?: boolean;
  isRemoving?: boolean;
  isCanceling?: boolean;
  isAssigningRole?: boolean;
  getStatusStyles: (status: string) => string;
  isCurrentUser?: boolean;
  isOwner?: boolean;
}

export interface DesktopSectionProps {
  user: TeamMember;
  type: "invited" | "members";
  onRoleChange: (role: string) => void;
  onRemove: () => void;
  onSendInvite?: () => void;
  isSendingInvite?: boolean;
  isRemoving?: boolean;
  isCanceling?: boolean;
  isAssigningRole?: boolean;
  onToggle: () => void;
  getStatusStyles: (status: string) => string;
  supabaseIcons: { checkbox: string };
  isCurrentUser?: boolean;
  isOwner?: boolean;
  allowSelection?: boolean;
}

export interface MobileRoleBadgeProps {
  role: string;
}

export interface MobileTopRowProps {
  user: Pick<TeamMember, "avatar" | "email" | "isSelected">;
  onToggle: () => void;
  supabaseIcons: { checkbox: string };
  allowSelection?: boolean;
}

export interface RemoveButtonProps {
  type: "invited" | "members";
  status: string;
  onRemove: () => void;
  mobile?: boolean;
  disabled?: boolean;
}

export interface StatusBadgeProps {
  status: string;
  getStatusStyles: (status: string) => string;
}

export interface UserItemProps {
  user: TeamMember;
  type: "invited" | "members";
  allowSelection?: boolean;
}
