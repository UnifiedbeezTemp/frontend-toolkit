import Text from "../../ui/Text";

interface ItemSelectionHeaderProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export default function ItemSelectionHeader({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
}: ItemSelectionHeaderProps) {
  return (
    <div className="flex items-center justify-between pt-[1.2rem] border-t border-input-stroke mt-[1.6rem] sm:mt-[2.4rem] pt-[2.4rem] sm:pt-[2.4rem]">
      <div className="flex items-center gap-[0.6rem]">
        <Text weight="bold" className="text-text-secondary sm:text-[1.6rem]">
          Select items to remove ({selectedCount} of {totalCount} selected)
        </Text>
      </div>

      <div className="flex items-center gap-[1.2rem]">
        <button
          onClick={onSelectAll}
          className="text-[1.3rem] text-brand-primary hover:opacity-80 transition-opacity"
        >
          Select all
        </button>
        <div className="text-[2rem] text-muted">|</div>
        <button
          onClick={onDeselectAll}
          className="text-[1.3rem] text-brand-primary hover:opacity-80 transition-opacity"
        >
          Deselect all
        </button>
      </div>
    </div>
  );
}
