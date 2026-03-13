import BuildWithAI from "./BuildWithAI";
import TriggerSchedule from "./TriggerSchedule";
import PresetTemplates from "./PresetTemplates";
import { useRouter } from "next/navigation";
import Card from "../../../ui/Card";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import Button from "../../../ui/Button";

interface Automation {
  title: string;
  description: string;
  ctaText: string;
}

interface Props {
  data: Automation;
  index: number;
  sendIcon: string;
  envelope: string;
  cart: string;
  image: string;
}

export default function AutomationItem({
  data,
  index,
  sendIcon,
  envelope,
  cart,
  image,
}: Props) {
  const router = useRouter();

  const renderUI = () => {
    if (index === 0) return <BuildWithAI sendIcon={sendIcon} />;
    if (index === 1) return <TriggerSchedule image={image} />;
    if (index === 2) return <PresetTemplates envelope={envelope} cart={cart} />;
    return null;
  };

  return (
    <>
      <Card className="flex flex-col gap-[1rem] sm:gap-[2rem] lg:gap-[1rem] z-[10] items-start lg:rounded-[2rem] sm:flex-row lg:flex-col sm:items-center lg:items-start">
        <Card className="bg-input-filled overflow-hidden shadow-none w-full mb-[1rem] hover:shadow-none h-[23rem] flex items-center justify-center p-[2rem] md:w-[100%]">
          {renderUI()}
        </Card>
        <div className="flex flex-col items-start gap-[1rem]">
          <Heading size="sm" align="left">
            {data.title}
          </Heading>
          <Text align="left" className="mb-[4rem] max-w-[25rem]" size="xs">
            {data.description}
          </Text>
          <Button
            className="inline px-[1.6rem] py-[.5rem] rounded-[0.8rem] text-[1.5rem]"
            onClick={() => router.push("/automations")}
          >
            {data.ctaText}
          </Button>
        </div>
      </Card>
    </>
  );
}
