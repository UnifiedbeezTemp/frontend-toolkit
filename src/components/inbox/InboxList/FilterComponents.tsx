import { useRef } from "react"
import CheckMarkIcon from "../../../assets/icons/CheckMarkIcon"
import InboxSearchBar from "../components/SearchBar"
import FunnelIcon from "../../../assets/icons/FunnelIcon"
import IconButton from "../../ui/IconButton"
import { SmartDropdown } from "../../smart-dropdown"
import { QuickFilterBar } from "../components/QuickFilterBar"
import { useToggle } from "../../../hooks/useToggle"
import { FilterOptionList } from "../components/FilterOptionList"

export const InboxSearchAndFilters = () => {
  const filterOptions = [
    {
      label: "Channels",
      value: "self",
    },
    {
      label: "Tags",
      value: "not_assigned",
    },
    {
      label: "Name",
      value: "name",
    },
  ]

  const {
    value: isOpen,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useToggle()
  const dropdownTriggerRef = useRef(null)
  return (
    <div className="flex flex-col gap-3 px-4 pb-4 bg-white border-b border-gray-100 mt-2">
      <div className="flex gap-2 items-center">
        <InboxSearchBar
          value={""}
          placeholder="Search inbox"
          onChange={() => {}}
          className="grow shrink"
        />
        <IconButton
          onClick={openDropdown}
          ref={dropdownTriggerRef}
          variant="secondary"
          ariaLabel="toggle filters"
          className="shrink-0"
          icon={<FunnelIcon className="text-input-stroke" />}
        />
        <SmartDropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          triggerRef={dropdownTriggerRef}
          className="min-w-60 -mt-1"
          placement="bottom-end"
          maxHeight="30rem"
        >
          <FilterOptionList<string, string>
            options={filterOptions}
            value={filterOptions[0].value || ""}
            onChange={(opt) => opt}
            icon={CheckMarkIcon}
          />
        </SmartDropdown>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <QuickFilterBar
          options={[
            {
              label: "All conversations",
              options: [
                {
                  label: "Assigned to me",
                  value: "self",
                },
                {
                  label: "Not assigned",
                  value: "not_assigned",
                },
              ],
            },
            {
              label: "Unread",
              options: [
                {
                  label: "Assigned to me",
                  value: "self",
                },
                {
                  label: "Not assigned",
                  value: "not_assigned",
                },
              ],
            },
            {
              label: "Labels",
              options: [
                {
                  label: "Assigned to me",
                  value: "self",
                },
                {
                  label: "Not assigned",
                  value: "not_assigned",
                },
              ],
            },
          ]}
          onSelect={() => {}}
          selectedDropdownOptions={["not_assigned"]}
          selectedOption={{
            label: "All conversations",
            options: [
              {
                label: "Assigned to me",
                value: "self",
              },
              {
                label: "Not assigned",
                value: "not_assigned",
              },
            ],
          }}
          handleDropdownOptionSelect={() => {}}
        />
      </div>
    </div>
  )
}
