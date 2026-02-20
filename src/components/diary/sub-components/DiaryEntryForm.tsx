"use client";

import React from "react";
import Textarea from "../../forms/Textarea";
import Button from "../../ui/Button";
import SaveIcon from "../../../assets/icons/SaveIcon";
import { useDiaryForm } from "../hooks/useDiaryForm";

export default function DiaryEntryForm() {
  const { content, setContent, handleSave, isEditing, isValid } =
    useDiaryForm();

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <h3 className="text-[1.4rem] lg:text-[1.8rem] text-text-primary font-medium">New Entry</h3>

      <div className="">
        <Textarea
          placeholder="Write your diary entry for today..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-input-filled"
        />

        <Button
          onClick={handleSave}
          disabled={!isValid}
          className="w-fit mt-[1rem] ml-auto flex items-center gap-[1rem]"
        >
          <SaveIcon size={16} color="white" />
          <span className="text-[1.4rem]">
            {isEditing ? "Update Entry" : "Save Entry"}
          </span>
        </Button>
      </div>
    </div>
  );
}
