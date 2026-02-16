import Link from "next/link";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";

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

  return (
    <div className="border border-border p-[1.6rem] sm:flex items-start gap-[1.6rem] rounded-[0.8rem] space-y-[1rem] mb-[4.8rem] sm:mb-[4rem]">
      <ImageComponent
        src={icons.infoRed}
        alt="Warning"
        width={20}
        height={20}
      />
      <div className="">
        <Heading size="sm">You've reached your limit for some plans</Heading>
        <Text size="sm">
          {!planType || planType.toLowerCase() !== "organisation" ? (
            <>
              Upgrade your plan to get access to more.{" "}
              <Link
                className="underline text-brand-primary font-[700] transition-all hover:scale-98"
                href="/plans"
              >
                Upgrade Plan
              </Link>
            </>
          ) : (
            "You have reached the maximum limit for this add-on."
          )}
        </Text>
      </div>
    </div>
  );
};
