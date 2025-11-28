import Button from "../../../ui/Button";

interface InactivePagesModalActionsProps {
  onClose: () => void;
  onSave: () => void;
}

export default function InactivePagesModalActions({
  onClose,
  onSave,
}: InactivePagesModalActionsProps) {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-end gap-[1rem] mt-[4rem] sm:mt-[2rem]">
      <Button 
        variant="secondary" 
        className="px-[1.8rem] text-[1.6rem] py-[.8rem] rounded-[1rem] w-full sm:w-auto" 
        onClick={onClose}
      >
        Go back
      </Button>
      <Button 
        className="px-[2.5rem] rounded-[1rem] py-[.8rem] text-[1.6rem] highlight-inside border-0 w-full sm:w-auto" 
        onClick={onSave}
      >
        Add
      </Button>
    </div>
  );
}