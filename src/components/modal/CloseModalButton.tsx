import TimesIcon from "../../assets/icons/TimesIcon";
import IconButton from "../ui/IconButton";

interface Props {
  onClick: () => void;
  className?: string;
}

export default function CloseModalButton({ onClick, className }: Props) {
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
