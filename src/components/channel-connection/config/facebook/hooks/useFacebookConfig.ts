import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChannelConnection, ChannelConnectionFormData } from "../../../../../types/channelConnectionTypes";

export interface FacebookFormData {
  name: string;
  readConfirmation: boolean;
  profileImageUrl?: string | null;
}

export function useFacebookConfig(connection?: ChannelConnection | null) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [readConfirmation, setReadConfirmation] = useState(false);

  const {
    control,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    register,
    reset,
  } = useForm<FacebookFormData>({
    defaultValues: {
      name:
        typeof connection?.configuration?.name === "string"
          ? connection.configuration.name
          : "",
      readConfirmation:
        typeof connection?.configuration?.readConfirmation === "boolean"
          ? connection.configuration.readConfirmation
          : false,
    },
  });

  useEffect(() => {
    if (connection?.configuration) {
      const nextProfileUrl =
        typeof connection.configuration.profileImageUrl === "string"
          ? connection.configuration.profileImageUrl
          : null;
      reset({
        name:
          typeof connection.configuration.name === "string"
            ? connection.configuration.name
            : "",
        readConfirmation:
          typeof connection.configuration.readConfirmation === "boolean"
            ? connection.configuration.readConfirmation
            : false,
        profileImageUrl: nextProfileUrl,
      });
      setProfileImage(null);
      setProfileImageUrl(nextProfileUrl);
      setReadConfirmation(
        typeof connection.configuration.readConfirmation === "boolean"
          ? connection.configuration.readConfirmation
          : false
      );
    } else {
      reset({
        name: "",
        readConfirmation: false,
        profileImageUrl: null,
      });
      setProfileImage(null);
      setProfileImageUrl(null);
      setReadConfirmation(false);
    }
  }, [connection, reset]);

  const handleImageSelect = (file: File) => {
    setProfileImage(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const prepareFormData = (data: FacebookFormData): ChannelConnectionFormData => {
    const formData: ChannelConnectionFormData = {
      name: data.name || "",
      readConfirmation: readConfirmation,
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
    handleImageSelect,
    prepareFormData,
  };
}

