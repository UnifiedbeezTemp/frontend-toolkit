export interface AssignChatDropdownProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  assignedUserIds?: string[]
  onAssign?: (userId: string) => void
  onUnassign?: (userId: string) => void
}

export interface AssignableUser {
  id: string
  name: string
  avatarUrl?: string
  email?: string
}
