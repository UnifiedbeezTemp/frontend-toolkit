"use client";

import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import DesktopSection from "./DesktopSection";
import { useUserItem } from "./hooks/useUserItem";
import MobileBottomRow from "./MobileBottomRow";
import MobileRoleBadge from "./MobileRoleBadge";
import MobileTopRow from "./MobileTopRow";
import { UserItemProps } from "./types";

export default function UserItem({ user, type }: UserItemProps) {
  const {
    handleRoleChange,
    handleRemove,
    handleToggle,
    getStatusStyles,
    supabaseIcons,
  } = useUserItem(type, user.id);

  return (
    <div className="border border-input-stroke p-[0.8rem] rounded-[0.8rem]">
      <div className="lg:hidden flex flex-col gap-[3.2rem]">
        <MobileTopRow
          user={user}
          onToggle={handleToggle}
          supabaseIcons={supabaseIcons}
        />

        <MobileRoleBadge role={user.role} />

        <MobileBottomRow
          user={user}
          type={type}
          onRoleChange={handleRoleChange}
          onRemove={handleRemove}
          getStatusStyles={getStatusStyles}
        />
      </div>

      <DesktopSection
        user={user}
        type={type}
        onRoleChange={handleRoleChange}
        onRemove={handleRemove}
        onToggle={handleToggle}
        getStatusStyles={getStatusStyles}
        supabaseIcons={supabaseIcons}
      />
    </div>
  );
}
