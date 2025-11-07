import { X } from "lucide-react";
import Button from "../ui/Button";

interface Props {
    onClick: () => void;
}

export default function CloseModalButton({onClick}: Props ) {
  return (
    <Button className="p-[8px] rounded-[8px]" variant="secondary" onClick={onClick}>
        <X/>
    </Button>
  )
}