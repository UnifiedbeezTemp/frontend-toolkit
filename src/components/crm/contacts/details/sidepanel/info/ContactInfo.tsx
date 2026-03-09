"use client";

import React from "react";
import Input from "../../../../../forms/Input";
import PhoneInput from "../../../../../phone-input/PhoneInput";
import CopyIconAlt from "../../../../../../assets/icons/CopyIconAlt";
import { Contact } from "../../../types";
import { useContactInfo } from "./hooks/useContactInfo";

interface ContactInfoProps {
  contact: Contact;
}

export default function ContactInfo({ contact }: ContactInfoProps) {
  const { formState, isCopied, handleInputChange, copyEmail } =
    useContactInfo(contact);

  return (
    <div className="flex flex-col gap-[1.6rem] pt-0 border-b border-input-stroke">
      <h3 className="text-[1.6rem] font-bold text-dark-base-40 tracking-tight">
        Contact Info
      </h3>

      <div className="flex flex-col gap-[1.6rem]">
        <Input
          label="First Name"
          value={formState.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className="w-full"
          labelClassName="text-[1.4rem] text-dark-base-70 font-bold mb-[0.8rem]"
          inputClassName="h-[4.8rem]"
        />

        <Input
          label="Last Name"
          value={formState.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className="w-full"
          labelClassName="text-[1.4rem] text-dark-base-70 font-bold mb-[0.8rem]"
          inputClassName="h-[4.8rem]"
        />

        <Input
          label="Email"
          value={formState.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full"
          labelClassName="text-[1.4rem] text-dark-base-70 font-bold mb-[0.8rem]"
          inputClassName="h-[4.8rem] pr-[4.4rem]"
          rightIcon={
            <button
              type="button"
              onClick={copyEmail}
              className="text-dark-base-40 hover:text-brand-primary transition-colors flex items-center gap-[0.4rem]"
            >
              {isCopied && (
                <span className="text-[1.2rem] font-bold text-brand-primary">
                  Copied!
                </span>
              )}
              <CopyIconAlt size={20} />
            </button>
          }
        />

        <PhoneInput
          value={formState.phone}
          onChange={(val: string) => handleInputChange("phone", val)}
          countryCode="UK"
          onCountryChange={() => {}}
          isEditing={true}
          className="w-full"
          labelClasses="text-[1.4rem] text-dark-base-70 font-bold mb-[0.8rem]"
          inputClasses="h-[4.8rem]"
        />

        <Input
          label="Property Address"
          placeholder="Click to Add"
          value={formState.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="w-full"
          labelClassName="text-[1.4rem] text-dark-base-70 font-bold mb-[0.8rem]"
          inputClassName="h-[4.8rem] placeholder:text-dark-base-40"
        />
      </div>

      <div className="flex flex-col gap-[1.6rem] py-[1.6rem]">
        <div className="flex flex-col gap-[0.4rem]">
          <span className="text-[1.6rem] text-dark-base-70 font-bold">
            Date Created
          </span>
          <span className="text-[1.6rem] text-dark-base-70">
            {contact.dateCreated || "September 8, 2025"}
          </span>
        </div>

        <div className="flex flex-col gap-[0.4rem]">
          <span className="text-[1.6rem] text-dark-base-70 font-bold">
            Last Interaction
          </span>
          <span className="text-[1.6rem] text-dark-base-70">
            09/09/2025 14:57
          </span>
        </div>
      </div>
    </div>
  );
}
