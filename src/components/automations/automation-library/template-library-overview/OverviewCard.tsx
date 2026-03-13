import { OverviewData } from "./types";
import { PaginationArrowRightIcon } from "../../../../assets/icons/PaginationArrowRightIcon";
import ImageComponent from "../../../ui/ImageComponent";

interface Props extends OverviewData {
  onOpenModal: (type: string) => void;
}

export default function OverviewCard({
  title,
  icon,
  value,
  label,
  trend,
  automationType,
  onOpenModal,
}: Props) {
  const isPositive = trend.type === "positive";

  return (
    <div className="border-r last:border-b-0 border-b lg:border-b-0 pb-[1rem] pt-[1rem] lg:pb-0 border-input-stroke lg:pt-[1.6rem]  flex flex-col gap-[1rem] lg:gap-[2rem] hover:shadow-md transition-shadow duration-300 group/card cursor-pointer sm:cursor-default">
      <div className="px-[1.6rem] flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-[1.6rem]">
          <span className="text-text-primary text-[1.4rem]">{title}</span>

          <ImageComponent
            src={icon}
            alt={title}
            width={50}
            height={50}
            className=""
          />
        </div>

        {/* Content */}
        <div className="mb-[1.6rem]">
          <div className="flex items-baseline gap-[0.6rem]">
            <span className="text-text-secondary text-[1.4rem] lg:text-[2.4rem] font-bold leading-none">
              {value}
            </span>
            <span className="text-text-secondary text-[1.4rem] lg:text-[2.4rem] font-bold">
              {label}
            </span>
          </div>
        </div>

        {/* Trend */}
        <div
          className={`inline-flex items-center lg:px-[1rem] whitespace-nowrap lg:py-[0.4rem] rounded-full text-[1.2rem] font-bold ${
            isPositive
              ? "bg-success/5 text-success"
              : "bg-destructive/5 text-destructive"
          }`}
        >
          <span className="mr-[0.4rem]">{isPositive ? "↑" : "↓"}</span>
          {trend.text}
        </div>
      </div>

      {/* Footer Link */}
      <div className="border-t border-input-stroke px-[2rem] flex items-center justify-end">
        <button
          onClick={() => onOpenModal(automationType)}
          className="flex items-center justify-center gap-[0.8rem] py-[1.4rem] lg:text-[1.4rem] text-text-primary hover:text-brand-primary active:scale-95 transition-all duration-300 whitespace-nowrap"
        >
          View Library Settings
          <PaginationArrowRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
