import Button from "@/shared/src/components/ui/Button";

interface InactivePagesModalActionsProps {
  onClose: () => void;
  onSave: () => void;
}

export default function InactivePagesModalActions({
  onClose,
  onSave,
}: InactivePagesModalActionsProps) {
  return (
    <div className="flex items-center justify-end gap-[1rem] mt-[2rem]">
      <Button 
        variant="secondary" 
        className="px-[1.8rem] text-[1.6rem] py-[.8rem] rounded-[1rem]" 
        onClick={onClose}
      >
        Go back
      </Button>
      <Button 
        className="px-[2.5rem] rounded-[1rem] py-[.8rem] text-[1.6rem] highlight-inside border-0" 
        onClick={onSave}
      >
        Add
      </Button>
    </div>
  );
}