export interface MessageOptionsMenuProps {
  isOpen: boolean
  onClose: () => void
  messageId: string
  messageText: string
  onPin: (messageId: string) => void
  onReply?: (messageId: string) => void
  onShare?: (messageId: string) => void
  onEdit?: (messageId: string) => void
  onDelete?: (messageId: string) => void
  triggerRef?: React.RefObject<HTMLElement | null>
}
