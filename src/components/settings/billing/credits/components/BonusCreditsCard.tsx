"use client";

import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";

interface BonusCreditsCardProps {
  bonusCredits: number;
}

export default function BonusCreditsCard({
  bonusCredits,
}: BonusCreditsCardProps) {
  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] flex flex-col items-start">
      <div className="flex items-center gap-[1.2rem] mb-[2rem]">
        <div>
          <Text className="text-[1.2rem] text-text-primary font-medium mb-[0.4rem]">
            Bonus Credits
          </Text>
          <Heading className="text-[2.8rem] font-bold text-text-secondary leading-none">
            {bonusCredits.toLocaleString()}
          </Heading>
        </div>
      </div>

      <div className="mb-auto">
        <div className="inline-flex items-center px-[1.2rem] py-[0.6rem] border border-border rounded-full mb-[1.2rem]">
          <Text className="text-[1rem] font-bold uppercase tracking-wider">
            Active Protection
          </Text>
        </div>
        <Text className="text-[1.3rem] text-text-primary leading-relaxed">
          Extra credits from your annual subscription
        </Text>
      </div>

      {/* <button className="mt-[2rem] mx-auto text-[1.4rem] font-bold text-text-secondary hover:text-brand-primary transition-colors">
        View Details
      </button> */}
    </div>
  );
}
