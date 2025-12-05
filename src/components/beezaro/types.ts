
export type BotPersonalityTheme ="default" | "blue" | "green" | "yellow"

export interface BotItemProps{
  botName: string
  botImage?: string
  botPersonality: string
  botPersonalityTheme?: BotPersonalityTheme
  showEditButton?: boolean
  showDeleteButton?: boolean
  onEdit: () => void
  onDelete: () => void
}