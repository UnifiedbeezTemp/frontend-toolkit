import Tabs from "../../ui/Tabs";
import { DowngradeTab } from "../types";

interface TabSwitcherProps {
  activeTab: DowngradeTab;
  onTabChange: (tab: DowngradeTab) => void;
}

const TABS = [
  { label: "Add-ons", value: "addons" },
  { label: "Channels", value: "channels" },
];

export default function TabSwitcher({
  activeTab,
  onTabChange,
}: TabSwitcherProps) {
  return (
    <div className="py-[1.6rem]">
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(value) => onTabChange(value as DowngradeTab)}
        variant="unpadded"
        fullWidth
        className="mt-0"
      />
    </div>
  );
}
