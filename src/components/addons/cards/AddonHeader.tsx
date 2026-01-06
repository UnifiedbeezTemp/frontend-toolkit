import Heading from "@/shared/src/components/ui/Heading";
import Checkbox from "@/shared/src/components/ui/CheckBox";
import ImageComponent from "next/image";
import { Addon } from "../types";

interface AddonHeaderProps {
  addon: Addon;
  isSelected: boolean;
  showCheckbox?: boolean;
}

export const AddonHeader: React.FC<AddonHeaderProps> = ({
  addon,
  isSelected,
  showCheckbox = true,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1rem]">
        <div className="border border-border rounded-[1rem] p-[0.9rem]">
          <ImageComponent
            src={addon.icon}
            alt={addon.name}
            width={20}
            height={20}
          />
        </div>
        <Heading size="sm">{addon.name}</Heading>
      </div>

      {showCheckbox && (
        <Checkbox
          className="rounded-full"
          checked={isSelected}
          onChange={() => {}}
        />
      )}
    </div>
  );
};
