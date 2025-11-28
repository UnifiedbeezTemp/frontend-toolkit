import CloseModalButton from "../../../modal/CloseModalButton";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";

interface InactivePagesModalHeaderProps {
  onClose: () => void;
}

export default function InactivePagesModalHeader({
  onClose,
}: InactivePagesModalHeaderProps) {
  return (
    <div className="px-[2.4rem] sm:px-[1.5rem] lg:px-[2.4rem] pt-[1.6rem] pb-[1.6rem] sm:border-b border-border flex items-center justify-between relative">
      <div className="flex flex-col sm:items-start mt-[3rem] sm:mt-0 items-center justify-center max-w-[30rem] sm:max-w-full mx-auto sm:mx-0">
        <Heading className="text-center sm:text-left">Inactive pages</Heading>
        <Text size="sm" align="center" className="text-center sm:text-left">
          Which pages should be shared with AI Chatbot's knowledge
        </Text>
      </div>
      <CloseModalButton
        onClick={onClose}
        className="absolute  sm:relative sm:top-0 sm:right-0 top-[1.6rem] right-[2.4rem]"
      />
    </div>
  );
}
