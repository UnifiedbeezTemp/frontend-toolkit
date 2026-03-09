import React from "react";
import Input from "../../../forms/Input";
import Textarea from "../../../forms/Textarea";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../../smart-dropdown/DropdownItem";
import { useCreateList } from "./useCreateList";
import { CRMList } from "../types";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import Button from "../../../ui/Button";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import { getChannelIcon } from "../utils";

interface CreateListFormProps {
  onClose: () => void;
  addList: (list: CRMList) => void;
}

export default function CreateListForm({
  onClose,
  addList,
}: CreateListFormProps) {
  const {
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
    automationTypes,
    channels,
  } = useCreateList(onClose, addList);

  const icons = useSupabaseIcons();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[2rem] pt-[1.6rem]"
    >
      <Input
        label="List name"
        placeholder="e.g Email List, Campaign Letter"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        showRequired
        required
      />

      <Input
        label="List URL"
        placeholder="https://"
        value={formData.url}
        onChange={(e) => handleInputChange("url", e.target.value)}
        showRequired
        required
        helperText="Enter your company's website URL. This is required for compliance and verification."
      />

      <Textarea
        label="List description"
        placeholder="Describe your list so your team stays aligned. Contacts will not see this description."
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />

      <div className="flex flex-col gap-[0.8rem] relative">
        <label className="text-text-secondary text-[1.6rem] font-[700]">
          Group
        </label>
        <button
          type="button"
          ref={groupTriggerRef}
          onClick={() => setIsGroupDropdownOpen(true)}
          className="w-full flex items-center justify-between px-[1.4rem] py-[1rem] border border-border rounded-[0.8rem] bg-primary text-[1.4rem] hover:border-brand-primary transition-colors h-[4.4rem]"
        >
          <span className="text-text-primary">{formData.group}</span>
          <ChevronDownIcon size={16} color="var(--text-primary-2)" />
        </button>
        <SmartDropdown
          isOpen={isGroupDropdownOpen}
          onClose={() => setIsGroupDropdownOpen(false)}
          triggerRef={groupTriggerRef}
          className="lg:w-[55.2rem]"
        >
          <div className="p-2">
            {automationTypes.map((type) => (
              <DropdownItem
                key={type}
                onClick={() => handleSelectGroup(type)}
                className={formData.group === type ? "bg-accent" : ""}
              >
                {type}
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <div className="flex flex-col gap-[0.8rem] relative">
        <label className="text-text-secondary text-[1.6rem] font-[700]">
          Marketing channel
        </label>
        <button
          type="button"
          ref={channelTriggerRef}
          onClick={() => setIsChannelDropdownOpen(true)}
          className="w-full flex items-center justify-between px-[1.4rem] py-[1rem] border border-border rounded-[0.8rem] bg-primary text-[1.4rem] hover:border-brand-primary transition-colors h-[4.4rem]"
        >
          <div className="flex items-center gap-[0.8rem]">
            <ImageComponent
              src={getChannelIcon(formData.marketingChannel, icons)}
              alt={formData.marketingChannel}
              width={20}
              height={20}
            />
            <span className="text-text-primary">
              {formData.marketingChannel}
            </span>
          </div>
          <ChevronDownIcon size={16} color="var(--text-primary-2)" />
        </button>
        <SmartDropdown
          isOpen={isChannelDropdownOpen}
          onClose={() => setIsChannelDropdownOpen(false)}
          triggerRef={channelTriggerRef}
          className="lg:w-[55.2rem]"
        >
          <div className="p-2">
            {channels.map((channel) => (
              <DropdownItem
                key={channel}
                onClick={() => handleSelectChannel(channel)}
                className={
                  formData.marketingChannel === channel ? "bg-accent" : ""
                }
              >
                <div className="flex items-center gap-[0.8rem]">
                  <ImageComponent
                    src={getChannelIcon(channel, icons)}
                    alt={channel}
                    width={20}
                    height={20}
                  />
                  <span>{channel}</span>
                </div>
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <Textarea
        label="Follow-Up Message"
        placeholder="Explain to your contacts why they are part of this list. This note will be inserted into emails using the %SENDER-LIST-REMINDER% tag."
        value={formData.followUpMessage}
        onChange={(e) => handleInputChange("followUpMessage", e.target.value)}
        required
      />

      <div className="flex items-center gap-[1.2rem] mt-[1rem]">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          className="w-full h-[4.4rem]"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full h-[4.4rem] grad-btn">
          Save
        </Button>
      </div>
    </form>
  );
}
