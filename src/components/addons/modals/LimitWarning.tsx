import Link from "next/link";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";
import { cn } from "../../../lib/utils";

interface LimitWarningProps {
  hasLimitReachedAddons: boolean;
  planType?: string;
}

export const LimitWarning: React.FC<LimitWarningProps> = ({
  hasLimitReachedAddons,
  planType,
}) => {
  const icons = useSupabaseIcons();

  if (!hasLimitReachedAddons) return null;

  const isNeutral = !planType || planType.toLowerCase() !== "organisation";

  return (
    <div
      className={cn(
        "border p-[1.6rem] sm:flex items-start gap-[1.6rem] rounded-[0.8rem] space-y-[1rem] mb-[4.8rem] sm:mb-[4rem]",
        isNeutral ? "border-brand-primary" : "border-border",
      )}
    >
      <ImageComponent
        src={isNeutral ? icons.infoGreen : icons.infoRed}
        alt="Information"
        width={20}
        height={20}
      />
      <div className="">
        <Heading size="sm">
          {isNeutral ? "Plan add-on information" : "Add-on limit reached"}
        </Heading>
        <Text size="sm">
          {isNeutral ? (
            <>
              Some add-ons have a single quantity limit on your current plan.
              Upgrade to get access to more.{" "}
              <Link
                className="underline text-brand-primary font-[700] transition-all hover:scale-98"
                href="/plans"
              >
                Upgrade Plan
              </Link>
            </>
          ) : (
            "You have reached the maximum limit for one or more add-ons on your current plan."
          )}
        </Text>
      </div>
    </div>
  );
};
