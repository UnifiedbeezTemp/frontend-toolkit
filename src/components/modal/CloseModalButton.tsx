import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";
import ImageComponent from "../ui/ImageComponent";

interface Props {
  onClick: () => void;
  className?: string;
}

export default function CloseModalButton({ onClick, className }: Props) {
  const icons = useSupabaseIcons();
  return (
    <Button
      className={cn("p-[0.6rem] rounded-[0.8rem]", className)}
      variant="secondary"
      onClick={onClick}
    >
      <ImageComponent src={icons.close} alt={"X"} width={20} height={20} />
    </Button>
  );
}
