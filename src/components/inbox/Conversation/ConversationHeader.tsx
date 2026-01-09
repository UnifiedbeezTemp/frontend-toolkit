import { ReactNode, useRef } from "react"
import { cn } from "../../../lib/utils"
import {
  ConversationHeaderAction,
  ConversationHeaderActions,
} from "./ConversationHeaderActions"
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon"
import { SmartDropdown } from "../../smart-dropdown"
import IconButton from "../../ui/IconButton"
import MoreHorizontalIcon from "../../../assets/icons/MoreHorizontalIcon"
import { useToggle } from "../../../hooks/useToggle"
import { TagPill } from "../components/TagPill"
import Attributes from "../components/attributes/Attributes"
import ImageComponent from "../../ui/ImageComponent"
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase"

export function ConversationHeader({
  platformIcon,
  title,
  tag,
  status,
  showChevron = true,
  actions,
  className,
  onBack,
}: {
  platformIcon: ReactNode
  title: string
  tag?: string | ReactNode
  status?: string
  showChevron?: boolean
  actions?: ConversationHeaderAction[]
  className?: string
  onBack?: () => void
}) {
  const { arrowLeft } = useSupabaseIcons()
  const tagNode =
    typeof tag === "string" ? (
      <TagPill className="text-gray-700" label={tag} />
    ) : (
      tag
    )
  const {
    value: isMobileActionsOpen,
    setFalse: closeMobileActions,
    toggle: toggleMobileActions,
  } = useToggle()

  const actionsRef = useRef<HTMLButtonElement | null>(null)
  const attributesTriggerRef = useRef<HTMLButtonElement | null>(null)
  const {
    value: showAttributes,
    setTrue: openAttributes,
    setFalse: closeAttributes,
  } = useToggle()

  return (
    <header className={cn("w-full p-4 md:py-3 lg:py-4", className)}>
      <div className="flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4">
          {onBack && (
            <IconButton
              onClick={onBack}
              variant="secondary"
              className="md:hidden shrink-0"
              icon={
                <ImageComponent
                  src={arrowLeft}
                  alt="Back"
                  width={20}
                  height={20}
                />
              }
              ariaLabel="Back to inbox"
            />
          )}
          <div className="shrink-0">{platformIcon}</div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-3">
              <h1 className="truncate text-base font-semibold text-dark-base-100">
                {title}
              </h1>
              {tagNode ? <div className="shrink-0">{tagNode}</div> : null}
            </div>
            {status ? (
              <div className="flex items-center gap-1 text-xs text-dark-base-80">
                <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
                <span className="truncate">{status}</span>
              </div>
            ) : null}
          </div>
          {showChevron ? (
            <button
              ref={attributesTriggerRef}
              onClick={openAttributes}
              type="button"
              className="shrink-0 rounded-md px-1.25 py-1.75 text-dark-base-70"
              aria-label="Open conversation menu"
            >
              <ChevronDownIcon className="h-5 w-5" />
            </button>
          ) : null}
          <SmartDropdown
            isOpen={showAttributes}
            onClose={closeAttributes}
            triggerRef={attributesTriggerRef}
            maxHeight="66rem"
            className="w-full max-w-[75dvw] md:max-w-122.5 shadow-sm bg-primary rounded-[1.4rem] border border-input-stroke"
            placement="bottom-end"
          >
            <Attributes onCancel={closeAttributes} />
          </SmartDropdown>
        </div>

        {actions ? (
          <div className="shrink-0">
            <ConversationHeaderActions
              className="hidden md:flex"
              actions={actions}
            />
            <IconButton
              ref={actionsRef}
              variant="secondary"
              onClick={toggleMobileActions}
              className="md:hidden"
              ariaLabel="Toggle actions"
              icon={<MoreHorizontalIcon />}
            />
            <SmartDropdown
              isOpen={isMobileActionsOpen}
              onClose={closeMobileActions}
              triggerRef={actionsRef}
              className="md:hidden w-auto!"
              maxHeight="none"
            >
              <ConversationHeaderActions
                actions={actions}
                className="flex-col p-2 rounded-md"
              />
            </SmartDropdown>
          </div>
        ) : null}
      </div>
    </header>
  )
}
