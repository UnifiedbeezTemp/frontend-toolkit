import {
  UseFormRegister,
  UseFormWatch,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import { WebchatFormData } from "../../hooks/useWebchatConfig";
import Heading from "../../../../../ui/Heading";
import Input from "../../../../../forms/Input";
import Tabs from "../../../../../ui/Tabs";
import { ApiWebsite } from "../../../../../../types/websiteTypes";
import { useWebchatFormFields } from "../../hooks/useWebchatFormFields";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import SmartDropdown from "../../../../../smart-dropdown/SmartDropdown";
import ImageComponent from "../../../../../ui/ImageComponent";
import Text from "../../../../../ui/Text";

interface WebchatFormFieldsProps {
  register: UseFormRegister<WebchatFormData>;
  watch: UseFormWatch<WebchatFormData>;
  setValue: UseFormSetValue<WebchatFormData>;
  control?: Control<WebchatFormData>;
  variant?: "desktop" | "mobile";
  websites?: ApiWebsite[];
}

export default function WebchatFormFields({
  register,
  watch,
  setValue,
  control,
  variant = "desktop",
  websites = [],
}: WebchatFormFieldsProps) {
  const {
    labelSize,
    inputSize,
    mode,
    setMode,
    isDropdownOpen,
    setIsDropdownOpen,
    triggerRef,
    handleWebsiteSelect,
    displayValue,
    currentUrl,
  } = useWebchatFormFields({
    watch,
    setValue,
    websites,
    variant,
  });

  const icons = useSupabaseIcons();

  return (
    <div className="space-y-[2rem]">
      {websites.length > 0 && (
        <div className="mb-[2.4rem]">
          <Tabs
            tabs={[
              { label: "Select from websites", value: "existing" },
              { label: "Enter manually", value: "manual" },
            ]}
            activeTab={mode}
            onTabChange={(value) => setMode(value as "existing" | "manual")}
            fullWidth
            variant="default"
          />
        </div>
      )}

      {mode === "existing" && websites.length > 0 ? (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block mb-[0.8rem]">
            <Heading size="sm" className={`font-semibold ${labelSize}`}>
              Select Website
            </Heading>
            <Text className="text-text-secondary text-[1.3rem] mt-[0.2rem]">
              Choose one of your connected websites
            </Text>
          </label>
          <div className="relative">
            <div
              ref={triggerRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full border border-input-stroke rounded-[0.8rem] px-[1.4rem] py-[1.2rem] bg-primary text-text-primary cursor-pointer flex items-center justify-between hover:border-brand-primary transition-all duration-200 ${
                isDropdownOpen
                  ? "border-brand-primary shadow-sm"
                  : "hover:shadow-sm"
              }`}
            >
              <Text className={`${inputSize} truncate font-medium`}>
                {displayValue}
              </Text>
              <ImageComponent
                src={icons.chevronDown}
                alt="Expand"
                width={14}
                height={14}
                className={`transition-transform duration-200 opacity-60 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            <SmartDropdown
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              triggerRef={triggerRef}
              maxHeight="20rem"
              className="mt-[0.6rem] shadow-xl border-border"
            >
              <div className="flex flex-col p-[0.6rem] gap-[0.2rem]">
                {websites.map((website) => (
                  <button
                    key={website.id}
                    type="button"
                    onClick={() => handleWebsiteSelect(website.baseUrl)}
                    className={`text-left px-[1.2rem] py-[1rem] rounded-[0.6rem] hover:bg-input-filled transition-colors duration-150 flex items-center justify-between group ${
                      website.baseUrl === currentUrl
                        ? "bg-input-filled font-medium text-brand-primary"
                        : "text-text-primary"
                    }`}
                  >
                    <Text className="text-[1.4rem] truncate">
                      {website.displayName || website.baseUrl}
                    </Text>
                    {website.baseUrl === currentUrl && (
                      <div className="h-[0.8rem] w-[0.8rem] rounded-full bg-brand-primary" />
                    )}
                  </button>
                ))}
              </div>
            </SmartDropdown>

            <input
              type="hidden"
              {...register("websiteUrl", { required: true })}
            />
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block mb-[0.8rem]">
            <Heading size="sm" className={`font-semibold ${labelSize}`}>
              Website URL
            </Heading>
            <Text className="text-text-secondary text-[1.3rem] mt-[0.2rem]">
              Enter the full URL where you want to add the chat widget
            </Text>
          </label>
          <Input
            {...register("websiteUrl", { required: true })}
            placeholder="https://yourwebsite.com"
            className={labelSize}
            inputClassName={`${inputSize} py-[1.2rem]`}
          />
        </div>
      )}
    </div>
  );
}
