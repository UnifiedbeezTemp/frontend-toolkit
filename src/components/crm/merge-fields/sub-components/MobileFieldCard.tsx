import CheckBox from "../../../ui/CheckBox";
import Button from "../../../ui/Button";
import { MergeField } from "../types";

interface MobileFieldCardProps {
  field: MergeField;
  isSelected: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
}

export default function MobileFieldCard({
  field,
  isSelected,
  onToggle,
  onViewDetails,
}: MobileFieldCardProps) {
  return (
    <div className="rounded-[1.2rem] border border-border p-[1.4rem] bg-primary">
      <div className="flex items-start justify-between gap-[1rem]">
        <div className="flex items-center gap-[1.2rem]">
          <CheckBox
            checked={isSelected}
            onChange={onToggle}
            className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
          />
          <div className="flex flex-col gap-[0.4rem]">
            <div className="flex items-center gap-[0.6rem]">
              {field.required && (
                <span className="w-[0.8rem] h-[0.8rem] rounded-full bg-brand-primary shrink-0" />
              )}
              <span className="text-[1.4rem] text-text-primary font-semibold">
                {field.name}
              </span>
            </div>
            <span className="text-[1.2rem] text-muted font-medium">
              {field.type}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-[1.2rem] pt-[1.2rem] border-t border-border ml-[3rem]">
        <span className="text-[1.2rem] text-text-secondary font-medium truncate mr-[0.8rem]">
          {field.autoFillTag}
        </span>
        <Button
          variant="secondary"
          className="h-[3rem] px-[1rem] text-[1.1rem] font-semibold border-border text-dark-base-70 hover:bg-accent rounded-[0.6rem] whitespace-nowrap shrink-0"
          onClick={onViewDetails}
        >
          Details
        </Button>
      </div>
    </div>
  );
}
