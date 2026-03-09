import { IconProps } from "../../../assets/icons/types";
import { cn } from "../../../lib/utils";

interface BillingDropdownProps {
  billingSubTabs: string[];
  activeTab: string;
  handleSelectSubTab: (tab: string) => void;
  getSubTabIcon: (tab: string) => string;
  BillingIcons: Record<string, React.FC<IconProps>>;
}

export default function BillingDropdown({
  billingSubTabs,
  activeTab,
  handleSelectSubTab,
  getSubTabIcon,
  BillingIcons,
}: BillingDropdownProps) {
  return (
    <div className="flex flex-col p-2">
      {billingSubTabs.map((subTab) => {
        const SubTabIcon = BillingIcons[getSubTabIcon(subTab)];
        const isSubActive = activeTab === subTab;
        return (
          <button
            key={subTab}
            className={cn(
              "text-left p-2 text-[1.4rem] rounded-md transition-all hover:bg-brand-primary/10 flex items-center gap-3",
              isSubActive
                ? "text-text-secondary font-medium bg-brand-primary/5"
                : "text-text-primary/60",
            )}
            onClick={() => handleSelectSubTab(subTab)}
          >
            {SubTabIcon && (
              <SubTabIcon
                color={isSubActive ? "var(--text-primary)" : "var(--black-30)"}
                size={18}
              />
            )}
            {subTab}
          </button>
        );
      })}
    </div>
  );
}
