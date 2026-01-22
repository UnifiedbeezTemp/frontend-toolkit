"use client";

import React from "react";
import ImageComponent from "./ImageComponent";
import Text from "./Text";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { getFileTypeColor } from "../knowledge-files/files/utils/fileUtils";

interface FileNameProps {
  name: string;
  type: string;
}

export default function FileName({ name, type }: FileNameProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-center gap-[1rem]">
      <div className="relative shrink-0">
        <ImageComponent src={icons.document} width={30} height={30} alt="" />
        <div
          className={`absolute ${getFileTypeColor(
            type,
          )} text-white w-full flex items-center justify-center text-center text-[.8rem] px-[2px] rounded-[1px] top-[50%]`}
        >
          {type}
        </div>
      </div>
      <Text className="text-[1.4rem] font-medium text-gray-900 truncate">
        {name}
      </Text>
    </div>
  );
}
