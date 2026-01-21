import { ReactNode, forwardRef } from "react"
import { cn } from "../../../lib/utils"
import { PaperclipIcon } from "../../../assets/icons/PaperclipIcon"
import { SmileIcon } from "../../../assets/icons/SmileIcon"
import { SendIcon } from "../../../assets/icons/SendIcon"
import IconButton from "../../ui/IconButton"

interface MessageComposerProps {
  value: string
  onChange: (v: string) => void
  onSend?: () => void
  onAttach?: () => void
  onEmoji?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  leftIcon?: ReactNode
  emojiIcon?: ReactNode
}

const MessageComposer = forwardRef<HTMLButtonElement, MessageComposerProps>(
  function MessageComposer(
    {
      value,
      onChange,
      onSend,
      onAttach,
      onEmoji,
      placeholder = "Type a message....",
      disabled,
      className,
      leftIcon,
      emojiIcon,
    },
    ref,
  ) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        onSend?.()
      }
    }

    return (
      <div className={cn("flex items-center gap-3.75", className)}>
        <button
          ref={ref}
          type="button"
          onClick={onAttach}
          disabled={disabled}
          aria-label="Attach"
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl",
            "text-gray-600 hover:bg-gray-100 active:scale-[0.98] transition",
            disabled && "opacity-50 pointer-events-none",
          )}
        >
          {leftIcon ?? <PaperclipIcon className="h-6 w-6" />}
        </button>
        <div
          className={cn(
            "flex h-14 flex-1 items-center gap-3 rounded-2xl border-[0.5px] border-input-stroke bg-white px-2.5 md:px-3 lg:px-2 py-2 shadow-sm",
          )}
        >
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              "h-full w-full bg-transparent text-lg text-dark-base-70 outline-none",
              "placeholder:text-dark-base-70 placeholder:font-normal",
            )}
          />
          <button
            type="button"
            onClick={onEmoji}
            disabled={disabled}
            aria-label="Emoji"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-xl",
              "text-dark-base-70 hover:bg-gray-100 active:scale-[0.98] transition text-base",
              disabled && "opacity-50 pointer-events-none",
            )}
          >
            {emojiIcon ?? <SmileIcon className="h-6 w-6" />}
          </button>
        </div>
        <IconButton
          variant="primary"
          size="md"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          aria-label="Send"
          icon={<SendIcon />}
          ariaLabel={"Send"}
        />
      </div>
    )
  },
)

export default MessageComposer
