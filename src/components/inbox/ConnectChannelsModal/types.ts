export interface Channel {
  id: string
  name: string
  icon: string
  identifier: string // e.g., "Brian", "+234 9029220646", "Brian@gmail.com"
}

export interface ChannelAccount {
  id: string
  phoneNumber?: string
  email?: string
  name: string
  isConnected: boolean
  status?: "connected" | "disconnected"
}

export interface ConnectChannelsModalProps {
  isOpen: boolean
  onClose: () => void
  selectedChannelId?: string
  onChannelSelect?: (channelId: string) => void
}
