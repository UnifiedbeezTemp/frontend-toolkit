import ImageComponent from "next/image"
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase"
import Button from "../../ui/Button"
import { OriginalPlan } from "../types"


export default function PlanSummaryActions({ plan }: { plan: OriginalPlan }) {
  const { threeDot } = useSupabaseIcons()
  return (
    <div className="flex flex-col justify-between md:items-end gap-6 w-full">
      <div className="flex items-stretch gap-4">
        <Button
          onClick={() =>
            console.log(plan, "Upgrade Plan Action Needs To Be Implemented!!!")
          }
          variant="primary"
          className="px-4 py-2 text-md shadow-none hover:bg-white grow"
        >
          Upgrade Plan
        </Button>
        <Button variant="secondary" className="p-2">
          <ImageComponent width={20} height={20} src={threeDot} alt="more" className="rotate-90" />
        </Button>
      </div>
    </div>
  )
}