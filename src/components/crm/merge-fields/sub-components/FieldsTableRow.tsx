import { MergeField } from "../types";
import Button from "../../../ui/Button";
import CheckBox from "../../../ui/CheckBox";

interface FieldsTableRowProps {
  field: MergeField;
  isSelected: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
}

export default function FieldsTableRow({
  field,
  isSelected,
  onToggle,
  onViewDetails,
}: FieldsTableRowProps) {
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
        <div className="flex items-center gap-[0.8rem]">
          {field.required && (
            <span className="w-[0.8rem] h-[0.8rem] rounded-full bg-brand-primary shrink-0" />
          )}
          <span className="text-[1.4rem] text-text-primary font-medium">
            {field.name}
          </span>
        </div>
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <span className="text-[1.4rem] text-dark-base-70 font-medium">
          {field.type}
        </span>
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <span className="text-[1.4rem] text-dark-base-70 font-medium">
          {field.autoFillTag}
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
