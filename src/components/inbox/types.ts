export interface TagPillProps {
  label: string
  showIcon?: boolean
  className?: string
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
