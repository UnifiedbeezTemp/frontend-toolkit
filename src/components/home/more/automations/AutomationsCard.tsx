"use client";


import BackgroundBlurs from "../BackgroundBlurs";
import AutomationItem from "./AutomationItem";
import { automationsData } from "../utils/data";
import ImageComponent from "next/image";
import { useSupabaseIcons, useSupabaseImages } from "../../../../lib/supabase/useSupabase";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";


export default function AutomationsCard() {
  const icons = useSupabaseIcons();
  const images = useSupabaseImages();

  return (
    <div className="relative mt-[2rem] sm:mt-[12rem]" id="automations">
      <ImageComponent
        src={images.aiImg}
        alt="bee"
        width={150}
        height={150}
        className="absolute hidden lg:block top-[-100px] left-[-0px] rotate-[25deg] transition-all duration-500 ease-out hover:scale-110 hover:rotate-[-15deg] hover:translate-y-[-5px] hover:drop-shadow-xl z-20"
      />

      <div 
      className="overflow-hidden rounded-[2rem] lg:rounded-[4rem] border border-input-stroke bg-input-filled px-[2rem] lg:px-[4.6rem] relative py-[2rem] sm:pt-[4rem]"
      // className="relative overflo w-hidden rounded-[2rem] lg:rounded-[4rem] bg-border lg:px-[4.6rem]"
      >
        <BackgroundBlurs position="top-left" />

        <div className="z-[10]">
          <Button variant="secondary" className="inline-block rounded-[0.8rem] relative z-[10]">
            Automations
          </Button>

          <div className="mx-auto space-y-[5px] mt-4 mb-[1.9rem]">
            <Heading align="center" className="text-[2rem] sm:text-[2.4rem]">
              ⚡ Automations – Work Smarter, Not Harder
            </Heading>
            <Text align="center" className="leading-[2.3rem]">
              UnifiedBeez automations help your team save time, reduce errors,
              and deliver <br className="hidden sm:block" /> faster responses — so you can focus on what really
              matters: growing your business.
            </Text>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:py-[2.4rem]">
            {automationsData.map((item, i) => (
              <AutomationItem
                key={i}
                data={item}
                index={i}
                sendIcon={icons.send2}
                envelope={icons.envelope}
                cart={icons.cart}
                image={images.automationsImg}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
