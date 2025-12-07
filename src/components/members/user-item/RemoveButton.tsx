import { cn } from "../../../lib/utils";
import Button from "../../ui/Button";
import { RemoveButtonProps } from "./types";

export default function RemoveButton({
  type,
  status,
  onRemove,
  mobile = false,
  disabled = false,
  loading = false,
}: RemoveButtonProps & { loading?: boolean }) {
  const buttonText =
    type === "members"
      ? "Remove"
      : status === "pending"
      ? mobile
        ? "Cancel invitation"
        : "Cancel invitation"
      : "Remove";

  const className = mobile
    ? "text-[1.4rem]"
    : "text-[1.4rem]";

  return (
    <Button 
      size="sm" 
      variant="ghost" 
      className={cn("text-destructive font-[400]", className)} 
      onClick={onRemove}
      disabled={disabled || loading}
      loading={loading}
    >
      {buttonText}
    </Button>
  );
}
