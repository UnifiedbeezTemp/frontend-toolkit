import { useState, ReactNode } from "react";
import { cn } from "../../../../lib/utils";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import Text from "../../../ui/Text";
import Button from "../../../ui/Button";

interface InfoSectionProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  showAddButton?: boolean;
  onAdd?: () => void;
}

export default function InfoSection({
  title,
  subtitle,
  icon,
  children,
  defaultExpanded = false,
  showAddButton = false,
  onAdd,
}: InfoSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn("border-b border-input-stroke last:border-b-0 py-4")}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between py-4 cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          <div>{icon}</div>
          <div className="flex-1">
            <Text className="text-base text-dark-base-70">
              {title}
            </Text>
          </div>
        </div>
        <ChevronDownIcon
          className={cn(
            "transition-transform duration-200 text-dark-base-40",
            isExpanded && "rotate-180",
          )}
        />
      </div>
      {isExpanded && (
        <div className="pb-4 animate-in slide-in-from-top-2 duration-200">
          {subtitle && (
            <div className="flex items-center justify-between mb-2">
              <Text className="text-base font-bold text-dark-base-100">
                {subtitle}
              </Text>
              {showAddButton && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    onAdd?.();
                  }}
                  className="text-md px-2 py-1 text-dark-base-70 font-bold"
                >
                  Add
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
