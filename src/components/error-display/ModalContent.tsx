import Heading from "../ui/Heading"
import Text from "../ui/Text"
import { cn } from "../../lib/utils"
import { ModalContentProps } from "./types"

export default function ModalContent({
  title,
  description,
  descriptionClassName,
  actions,
  children,
}: ModalContentProps) {
  return (
    <>
      <Heading
        size="xl"
        className="text-gray-900 font-bold text-lg mb-1 text-left"
      >
        {title}
      </Heading>
      {description && (
        <Text
          className={cn(
            "text-gray-600 mb-4 text-left text-md max-w-86",
            descriptionClassName
          )}
        >
          {description}
        </Text>
      )}
      {children}
      {actions}
    </>
  )
}
