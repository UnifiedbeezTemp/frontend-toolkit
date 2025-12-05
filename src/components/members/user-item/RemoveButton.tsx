import Button from "../../ui/Button";
import { RemoveButtonProps } from "./types";

export default function RemoveButton({
  type,
  status,
  onRemove,
  mobile = false,
}: RemoveButtonProps) {
  const buttonText =
    type === "members"
      ? "Remove"
      : status === "pending"
      ? mobile
        ? "Cancel"
        : "Cancel invitation"
      : "Remove";

  const className = mobile
    ? "text-destructive text-[1.2rem]"
    : "text-destructive";

  return (
    <Button size="sm" variant="ghost" className={className} onClick={onRemove}>
      {buttonText}
    </Button>
  );
}
