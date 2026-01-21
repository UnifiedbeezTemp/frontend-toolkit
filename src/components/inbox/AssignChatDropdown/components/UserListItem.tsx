import Avatar from "../../../ui/Avatar"
import Button from "../../../ui/Button"
import { AssignableUser } from "../types"

interface UserListItemProps {
  user: AssignableUser
  isAssigned: boolean
  onAssign: () => void
  onUnassign: () => void
}

export default function UserListItem({
  user,
  isAssigned,
  onAssign,
  onUnassign,
}: UserListItemProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          name={user.name}
          size="sm"
        />
        <span className="text-[1.6rem] text-text-primary font-medium">
          {user.name}
        </span>
      </div>
      <Button
        onClick={isAssigned ? onUnassign : onAssign}
        variant={isAssigned ? "secondary" : "outline"}
        size="sm"
        className={
          isAssigned
            ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            : "bg-white border-input-stroke text-text-primary hover:bg-gray-50"
        }
      >
        {isAssigned ? "Unassign" : "Assign"}
      </Button>
    </div>
  )
}
