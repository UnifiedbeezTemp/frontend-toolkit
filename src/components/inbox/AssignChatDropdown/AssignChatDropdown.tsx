import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import Input from "../../ui/Input";
import { useAssignChatDropdown } from "./hooks/useAssignChatDropdown";
import UserListItem from "./components/UserListItem";
import { AssignChatDropdownProps } from "./types";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { InfoIcon } from "../../../assets/icons/InfoIcon";

export default function AssignChatDropdown({
  isOpen,
  onClose,
  triggerRef,
  assignedUserIds = [],
  onAssign,
  onUnassign,
}: AssignChatDropdownProps) {
  const { searchQuery, setSearchQuery, filteredUsers } =
    useAssignChatDropdown(assignedUserIds);

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="bottom-end"
      maxHeight="50rem"
      className="w-[90dvw]! max-w-[24rem]! rounded-[1.4rem] p-2 border border-input-stroke"
      closeOnClick={false}
    >
      <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold text-dark-base-100">
            Assigned chat to
          </h2>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            leftIcon={<SearchIcon className="w-5 h-5 text-dark-base-40" />}
            className=""
          />
        <div className="max-h-[36rem] overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-dark-base-70 text-md">
              No users found
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredUsers.map((user) => {
                const isAssigned = assignedUserIds.includes(user.id);
                return (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isAssigned={isAssigned}
                    onAssign={() => onAssign?.(user.id)}
                    onUnassign={() => onUnassign?.(user.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </SmartDropdown>
  );
}
