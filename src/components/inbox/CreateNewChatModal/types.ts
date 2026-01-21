export interface ChannelOption {
  value: string
  label: string
}

export interface CreateNewChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface ChannelSelectorProps {
  selectedChannel: string
  selectedChannelLabel: string
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onSelect: (value: string) => void
  triggerRef: React.RefObject<HTMLInputElement | null>
}

export interface ContactListButtonProps {
  onClick: () => void
}
