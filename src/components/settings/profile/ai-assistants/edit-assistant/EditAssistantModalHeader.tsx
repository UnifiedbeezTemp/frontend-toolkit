import CloseModalButton from "../../../../modal/CloseModalButton";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import ImageComponent from "../../../../ui/ImageComponent";

interface EditAssistantModalHeaderProps {
  onClose: () => void;
}

export default function EditAssistantModalHeader({ onClose }: EditAssistantModalHeaderProps) {
  return (
    <div className="px-[2.4rem] pt-[1.6rem] pb-[0.8rem] sticky top-0 bg-primary z-[10] flex items-center justify-between border-border border-b">
      <div className="flex items-center gap-[.8rem]">
        <div className="border border-border rounded-[0.34rem] p-[0.34rem]">
          <ImageComponent src={"/images/logo.svg"} alt="logo" width={25} height={25} />
        </div>
        <div>
          <Heading className="text-[1.6rem] sm:text-[2rem]">Beezora Settings</Heading>
          <Text size="sm" className="hidden sm:block">Edit the tone, style and personality of this AI assistant</Text>
        </div>
      </div>
      <CloseModalButton onClick={onClose} />
    </div>
  );
}