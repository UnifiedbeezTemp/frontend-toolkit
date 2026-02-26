import React from "react";
import { GeneralTemplateFormData } from "../../hooks/useGeneralTemplateForm";

interface FieldProps {
  formData: GeneralTemplateFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const NameField = ({ formData, onChange }: FieldProps) => (
  <div className="flex flex-col gap-[0.8rem]">
    <label className="text-[1.4rem] font-bold text-text-secondary">
      Name<span className="text-red-500">*</span>
    </label>
    <input
      name="name"
      value={formData.name}
      onChange={onChange}
      placeholder="Enter first name"
      className="w-full px-[1.6rem] py-[1.2rem] rounded-[1rem] border border-input-stroke text-[1.4rem] focus:border-brand-primary outline-none"
    />
  </div>
);

export const SubjectField = ({ formData, onChange }: FieldProps) => (
  <div className="flex flex-col gap-[0.8rem]">
    <div className="flex items-center gap-[0.4rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Subject
      </label>
      <span className="text-[1.2rem] text-gray-400 font-medium">
        (Optional)
      </span>
    </div>
    <p className="text-[1.2rem] text-text-secondary/60 -mt-[0.4rem]">
      Used only for email campaigns and messages.
    </p>
    <input
      name="subject"
      value={formData.subject}
      onChange={onChange}
      placeholder="e.g Meeting Schedule"
      className="w-full px-[1.6rem] py-[1.2rem] rounded-[1rem] border border-input-stroke text-[1.4rem] focus:border-brand-primary outline-none"
    />
  </div>
);

export const MessageField = ({ formData, onChange }: FieldProps) => (
  <div className="flex flex-col gap-[0.8rem]">
    <label className="text-[1.4rem] font-bold text-text-secondary">
      Message<span className="text-red-500">*</span>
    </label>
    <textarea
      name="message"
      value={formData.message}
      onChange={onChange}
      placeholder="Describe your list so your team stays aligned."
      className="w-full h-[12rem] px-[1.6rem] py-[1.2rem] rounded-[1rem] border border-input-stroke text-[1.4rem] focus:border-brand-primary outline-none resize-none"
    />
  </div>
);

export const DateTimeFields = ({ formData, onChange }: FieldProps) => (
  <div className="grid grid-cols-2 gap-[1.6rem]">
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Due date<span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={onChange}
        className="w-full px-[1.6rem] py-[1.2rem] rounded-[1rem] border border-input-stroke text-[1.4rem] focus:border-brand-primary outline-none"
      />
    </div>
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Due time
      </label>
      <input
        type="time"
        name="dueTime"
        value={formData.dueTime}
        onChange={onChange}
        className="w-full px-[1.6rem] py-[1.2rem] rounded-[1rem] border border-input-stroke text-[1.4rem] focus:border-brand-primary outline-none"
      />
    </div>
  </div>
);
