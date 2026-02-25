"use client";

import React from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";
import Button from "../../../ui/Button";
import { useBrandKit } from "../../BrandKitContext";

export default function CompanyLogo() {
  const icons = useSupabaseIcons();
  const { logo, logoHandlers } = useBrandKit();

  return (
    <div className="flex flex-col gap-[1.6rem] border-b border-input-stroke pb-[4rem]">
      <div className="flex flex-col gap-[0.8rem]">
        <Heading size="sm">Company Logo</Heading>
        <Text size="sm">
          Upload logo & verify which backgrounds suits your logo.
        </Text>
      </div>

      <div className="flex items-center gap-[2.4rem]">
        <div className="relative group">
          <div
            onClick={logoHandlers.triggerUpload}
            className="w-[8rem] h-[8rem] border-2 border-dashed border-input-stroke bg-soft-green/30 rounded-full flex items-center justify-center cursor-pointer hover:border-brand-primary transition-all overflow-hidden"
          >
            {logo ? (
              <ImageComponent
                alt="Company Logo"
                src={logo}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              <ImageComponent
                alt="image upload"
                src={icons.image}
                width={24}
                height={24}
                className="opacity-50"
              />
            )}
          </div>

          <input
            ref={logoHandlers.fileInputRef}
            type="file"
            accept="image/*"
            onChange={logoHandlers.onUpload}
            className="hidden"
          />

          <button
            onClick={logoHandlers.triggerUpload}
            className="absolute bottom-[.1rem] right-[-.5rem] bg-border p-[.2rem] rounded-full border-[.3rem] border-primary"
          >
            <ImageComponent
              alt="upload"
              src={icons.upload}
              width={14}
              height={14}
            />
          </button>
        </div>

        <Button
          variant="secondary"
          className="px-[1.6rem] py-[0.5rem]"
          onClick={logoHandlers.triggerUpload}
        >
          <ImageComponent
            alt="upload cloud"
            src={icons.uploadCloud}
            width={20}
            height={20}
          />
          <span className="ml-[1rem]">
            {logo ? "Change Logo" : "Upload Logo"}
          </span>
        </Button>
      </div>
    </div>
  );
}
