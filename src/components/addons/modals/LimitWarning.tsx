import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import ImageComponent from "next/image";
import Link from "next/link";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface LimitWarningProps {
  hasLimitReachedAddons: boolean;
}

export const LimitWarning: React.FC<LimitWarningProps> = ({
  hasLimitReachedAddons,
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
          Upgrade your plan to get access to more.{" "}
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
