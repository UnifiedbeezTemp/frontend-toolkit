import SmartDropdown from "../../smart-dropdown/SmartDropdown"
import Input from "../../ui/Input"
import { useAssignChatDropdown } from "./hooks/useAssignChatDropdown"
import UserListItem from "./components/UserListItem"
import { AssignChatDropdownProps } from "./types"
import SearchIcon from "../../../assets/icons/SearchIcon"

export default function AssignChatDropdown({
  isOpen,
  onClose,
  triggerRef,
  assignedUserIds = [],
  onAssign,
  onUnassign,
}: AssignChatDropdownProps) {
  const { searchQuery, setSearchQuery, filteredUsers } = useAssignChatDropdown(
    assignedUserIds
  )

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="bottom-end"
      maxHeight="40rem"
      className="w-[90dvw]! max-w-[40rem]! rounded-[1.6rem] p-"
      closeOnClick={false}
    >
      <div>
        <div className="mb-6">
          <div className="text-[1.8rem] font-bold text-text-primary mb-4">
            Assigned chat to
          </div>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            leftIcon={<SearchIcon />}
            className="w-full"
          />
        </div>
        <div className="max-h-[32rem] overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              No users found
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-input-stroke">
              {filteredUsers.map((user) => {
                const isAssigned = assignedUserIds.includes(user.id)
                return (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isAssigned={isAssigned}
                    onAssign={() => onAssign?.(user.id)}
                    onUnassign={() => onUnassign?.(user.id)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </SmartDropdown>
  )
}
