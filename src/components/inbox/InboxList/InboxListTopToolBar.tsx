import { ReactNode, useMemo, useRef } from "react"
import { cn } from "../../../lib/utils"
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon"
import IconButton from "../../ui/IconButton"
import SettingsDrawerIcon from "../../../assets/icons/SettingsDrawerIcon"
import PanelCollapseIcon from "../../../assets/icons/PanelCollapseIcon"
import Heading from "../../ui/Heading"
import { SmartDropdown, DropdownItem } from "../../smart-dropdown"
import { useToggle } from "../../../hooks/useToggle"
import { InboxType, inboxTypeLabels } from "../utils/dummyData"
import MoreVerticalIcon from "../../../assets/icons/MoreVerticalIcon"
import PlusIcon from "../../../assets/icons/PlusIcon"

export function InboxListTopToolBar({
  title,
  onTitleClick,
  className,
  onLeftClick,
  selectedInboxType,
  onInboxTypeChange,
}: {
  title: string
  onTitleClick?: () => void
  leftIcon: ReactNode
  onLeftClick?: () => void
  className?: string
  selectedInboxType?: InboxType
  onInboxTypeChange?: (type: InboxType) => void
}) {
  const {
    value: showActions,
    toggle: toggleActions,
    setFalse: closeActions,
  } = useToggle()

  const {
    value: showInboxDropdown,
    toggle: toggleInboxDropdown,
    setFalse: closeInboxDropdown,
  } = useToggle()

  const actionsToggleRef = useRef<HTMLButtonElement | null>(null)
  const inboxToggleRef = useRef<HTMLButtonElement | null>(null)

  const actionButtons = useMemo(
    () => (
      <>
        <IconButton
          variant="secondary"
          icon={<SettingsDrawerIcon />}
          ariaLabel={"Settings"}
        />
        <IconButton
          variant="primary"
          icon={<PlusIcon />}
          ariaLabel={"Add New"}
        />
      </>
    ),
    []
  )

  return (
    <header
      className={cn(
        "w-full px-4 md:px-2 py-4 bg-primary relative z-10",
        className
      )}
    >
      <div className="flex items-center justify-start gap-2.25">
        <IconButton
          onClick={onLeftClick}
          variant="secondary"
          icon={<PanelCollapseIcon />}
          ariaLabel="Open Drawer"
        />
        <div className="relative mr-auto">
          <button
            type="button"
            ref={inboxToggleRef}
            onClick={toggleInboxDropdown}
            className="flex items-center gap-2"
            aria-label="Select inbox"
          >
            <Heading className="truncate text-[1.8rem] lg:text-[2.4rem] font-semibold text-dark-base-70">
              {title}
            </Heading>
            <span className="px-1.5 py-0.75">
              <ChevronDownIcon />
            </span>
          </button>
          <SmartDropdown
            isOpen={showInboxDropdown}
            onClose={closeInboxDropdown}
            triggerRef={inboxToggleRef}
            className="min-w-[18rem]"
            maxHeight="none"
            placement="bottom-start"
          >
            <div className="flex flex-col p-1">
              <DropdownItem
                onClick={() => {
                  onInboxTypeChange?.("general")
                  closeInboxDropdown()
                }}
                className={cn(
                  "px-3 py-2 rounded-md",
                  selectedInboxType === "general" && "bg-input-filled"
                )}
              >
                <span className="text-dark-base-100 text-base">
                  {inboxTypeLabels.general}
                </span>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  onInboxTypeChange?.("team")
                  closeInboxDropdown()
                }}
                className={cn(
                  "px-3 py-2 rounded-md",
                  selectedInboxType === "team" && "bg-input-filled"
                )}
              >
                <span className="text-dark-base-100 text-base">
                  {inboxTypeLabels.team}
                </span>
              </DropdownItem>
            </div>
          </SmartDropdown>
        </div>
        <div>
          <div className="md:hidden flex items-center gap-2">
            {actionButtons}
          </div>
          <button
            onClick={toggleActions}
            ref={actionsToggleRef}
            aria-label="Toggle Options"
            className="text-gray-45 hidden md:flex"
          >
            <MoreVerticalIcon />
          </button>
          <SmartDropdown
            isOpen={showActions}
            onClose={closeActions}
            triggerRef={actionsToggleRef}
            className="hidden w-auto! md:block -ml-3"
            maxHeight="none"
          >
            <div className="flex flex-col p-2 rounded-md gap-2.5">
              {actionButtons}
            </div>
          </SmartDropdown>
        </div>
      </div>
    </header>
  )
}
