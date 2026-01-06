import { ReactNode } from "react"
import { LockIcon } from "../../../assets/icons/LockIcon"
import { cn } from "../../../lib/utils"
import Checkbox from "../../ui/CheckBox"

export default function ChannelItemCard({
  item,
  selected,
  onClick,
  channelIcon,
}: {
  channelIcon: ReactNode
  item: {
    status: string
    disabled: boolean
    title: string
    subTitle: string
  }
  selected?: boolean
  onClick: () => void
}) {
  const locked = item.status === "locked"
  const disabled = !!item.disabled || locked

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-white p-2",
      )}
      role="group"
    >
      <div className="flex items-start gap-1">
        <Checkbox checked={Boolean(selected)} onChange={onClick} />

        <div className="">
          {channelIcon}
        </div>

        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "flex-1 text-left",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <div className="text-xs font-semibold text-dark-base-100">
            {item.title}
          </div>
          {item.subTitle ? (
            <div className="text-[1rem] text-dark-base-70">{item.subTitle}</div>
          ) : null}
        </button>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <StatusLine status={item.status} />
      </div>
    </div>
  )
}

function StatusLine({ status }: { status: string }) {
  if (status === "locked") {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <LockIcon />
        <span>Locked</span>
      </div>
    )
  }

  if (status === "connected") {
    return (
      <div className="flex items-center gap-2 text-[1rem] font-medium text-success">
        <span className="h-1.5 w-1.5 ring-2 ring-success/10 rounded-full bg-success" />
        <span>Connected</span>
      </div>
    )
  }
  if (!status) return <div />
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500">
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-400" />
      <span>{status}</span>
    </div>
  )
}
