import ImageComponent from "next/image";
import Card from "../../../ui/Card";

interface Props {
  envelope: string;
  cart: string;
}

export default function PresetTemplates({ envelope, cart }: Props) {
  return (
    <Card className="hover:shadow-none w-full cursor-not-allowed shadow-none mx-[3rem]">
      <div className="w-fit space-y-[.7rem]">
        <div className="relative w-fit">
          <div className="border border-border p-[1rem] rounded-[.8rem]">
            {" "}
            <ImageComponent
              alt="BeeZora Follow-Up on Product Tags"
              src={envelope}
              width={50}
              height={50}
            />
          </div>
          <div className="absolute top-[-5px] right-[-5px] bg-[red] rounded-full p-[2px]">
            <ImageComponent alt="icon" src={cart} width={15} height={15} />
          </div>
        </div>
        <p className="text-[1rem] text-text-secondary text-left">
          BeeZora Follow-Up on Product Tags
        </p>
        <p className="text-[.9rem] text-text-primary text-start">
          Tailor your follow-up flow to match contact interests. This automation
          kicks in when a product interest is tagged, keeping your messages
          timely and relevant.
        </p>
      </div>
    </Card>
  );
}
