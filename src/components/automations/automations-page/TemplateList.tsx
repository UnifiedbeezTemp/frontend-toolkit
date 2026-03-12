import TemplateCard from "./template/TemplateCard";
import { getTemplatesData } from "./utils/data";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTemplateCard } from "./hooks/useTemplateCard";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Button from "../../ui/Button";

interface Props {
  icons: Record<string, string>;
}

export default function TemplateList({ icons }: Props) {
  const router = useRouter();
  const { handleGoToDashboard } = useTemplateCard();

  const templates = useMemo(() => {
    return getTemplatesData(icons);
  }, [icons]);

  return (
    <div className="mx-auto">
      <div className="flex flex-col sm:flex-row items-start gap-[1.6rem] justify-between  sm:items-center mb-[2.4rem]">
        <div>
          <Heading>Automation Template Library</Heading>
          <Text size="sm">
            Choose a focus area to start building automations tailored to your
            business needs.
          </Text>
        </div>
        <Button
          variant="secondary"
          className="font-[600] text-[1.5rem] py-[1rem] px-[0.8rem] rounded-[0.8rem]"
          onClick={() => router.push("/automations/library")}
        >
          See automation list
        </Button>
      </div>

      <div>
        {templates.map((template, i) => (
          <TemplateCard key={i} template={template} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-[1rem] sm:gap-[2.4rem] mt-[6.4rem]">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.back()}
        >
          Go back
        </Button>
        <Button className="w-full highlight-inside border-0" onClick={handleGoToDashboard}>
          Go to automation dashboard
        </Button>
      </div>
    </div>
  );
}
