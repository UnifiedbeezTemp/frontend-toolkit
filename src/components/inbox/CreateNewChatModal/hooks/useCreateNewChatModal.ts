import { useState, useRef } from "react";
import { channelOptions } from "../constants";
import { ChannelOption } from "../types";
import { useRouter } from "next/navigation";
import { useConversations } from "../../../../../../app/inbox/context/ConversationContext";

export function useCreateNewChatModal() {
  const [toValue, setToValue] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const channelTriggerRef = useRef<HTMLInputElement>(null);
  const { addConversation } = useConversations();
  const router = useRouter();

  const selectedChannelLabel =
    channelOptions.find((opt) => opt.value === selectedChannel)?.label || "";

  const handleToChange = (value: string) => {
    setToValue(value);
  };

  const handleChannelSelect = (channelValue: string) => {
    setSelectedChannel(channelValue);
    setIsChannelDropdownOpen(false);
  };

  const toggleChannelDropdown = () => {
    setIsChannelDropdownOpen(!isChannelDropdownOpen);
  };

  const closeChannelDropdown = () => {
    setIsChannelDropdownOpen(false);
  };

  const handleSubmit = (onClose: () => void) => {
    const newId = Math.random().toString(36).substr(2, 9);
    addConversation({
      id: newId,
      name: toValue,
      preview: "New conversation started",
      timestamp: "Just now",
      avatarColor: "bg-brand-primary",
      channel: selectedChannel as any, // Cast for demo
      unreadCount: 0,
    });

    onClose();
    resetForm();
    router.push(`/inbox/${newId}`);
  };

  const handleContactListClick = () => {
    // Handle contact list navigation
    console.log("Open contact list");
    // You can implement navigation or another modal here
  };

  const resetForm = () => {
    setToValue("");
    setSelectedChannel("");
    setIsChannelDropdownOpen(false);
  };

  const isFormValid = toValue.trim() !== "" && selectedChannel !== "";

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
  };
}
