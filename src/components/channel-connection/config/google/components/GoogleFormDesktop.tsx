"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import Input from "../../../../../components/forms/Input";
import ToggleSwitch from "../../../../../components/ui/ToggleSwitch";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { GoogleFormDesktopProps } from "../types";
import { prepareFormSubmitData } from "../utils/formUtils";
import ImageComponent from "../../../../../components/ui/ImageComponent";

export default function GoogleFormDesktop({
  connection,
  onSave,
  onDelete,
  isLoading,
  watch,
  register,
  readConfirmation,
  setReadConfirmation,
}: GoogleFormDesktopProps) {
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = prepareFormSubmitData(watch, readConfirmation);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="px-[2.8rem] py-[3.1rem] pr-[1.7rem]">
      <div className="space-y-[2.4rem]">
        <div className="space-y-[2.4rem] pt-[2.4rem]">
          <div className="bg-input-filled border border-input-stroke space-y-[2.4rem] px-[1.6rem] py-[2.4rem] rounded-[0.8rem]">
            <div>
              <label className="block mb-[0.8rem]">
                <Heading size="sm" className="text-[1.6rem]">
                  Google Workspace profile
                </Heading>
              </label>
              <Input
                {...register("email", { required: true })}
                placeholder="example@example.com"
                className="text-[1.6rem]"
                inputClassName="text-[1.6rem] placeholder:text-[1.6rem]"
                type="email"
              />
            </div>
          </div>

          <div className="border-t border-input-stroke pt-[2.4rem]">
            <Heading className="text-[2rem] mb-[1.6rem]">
              Chat settings
            </Heading>
            <div className="bg-input-filled border border-input-stroke px-[1.6rem] py-[2.4rem] rounded-[0.8rem] flex items-center justify-between">
              <div>
                <Heading size="sm" className="text-[1.6rem]">
                  Read Receipts
                </Heading>
                <Text size="sm" className="text-text-secondary">
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

