"use client"

import Modal from "../../components/modal/Modal"
import Button from "../../components/ui/Button"
import Heading from "../../components/ui/Heading"
import ImageComponent from "../../components/ui/ImageComponent"
import { useSupabaseGifs } from "../../lib/supabase/useSupabase"
import { CelebrationModalProps } from "./types"

export default function CelebrationModal({
  isOpen,
  onClose,
  onContinue,
  onGoBack,
  heading,
  continueBtnText,
  backBtnText
}: CelebrationModalProps) {
  const { celebrationPopup } = useSupabaseGifs()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      isBlur={true}
      priority={2}
      className="bg-white rounded-[1.6rem] p-7.25 md:p-10 w-[90dvw] max-w-117.5 shadow-sm"
      closeOnOverlayClick={false}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6">
          <ImageComponent
            src={celebrationPopup}
            alt="Celebration"
            width={168}
            height={168}
            className="w-30.5 h-30.5 md:w-42 md:h-42"
          />
        </div>
        <Heading
          size="xl"
          className="text-gray-900 text-[2.2rem] md:text-[3rem] font-bold text-center max-w-60"
        >
         {heading}
        </Heading>
        <div className="flex flex-col sm:flex-row gap-2.25 md:gap-3 w-full mt-8">
          <Button
            variant="primary"
            onClick={onContinue}
            className="shrink-0 basis-1/2"
          >
            {continueBtnText || <>Continue</>}
          </Button>
          <Button
            variant="secondary"
            onClick={onGoBack}
            className="shrink-0 basis-1/2"
          >
            {backBtnText || <>Go back</>}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
