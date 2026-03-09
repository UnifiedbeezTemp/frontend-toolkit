"use client";

import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Button from "../../../../ui/Button";
import Heading from "../../../../ui/Heading";
import ImageComponent from "../../../../ui/ImageComponent";
import Text from "../../../../ui/Text";
import { CreditStats } from "../hooks/useCreditSettings";
import CoinShareIcon from "../../../../../assets/icons/CoinShareIcon";
import ArrowTopRight from "../../../../../assets/icons/ArrowTopRight";

interface CreditRemainingCardProps {
  stats: CreditStats;
  onPurchase: () => void;
}

export default function CreditRemainingCard({
  stats,
  onPurchase,
}: CreditRemainingCardProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="bg-primary border border-border rounded-[2rem] p-[2.4rem] lg:col-span-2 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-[1.2rem]">
          <div className="flex items-center gap-[1.2rem]">
            <div className="w-[4.8rem] h-[4.8rem] bg-input-filled rounded-[1.2rem] flex items-center justify-center">
              <CoinShareIcon size={24} color="var(--text-primary)" />
            </div>
            <div>
              <Text className="text-[1.4rem] text-text-primary font-medium mb-[0.4rem]">
                Credits Remaining
              </Text>
              <Heading className="text-[2.8rem] font-bold text-text-secondary leading-none">
                {stats.remaining.toLocaleString()}
              </Heading>
            </div>
          </div>
          <Button variant="ghost" onClick={onPurchase} className="group">
            Purchase Credits
            <ArrowTopRight
              size={20}
              className="ml-[0.8rem] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform"
            />
          </Button>
        </div>

        <Text className="text-[1.2rem] text-text-primary mb-[2rem]">
          of {stats.total.toLocaleString()} total credits
        </Text>
      </div>

      <div>
        <div className="w-full h-[1rem] bg-input-filled rounded-full overflow-hidden mb-[1.2rem]">
          <div
            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500"
            style={{ width: `${stats.percentageUsed}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <Text className="text-[1.4rem] text-text-primary font-medium">
            {stats.percentageUsed}% used
          </Text>
          <Text className="text-[1.4rem] text-text-primary font-medium">
            {stats.used.toLocaleString()} credits used
          </Text>
        </div>

        <div className="mt-[1.6rem] border-t pt-[1.6rem] border-border flex items-center gap-[0.8rem]">
          <ImageComponent
            src={icons.calendar}
            alt="calendar"
            width={16}
            height={16}
            className="brightness-40"
          />
          <Text className="text-[1.2rem] text-text-primary/60">
            Resets on {stats.resetDate}
          </Text>
        </div>
      </div>
    </div>
  );
}
