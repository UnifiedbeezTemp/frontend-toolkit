import Image from "next/image";
import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import RoleDropdown from "../RoleDropdown";
import CheckboxButton from "./CheckboxButton";
import StatusBadge from "./StatusBadge";
import RemoveButton from "./RemoveButton";

interface DesktopSectionProps {
  user: TeamMember;
  type: "invited" | "members";
  onRoleChange: (role: string) => void;
  onRemove: () => void;
  onToggle: () => void;
  getStatusStyles: (status: string) => string;
  supabaseIcons: any;
}

export default function DesktopSection({
  user,
  type,
  onRoleChange,
  onRemove,
  onToggle,
  getStatusStyles,
  supabaseIcons,
}: DesktopSectionProps) {
  return (
    <div className="hidden lg:flex items-center justify-between">
      <div className="flex items-center gap-[1rem]">
        <CheckboxButton
          isSelected={user.isSelected}
          onToggle={onToggle}
          supabaseIcons={supabaseIcons}
        />

        <div className="flex items-center gap-[0.7rem]">
          <Image
            alt="avatar"
            src={user.avatar}
            width={40}
            height={40}
            className="object-cover"
          />
          <p className="text-[1.5rem] text-text-primary">{user.email}</p>

          {user.status !== "active" && (
            <StatusBadge
              status={user.status}
              getStatusStyles={getStatusStyles}
            />
          )}

          <DesktopRoleBadge role={user.role} />
        </div>
      </div>

      <div className="flex items-center gap-[0.5rem]">
        <RoleDropdown
          currentRole={user.role}
          onRoleChange={onRoleChange}
          disabled={user.status === "denied"}
        />
        <RemoveButton type={type} status={user.status} onRemove={onRemove} />
      </div>
    </div>
  );
}

function DesktopRoleBadge({ role }: { role: string }) {
  return (
    <p className="text-[1.5rem] text-text-primary border border-input-stroke rounded-lg p-[0.5rem] bg-border/50">
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </p>
  );
}
