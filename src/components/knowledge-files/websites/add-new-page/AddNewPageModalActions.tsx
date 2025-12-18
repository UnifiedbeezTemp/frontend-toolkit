import Button from "../../../ui/Button";

interface AddNewPageModalActionsProps {
  onClose: () => void;
  onAdd: () => void;
  isLoading?: boolean;
}

export default function AddNewPageModalActions({
  onClose,
  onAdd,
  isLoading = false,
}: AddNewPageModalActionsProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-end gap-[1.2rem] mt-[4rem]">
      <Button
        variant="secondary"
        className="px-[1.8rem] py-[1rem] rounded-[0.8rem] w-full lg:w-auto"
        onClick={onClose}
        disabled={isLoading}
      >
        Go back
      </Button>
      <Button
        variant="primary"
        className="highlight-inside px-[1.8rem] py-[1rem] rounded-[0.8rem] border-none hover:border-[1px] hover:border-brand-primary w-full lg:w-auto"
        onClick={onAdd}
        loading={isLoading}
        disabled={isLoading}
      >
        Add
      </Button>
    </div>
  );
}
