import Button from "../../ui/Button";

interface ModalActionsProps {
  onAdd: () => void;
  onClose: () => void;
  isAddDisabled: boolean;
  isLoading?: boolean;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  onAdd,
  onClose,
  isAddDisabled,
  isLoading = false,
}) => {
  return (
    <div className="border-t border-border py-[2.4rem] flex flex-col sm:flex-row-reverse md:flex-row lg:flex-row-reverse gap-[1rem]">
      <Button
        className="w-full"
        onClick={onAdd}
        disabled={isAddDisabled}
        loading={isLoading}
        loadingText="Adding..."
      >
        Add to plan
      </Button>
      <Button
        className="w-full"
        variant="secondary"
        onClick={onClose}
        disabled={isLoading}
      >
        Cancel
      </Button>
    </div>
  );
};
