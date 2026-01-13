import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

/**
 * REUSABLE TABS COMPONENT
 *
 * USAGE:
 * <Tabs
 *   tabs={['Create Account', 'Log In']}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 *
 * <Tabs
 *   tabs={[
 *     { label: 'Profile', value: 'profile' },
 *     { label: 'Settings', value: 'settings' }
 *   ]}
 *   defaultTab="profile"
 *   onTabChange={(value) => console.log(value)}
 * />
 *
 * PROPS:
 * - tabs: Array of strings OR array of objects with label/value (required)
 * - activeTab: Current active tab value (for controlled mode)
 * - defaultTab: Initial tab value (for uncontrolled mode)
 * - onTabChange: Callback when tab changes (value: string | number) => void
 * - variant: default | pills | underline (default: default)
 * - size: sm | md | lg (default: md)
 * - fullWidth: boolean - Make tabs fill container width (default: true)
 * - className: string - Add custom styles to container
 *
 * DEFAULTS:
 * - Active tab has solid background
 * - Inactive tabs are transparent
 * - Smooth transition animations
 * - Keyboard navigation (arrow keys)
 * - Accessible with ARIA
 */

export interface Tab {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: string[] | Tab[];
  activeTab?: string | number;
  defaultTab?: string | number;
  onTabChange?: (value: string | number) => void;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-[1.2rem] px-[0.8rem] py-[0.8rem]",
  md: "text-[1.4rem] px-[0.8rem] py-[0.8rem]",
  lg: "text-[2.4rem] px-6 py-3",
};

export default function Tabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onTabChange,
  variant = "default",
  size = "md",
  fullWidth = true,
  className = "",
}: TabsProps) {
  const normalizedTabs: Tab[] = React.useMemo(
    () =>
      tabs.map((tab) =>
        typeof tab === "string"
          ? { label: tab, value: tab, disabled: false }
          : tab
      ),
    [tabs]
  );

  const initialTab =
    controlledActiveTab ?? defaultTab ?? normalizedTabs[0]?.value;

  const [internalActiveTab, setInternalActiveTab] = useState<string | number>(
    initialTab
  );

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  useEffect(() => {
    const activeIndex = normalizedTabs.findIndex(
      (tab) => tab.value === activeTab
    );
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement && variant === "default") {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, variant]);

  const handleTabChange = (value: string | number) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(value);
    }
    onTabChange?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const enabledTabs = normalizedTabs.filter((tab) => !tab.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(
      (tab) => tab.value === normalizedTabs[currentIndex].value
    );

    let nextIndex = currentEnabledIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex =
        (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex !== currentEnabledIndex) {
      handleTabChange(enabledTabs[nextIndex].value);
    }
  };

  const containerVariants = {
    default:
      "bg-toggle-filled border-[1px] border-input-stroke rounded-[0.8rem] p-[0.8rem]",
    pills: "bg-transparent gap-2",
    underline: "border-b border-border",
  };

  const getTabVariantClasses = (isActive: boolean) => {
    const variants = {
      default: isActive
        ? "text-text-primary relative z-10 border border-input-stroke"
        : "bg-transparent text-inactive-color hover:text-text-primary",
      pills: isActive
        ? "bg-brand-primary text-white"
        : "bg-primary text-text-primary border border-border hover:bg-brand-primary/10",
      underline: isActive
        ? "text-brand-primary border-b-2 border-brand-primary"
        : "text-text-primary border-b-2 border-transparent hover:text-brand-primary hover:border-border",
    };
    return variants[variant];
  };

  return (
    <div
      className={cn(
        "inline-flex items-center relative",
        "rounded-[0.8rem] p-[0.8rem] shadow-xs gap-2",
        containerVariants[variant],
        fullWidth && "w-full",
        className
      )}
      role="tablist"
    >
      {variant === "default" && (
        <motion.div
          className="absolute bg-primary shadow-sm rounded-[0.8rem] h-[calc(100%-1.6rem)] top-[0.8rem]"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
      {normalizedTabs.map((tab, index) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            ref={(el) => (tabRefs.current[index] = el)}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabChange(tab.value)}
            onKeyDown={(e) => !tab.disabled && handleKeyDown(e, index)}
            className={cn(
              "font-bold rounded-[0.8rem] transition-all duration-200",
              "capitalize",
              sizeClasses[size],
              fullWidth && "flex-1",
              getTabVariantClasses(isActive),
              tab.disabled && "opacity-50 cursor-not-allowed",
              !tab.disabled && "cursor-pointer",
              variant === "underline" && "rounded-none"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
