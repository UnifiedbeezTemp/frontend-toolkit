import ImageComponent from "next/image";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";

interface ModalHeaderProps {
  addon: Addon | null;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ addon }) => {
  return (
    <>
      <div className="hidden md:flex items-center gap-[1.4rem] lg:hidden">
        <div className="border border-border rounded-[1rem] p-[0.9rem] w-fit">
          <ImageComponent
            src={addon?.icon ?? ""}
            alt={addon?.name ?? ""}
            width={20}
            height={20}
          />
        </div>
        <div className="space-y-[1.8rem]">
          <Heading className="text-left">Extra {addon?.name}</Heading>
          <Text size="sm" className="text-left">
            Increase the number of Extra {addon?.name} of your plan.
          </Text>
        </div>
      </div>

      <div className="md:hidden lg:flex flex flex-col sm:flex-row sm:items-start items-center justify-center gap-[1.4rem] sm:gap-[1.6rem] border-b border-border pb-[2.1rem]">
        <div className="border border-border rounded-[1rem] p-[0.9rem] w-fit">
          <ImageComponent
            src={addon?.icon ?? ""}
            alt={addon?.name ?? ""}
            width={20}
            height={20}
          />
        </div>
        <div className="space-y-[1.4rem] sm:space-y-[0rem] sm:mt-[-5px]">
          <Heading align="center" className="text-left">
            Extra {addon?.name}
          </Heading>
          <Text align="center" size="sm" className="text-left">
            Increase the number of Extra {addon?.name} of your plan.
          </Text>
        </div>
      </div>
    </>
  );
};
