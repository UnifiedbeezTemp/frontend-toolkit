import CloseModalButton from "@/shared/src/components/modal/CloseModalButton";
import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";

interface InactivePagesModalHeaderProps {
  onClose: () => void;
}

export default function InactivePagesModalHeader({ 
  onClose 
}: InactivePagesModalHeaderProps) {
  return (
    <div className="px-[2.4rem] pt-[1.6rem] pb-[2rem] border-b border-border flex items-center justify-between">
      <div>
        <Heading>Inactive pages</Heading>
        <Text size="sm">Which pages should be shared with AI Chatbot's knowledge</Text>
      </div>
      <CloseModalButton onClick={onClose} />
    </div>
  );
}