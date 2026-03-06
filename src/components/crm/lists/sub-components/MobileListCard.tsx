import CheckBox from "../../../ui/CheckBox";
import ImageComponent from "../../../ui/ImageComponent";
import { cn } from "../../../../lib/utils";
import { getChannelIcon, getChannelColor } from "../utils";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { CRMList } from "../types";
import Button from "../../../ui/Button";

interface MobileListCardProps {
  list: CRMList;
  isSelected: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
}

export default function MobileListCard({
  list,
  isSelected,
  onToggle,
  onViewDetails,
}: MobileListCardProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="rounded-[1.2rem] border border-border p-[1.4rem] bg-primary">
      <div className="flex items-start justify-between gap-[1rem]">
        <div className="flex items-center gap-[1.2rem]">
          <CheckBox
            checked={isSelected}
            onChange={onToggle}
            className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
          />
          <div className="flex flex-col gap-[0.2rem]">
            <span className="text-[1.5rem] font-bold text-text-primary leading-tight">
              {list.name}
            </span>
            <span className="text-[1.2rem] text-muted font-medium">
              {list.label}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-[0.6rem] border px-[0.8rem] py-[0.3rem] rounded-full shrink-0",
            getChannelColor(list.marketingChannel),
          )}
        >
          <ImageComponent
            src={getChannelIcon(list.marketingChannel, icons)}
            alt={list.marketingChannel}
            width={14}
            height={14}
          />
          <span className="text-[1.1rem] font-medium leading-none">
            {list.marketingChannel}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-[1.2rem] pt-[1.2rem] border-t border-border ml-[3rem]">
        <div className="flex items-center gap-[1.2rem] text-muted">
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-[1.2rem] font-medium text-text-secondary">
              Contacts:
            </span>
            <span className="text-[1.2rem] font-semibold text-text-primary">
              {list.activeContacts}
            </span>
          </div>
          <div className="w-[0.4rem] h-[0.4rem] bg-muted rounded-full" />
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-[1.2rem] font-medium text-text-secondary">
              Submissions:
            </span>
            <span className="text-[1.2rem] font-semibold text-text-primary">
              {list.submissions}
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="h-[3rem] px-[1rem] text-[1.1rem] font-semibold border-border text-dark-base-70 hover:bg-accent rounded-[0.6rem] whitespace-nowrap"
          onClick={onViewDetails}
        >
          Details
        </Button>
      </div>
    </div>
  );
}
