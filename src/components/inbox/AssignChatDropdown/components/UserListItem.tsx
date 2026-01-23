import Avatar from "../../../ui/Avatar";
import { AssignableUser } from "../types";
import { cn } from "../../../../lib/utils";

interface UserListItemProps {
  user: AssignableUser;
  isAssigned: boolean;
  onAssign: () => void;
  onUnassign: () => void;
}

export default function UserListItem({
  user,
  isAssigned,
  onAssign,
  onUnassign,
}: UserListItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          name={user.name}
          size="md"
        />
        <span className="text-[1.6rem] text-dark-base-100 font-medium">
          {user.name}
        </span>
      </div>
      <button
        type="button"
        onClick={isAssigned ? onUnassign : onAssign}
        className={cn(
          "px-4 py-2 rounded-lg text-[1.4rem] font-semibold transition-colors",
          isAssigned
            ? "bg-input-filled text-inactive-color border border-border"
            : "bg-transparent border border-input-stroke text-dark-base-70 hover:bg-gray-50",
        )}
      >
        {isAssigned ? "Unassign" : "Assign"}
      </button>
    </div>
  );
}
