import Card from "../../../ui/Card";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";

interface Props {
  sendIcon: string;
}

export default function BuildWithAI({ sendIcon }: Props) {
  return (
    <Card className="cursor-not-allowed shadow-none w-full hover:shadow-none px-[1rem] py-[1rem] scale-70">
      <Heading className="text-[1rem]">
        Create a Quick Automation with BeeZora
      </Heading>
      <Text className="text-[.8rem] mb-[.2rem]">
        Start an Automation. BeeBot Will Handle the Rest.
      </Text>
      <div className="flex flex-col items-end">
        <div className="border border-border rounded-lg p-[.3rem] mb-[1rem] w-full flex items-center justify-between gap-[10px]">
          <div className="flex items-center gap-[2px]">
            <div className="inline-block flex items-center justify-center">
              <ImageComponent
                src={"/images/logo.svg"}
                alt="logo"
                width={20}
                height={20}
              />
            </div>
            <p className="text-[0.5rem] text-muted">
              Simple automation starts here. What's the task?
            </p>
          </div>
          <div className="grad-btn p-[5px] rounded inline-block flex items-center justify-center gap-[.5rem]">
            <ImageComponent src={sendIcon} alt="send" width={20} height={20} />
          </div>
        </div>
        <div className="grad-btn px-[1.5rem] py-[.2rem] rounded inline flex items-center justify-center gap-[.5rem] text-[1rem]">
          Skip
        </div>
      </div>
    </Card>
  );
}
