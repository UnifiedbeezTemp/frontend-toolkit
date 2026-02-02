"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import FormField from "../../../../forms/FormField";
import CloseModalButton from "../../../../modal/CloseModalButton";
import Button from "../../../../ui/Button";
import { PlaceholderFormMobileProps } from "../types";
import { prepareFormSubmitData } from "../utils/formUtils";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";

export default function PlaceholderFormMobile({
  channel,
  connection,
  onSave,
  onDelete,
  onCancel,
  isLoading,
  control,
  watch,
  register,
}: PlaceholderFormMobileProps) {
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = prepareFormSubmitData(watch);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="px-[1.2rem] pb-[5rem]">
      <div className="flex items-center justify-between py-[1.6rem] border-b border-border">
        <div className="flex flex-col">
          <Heading className="text-[1.4rem]">{channel.name} Settings</Heading>
          <Text className="text-text-primary text-[1.2rem]">
            {connection
              ? `Edit ${channel.name} settings`
              : `Configure ${channel.name} settings`}
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
              {connection
                ? `Edit ${channel.name} settings`
                : `Configure ${channel.name} settings`}
            </Text>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-[2.4rem] border-t border-input-stroke">
          <div className="space-y-[2.4rem] py-[2.4rem] rounded-[0.8rem]">
            <FormField
              name="name"
              control={control}
              label="Connection Name"
              placeholder="Enter connection name"
              labelClassName="text-[1.4rem]"
              inputClassName="text-[1.4rem] placeholder:text-[1.4rem]"
              required
            />

            <FormField
              name="apiKey"
              control={control}
              label="API Key (Optional)"
              placeholder="Enter API key"
              labelClassName="text-[1.4rem]"
              inputClassName="text-[1.4rem] placeholder:text-[1.4rem]"
            />

            <FormField
              name="apiSecret"
              control={control}
              label="API Secret (Optional)"
              placeholder="Enter API secret"
              type="password"
              labelClassName="text-[1.4rem]"
              inputClassName="text-[1.4rem] placeholder:text-[1.4rem]"
            />

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
                className={`${
                  connection ? "w-[30%] sm:w-full" : "w-full"
                } highlight-inside border-0 text-[1.4rem]`}
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

