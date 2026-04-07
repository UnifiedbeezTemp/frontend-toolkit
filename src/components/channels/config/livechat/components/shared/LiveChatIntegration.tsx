"use client";

import {
  UseFormWatch,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
  Controller,
  useFormState,
} from "react-hook-form";
import { LiveChatFormData } from "../../hooks/useLiveChatConfig";
import LiveChatFormActions from "./LiveChatFormActions";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import { ChannelConnection } from "../../../../../../types/channelConnectionTypes";
import ProfileImageSection from "../../../../../settings/profile/profile-details/ProfileImageSection";
import Input from "../../../../../ui/Input";
import ToggleSwitch from "../../../../../ui/ToggleSwitch";

interface LiveChatFormProps {
  connection?: ChannelConnection | null;
  onSave: (data: LiveChatFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  isDeleting: boolean;
  watch: UseFormWatch<LiveChatFormData>;
  setValue: UseFormSetValue<LiveChatFormData>;
  control: Control<LiveChatFormData>;
  formHandleSubmit: UseFormHandleSubmit<LiveChatFormData>;
  variant?: "desktop" | "mobile";
  className?: string;
}

export default function LiveChatIntegration({
  connection,
  onSave,
  onDelete,
  isLoading,
  isDeleting,
  watch,
  setValue,
  control,
  formHandleSubmit,
  variant,
  className,
}: LiveChatFormProps) {
  const isMobile = variant === "mobile";
  const formPadding = isMobile
    ? "px-[1.2rem] pb-[5rem]"
    : "px-[2.8rem] py-[3.1rem] pr-[1.7rem]";
  const { errors } = useFormState({ control });

  const selectedFile = watch("profilePic");
  const profileImage =
    typeof connection?.configuration?.profilePic === "string"
      ? (connection.configuration.profilePic as string)
      : null;

  const displayName = watch("chatName") || watch("teamName") || "";

  return (
    <form
      onSubmit={formHandleSubmit(onSave)}
      className={`${formPadding} ${className}`}
    >
      <Heading className="text-[1.4rem] lg:text-[2rem]">Profile</Heading>
      <ProfileImageSection
        profileImage={profileImage}
        selectedFile={selectedFile ?? null}
        onImageSelect={(file) => {
          setValue("profilePic", file, { shouldDirty: true });
        }}
        fullName={displayName}
        isEditing={true}
      />

      <div className="border-y border-input-stroke mt-[1.4rem] lg:mt-[2.4rem] py-[1.4rem] lg:py-[2.4rem]">
        <div className="bg-input-filled border-input-stroke border rounded-[1rem] p-[1.4rem] space-y-[2.4rem]">
          <div className="space-y-[1rem]">
            <Heading className="text-[1.4rem] sm:text-[1.6rem]">
              Team-Only Name
            </Heading>
            <Text className="text-[1.2rem] sm:text-[1.4rem]">
              Only you and your team will see this in UnifiedBeez.
            </Text>
            <Controller
              name="teamName"
              control={control}
              rules={{ required: "Team name is required" }}
              render={({ field }) => (
                <Input
                  ref={field.ref}
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  placeholder="Enter a name"
                  className="bg-primary"
                  disabled={isLoading}
                />
              )}
            />
            {errors.teamName?.message ? (
              <Text className="text-destructive text-[1.2rem]">
                {String(errors.teamName.message)}
              </Text>
            ) : null}
          </div>
          <div className="space-y-[1rem]">
            <Heading className="text-[1.4rem] sm:text-[1.6rem]">
              Chat Name
            </Heading>
            <Text className="text-[1.2rem] sm:text-[1.4rem]">
              Shown to users in your Live Chat.
            </Text>
            <Controller
              name="chatName"
              control={control}
              rules={{ required: "Chat name is required" }}
              render={({ field }) => (
                <Input
                  ref={field.ref}
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  placeholder="Enter a name"
                  className="bg-primary"
                  disabled={isLoading}
                />
              )}
            />
            {errors.chatName?.message ? (
              <Text className="text-destructive text-[1.2rem]">
                {String(errors.chatName.message)}
              </Text>
            ) : null}
          </div>
        </div>
      </div>

      <div className="py-[1.4rem] lg:py-[2.4rem] space-y-[1rem]">
        <Heading className="text-[1.4rem] sm:text-[1.6rem]">
          Chat configuration
        </Heading>

        <div className="bg-input-filled border-input-stroke border rounded-[1rem] p-[1.4rem] flex items-center justify-between">
          <div className="">
            <Heading className="text-[1.4rem] sm:text-[1.6rem]">
              Read Receipts
            </Heading>
            <Text className="text-[1.2rem] sm:text-[1.4rem]">
              Let contacts know when you’ve read their message
            </Text>
          </div>

          <Controller
            name="readReceipts"
            control={control}
            render={({ field }) => (
              <ToggleSwitch
                isActive={Boolean(field.value)}
                onToggle={() => field.onChange(!field.value)}
                disabled={isLoading}
              />
            )}
          />
        </div>
      </div>

      <LiveChatFormActions
        connection={connection}
        onDelete={onDelete}
        isLoading={isLoading}
        isDeleting={isDeleting}
        variant={variant}
      />
    </form>
  );
}
