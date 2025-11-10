import { X } from "lucide-react";
import Button from "../ui/Button";

interface Props {
    onClick: () => void;
}

export default function CloseModalButton({onClick}: Props ) {
  return (
    <Button className="p-[0.6rem] rounded-[0.8rem]" variant="secondary" onClick={onClick}>
        <X/>
    </Button>
  )
}