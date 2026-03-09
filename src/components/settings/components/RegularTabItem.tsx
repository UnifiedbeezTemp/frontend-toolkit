import { cn } from "../../../lib/utils";
import ImageComponent from "../../ui/ImageComponent";

interface RegularTabItemProps {
  tab: {
    name: string;
    iconActive: string;
    iconInactive: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export default function RegularTabItem({
  tab,
  isActive,
  onClick,
}: RegularTabItemProps) {
  return (
    <button
      className={cn(
        "p-[.8rem] rounded-[.8rem] text-[1.4rem] border transition-all shrink-0 flex gap-[0.4rem] items-center whitespace-nowrap",
        isActive
          ? "text-text-primary bg-primary border-input-stroke shadow-sm"
          : "text-inactive-color border-transparent hover:text-inactive-color/80",
      )}
      onClick={onClick}
    >
      <ImageComponent
        src={isActive ? tab.iconActive : tab.iconInactive}
        alt={tab.name}
        width={20}
        height={20}
      />
      {tab.name}
    </button>
  );
}
