import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChannelConnection, ChannelConnectionFormData } from "../../../../../types/channelConnectionTypes";

export interface InstagramFormData {
  profileName: string;
  readConfirmation: boolean;
  quickReactions: boolean;
  mentions: boolean;
  conversationStarters: boolean;
  profileImageUrl?: string | null;
}

export function useInstagramConfig(connection?: ChannelConnection | null) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [readConfirmation, setReadConfirmation] = useState(false);
  const [quickReactions, setQuickReactions] = useState(false);
  const [mentions, setMentions] = useState(false);
  const [conversationStarters, setConversationStarters] = useState(false);

  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<InstagramFormData>({
    defaultValues: {
      profileName: typeof connection?.configuration?.profileName === 'string' ? connection.configuration.profileName : "",
      readConfirmation: typeof connection?.configuration?.readConfirmation === 'boolean' ? connection.configuration.readConfirmation : false,
      quickReactions: typeof connection?.configuration?.quickReactions === 'boolean' ? connection.configuration.quickReactions : false,
      mentions: typeof connection?.configuration?.mentions === 'boolean' ? connection.configuration.mentions : false,
      conversationStarters: typeof connection?.configuration?.conversationStarters === 'boolean' ? connection.configuration.conversationStarters : false,
      profileImageUrl: typeof connection?.configuration?.profileImageUrl === 'string' ? connection.configuration.profileImageUrl : null,
    },
  });

  useEffect(() => {
    if (connection?.configuration) {
      const nextProfileUrl = connection.configuration.profileImageUrl || null;
      // reset({
      //   profileName: connection.configuration.profileName || "",
      //   readConfirmation: connection.configuration.readConfirmation || false,
      //   quickReactions: connection.configuration.quickReactions || false,
      //   mentions: connection.configuration.mentions || false,
      //   conversationStarters: connection.configuration.conversationStarters || false,
      //   profileImageUrl: nextProfileUrl,
      // });
      // setProfileImage(null);
      // setProfileImageUrl(nextProfileUrl);
      // setReadConfirmation(connection.configuration.readConfirmation || false);
      // setQuickReactions(connection.configuration.quickReactions || false);
      // setMentions(connection.configuration.mentions || false);
      // setConversationStarters(connection.configuration.conversationStarters || false);
    } else {
      reset({
        profileName: "",
        readConfirmation: false,
        quickReactions: false,
        mentions: false,
        conversationStarters: false,
        profileImageUrl: null,
      });
      setProfileImage(null);
      setProfileImageUrl(null);
      setReadConfirmation(false);
      setQuickReactions(false);
      setMentions(false);
      setConversationStarters(false);
    }
  }, [connection, reset]);

  const handleImageSelect = (file: File) => {
    setProfileImage(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const prepareFormData = (data: InstagramFormData): ChannelConnectionFormData => {
    const formData: ChannelConnectionFormData = {
      name: data.profileName || "",
      profileName: data.profileName || "",
      readConfirmation,
      quickReactions,
      mentions,
      conversationStarters,
    };

    if (profileImage) {
      formData.profileImageUrl = URL.createObjectURL(profileImage);
    } else if (profileImageUrl && !profileImage) {
      formData.profileImageUrl = profileImageUrl;
    }

    return formData;
  };

  return {
    control,
    formHandleSubmit,
    setValue,
    watch,
    register,
    profileImage,
    profileImageUrl,
    readConfirmation,
    setReadConfirmation,
    quickReactions,
    setQuickReactions,
    mentions,
    setMentions,
    conversationStarters,
    setConversationStarters,
    handleImageSelect,
    prepareFormData,
  };
}

