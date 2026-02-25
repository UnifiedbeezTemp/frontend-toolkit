import TimesIcon from "../../../assets/icons/TimesIcon";
import WarningIcon from "../../../assets/icons/WarningIcon";
import CloseModalButton from "../../modal/CloseModalButton";

interface DowngradeWarningHeaderProps {
  onClose: () => void;
}

export default function DowngradeWarningHeader({
  onClose,
}: DowngradeWarningHeaderProps) {
  return (
    <div className="bg-primary px-[2rem] py-[1.6rem] sm:py-[2.4rem] flex items-start justify-between relative overflow-hidden">
      <div className="flex items-start gap-[1.2rem] z-[10]">
        <div className="w-[5.6rem] h-[5.6rem] bg-destructive rounded-[1.2rem] p-[1rem] flex items-center justify-center shrink-0">
          <WarningIcon size={30} color="white" />
        </div>
        <div>
          <h2 className="text-secondary text-[1.8rem] sm:text-[2.4rem] font-[700]">
            Downgrade Warning
          </h2>
          <p className="text-secondary text-[1.2rem] sm:text-[1.4rem]">
            You&apos;re about to lose access to important features
          </p>
        </div>
      </div>
      <button className="z-[10]" onClick={onClose}>
        <TimesIcon size={14} color="var(--secondary)" />
      </button>
    </div>
  );
}
