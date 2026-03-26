"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import ImageComponent from "../../../../../../ui/ImageComponent";
import { cn } from "../../../../../../../lib/utils";

interface EmailComposerFieldsProps {
  to: string[];
  cc: string[];
  subject: string;
  tempTo: string;
  tempCc: string;
  focusedField: string | null;
  onUpdate: (updates: {
    to?: string[];
    cc?: string[];
    subject?: string;
  }) => void;
  setTempTo: (val: string) => void;
  setTempCc: (val: string) => void;
  setFocusedField: (field: string | null) => void;
  handleAddTo: () => void;
  handleAddCc: () => void;
  handleRemoveTo: (val: string) => void;
  handleRemoveCc: (val: string) => void;
  closeIcon: string;
}

export default function EmailComposerFields({
  to,
  cc,
  subject,
  tempTo,
  tempCc,
  onUpdate,
  setTempTo,
  setTempCc,
  setFocusedField,
  handleAddTo,
  handleAddCc,
  handleRemoveTo,
  handleRemoveCc,
  closeIcon,
}: EmailComposerFieldsProps) {
  return (
    <div className="flex flex-col gap-[1.2rem] px-[1.6rem] py-[2.4rem] sm:p-[2.4rem] shrink-0">
      <div className="flex items-center gap-[1rem] sm:gap-[1.6rem] pb-[0.4rem]">
        <Text className="text-[1.4rem] font-medium text-dark-base-40 w-[4rem] sm:w-[6rem]">
          To
        </Text>
        <div className="flex flex-wrap gap-[0.8rem] flex-1 items-center min-h-[3.2rem]">
          {to.map((handle) => (
            <div
              key={handle}
              className={cn(
                "flex items-center gap-[0.4rem] px-[1rem] py-[0.5rem] rounded-[1rem] text-[1.3rem] font-bold transition-colors bg-[#E8F1FF] text-[#0066FF] border border-[#BFDBFE]",
              )}
            >
              {handle}
              <button
                onClick={() => handleRemoveTo(handle)}
                className="hover:opacity-60"
              >
                <ImageComponent
                  src={closeIcon}
                  alt="remove"
                  width={10}
                  height={10}
                  className="opacity-40"
                />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={tempTo}
            onChange={(e) => setTempTo(e.target.value)}
            onFocus={() => setFocusedField("to")}
            onBlur={() => {
              setFocusedField(null);
              handleAddTo();
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAddTo()}
            placeholder={to.length === 0 ? "Add @handle" : ""}
            className="flex-1 outline-none text-[1.4rem] placeholder:text-dark-base-40 min-w-[8rem] sm:min-w-[12rem] bg-transparent text-text-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-[1rem] sm:gap-[1.6rem] pb-[0.4rem]">
        <div className="flex items-center gap-[0.4rem] w-[4rem] sm:w-[6rem]">
          <Text className="text-[1.4rem] font-medium text-dark-base-40">
            Cc
          </Text>
        </div>
        <div className="flex flex-wrap gap-[0.8rem] flex-1 items-center min-h-[3.2rem]">
          {cc.map((handle) => (
            <div
              key={handle}
              className={cn(
                "flex items-center gap-[0.4rem] px-[1rem] py-[0.5rem] rounded-[1rem] text-[1.3rem] font-bold transition-colors bg-[#FCE7F3] text-[#D01A8A] border border-[#FBCFE8]",
              )}
            >
              {handle}
              <button
                onClick={() => handleRemoveCc(handle)}
                className="hover:opacity-60"
              >
                <ImageComponent
                  src={closeIcon}
                  alt="remove"
                  width={10}
                  height={10}
                  className="opacity-40"
                />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={tempCc}
            onChange={(e) => setTempCc(e.target.value)}
            onFocus={() => setFocusedField("cc")}
            onBlur={() => {
              setFocusedField(null);
              handleAddCc();
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAddCc()}
            placeholder=""
            className="flex-1 outline-none text-[1.4rem] placeholder:text-dark-base-40 min-w-[4rem] bg-transparent text-text-primary"
          />
        </div>
        <button className="text-[1.2rem] font-bold text-dark-base-40 uppercase hover:text-dark-base-100 transition-colors shrink-0">
          Bcc
        </button>
      </div>

      <div className="flex items-center gap-[1rem] sm:gap-[1.6rem] border-b border-input-stroke pb-[1.2rem]">
        <div className="flex items-center gap-[0.4rem] w-[4rem] sm:w-[6rem]">
          <Text className="text-[1.4rem] font-medium text-dark-base-40">
            Subject
          </Text>
        </div>
        <input
          type="text"
          value={subject}
          onChange={(e) => onUpdate({ subject: e.target.value })}
          placeholder="Enter subject"
          className="flex-1 outline-none text-[1.4rem] font-bold text-dark-base-100 placeholder:text-dark-base-40 bg-transparent"
        />
      </div>
    </div>
  );
}
