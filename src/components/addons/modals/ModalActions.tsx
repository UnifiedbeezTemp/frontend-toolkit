import Button from "../../ui/Button";

interface ModalActionsProps {
  onAdd: () => void;
  onClose: () => void;
  isAddDisabled: boolean;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  onAdd,
  onClose,
  isAddDisabled,
}) => {
  return (
    <div className="border-t border-border py-[2.4rem] flex flex-col sm:flex-row-reverse md:flex-row lg:flex-row-reverse gap-[1rem]">
      <Button className="w-full" onClick={onAdd} disabled={isAddDisabled}>
        Add to plan
      </Button>
      <Button className="w-full" variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};
