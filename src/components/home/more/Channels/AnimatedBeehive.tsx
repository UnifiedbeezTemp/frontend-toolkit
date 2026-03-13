import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import Player from "lottie-react";
import animationData from "@/shared/src/animations/Onboarding-Animation-Only-1.json";
import Card from "@/shared/src/components/ui/Card";
import { useSupabaseImages } from "@/shared/src/lib/supabase/useSupabase";

export default function AnimatedBeehive() {
  const images = useSupabaseImages();
  const img = images.beehiveImg;
  return (
    <div className="relative mx-auto">
      <Card className="rounded-[0.6rem] lg:rounded-4xl relative">
        <div className="group relative">
          <ImageComponent
            src={img}
            alt="bee"
            width={70}
            height={70}
            className="absolute top-[-4rem] left-[-2rem] lg:left-[-4rem] w-[4rem] lg:w-[7rem] rotate-[-30deg] 
                       transition-all duration-500 ease-out
                       group-hover:scale-110 
                       group-hover:rotate-[-15deg]
                       group-hover:translate-y-[-5px]
                       group-hover:drop-shadow-xl
                       hover:!z-20"
          />
        </div>

        <Player
          autoplay
          loop
          animationData={animationData}
          className="lg:hidden"
        />
        <Player
          autoplay
          loop
          animationData={animationData}
          style={{ height: 320 }}
          className="hidden lg:block"
        />
      </Card>
    </div>
  );
}
