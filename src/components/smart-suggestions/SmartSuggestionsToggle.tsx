"use client";

import ToggleSwitch from "../ui/ToggleSwitch";
import Text from "../ui/Text";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";

interface SmartSuggestionsToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

export default function SmartSuggestionsToggle({
  enabled,
  onToggle,
  disabled,
}: SmartSuggestionsToggleProps) {
  const icons = useSupabaseIcons();

  const handleToggle = () => {
    if (disabled) return;
    onToggle(!enabled);
  };

  return (
    <div className="mb-[2.4rem]">
      <div className="flex flex-col mb-[1.2rem] border p-[1.6rem] border-input-stroke rounded-[0.8rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.8rem]">
            <div className="border border-border rounded-[0.34rem] p-[0.8rem]">
              <ImageComponent
                src={icons.beeGreenLeft}
                alt="beezora"
                width={20}
                height={20}
              />
            </div>
            <div className="">
              <Text className="text-brand-primary font-[700] text-[1.4rem] lg:text-[1.9rem] mb-[0.4rem]">
                Smart Suggestions by BeeBot
              </Text>
              <Text className="text-brand-primary text-[1.2rem] w-[100%] mt-[0.8rem] lg:text-[1.3rem] lg:w-[100%] hidden lg:block">
                Use Recommended Settings Based on My Plan & Business Type
              </Text>
            </div>
          </div>

          <ToggleSwitch
            isActive={enabled}
            onToggle={handleToggle}
            disabled={disabled}
          />
        </div>

        <div className="lg:hidden">
          <Text className="text-brand-primary text-[1.2rem] w-[80%] mt-[0.8rem] lg:text-[1.3rem] lg:w-[100%]">
            Use Recommended Settings Based on My Plan & Business Type
          </Text>
        </div>
      </div>
    </div>
  );
}
