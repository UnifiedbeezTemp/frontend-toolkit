import { ReactNode, useMemo, useRef } from "react"
import { cn } from "../../../lib/utils"
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon"
import IconButton from "../../ui/IconButton"
import SettingsDrawerIcon from "../../../assets/icons/SettingsDrawerIcon"
import { MoreVertical, PlusIcon } from "lucide-react"
import PanelCollapseIcon from "../../../assets/icons/PanelCollapseIcon"
import Heading from "../../ui/Heading"
import { SmartDropdown } from "../../smart-dropdown"
import { useToggle } from "../../../hooks/useToggle"

export function InboxListTopToolBar({
  title,
  onTitleClick,
  className,
  onLeftClick,
}: {
  title: string
  onTitleClick?: () => void
  leftIcon: ReactNode
  onLeftClick?: () => void
  className?: string
}) {
  const {
    value: showActions,
    toggle: toggleActions,
    setFalse: closeActions,
  } = useToggle()

  const actionsToggleRef = useRef<HTMLButtonElement | null>(null)

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
        <button
          type="button"
          onClick={onTitleClick}
          className="flex items-center gap-2 mr-auto"
          aria-label="Select inbox"
        >
          <Heading className="truncate text-[1.8rem] lg:text-[2.4rem] font-semibold text-dark-base-70">
            {title}
          </Heading>
          <span className="px-1.5 py-0.75">
            <ChevronDownIcon />
          </span>
        </button>
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
            <MoreVertical />
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
