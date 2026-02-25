"use client";

import React from "react";
import Image from "next/image";
import { useDiary } from "../hooks/useDiary";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Input from "../../forms/Input";
import DiaryEntryItem from "./DiaryEntryItem";

interface Props {
  limit?: number;
}

export default function DiaryRecentEntries({ limit }: Props) {
  const { entries, searchQuery, handleSearch } = useDiary();
  const supabaseIcons = useSupabaseIcons();

  return (
    <div className="flex flex-col gap-[1rem] sm:gap-0 lg:gap-[1rem]">
      <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-[1rem] lg:gap-4">
        <h3 className="text-[1.4rem] lg:text-[1.8rem] text-text-primary font-bold">
          Recent Entry
        </h3>

        <div className="flex lg:items-center gap-[1.2rem]">
          <div className="relative lg:w-[30rem]">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="lg:pl-12 h-[3.6rem] border-input-stroke"
              leftIcon={
                <Image
                  src={supabaseIcons.searchSmIcon || ""}
                  alt="search"
                  width={18}
                  height={18}
                />
              }
            />
          </div>
          {/* 
          <button className="flex items-center gap-2 px-[1.2rem] py-[0.8rem] border border-input-stroke rounded-lg hover:bg-input-filled transition-colors">
            <span className="text-[1.4rem] font-medium text-text-primary">
              Group by: <span className="font-bold">Date</span>
            </span>
            <Image
              src={supabaseIcons.chevronDown || ""}
              alt="dropdown"
              width={16}
              height={16}
              className="text-text-primary/60"
            />
          </button> */}
        </div>
      </div>

      <div className="flex flex-col border-b last:border-0 border-input-stroke overflow-hidden">
        {entries?.length > 0 ? (
          (limit ? entries.slice(0, limit) : entries).map(
            (entry, index, array) => (
              <DiaryEntryItem
                key={entry.id}
                entry={entry}
                isLast={index === array.length - 1}
              />
            ),
          )
        ) : (
          <div className="py-12 text-center text-text-primary/50 text-[1.4rem]">
            No diary entries found.
          </div>
        )}
      </div>
    </div>
  );
}
