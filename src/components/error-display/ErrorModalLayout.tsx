import Modal from "../modal/Modal";
import CloseModalButton from "../modal/CloseModalButton";
import { cn } from "../../lib/utils";
import { ErrorModalLayoutProps } from "./types";

export default function ErrorModalLayout({
  isOpen,
  onClose,
  icon,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  modalClassName,
}: ErrorModalLayoutProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      isBlur={true}
      priority={1}
      className={cn(
        "bg-primary rounded-[2.2rem] p-6 md:p-8 w-[90dvw] max-w-105.5",
        modalClassName
      )}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <div className="relative">
        <div className="absolute top-0 left-0">{icon}</div>
        {showCloseButton && (
          <div className="absolute top-0 right-0">
            <CloseModalButton onClick={onClose} className="bg-input-filled" />
          </div>
        )}
        <div className="pt-16 pb-6">{children}</div>
      </div>
    </Modal>
  );
}
