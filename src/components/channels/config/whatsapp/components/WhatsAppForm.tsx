"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import Input from "../../../../../components/forms/Input";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import { UseFormWatch, UseFormRegister } from "react-hook-form";
import { WhatsAppFormData } from "../hooks/useWhatsAppConfig";
import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

interface WhatsAppFormProps {
  connection?: ChannelConnection | null;
  onSave: (data: WhatsAppFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<WhatsAppFormData>;
  register: UseFormRegister<WhatsAppFormData>;
  readConfirmation: boolean;
  setReadConfirmation: (active: boolean) => void;
}

export default function WhatsAppForm({
  connection,
  onSave,
  onDelete,
  isLoading,
  watch,
  register,
  readConfirmation,
  setReadConfirmation,
}: WhatsAppFormProps) {
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = watch();
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-[1.6rem] lg:px-[2.8rem] py-[2rem] lg:py-[3.1rem]"
    >
      <div className="space-y-[2rem] lg:space-y-[2.4rem]">
        <div className="space-y-[1.6rem] lg:space-y-[2.4rem]">
          <Heading className="text-[1.6rem] lg:text-[2rem]">Profile</Heading>
          <div className="bg-input-filled border border-input-stroke space-y-[2rem] lg:space-y-[2.4rem] px-[1.2rem] lg:px-[1.6rem] py-[1.6rem] lg:py-[2.4rem] rounded-[0.8rem]">
            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                  Phone number
                </Heading>
              </label>
              <Input
                value={watch("phoneNumber")}
                onChange={() => {}}
                placeholder="+449029920646"
                className="text-[1.4rem] lg:text-[1.6rem]"
                inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
              />
            </div>

            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                  Business name
                </Heading>
              </label>
              <Input
                value={watch("displayName")}
                onChange={() => {}}
                placeholder="Enter business name"
                className="text-[1.4rem] lg:text-[1.6rem]"
                inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[1rem] justify-end pt-[2rem] lg:pt-[2.4rem]">
          {connection && (
            <Button
              type="button"
              variant="dangerReverse"
              className="text-[1.4rem] lg:text-[1.6rem] flex items-center gap-[.5rem] px-[1.2rem] lg:px-[1.6rem]"
              onClick={onDelete}
            >
              <ImageComponent
                src={icons.trashRed}
                alt="trash"
                width={20}
                height={20}
              />
              Delete account
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
