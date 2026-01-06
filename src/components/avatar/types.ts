export type AvatarItem =
  | {
      id: string
      type: "image"
      src: string
      alt: string
    }
  | {
      id: string
      type: "initial"
      label: string
      bgColor: string
      textColor?: string
    }

export interface AvatarGroupProps {
  items: AvatarItem[]
  size?: number
  overlap?: number
  onItemClick?: (item: AvatarItem) => void
  overlapDirection?: "left" | "right"
}
