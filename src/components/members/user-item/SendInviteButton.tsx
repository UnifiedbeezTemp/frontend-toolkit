import { cn } from "../../../lib/utils";
import Button from "../../ui/Button";

interface SendInviteButtonProps {
  onClick: () => void
  label?: string
  loading?: boolean
  mobile?: boolean
}

export default function SendInviteButton({
  onClick,
  label = "Send Invite",
  loading = false,
  mobile = false,
}: SendInviteButtonProps) {
  return (
    <Button
      size="sm"
      variant="primary"
      onClick={onClick}
      loading={loading}
      className={cn(
        "rounded-[0.4rem] px-[1.6rem] py-[0.8rem]",
        mobile ? "text-[1.4rem]" : "text-[1.4rem]",
      )}
    >
      {label}
    </Button>
  )
}
