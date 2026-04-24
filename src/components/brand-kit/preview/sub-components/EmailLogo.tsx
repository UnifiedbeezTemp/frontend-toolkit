"use client"

import React from "react"
import ImageComponent from "../../../ui/ImageComponent"
import { ModeColorState } from "../../types/brandKitTypes"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"

interface Props {
  logo: string | null
  colors: ModeColorState
}

export default function EmailLogo({ logo, colors }: Props) {
  const icons = useSupabaseIcons()

  return (
    <div className="px-[4rem] pt-[2rem] flex flex-col items-center justify-center">
      <div
        className="border rounded-full p-2.5 mx-auto overflow-hidden flex items-center justify-center bg-white w-16 h-16"
        style={{ borderColor: colors.primary }}
      >
        <ImageComponent
          src={logo ?? icons.image}
          alt="logo"
          width={50}
          height={50}
          className="object-contain w-auto h-auto rounded-full"
        />
      </div>
    </div>
  )
}
