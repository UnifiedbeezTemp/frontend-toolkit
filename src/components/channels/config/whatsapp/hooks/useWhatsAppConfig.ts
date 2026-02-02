import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ChannelConnection,
  ChannelConnectionFormData,
} from "../../../../types/channelConnectionTypes";

export interface WhatsAppFormData {
  internalName: string;
  displayName: string;
  phoneNumber: string;
  businessName: string;
  description: string;
  info: string;
  readConfirmation: boolean;
  profileImageUrl?: string | null;
}

export interface WhatsAppConfiguration {
  internalName?: string;
  displayName?: string;
  phoneNumber?: string;
  businessName?: string;
  description?: string;
  info?: string;
  readConfirmation?: boolean;
  profileImageUrl?: string | null;
}

export function useWhatsAppConfig(connection?: ChannelConnection | null) {
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
  } = useForm<WhatsAppFormData>({
    defaultValues: {
      internalName:
        (connection?.configuration as WhatsAppConfiguration)?.internalName ||
        "",
      displayName:
        (connection?.configuration as WhatsAppConfiguration)?.displayName || "",
      phoneNumber:
        (connection?.configuration as WhatsAppConfiguration)?.phoneNumber || "",
      businessName:
        (connection?.configuration as WhatsAppConfiguration)?.businessName ||
        "",
      description:
        (connection?.configuration as WhatsAppConfiguration)?.description || "",
      info: (connection?.configuration as WhatsAppConfiguration)?.info || "",
      readConfirmation:
        (connection?.configuration as WhatsAppConfiguration)
          ?.readConfirmation || false,
    },
  });

  useEffect(() => {
    if (connection?.configuration) {
      const config = connection.configuration as WhatsAppConfiguration;
      const nextProfileUrl = config.profileImageUrl || null;
      reset({
        internalName: config.internalName || "",
        displayName: config.displayName || "",
        phoneNumber: config.phoneNumber || "",
        businessName: config.businessName || "",
        description: config.description || "",
        info: config.info || "",
        readConfirmation: config.readConfirmation || false,
        profileImageUrl: nextProfileUrl,
      });
      setProfileImage(null);
      setProfileImageUrl(nextProfileUrl);
      setReadConfirmation(config.readConfirmation || false);
    } else {
      reset({
        internalName: "",
        displayName: "",
        phoneNumber: "",
        businessName: "",
        description: "",
        info: "",
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

  const prepareFormData = (
    data: WhatsAppFormData
  ): ChannelConnectionFormData => {
    const formData: ChannelConnectionFormData = {
      internalName: data.internalName || "",
      displayName: data.displayName || "",
      phoneNumber: data.phoneNumber || "",
      businessName: data.businessName || "",
      description: data.description || "",
      info: data.info || "",
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
