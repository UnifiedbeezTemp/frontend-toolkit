import { useState, useRef } from "react"
import { channelOptions } from "../constants"
import { ChannelOption } from "../types"

export function useCreateNewChatModal() {
  const [toValue, setToValue] = useState("")
  const [selectedChannel, setSelectedChannel] = useState<string>("")
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false)
  const channelTriggerRef = useRef<HTMLInputElement>(null)

  const selectedChannelLabel =
    channelOptions.find((opt) => opt.value === selectedChannel)?.label || ""

  const handleToChange = (value: string) => {
    setToValue(value)
  }

  const handleChannelSelect = (channelValue: string) => {
    setSelectedChannel(channelValue)
    setIsChannelDropdownOpen(false)
  }

  const toggleChannelDropdown = () => {
    setIsChannelDropdownOpen(!isChannelDropdownOpen)
  }

  const closeChannelDropdown = () => {
    setIsChannelDropdownOpen(false)
  }

  const handleSubmit = (onClose: () => void) => {
    // Handle form submission here
    console.log("To:", toValue)
    console.log("From:", selectedChannel)
    // Close modal after submission
    onClose()
    // Reset form
    resetForm()
  }

  const handleContactListClick = () => {
    // Handle contact list navigation
    console.log("Open contact list")
    // You can implement navigation or another modal here
  }

  const resetForm = () => {
    setToValue("")
    setSelectedChannel("")
    setIsChannelDropdownOpen(false)
  }

  const isFormValid = toValue.trim() !== "" && selectedChannel !== ""

  return {
    // State
    toValue,
    selectedChannel,
    selectedChannelLabel,
    isChannelDropdownOpen,
    channelTriggerRef,
    isFormValid,
    // Actions
    handleToChange,
    handleChannelSelect,
    toggleChannelDropdown,
    closeChannelDropdown,
    handleSubmit,
    handleContactListClick,
    resetForm,
  }
}
