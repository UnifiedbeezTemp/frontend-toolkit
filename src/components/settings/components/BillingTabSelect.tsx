import { useRef } from "react";
import { useBillingTab } from "../hooks/useBillingTab";
import BillingDropdown from "./BillingDropdown";
import ImageComponent from "next/image";
import CardOutlineIcon from "../../../assets/icons/CardOutlineIcon";
import InvoiceIcon from "../../../assets/icons/InvoiceIcon";
import PresentationProject from "../../../assets/icons/PresentationProject";
import DataUsageIcon from "../../../assets/icons/DataUsageIcon";
import { IconProps } from "../../../assets/icons/types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { cn } from "../../../lib/utils";
import { SmartDropdown } from "../../smart-dropdown";

const BillingIcons: Record<string, React.FC<IconProps>> = {
  CardOutlineIcon,
  InvoiceIcon,
  PresentationProject,
  DataUsageIcon,
};

interface BillingTabSelectProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export default function BillingTabSelect({
  activeTab,
  setActiveTab,
}: BillingTabSelectProps) {
  const icons = useSupabaseIcons();
  const billingTriggerRef = useRef<HTMLButtonElement>(null);

  const {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    isBillingTabActive,
    currentBillingLabel,
    currentBillingIcon,
    handleSelectSubTab,
    billingSubTabs,
    getSubTabIcon,
  } = useBillingTab(activeTab, setActiveTab);

  const BillingIconBase = BillingIcons[currentBillingIcon];

  return (
    <div className="relative shrink-0">
      <button
        ref={billingTriggerRef}
        className={cn(
          "p-[.8rem] rounded-[.8rem] text-[1.4rem] border transition-all shrink-0 flex gap-[0.4rem] items-center whitespace-nowrap",
          isBillingTabActive
            ? "text-text-primary bg-primary border-input-stroke shadow-sm"
            : "text-inactive-color border-transparent hover:text-inactive-color/80",
        )}
        onClick={toggleDropdown}
      >
        {BillingIconBase && (
          <BillingIconBase
            color={
              isBillingTabActive ? "var(--text-primary)" : "var(--black-30)"
            }
            size={isBillingTabActive ? 20 : 18}
          />
        )}
        {currentBillingLabel}
        <ImageComponent
          src={icons.chevronDown}
          alt="dropdown"
          width={16}
          height={16}
          className={cn(
            "transition-transform duration-200",
            isDropdownOpen && "rotate-180",
          )}
        />
      </button>
      {isDropdownOpen && (
        <SmartDropdown
          isOpen={isDropdownOpen}
          onClose={closeDropdown}
          triggerRef={billingTriggerRef}
          placement="bottom-start"
          className="min-w-[18rem]"
          maxHeight="none"
        >
          <BillingDropdown
            billingSubTabs={billingSubTabs}
            activeTab={activeTab}
            handleSelectSubTab={handleSelectSubTab}
            getSubTabIcon={getSubTabIcon}
            BillingIcons={BillingIcons}
          />
        </SmartDropdown>
      )}
    </div>
  );
}
