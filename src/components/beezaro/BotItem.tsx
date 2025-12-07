import { useMemo } from "react"
import Button from "../ui/Button"
import ImageComponent from "../ui/ImageComponent"
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import { BotItemProps } from "./types"
import BotPersonalityBadge from "./BotPersonalityBadge"

export default function BotItem({
  botImage,
  botName,
  botPersonality,
  showDeleteButton = true,
  showEditButton = true,
  onEdit,
  onDelete,
  botPersonalityTheme = "default",
}: BotItemProps) {
  const { beeZoraWelcome, pencil, trashRed } = useSupabaseIcons()

  return (
    <div className="relative bg-white border border-input-stroke rounded-md pl-3.5 pr-2.75 pt-2.75 pb-4 flex justify-between shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] w-full">
      <div className="flex gap-1 flex-wrap sm:flex-nowrap items-center">
        <ImageComponent
          className=" border-dark-base-5 border rounded-[.35rem] p-[.35rem]"
          src={botImage || beeZoraWelcome}
          width={27}
          height={27}
          alt="beezora - Yellow bee with green stripes on thorax"
        />
        <p className="break-after-column text-md font-normal text-dark-base-70 leading-[160%]">{botName}</p>
        <span className="basis-full sm:hidden" />
        <BotPersonalityBadge
          className="mt-2 sm:mt-0 sm:basis-auto sm:ml-3 border badge" theme={botPersonalityTheme}>
          {botPersonality}
        </BotPersonalityBadge>
      </div>
      <div className="absolute right-2.75 flex gap-2.5">
        {showEditButton && (
          <Button
            onClick={onEdit}
            variant="secondary"
            className="p-2 border-border grayscale-100"
          >
            <ImageComponent
              src={pencil}
              alt="pencil"
              width={16}
              height={16}
              className="grayscale-100 opacity-50"
            />
          </Button>
        )}
        {showDeleteButton && (
          <Button
            onClick={onDelete}
            variant="secondary"
            className="p-2 border-destructive"
          >
            <ImageComponent src={trashRed} alt="trash" width={16} height={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
