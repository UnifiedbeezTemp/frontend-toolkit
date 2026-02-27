import { useRouter } from "next/navigation";
import { useSupabaseImages } from "../../../../lib/supabase/useSupabase";
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import FeatureItem from "../FeatureItem";
import { campaignFeatures } from "../utils/data";
import CampaignHero from "./CampaignHero";

export default function CampaignContent() {
  const images = useSupabaseImages();
  const router = useRouter();

  return (
    <Card className="z-[10] lg:w-[50%] flex flex-col gap-[1.6rem] items-start lg:items-end justify-center bg-transparent shadow-none border-0 hover:shadow-none">
      <div className="grid gap-[1.4rem] items-center grid-cols-2 sm:grid-cols-3 lg:block">
        <div className="lg:hidden sm:col-span-1">
          <CampaignHero
            beeBotImg={images.beeBotImg}
            womanGivingManCard={images.womanGivingManCard}
          />
        </div>
        <div className="sm:col-span-2 flex lg:flex flex-col lg:items-end items-start gap-[1.1rem]">
          <Button
            variant="secondary"
            className="inline-block rounded-[.8rem] text-[1.4rem] font-[400] lg:font-[700] lg:text-[1.6rem]"
            size="sm"
          >
            Campaigns
          </Button>
          <Heading className="text-left text-[1.4rem] lg:text-[2rem] lg:text-right max-w-[40rem]">
            Email & SMS Campaigns - Smarter Outreach, Stronger Connections
          </Heading>
          <Text className="left lg:text-right hidden sm:block lg:hidden text-[1.4rem]">
            Reach your audience where it matters most, whether in their inbox or
            on their phone. UnifiedBeez combines powerful email campaigns with
            instant SMS messaging so you can connect, engage, and convert like
            never before.
          </Text>
        </div>
      </div>
      <Text className="left lg:text-right sm:hidden lg:block text-[1.4rem]">
        Reach your audience where it matters most, whether in their inbox or on
        their phone. UnifiedBeez combines powerful email campaigns with instant
        SMS messaging so you can connect, engage, and convert like never before.
      </Text>
      <div className="space-y-4 ">
        {campaignFeatures.map((f, i) => (
          <FeatureItem key={i} title={f.title} text={f.text} right />
        ))}
      </div>
      <Button
        className="rounded-[.8rem] text-[1.5rem] z-[10] relative py-[.5rem]"
        onClick={() => router.push("/campaigns")}
      >
        Create your first campaign
      </Button>
    </Card>
  );
}
