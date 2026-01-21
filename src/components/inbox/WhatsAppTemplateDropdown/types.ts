export interface WhatsAppTemplate {
  id: string
  name: string
  content: string
  variables?: string[]
}

export interface WhatsAppTemplateDropdownProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onTemplateSelect?: (template: WhatsAppTemplate) => void
  onTemplateHover?: (template: WhatsAppTemplate | null) => void
}
