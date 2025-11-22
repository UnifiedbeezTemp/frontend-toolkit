import ImageComponent from "next/image";
import { Plan } from "../../data/plansData";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Text from "../ui/Text";

interface PlanCardFeaturesProps {
  plan: Plan;
  showFeatures: boolean;
  onToggle: () => void;
}

export default function PlanCardFeatures({
  plan,
  showFeatures,
  onToggle,
}: PlanCardFeaturesProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="border-t border-inactive-color/30 pt-[2rem]">
      <button
        className="text-brand-primary text-[1.4rem] underline font-[700] flex items-center gap-[0.3rem] sm:hidden mb-[1rem] transition-all"
        onClick={onToggle}
      >
        See all features
        <ImageComponent
          src={icons.greenCaretRight}
          alt=""
          width={15}
          height={15}
          className={`transition-transform duration-300 ${
            showFeatures ? "rotate-90" : ""
          }`}
        />
      </button>

      <div
        className={`${
          !showFeatures ? "sm:block hidden" : "block"
        } transition-all duration-300`}
      >
        <div className="space-y-[1rem]">
          {plan.availableFeatures.map((feature, idx) => (
            <div className="flex items-start gap-[.62rem]" key={idx}>
              <div className="bg-success rounded-full flex items-center justify-center w-[1.5rem] h-[1.5rem] shrink-0">
                <ImageComponent
                  src={icons.checkMark}
                  alt=""
                  width={10}
                  height={10}
                />
              </div>
              <Text size="xs" className="font-[700] text-[1rem]">
                {feature}
              </Text>
            </div>
          ))}
        </div>

        {plan.unAvailableFeatures.length > 0 && (
          <div className="space-y-[1rem] mt-[1rem] border-t border-inactive-color/30 pt-[1rem]">
            {plan.unAvailableFeatures.map((feature, idx) => (
              <div className="flex items-start gap-[.62rem]" key={idx}>
                <div className="bg-destructive rounded-full flex items-center justify-center w-[1.5rem] h-[1.5rem] shrink-0 text-white font-[700] text-xs">
                  ✕
                </div>
                <Text size="xs" className="font-[700] text-[1rem]">
                  {feature}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
