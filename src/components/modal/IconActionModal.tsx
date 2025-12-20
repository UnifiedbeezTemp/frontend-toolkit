"use client"

import Modal from "./Modal"
import CloseModalButton from "./CloseModalButton"
import Button from "../ui/Button"
import Heading from "../ui/Heading"
import Text from "../ui/Text"
import ImageComponent from "../ui/ImageComponent"

export interface IconActionModalProps {
  isOpen: boolean
  onClose: () => void
  icon: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  title: string
  description?: string
  primaryAction: {
    label: string
    onClick: () => void
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
    loading?: boolean
    disabled?: boolean
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
    loading?: boolean
    disabled?: boolean
  }
  iconContainerClassName?: string
  iconClassName?: string
  modalClassName?: string
  showCloseButton?: boolean
}

export default function IconActionModal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  iconContainerClassName = "rounded-full border-[.8rem] border-secondary-5 items-center bg-secondary-15 flex justify-center p-2 w-[4.8rem] h-[4.8rem]",
  iconClassName = "filter-[brightness(0)_saturate(100%)_invert(67%)_sepia(93%)_saturate(1352%)_hue-rotate(1deg)_brightness(102%)]",
  modalClassName,
  showCloseButton = true,
}: IconActionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={
        modalClassName ||
        "bg-white rounded-[2.2rem] p-6 md:p-8 w-[90dvw] max-w-100"
      }
    >
      <div className="relative">
        <div className="absolute top-0 left-0">
          <div className={iconContainerClassName}>
            <ImageComponent
              src={icon.src}
              alt={icon.alt}
              width={icon.width || 20}
              height={icon.height || 20}
              className={iconClassName}
            />
          </div>
        </div>
        {showCloseButton && (
          <div className="absolute top-0 right-0">
            <CloseModalButton
              onClick={onClose}
              className="bg-input-filled"
            />
          </div>
        )}
        <div className="pt-16 pb-6">
          <Heading
            size="xl"
            className="text-gray-900 font-bold text-lg mb-1 text-left"
          >
            {title}
          </Heading>

          {description && (
            <Text className="text-gray-600 mb-8.75 text-left text-md max-w-74">
              {description}
            </Text>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || "secondary"}
                onClick={secondaryAction.onClick}
                loading={secondaryAction.loading}
                disabled={secondaryAction.disabled}
                className="shrink-0 grow basis-1/2"
              >
                {secondaryAction.label}
              </Button>
            )}
            <Button
              variant={primaryAction.variant || "primary"}
              onClick={primaryAction.onClick}
              loading={primaryAction.loading}
              disabled={primaryAction.disabled}
              className="shrink-0 grow basis-1/2"
            >
              {primaryAction.label}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
