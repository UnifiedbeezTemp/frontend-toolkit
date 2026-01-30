import Button from "../../../../ui/Button";

interface EditChannelFooterProps {
  onDone?: () => void;
  onBack?: () => void;
}

export default function EditChannelFooter({
  onDone,
  onBack,
}: EditChannelFooterProps) {
  return (
    <div className="flex items-center gap-[1rem] sticky bottom-0 bg-primary py-[1rem] z-[100]">
      <Button variant="secondary" className="w-full" onClick={onBack}>
        Go back
      </Button>
      <Button className="w-full" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
