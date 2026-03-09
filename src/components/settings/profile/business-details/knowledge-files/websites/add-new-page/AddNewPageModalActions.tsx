import Button from "@/shared/src/components/ui/Button";

interface AddNewPageModalActionsProps {
  onClose: () => void;
  onAdd: () => void;
}

export default function AddNewPageModalActions({
  onClose,
  onAdd,
}: AddNewPageModalActionsProps) {
  return (
    <div className="flex items-center justify-end gap-[1.2rem] mt-[4rem]">
      <Button
        variant="secondary"
        className="px-[1.8rem] py-[1rem] rounded-[0.8rem]"
        onClick={onClose}
      >
        Go back
      </Button>
      <Button
        variant="primary"
        className="highlight-inside px-[1.8rem] py-[1rem] rounded-[0.8rem] border-none hover:border-[1px] hover:border-brand-primary"
        onClick={onAdd}
      >
        Add
      </Button>
    </div>
  );
}
