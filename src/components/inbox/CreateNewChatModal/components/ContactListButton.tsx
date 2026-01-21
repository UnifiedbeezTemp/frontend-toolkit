"use client"

import Button from "../../../ui/Button"
import ImageComponent from "../../../ui/ImageComponent"
import Text from "../../../ui/Text"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"
import IconButton from "../../../ui/IconButton"
import UserSquareIcon from "../../../../assets/icons/UserSquareIcon"
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon"

import { ContactListButtonProps } from "../types"

export default function ContactListButton({
  onClick,
}: ContactListButtonProps) {
  const icons = useSupabaseIcons()

  return (
    <Button
      onClick={onClick}
      variant="secondary"
      className="w-full flex items-center justify-between p-2 bg-primary"
    >
      <div className="flex items-center gap-[1.2rem]">
        <IconButton
          as="div"
          variant="secondary"
          icon={<UserSquareIcon />}
          ariaLabel={"Contact"}
          className="flex justify-center items-center text-dark-base-100 border-input-stroke bg-input-filled" disabled
        />
        <Text className="text-[1.6rem] text-text-primary">Contact list</Text>
      </div>
      <ChevronDownIcon className="-rotate-90" />
    </Button>
  )
}
