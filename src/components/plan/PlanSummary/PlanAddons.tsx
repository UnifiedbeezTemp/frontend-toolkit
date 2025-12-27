

import { OriginalPlan } from "../types"
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase"
import ImageComponent from "../../ui/ImageComponent"
import { Key } from "react"

export default function PlanAddOns({ plan }: { plan: OriginalPlan }) {
  const { checkMark } = useSupabaseIcons()
  return (
    <div className="flex flex-wrap gap-2 text-sm text-gray-700">
      {plan.addons?.map((addon: { id: Key | null | undefined; quantity: any; name: any }) => (
        <div key={addon.id} className="icon-list-item">
          <span className="bg-secondary-green-100 w-3 h-3 flex justify-center items-center rounded-full">
            <ImageComponent
              width={6}
              height={6}
              alt="checkmark"
              src={checkMark}
              className="text-white"
            />
          </span>
          <span>{`${addon.quantity} ${addon.name}`}</span>
        </div>
      ))}
    </div>
  )
}
