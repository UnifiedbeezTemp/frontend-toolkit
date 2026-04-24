"use client";

import { UseFormRegister, UseFormWatch, Control, UseFormSetValue } from "react-hook-form";
import { WebchatFormData } from "../../hooks/useWebchatConfig";
import { prepareFormSubmitData } from "../../utils/formUtils";
import WebchatFormFields from "./WebchatFormFields";
import WebchatFormActions from "./WebchatFormActions";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../../ui/ImageComponent";
import Heading from "../../../../../ui/Heading";
import Text from "../../../../../ui/Text";
import { ChannelConnection } from "../../../../../../types/channelConnectionTypes";
import { ApiWebsite } from "../../../../../../types/websiteTypes";

interface WebchatFormProps {
  connection?: ChannelConnection | null;
  onSave: (data: WebchatFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<WebchatFormData>;
  register: UseFormRegister<WebchatFormData>;
  setValue: UseFormSetValue<WebchatFormData>;
  control?: Control<WebchatFormData>;
  variant?: "desktop" | "mobile";
  className?: string;
  websites?: ApiWebsite[];
}

export default function WebchatForm({
  connection,
  onSave,
  onDelete,
  isLoading,
  watch,
  register,
  control,
  variant = "desktop",
  className = "",
  isLoading: boolean,
  setValue,
  websites = [],
}: WebchatFormProps) {
  const isMobile = variant === "mobile";
  const formPadding = isMobile
    ? "px-[1.2rem] pb-[5rem]"
    : "px-[2.8rem] py-[3.1rem] pr-[1.7rem]";
  const containerPadding = "px-[1.6rem] py-[2.4rem]";
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = prepareFormSubmitData(watch);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className={`${formPadding} ${className}`}>
      <div className="">
        <div className="flex items-center gap-[1rem] mb-[1.6rem]">
          <div className="bg-soft-green rounded-[1rem] p-[0.8rem] border-primary-50 border">
            <ImageComponent
              src={icons.websiteGreen}
              alt="Web Chat"
              width={25}
              height={25}
            />
          </div>
          <div className="">
            <Heading size="lg" className="text-[1.6rem]">
              Webchat integration
            </Heading>
            <Text size="lg" className="text-[1.4rem]">
              Add your website URL to get started
            </Text>
          </div>
        </div>
        <div
          className={`bg-input-filled border border-input-stroke space-y-[2.4rem] ${containerPadding} rounded-[0.8rem]`}
        >
          <WebchatFormFields
            register={register}
            watch={watch}
            setValue={setValue}
            control={control}
            variant={variant}
            websites={websites}
          />
        </div>
        <WebchatFormActions
          connection={connection}
          onDelete={onDelete}
          isLoading={isLoading}
          variant={variant}
        />
      </div>
    </form>
  );
}
