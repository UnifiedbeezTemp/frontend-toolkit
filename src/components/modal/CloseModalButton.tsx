import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import ImageComponent from "../ui/ImageComponent";

interface Props {
    onClick: () => void;
}

export default function CloseModalButton({onClick}: Props ) {
  const icons = useSupabaseIcons()
  return (
    <Button className="p-[0.6rem] rounded-[0.8rem]" variant="secondary" onClick={onClick}>
        <ImageComponent src={icons.close} alt={"X"} width={20} height={20}/>
    </Button>
  )
}