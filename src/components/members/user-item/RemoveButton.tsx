import Image from "next/image";
import { cn } from "../../../lib/utils";
import Button from "../../ui/Button";
import { RemoveButtonProps } from "./types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export default function RemoveButton({
  type,
  status,
  onRemove,
  mobile = false,
  disabled = false,
  loading = false,
}: RemoveButtonProps & { loading?: boolean }) {
  const icons = useSupabaseIcons();
  const isDraft = status === "draft";

  if (isDraft) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className={cn("p-[0.4rem] hover:bg-destructive/10 rounded-full")}
        onClick={onRemove}
        disabled={disabled || loading}
        loading={loading}
      >
        <Image
          src={icons.xCancelRed}
          alt="Remove"
          width={20}
          height={20}
          className="opacity-70 hover:opacity-100 transition-opacity"
        />
      </Button>
    );
  }

  const buttonText =
    type === "members"
      ? "Remove"
      : status === "pending"
        ? "Cancel invitation"
        : "Remove";

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        "text-destructive font-[400]",
        mobile ? "text-[1.4rem]" : "text-[1.4rem]",
      )}
      onClick={onRemove}
      disabled={disabled || loading}
      loading={loading}
    >
      {buttonText}
    </Button>
  );
}
