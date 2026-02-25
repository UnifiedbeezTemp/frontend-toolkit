"use client";

import BackgroundBlurs from "../BackgroundBlurs";
import CampaignHero from "./CampaignHero";
import CampaignContent from "./CampaignContent";
import { useSupabaseImages } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";

export default function CampaignsCard() {
  const images = useSupabaseImages();

  return (
    <div className="relative mt-[2rem] lg:mt-[12rem]" id="campaigns">
      <ImageComponent
        src={images.beeImg}
        alt="bee"
        width={150}
        height={150}
        className="absolute hidden lg:block top-[-10rem] right-[15rem] rotate-[-10deg] transition-all duration-500 ease-out hover:scale-110 hover:rotate-[-15deg] hover:translate-y-[-5px] hover:drop-shadow-xl z-20"
      />

      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-4xl bg-input-filled lg:pt-[2rem] lg:pb-[2rem] lg:pb-[3rem] lg:pl-[2.4rem] lg:pr-[1.6rem]">
        <BackgroundBlurs />

        <div className="sm:flex items-center justify-between py-[2rem] lg:gap-10">
         <div className="hidden lg:block pl-[1rem]">
           <CampaignHero
            beeBotImg={images.beeBotImg}
            womanGivingManCard={images.womanGivingManCard}
          />
         </div>
          <CampaignContent />
        </div>
      </div>
    </div>
  );
}