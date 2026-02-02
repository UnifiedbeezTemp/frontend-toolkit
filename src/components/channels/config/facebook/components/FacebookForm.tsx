"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import ImageComponent from "../../../../../components/ui/ImageComponent";
import Input from "../../../../../components/forms/Input";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { FacebookFormProps } from "../types";
import { prepareFormSubmitData } from "../utils/formUtils";

export default function FacebookForm({
  connection,
  onSave,
  onDelete,
  isLoading,
  watch,
  readConfirmation,
  profileImageUrl,
  profileImage,
}: FacebookFormProps) {
  const icons = useSupabaseIcons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = prepareFormSubmitData(
      watch,
      readConfirmation,
      profileImage,
      profileImageUrl,
    );
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-[1.2rem] lg:px-[2.8rem] py-[2.1rem] lg:py-[3.1rem] pb-[5rem] lg:pb-[3.1rem]"
    >
      <div className="space-y-[1.6rem]">
        <Heading size="sm" className="text-[1.4rem] lg:text-[2rem]">
          Profile
        </Heading>
        <div className="bg-input-filled border border-input-stroke space-y-[2.4rem] px-[1.2rem] lg:px-[1.6rem] py-[1.6rem] lg:py-[2.4rem] rounded-[0.8rem]">
          <div>
            <label className="block mb-[0.8rem]">
              <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">
                Facebook Page
              </Heading>
            </label>
            <Input
              value={watch("name")}
              onChange={() => {}}
              placeholder="Enter Facebook Page name"
              className="text-[1.4rem] lg:text-[1.6rem]"
              inputClassName="text-[1.4rem] lg:text-[1.6rem] placeholder:text-[1.4rem] lg:placeholder:text-[1.6rem]"
            />
          </div>
        </div>

        <div className="flex items-center gap-[1rem] justify-end mt-[4rem] lg:mt-[4.7rem]">
          {connection && (
            <Button
              type="button"
              variant="dangerReverse"
              className="text-[1.4rem] lg:text-[1.6rem] flex items-center gap-[.5rem] px-[1.2rem] lg:px-[1.6rem]"
              onClick={onDelete}
              disabled={isLoading}
              loading={isLoading}
            >
              <ImageComponent
                src={icons.trashRed}
                alt="trash"
                width={18}
                height={18}
                className="w-[1.8rem] h-[1.8rem] lg:w-[2rem] lg:h-[2rem]"
              />
              Delete account
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
