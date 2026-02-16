import TimesIcon from "../../../assets/icons/TimesIcon";
import CloseModalButton from "../../modal/CloseModalButton";

interface DowngradeWarningHeaderProps {
  onClose: () => void;
}

export default function DowngradeWarningHeader({
  onClose,
}: DowngradeWarningHeaderProps) {
  return (
    <div className="bg-destructive px-[2rem] py-[1.6rem] sm:py-[2.4rem] flex items-start justify-between relative overflow-hidden">
      <div className="flex items-start gap-[1.2rem] z-[10]">
        <div className="w-[5.6rem] h-[5.6rem] bg-primary rounded-[1.2rem] p-[1rem] flex items-center justify-center shrink-0">
          <span className="text-destructive text-[4rem] font-[700]">⚠</span>
        </div>
        <div>
          <h2 className="text-primary text-[1.8rem] sm:text-[2.4rem] font-[700]">
            Downgrade Warning
          </h2>
          <p className="text-primary text-[1.2rem] sm:text-[1.4rem]">
            You&apos;re about to lose access to important features
          </p>
        </div>
      </div>
      <button className="z-[10]" onClick={onClose}>
        <TimesIcon size={20} color="var(--primary)" />
      </button>

      <div className="w-[15rem] h-[15rem] rounded-full absolute bg-primary/10 top-[-5rem] right-[-5rem]"></div>
      <div className="w-[12rem] h-[12rem] rounded-full absolute bg-secondary/10 bottom-[-5rem] left-[-5rem]"></div>
    </div>
  );
}
