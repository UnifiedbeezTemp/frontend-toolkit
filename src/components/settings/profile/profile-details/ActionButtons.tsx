import Button from "../../../ui/Button";

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
  isLoading?: boolean;
}

export default function ActionButtons({
  onSave,
  onCancel,
  isEditing,
  isLoading,
}: ActionButtonsProps) {
  if (!isEditing) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row  gap-[1rem] justify-end pt-[1.6rem]">
      <Button
        variant="secondary"
        onClick={onCancel}
        className="py-[.7rem] rounded-[0.8rem] text-[1.6rem] min-w-[24.4rem]"
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        className="py-[.7rem] border-0 rounded-[0.8rem] text-[1.6rem] min-w-[24.4rem] highlight-inside"
        disabled={isLoading}
        loading={isLoading}
      >
        {"Save Changes"}
      </Button>
    </div>
  );
}
