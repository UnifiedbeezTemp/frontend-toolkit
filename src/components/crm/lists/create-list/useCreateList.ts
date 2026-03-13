import { useState, useRef, FormEvent } from "react";
import { CRMList } from "../types";
import { MarketingChannel } from "../../shared/types";
import { AUTOMATION_TYPES } from "../../../../constants/automations";
import { CHANNELS } from "../utils";

interface CreateListFormData {
  name: string;
  url: string;
  description: string;
  group: string;
  marketingChannel: MarketingChannel;
  followUpMessage: string;
}

export function useCreateList(
  onClose: () => void,
  addList: (list: CRMList) => void,
) {
  const [formData, setFormData] = useState<CreateListFormData>({
    name: "",
    url: "",
    description: "",
    group: AUTOMATION_TYPES[0],
    marketingChannel: CHANNELS[0],
    followUpMessage: "",
  });

  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);

  const groupTriggerRef = useRef<HTMLButtonElement>(null);
  const channelTriggerRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (
    field: keyof CreateListFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectGroup = (group: string) => {
    handleInputChange("group", group);
    setIsGroupDropdownOpen(false);
  };

  const handleSelectChannel = (channel: MarketingChannel) => {
    handleInputChange("marketingChannel", channel);
    setIsChannelDropdownOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newList: CRMList = {
      id: `list-${Date.now()}`,
      name: formData.name,
      label: formData.description || "No label",
      activeContacts: 0,
      marketingChannel: formData.marketingChannel,
      onSubmissionAction: "Subscribe to list",
      submissions: 0,
      createdAt: new Date().toISOString(),
      category: formData.group,
    };

    addList(newList);
    onClose();
  };

  return {
    formData,
    isGroupDropdownOpen,
    setIsGroupDropdownOpen,
    isChannelDropdownOpen,
    setIsChannelDropdownOpen,
    groupTriggerRef,
    channelTriggerRef,
    handleInputChange,
    handleSelectGroup,
    handleSelectChannel,
    handleSubmit,
    automationTypes: AUTOMATION_TYPES,
    channels: CHANNELS,
  };
}
