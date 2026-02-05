export type InboxType = "general" | "team"

export interface LabelContactMethod {
  id: string
  icon: string
  text: string
  type: "phone" | "email" | "website" | "channel"
  value?: string
}

export interface Label {
  id: string
  icon: string
  text: string
  contactMethods: LabelContactMethod[]
}

export interface AssignedUser {
  id: string
  name: string
  avatarUrl?: string
  email?: string
}

export interface Conversation {
  id: string
  name: string
  preview: string
  timestamp: string
  avatarColor: string
  avatarUrl?: string
  tagId?: string
  tag?: string
  unreadCount?: number
  isGroup?: boolean
  participants?: string[]
  participantAvatars?: string[]
  participantCount?: number
  channel?:
    | "whatsapp"
    | "instagram"
    | "facebook"
    | "telegram"
    | "linkedin"
    | "sms"
    | "email"
    | "phone"
    | "website-chat"
  labelIds?: string[]
  assignedTo?: AssignedUser[]
}

export interface TagPillProps {
  label: string
  showIcon?: boolean
  className?: string
  isDismissable?: boolean
  onDismiss?: () => void
  tagIconSize?: number,
  dismissIconSize?: number
}

export type FieldType =
  | "text"
  | "badge"
  | "avatarGroup"
  | "dropdown"
  | "dateRange"
  | "toggle"
  | "link"
  | "tag"

export interface AttributeField {
  id: string
  icon: string
  label: string
  value: string | string[] | boolean
  type: FieldType
  badgeVariant?: "default" | "urgent" | "info"
  avatars?: string[]
  avatarCount?: number
  hasDropdown?: boolean
  linkText?: string
}

export interface AttributeSection {
  id: string
  title: string
  icon: string
  fields: AttributeField[]
  defaultExpanded?: boolean
}

export interface Tag {
  id: string
  label: string
  category: CategoryId
}

export interface Category {
  id: CategoryId
  title: string
  tags: Tag[]
}

export type CategoryId =
  | "contact-type"
  | "intent-action"
  | "source-origin"
  | "engagement-level"
  | "actions-behavior"
