import Button from "../../ui/Button";

interface DowngradeWarningFooterProps {
  selectedCount: number;
  totalSavings: number;
  onCancel: () => void;
  onProceed: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function DowngradeWarningFooter({
  selectedCount,
  totalSavings,
  onCancel,
  onProceed,
  isLoading,
  disabled,
}: DowngradeWarningFooterProps) {
  return (
    <div className="flex items-center gap-[1.2rem] p-[2rem] border-t border-input-stroke bg-primary sticky bottom-0">
      <Button
        variant="secondary"
        className="flex-1 py-[1.2rem]"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className="flex-1 py-[1.2rem]"
        onClick={onProceed}
        disabled={disabled}
        loading={isLoading}
        loadingText="Processing..."
      >
        Proceed
      </Button>
    </div>
  );
}
