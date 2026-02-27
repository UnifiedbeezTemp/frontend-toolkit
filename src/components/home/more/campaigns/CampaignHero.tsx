import ImageComponent from "next/image";
import Card from "../../../ui/Card";

interface Props {
  beeBotImg: string;
  womanGivingManCard: string;
}

export default function CampaignHero({ beeBotImg, womanGivingManCard }: Props) {
  return (
    <Card className="relative rounded-[1.6rem] lg:rounded-[3rem] shadow-none">
      <ImageComponent
        src={beeBotImg}
        alt="beebot"
        width={150}
        height={150}
        className="absolute hidden lg:block top-[-10rem] left-[-5rem] rotate-[-20deg] transition-all duration-500 ease-out hover:scale-110 hover:rotate-[15deg] hover:translate-y-[-.5rem] hover:drop-shadow-xl z-20"
      />
      <ImageComponent
        src={womanGivingManCard}
        alt="people"
        width={350}
        height={350}
        className=""
      />
    </Card>
  );
}
