"use client";

import CloseModalButton from "../../../../../components/modal/CloseModalButton";
import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import ImageUploadSection from "../../../../../components/image-upload-section/ImageUploadSection";
import FormField from "../../../../../components/forms/FormField";
import ToggleSwitch from "../../../../../components/ui/ToggleSwitch";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { InstagramFormMobileProps } from "../types";
import { prepareFormSubmitData, getDisplayNameInitial } from "../utils/formUtils";

export default function InstagramFormMobile({
  channel,
  connection,
  onSave,
  onDelete,
  onCancel,
  isLoading,
  control,
  watch,
  register,
  readConfirmation,
  setReadConfirmation,
  quickReactions,
  setQuickReactions,
  mentions,
  setMentions,
  conversationStarters,
  setConversationStarters,
  profileImageUrl,
  profileImage,
  onImageSelect,
}: InstagramFormMobileProps) {
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = prepareFormSubmitData(
      watch,
      readConfirmation,
      quickReactions,
      mentions,
      conversationStarters,
      profileImage,
      profileImageUrl
    );
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="px-[1.2rem] pb-[5rem]">
      <div className="flex items-center justify-between py-[1.6rem] border-b border-border">
        <div className="flex flex-col">
          <Heading className="text-[1.4rem]">Instagram settings</Heading>
          <Text className="text-text-primary text-[1.2rem]">
            {connection ? "Edit Instagram settings" : "Configure Instagram settings"}
          </Text>
        </div>
        <CloseModalButton
          onClick={onCancel}
          className="bg-input-filled py-[0.5rem] px-[0.7rem]"
        />
      </div>

      <div className="py-[1.6rem]">
        <div className="flex items-center gap-[0.8rem]">
          <ImageComponent
            src={channel.icon}
            alt={channel.name}
            width={35}
            height={35}
          />
          <div>
            <Heading className="text-[1.4rem]">{channel.name}</Heading>
            <Text className="text-[1.2rem]">
              {connection ? "Edit Instagram settings" : "Configure Instagram settings"}
            </Text>
          </div>
        </div>
      </div>

      <div>
        <ImageUploadSection
          image={profileImageUrl}
          selectedFile={profileImage}
          displayName={getDisplayNameInitial(watch)}
          onImageSelect={onImageSelect}
          title="Profile image (Optional)"
          description="Display as your profile image on your Instagram Chat"
          isEditing={true}
          size="sm"
        />

        <div className="mt-[2.4rem] border-t border-input-stroke">
          <div className="space-y-[2.4rem] py-[2.4rem] rounded-[0.8rem]">
            <FormField
              name="profileName"
              control={control}
              label="Instagram profile"
              placeholder="Ariana Grande"
              labelClassName="text-[1.4rem]"
              inputClassName="text-[1.4rem] placeholder:text-[1.4rem]"
              required
            />

            <div className="space-y-[.4rem] border-t border-input-stroke pt-[1.6rem]">
              <div className="flex items-center justify-between gap-[.5rem]">
                <Heading className="text-[1.6rem]">Quick reactions</Heading>
                <ToggleSwitch
                  isActive={quickReactions}
                  onToggle={() => setQuickReactions(!quickReactions)}
                />
              </div>
              <Text className="text-[1.4rem] mb-[1rem] max-w-[80%]">
                Enable to see quick reactions on your Instagram story on UnifiedBeez
              </Text>
            </div>

            <div className="space-y-[.4rem] border-t border-input-stroke pt-[1.6rem]">
              <div className="flex items-center justify-between gap-[.5rem]">
                <Heading className="text-[1.6rem]">Mentions</Heading>
                <ToggleSwitch
                  isActive={mentions}
                  onToggle={() => setMentions(!mentions)}
                />
              </div>
              <Text className="text-[1.4rem] mb-[1rem] max-w-[80%]">
                Enable to receive notifications for all mentions on UnifiedBeez
              </Text>
            </div>

            <div className="space-y-[.4rem] border-t border-input-stroke pt-[1.6rem]">
              <div className="flex items-center justify-between gap-[.5rem]">
                <Heading className="text-[1.6rem]">Conversation starters</Heading>
                <ToggleSwitch
                  isActive={conversationStarters}
                  onToggle={() => setConversationStarters(!conversationStarters)}
                />
              </div>
              <Text className="text-[1.4rem] mb-[1rem] max-w-[80%]">
                Add up to 4 questions your contacts can use to initiate a conversation
              </Text>
            </div>

            <div className="space-y-[.4rem] border-t border-input-stroke pt-[1.6rem]">
              <div className="flex items-center justify-between gap-[.5rem]">
                <Heading className="text-[1.6rem]">Read confirmation</Heading>
                <ToggleSwitch
                  isActive={readConfirmation}
                  onToggle={() => setReadConfirmation(!readConfirmation)}
                />
              </div>
              <Text className="text-[1.4rem] mb-[1rem] max-w-[80%]">
                Activate to show contacts that you have read their message
              </Text>
            </div>

            <div className="flex items-center gap-[1rem] justify-between mt-[4rem]">
              {connection && (
                <Button
                  type="button"
                  variant="dangerReverse"
                  className="w-full text-[1.4rem]"
                  onClick={onDelete}
                >
                  Delete channel integration
                </Button>
              )}
              <Button
                type="submit"
                className={`${connection ? "w-[30%] sm:w-full" : "w-full"} highlight-inside border-0 text-[1.4rem]`}
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

