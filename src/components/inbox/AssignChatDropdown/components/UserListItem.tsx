import Avatar from "../../../ui/Avatar";
import { AssignableUser } from "../types";
import { cn } from "../../../../lib/utils";
import Button from "../../../ui/Button";

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
    <div className="flex items-center justify-between p-1">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          name={user.name}
          size="xs"
        />
        <span className="text-base text-dark-base-70 font-medium">
          {user.name}
        </span>
      </div>
      <Button
        type="button"
        onClick={isAssigned ? onUnassign : onAssign}
        variant="secondary"
        className={cn(
          "px-2 py-1 rounded-lg text-sm font-bold transition-colors",
          isAssigned
            ? "bg-input-filled text-inactive-color"
            : "bg-transparent text-dark-base-70 hover:bg-gray-50",
        )}
      >
        {isAssigned ? "Unassign" : "Assign"}
      </Button>
    </div>
  );
}
