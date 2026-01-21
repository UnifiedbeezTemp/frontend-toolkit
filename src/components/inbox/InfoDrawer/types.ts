export interface InfoDrawerProps {
  isOpen: boolean
  onClose: () => void
  conversationId?: string
}

export interface Thread {
  id: string
  title: string
  replyCount: number
  lastActivity: string
}

export interface Comment {
  id: string
  author: string
  text: string
  timestamp: string
}

export interface Note {
  id: string
  text: string
  color: string
  timestamp: string
}

export interface File {
  id: string
  name: string
  size: string
  type: string
  thumbnail?: string
}
