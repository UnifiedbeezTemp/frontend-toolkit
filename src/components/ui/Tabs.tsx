import React, { useState } from "react";
import { cn } from "../../lib/utils";

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
  sm: "text-1.2rem px-0.8rem py-0.8rem",
  md: "text-1.6rem px-0.8rem py-0.8rem",
  lg: "text-2.4rem px-6 py-3",
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
  // Normalize tabs to Tab objects
  const normalizedTabs: Tab[] = tabs.map((tab) =>
    typeof tab === "string" ? { label: tab, value: tab, disabled: false } : tab
  );

  // Initialize active tab
  const initialTab =
    controlledActiveTab ?? defaultTab ?? normalizedTabs[0]?.value;

  const [internalActiveTab, setInternalActiveTab] = useState<string | number>(
    initialTab
  );

  // Use controlled or uncontrolled mode
  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

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

  // Variant-specific container styles
  const containerVariants = {
    default: "bg-tab-filled border border-border rounded-lg p-1.5",
    pills: "bg-transparent gap-2",
    underline: "border-b border-border",
  };

  // Variant-specific tab styles
  const getTabVariantClasses = (isActive: boolean) => {
    const variants = {
      default: isActive
        ? "bg-primary text-text-primary shadow-sm"
        : "bg-transparent text-muted hover:text-text-secondary",
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
        "inline-flex items-center",
        containerVariants[variant],
        fullWidth && "w-full",
        className
      )}
      role="tablist"
    >
      {normalizedTabs.map((tab, index) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabChange(tab.value)}
            onKeyDown={(e) => !tab.disabled && handleKeyDown(e, index)}
            className={cn(
              "font-bold rounded-lg transition-all duration-200 ",
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
