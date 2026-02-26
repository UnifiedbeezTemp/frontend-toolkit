import React from "react";
import { TemplateFormData, HandleChange } from "../../types";
import Textarea from "../../../forms/Textarea";

interface MessageTextareaProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export default function MessageTextarea({
  formData,
  handleChange,
}: MessageTextareaProps) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Message
      </label>
      <p className="text-[1.2rem] text-text-primary">
        Enter the message you want to send to your customers
      </p>
      <Textarea
        placeholder="Enter message"
        value={formData.message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleChange("message", e.target.value)
        }
        className="min-h-[12rem] rounded-[0.8rem] border-input-stroke bg-primary"
      />
    </div>
  );
}
