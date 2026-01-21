export interface FileAttachmentDropdownProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  isWhatsApp?: boolean
  onRefresh?: () => void
  onFile?: () => void
  onMedia?: () => void
  onWhatsAppTemplate?: () => void
}

export type FileAttachmentOption = "refresh" | "file" | "media" | "whatsapp-template"
