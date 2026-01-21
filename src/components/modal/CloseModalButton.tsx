import TimesIcon from "../../assets/icons/TimesIcon";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import IconButton from "../ui/IconButton";

interface Props {
  onClick: () => void;
  className?: string;
}

export default function CloseModalButton({ onClick, className }: Props) {
  const icons = useSupabaseIcons();
  return (
    <IconButton
      className={className}
      variant="secondary"
      icon={<TimesIcon size={10} />}
      onClick={onClick}
      ariaLabel="Close"
    />
  );
}
