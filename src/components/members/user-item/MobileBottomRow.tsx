import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import RoleDropdown from "../RoleDropdown";
import Button from "../../ui/Button";
import StatusBadge from "./StatusBadge";
import RemoveButton from "./RemoveButton";

interface MobileBottomRowProps {
  user: TeamMember;
  type: "invited" | "members";
  onRoleChange: (role: string) => void;
  onRemove: () => void;
  getStatusStyles: (status: string) => string;
}

export default function MobileBottomRow({
  user,
  type,
  onRoleChange,
  onRemove,
  getStatusStyles,
}: MobileBottomRowProps) {
  return (
    <div className="flex items-center justify-between">
      {user.status !== "active" && (
        <StatusBadge status={user.status} getStatusStyles={getStatusStyles} />
      )}

      <div className="flex items-center gap-[0.5rem]">
        <RoleDropdown
          currentRole={user.role}
          onRoleChange={onRoleChange}
          disabled={user.status === "denied"}
        />
        <RemoveButton
          type={type}
          status={user.status}
          onRemove={onRemove}
          mobile
        />
      </div>
    </div>
  );
}
