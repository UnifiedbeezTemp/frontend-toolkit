import { TeamMember } from "../../../../store/onboarding/types/memberTypes";

export interface MobileBottomRowProps {
  user: TeamMember;
  type: "invited" | "members";
  onRoleChange: (role: string) => void;
  onRemove: () => void;
  getStatusStyles: (status: string) => string;
}

export interface DesktopSectionProps {
  user: TeamMember;
  type: "invited" | "members";
  onRoleChange: (role: string) => void;
  onRemove: () => void;
  onToggle: () => void;
  getStatusStyles: (status: string) => string;
  supabaseIcons: { checkbox: string };
}

export interface MobileRoleBadgeProps {
  role: string;
}

export interface MobileTopRowProps {
  user: Pick<TeamMember, "avatar" | "email" | "isSelected">;
  onToggle: () => void;
  supabaseIcons: { checkbox: string };
}

export interface RemoveButtonProps {
  type: "invited" | "members";
  status: string;
  onRemove: () => void;
  mobile?: boolean;
}

export interface StatusBadgeProps {
  status: string;
  getStatusStyles: (status: string) => string;
}

export interface UserItemProps {
  user: TeamMember;
  type: "invited" | "members";
}
