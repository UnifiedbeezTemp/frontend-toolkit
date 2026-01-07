import Link from "next/link";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import ImageComponent from "../../ui/ImageComponent";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";

interface InfoSectionProps {
  addon: Addon | null;
  canAddMore: boolean;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
  addon,
  canAddMore,
}) => {
  const icons = useSupabaseIcons();

  const borderColor = canAddMore ? "border-brand-primary" : "border-border";
  const iconSrc = canAddMore ? icons.infoGreen : icons.infoRed;
  const iconAlt = canAddMore ? "Info" : "Warning";

  if (canAddMore) {
    return (
      <div
        className={`sm:flex md:flex-col lg:flex-row items-start gap-[1.6rem] md:gap-[1.6rem] lg:gap-[1.6rem] border ${borderColor} p-[1.6rem] rounded-[0.8rem] space-y-[1rem] md:space-y-[1.6rem] mb-[4.8rem] md:h-full md:flex md:flex-col md:justify-center`}
      >
        <ImageComponent
          src={iconSrc}
          alt={iconAlt}
          width={20}
          height={20}
          className="md:w-[24px] md:h-[24px] md:mx-auto"
        />
        <div>
          <Heading size="sm">Booking additional Extra {addon?.name}</Heading>
          <Text size="sm">
            Additionally booked Extra {addon?.name} will be automatically added
            to your plan. If you pay for your plan annually, we will debit the
            amount once for the remaining term, otherwise monthly.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`sm:flex md:flex-col lg:flex-row items-start gap-[1.6rem] md:gap-[0rem] lg:gap-[1.6rem] border ${borderColor} p-[1.6rem] rounded-[0.8rem] space-y-[1rem] mb-[4.8rem] md:h-full md:flex md:flex-col md:justify-center`}
    >
      <ImageComponent src={iconSrc} alt={iconAlt} width={20} height={20} />
      <div className="">
        <Heading size="sm">
          You reached your limit for {addon?.name} for this plan
        </Heading>
        <Text size="sm">
          Upgrade your plan to get access to extra {addon?.name}.{" "}
          <Link
            className="underline text-brand-primary font-[700] transition-all hover:scale-98"
            href="/plans"
          >
            Upgrade Plan
          </Link>
        </Text>
      </div>
    </div>
  );
};
