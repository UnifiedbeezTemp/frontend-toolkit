"use client";

import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import ImageComponent from "../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { ConnectionItemProps } from "./types";

export default function ConnectionItem({
  connection,
  isEditing,
  onEdit,
  onCancel,
}: ConnectionItemProps) {
  const icons = useSupabaseIcons();

  return (
    <div
      data-connection-item
      className={`border border-input-stroke rounded-[0.8rem] p-[0.8rem] bg-primary ${
        isEditing ? "layout-body" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <Heading size="xs" className="font-[700] truncate">
          {connection.title}
        </Heading>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isEditing && onCancel) {
              onCancel();
            } else {
              onEdit();
            }
          }}
          className="text-brand-primary underline font-[700] text-[1.2rem]"
        >
          <ImageComponent
            src={icons.pencil}
            alt="pencil"
            width={20}
            height={20}
            className="lg:hidden"
          />
          <span className="hidden lg:block">{isEditing ? "Cancel" : "Edit"}</span>
        </button>
      </div>
      {/* {connection.subtitle && (
        <Text size="sm" className="text-text-secondary mt-[0.4rem]">
          {connection.subtitle}
        </Text>
      )} */}
      <div className="text-success font-[700] text-[1rem] flex items-center gap-[.21rem] mt-[.5rem]">
        <div className="w-[1.6rem] h-[1.6rem] bg-success/10 flex items-center justify-center rounded-full">
          <div className="w-[0.8rem] h-[0.8rem] bg-success rounded-full" />
        </div>
        <p className="ml-[0.4rem]">connected</p>
      </div>
    </div>
  );
}

