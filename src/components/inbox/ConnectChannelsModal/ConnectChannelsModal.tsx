import { useState } from "react"
import Modal from "../../modal/Modal"
import CloseModalButton from "../../modal/CloseModalButton"
import ChannelListPanel from "./components/ChannelListPanel"
import AccountListPanel from "./components/AccountListPanel"
import { ConnectChannelsModalProps } from "./types"
import { connectedChannels, channelAccounts } from "./constants"

export default function ConnectChannelsModal({
  isOpen,
  onClose,
  selectedChannelId: initialSelectedChannelId,
  onChannelSelect: externalOnChannelSelect,
}: ConnectChannelsModalProps) {
  const [selectedChannelId, setSelectedChannelId] = useState<string>(
    initialSelectedChannelId || "whatsapp"
  )

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannelId(channelId)
    externalOnChannelSelect?.(channelId)
  }

  const selectedChannel = connectedChannels.find(
    (ch) => ch.id === selectedChannelId
  )
  const accounts = selectedChannel
    ? channelAccounts[selectedChannelId] || []
    : []

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[90dvw] max-w-[120rem] rounded-[1.6rem] p-0"
      size="xl"
    >
      <div className="flex h-[80vh]">
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <CloseModalButton onClick={onClose} />
        </div>

        {/* Left Panel - Channel List */}
        <div className="w-[40%] border-r border-input-stroke p-6">
          <ChannelListPanel
            channels={connectedChannels}
            selectedChannelId={selectedChannelId}
            onChannelSelect={handleChannelSelect}
          />
        </div>

        {/* Right Panel - Account List */}
        <div className="flex-1 p-6">
          <AccountListPanel channel={selectedChannel || null} accounts={accounts} />
        </div>
      </div>
    </Modal>
  )
}
