import Text from "../../ui/Text";
import { cn } from "../../../lib/utils";
import { GroupedAddon } from "../types";
import Checkbox from "../../ui/CheckBox";
import AddonIcon from "./AddonIcon";

interface AddonGroupItemProps {
  group: GroupedAddon;
  isSelected: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleExpand: () => void;
}

export default function AddonGroupItem({
  group,
  isSelected,
  isExpanded,
  onToggle,
  onToggleExpand,
}: AddonGroupItemProps) {
  const priceInPounds = group.totalRefund / 100;

  return (
    <div className="py-[1rem] border border-input-stroke mb-[1rem] p-[1rem] sm:p-[1.6rem] rounded-[1.2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <Checkbox checked={isSelected} onChange={onToggle} />

        <div className="border border-border rounded-[1rem] p-[0.9rem] flex items-center justify-center shrink-0">
          <AddonIcon addonType={group.addonType} addonName={group.name} />
        </div>

        <div className="flex-1 min-w-0">
          <Text weight="bold" size="sm" className="text-text-secondary">
            {group.name}
          </Text>
          <Text size="xs" className="text-text-primary">
            {group.totalQuantity} {group.totalQuantity === 1 ? "item" : "items"}{" "}
            · {group.reason}
          </Text>
        </div>

        <div className="text-right shrink-0">
          <Text weight="bold" size="sm" className="text-text-secondary">
            £{priceInPounds.toFixed(0)}
          </Text>
          <Text size="xs" className="text-text-primary">
            /month
          </Text>
        </div>
      </div>

      {group.items.length > 1 && (
        <div className="ml-[3.2rem] mt-[0.6rem]">
          {/* <button
            onClick={onToggleExpand}
            className="text-[1.2rem] font-[700] text-brand-primary flex items-center gap-[0.4rem] hover:opacity-80 transition-opacity"
          >
            <span
              className={cn(
                "transition-transform text-[0.8rem]",
                isExpanded && "rotate-180",
              )}
            >
              ▼
            </span>
            {isExpanded ? "Hide" : "Show"} individual items
          </button> */}

          {isExpanded && (
            <div className="mt-[0.8rem] space-y-[0.2rem] border border-border rounded-[0.8rem] p-[1.2rem]">
              {group.items.map((item, index) => (
                <div
                  key={`${item.addonType}-${index}`}
                  className="flex items-center justify-between py-[0.6rem] border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-[1rem]">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => {}}
                      className="cursor-not-allowed opacity-50"
                    />

                    <Text size="sm" className="text-text-secondary">
                      {item.name} #{index + 1}
                    </Text>
                  </div>
                  <Text size="sm" weight="bold" className="text-text-secondary">
                    £{(item.estimatedRefund / 100).toFixed(0)}
                    <Text
                      as="span"
                      size="xs"
                      className="text-text-primary font-[400] ml-[0.2rem]"
                    >
                      /mo
                    </Text>
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
