import { getChannelColor, getChannelIcon } from "../utils";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import { cn } from "../../../../lib/utils";
import ListPlaceholderIcon from "../../../../assets/icons/ListPlaceholderIcon";
import Button from "../../../ui/Button";
import CheckBox from "../../../ui/CheckBox";
import { CRMList } from "../types";

interface ListsTableRowProps {
  list: CRMList;
  isSelected: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
}

export default function ListsTableRow({
  list,
  isSelected,
  onToggle,
  onViewDetails,
}: ListsTableRowProps) {
  const icons = useSupabaseIcons();

  return (
    <tr className="group hover:bg-input-filled transition-colors">
      <td className="p-[1.6rem]">
        <CheckBox
          checked={isSelected}
          onChange={onToggle}
          className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
        />
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <div className="flex items-center gap-[1.2rem]">
          <div className="flex-shrink-0">
            <ListPlaceholderIcon size={48} color="var(--muted)" />
          </div>
          <div className="flex flex-col gap-[0.2rem]">
            <span className="text-[1.4rem] font-bold text-dark">
              {list.name}
            </span>
            <span className="text-[1.2rem] text-dark/40 font-medium">
              Add Label
            </span>
          </div>
        </div>
      </td>
      <td className="p-[1.6rem] border-r border-border text-center lg:text-left">
        <span className="text-[1.4rem] text-dark-base-70 font-medium whitespace-nowrap">
          {list.activeContacts}
        </span>
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <div
          className={cn(
            "flex items-center gap-[0.8rem] border w-fit px-[0.8rem] py-[0.4rem] rounded-full",
            getChannelColor(list.marketingChannel),
          )}
        >
          <ImageComponent
            src={getChannelIcon(list.marketingChannel, icons)}
            alt={list.marketingChannel}
            width={18}
            height={18}
          />
          <span className="text-[1rem] font-medium whitespace-nowrap">
            {list.marketingChannel}
          </span>
        </div>
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <span className="text-[1.4rem] text-dark-base-70 font-medium">
          {list.onSubmissionAction}
        </span>
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <span className="text-[1.4rem] text-dark-base-70 font-medium">
          {list.submissions}
        </span>
      </td>
      <td className="p-[1.6rem]">
        <Button
          variant="secondary"
          className="h-[3.6rem] px-[1.2rem] text-[1.2rem] font-semibold border-border text-dark-base-70 hover:bg-accent rounded-[0.8rem] whitespace-nowrap"
          onClick={onViewDetails}
        >
          View details
        </Button>
      </td>
    </tr>
  );
}
