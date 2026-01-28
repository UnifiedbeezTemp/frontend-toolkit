import { WhatsAppTemplate } from "../WhatsAppTemplateDropdown/types"

export interface TemplatePreviewProps {
  template: WhatsAppTemplate | null
  isOpen: boolean
  triggerRef: React.RefObject<HTMLElement | null>
}
