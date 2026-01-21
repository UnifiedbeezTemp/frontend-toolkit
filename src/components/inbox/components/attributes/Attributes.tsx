import { X } from "lucide-react"
import IconButton from "../../../ui/IconButton"
import { attributesData } from "../../temp/attributesData"
import InboxSearchBar from "../SearchBar"
import { AccordionSection } from "./Accordion"

export default function Attributes({ onCancel }: { onCancel?: () => void }) {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[2rem] leading-[120%] font-bold text-dark-base-100">
            Attributes
          </h1>
          <p className="text-xs text-dark-base-100/70 mt-2">
            View and edit attributes about your person
          </p>
        </div>
        <IconButton
          ariaLabel="close attributes"
          variant="secondary"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          icon={<X />}
        />
      </div>

      <InboxSearchBar value={""} onChange={() => {}} className="my-4" />

      <div className="flex flex-col gap-4">
        {attributesData.map((section) => (
          <AccordionSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
