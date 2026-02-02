"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import ImageUploadSection from "../../../../../components/image-upload-section/ImageUploadSection";
import Input from "../../../../../components/forms/Input";
import ToggleSwitch from "../../../../../components/ui/ToggleSwitch";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { InstagramFormDesktopProps } from "../types";
import { prepareFormSubmitData, getDisplayNameInitial } from "../utils/formUtils";

export default function InstagramFormDesktop({
  connection,
  onSave,
  onDelete,
  isLoading,
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
}: InstagramFormDesktopProps) {
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
    <form onSubmit={handleSubmit} className="px-[2.8rem] py-[3.1rem] pr-[1.7rem]">
      <div className="space-y-[2.4rem]">
        <ImageUploadSection
          image={profileImageUrl}
          selectedFile={profileImage}
          displayName={getDisplayNameInitial(watch)}
          onImageSelect={onImageSelect}
          title="Profile image (Optional)"
          description="Displayed as your profile image on your Instagram Chat."
          isEditing={true}
          size="md"
          optional={true}
        />

        <div className="space-y-[2.4rem] border-t border-input-stroke pt-[2.4rem]">
         <div className="bg-input-filled border border-input-stroke px-[1.6rem] py-[2.4rem] rounded-[0.8rem]">
         <div className="space-y-[2.4rem]">
            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.6rem]">
                  Instagram profile
                </Heading>
              </label>
              <Input
                {...register("profileName", { required: true })}
                placeholder="Ariana Grande"
                className="text-[1.6rem]"
                inputClassName="text-[1.6rem] placeholder:text-[1.6rem]"
              />
            </div>
          </div>

          <div className="space-y-[1.6rem] border-t mt-[2.4rem] pt-[2.4rem] border-input-stroke">
            <div className="flex items-center justify-between">
              <div>
                <Heading size="sm" className="text-[1.6rem]">
                  Quick reactions
                </Heading>
                <Text size="sm">
                  Enable to see quick reactions on your Instagram story on UnifiedBeez
                </Text>
              </div>
              <ToggleSwitch
                isActive={quickReactions}
                onToggle={() => setQuickReactions(!quickReactions)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Heading size="sm" className="text-[1.6rem]">
                  Mentions
                </Heading>
                <Text size="sm">
                  Enable to receive notifications for all mentions on UnifiedBeez
                </Text>
              </div>
              <ToggleSwitch
                isActive={mentions}
                onToggle={() => setMentions(!mentions)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Heading size="sm" className="text-[1.6rem]">
                  Conversation starters
                </Heading>
                <Text size="sm">
                  Add up to 4 questions your contacts can use to initiate a conversation
                </Text>
              </div>
              <ToggleSwitch
                isActive={conversationStarters}
                onToggle={() => setConversationStarters(!conversationStarters)}
              />
            </div>
          </div>
         </div>

          <div className="border-t border-input-stroke pt-[2.4rem]">
            <Heading className="text-[2rem] mb-[1.6rem]">
              Chat configuration
            </Heading>
            <div className="bg-input-filled border border-input-stroke px-[1.6rem] py-[2.4rem] rounded-[0.8rem] flex items-center justify-between">
              <div>
                <Heading size="sm" className="text-[1.6rem]">
                  Read Receipts
                </Heading>
                <Text size="sm">
                  Show contacts when you've read their message.
                </Text>
              </div>
              <ToggleSwitch
                isActive={readConfirmation}
                onToggle={() => setReadConfirmation(!readConfirmation)}
              />
            </div>
          </div>

          <div className="flex items-center gap-[1rem] justify-end pt-[2.4rem]">
            {connection && (
              <Button
                type="button"
                variant="dangerReverse"
                className="text-[1.6rem] flex items-center gap-[.5rem] px-[1.6rem]"
                onClick={onDelete}
              >
                <ImageComponent
                  src={icons.trashRed}
                  alt="trash"
                  width={20}
                  height={20}
                />
                Delete Channel
              </Button>
            )}
            <Button
              type="submit"
              className="highlight-inside border-0 text-[1.6rem] px-[3rem]"
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

