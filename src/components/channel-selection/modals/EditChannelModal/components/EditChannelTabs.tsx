import { cn } from "../../../../../lib/utils";
import Text from "../../../../ui/Text";

interface EditChannelTabsProps {
  activeTab: "settings" | "preview";
  onTabChange: (tab: "settings" | "preview") => void;
}

export default function EditChannelTabs({
  activeTab,
  onTabChange,
}: EditChannelTabsProps) {
  return (
    <div className="flex w-full border-input-stroke mt-[2rem] lg:hidden">
      <button
        onClick={() => onTabChange("settings")}
        className={cn(
          "flex-1 pb-[1.2rem] text-center transition-all relative border-b ",
          activeTab === "settings"
            ? "text-brand-primary border-brand-primary"
            : "text-inactive-color hover:text-text-primary border-inactive-color",
        )}
      >
        <Text className={cn("text-[1.4rem] text-center font-[700]", activeTab === "settings" ? "text-brand-color" : "text-inactive-color")}>Settings</Text>
        {activeTab === "settings" && (
          <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary-gradient rounded-t-full" />
        )}
      </button>
      <button
        onClick={() => onTabChange("preview")}
        className={cn(
          "flex-1 pb-[1.2rem] text-center transition-all relative border-b ",
          activeTab === "preview"
            ? "text-brand-primary border-brand-primary"
            : "text-inactive-color hover:text-text-primary border-inactive-color",
        )}
      >
        <Text className={cn("text-[1.4rem] text-center font-[700]", activeTab === "preview" ? "text-brand-color" : "text-inactive-color")}>Live Preview</Text>
        {activeTab === "preview" && (
          <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary-gradient rounded-t-full" />
        )}
      </button>
    </div>
  );
}
