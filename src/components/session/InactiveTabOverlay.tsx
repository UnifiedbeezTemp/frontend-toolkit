"use client"


import Monitor03 from "../../assets/icons/Monitor03"
import Button from "../ui/Button"
import Heading from "../ui/Heading"
import IconButton from "../ui/IconButton"
import Text from "../ui/Text"



export default function InactiveTabOverlay({ handleClaimTab, isActive, heading, description, buttonText }: {
  handleClaimTab: () => void
  isActive: boolean
  heading?: string
  description?: string
  buttonText?: string
}) {

  if (isActive) return null

  return (
    <div className="fixed inset-0 z-50000000000 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4 max-w-150 rounded-2xl text-center px-6 bg-primary md:px-16 py-8 md:py-12">
        <IconButton
          className="w-20 h-20 rounded-full"
          ariaLabel=""
          icon={<Monitor03 width={48} height={48} />}
          variant="secondary"
        /> 
        <Heading className="text-[2.4rem] md:text-[3.2rem]">
          {heading || "Session active in another tab"}
        </Heading>
        <Text className="text-base text-center text-md md:text-base">
          {description || "A session is currently being used in another browser tab. Click below to continue here instead."}
        </Text>
        <Button
          onClick={handleClaimTab}
          type="button"
          className="mt-2 px-8 highlight-inside"
        >
          {buttonText || "Use Here"}
        </Button>
      </div>
    </div>
  )
}
