"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import Input from "../../../../../components/forms/Input";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { PlaceholderFormDesktopProps } from "../types";
import { prepareFormSubmitData } from "../utils/formUtils";

export default function PlaceholderFormDesktop({
  connection,
  onSave,
  onDelete,
  isLoading,
  watch,
  register,
}: PlaceholderFormDesktopProps) {
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = prepareFormSubmitData(watch);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="px-[2.8rem] py-[3.1rem] pr-[1.7rem]">
      <div className="space-y-[2.4rem]">
        <div className="space-y-[2.4rem] border-input-stroke pt-[2.4rem]">
          <div className="bg-input-filled border border-input-stroke space-y-[2.4rem] px-[1.6rem] py-[2.4rem] rounded-[0.8rem]">
            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.6rem]">
                  Connection Name
                </Heading>
              </label>
              <Input
                {...register("name", { required: true })}
                placeholder="Enter connection name"
                className="text-[1.6rem]"
                inputClassName="text-[1.6rem] placeholder:text-[1.6rem]"
              />
            </div>

            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.6rem]">
                  API Key (Optional)
                </Heading>
              </label>
              <Input
                {...register("apiKey")}
                placeholder="Enter API key"
                className="text-[1.6rem]"
                inputClassName="text-[1.6rem] placeholder:text-[1.6rem]"
              />
            </div>

            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.6rem]">
                  API Secret (Optional)
                </Heading>
              </label>
              <Input
                {...register("apiSecret")}
                type="password"
                placeholder="Enter API secret"
                className="text-[1.6rem]"
                inputClassName="text-[1.6rem] placeholder:text-[1.6rem]"
              />
            </div>
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
    </form>
  );
}

