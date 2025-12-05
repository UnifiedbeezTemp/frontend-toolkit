
import { useSupabaseIcons } from "../../lib/supabase/useSupabase"
import ImageComponent from "../ui/ImageComponent"

export function CheckboxVisual({ selected }: { selected: boolean }) {
  const { check } = useSupabaseIcons()
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center rounded-full border absolute right-3.25 top-3.25 shrink-0 ${
        selected ? "bg-brand-primary border-white" : "border-gray-300"
      }`}
    >
      {selected && <ImageComponent src={check} alt="" width={26} height={26} />}
    </div>
  )
}

export function RadioVisual({ selected}: {selected: boolean}){
  return (
    <div
      className={`
            w-4 h-4 rounded-full border flex items-center justify-center shrink-0
            ${selected ? "border-brand-primary ring-4 ring-brand-primary/20 bg-green-10" : "border-muted"}
          `}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
    </div>
  )
}