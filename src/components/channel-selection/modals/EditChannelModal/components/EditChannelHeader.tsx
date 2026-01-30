import { Channel } from "../../../../../store/onboarding/types/channelTypes";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import ImageComponent from "../../../../ui/ImageComponent";
import CloseModalButton from "../../../../modal/CloseModalButton";


interface EditChannelHeaderProps {
  channel: Channel;
  onClose: () => void;
}

export default function EditChannelHeader({
  channel,
  onClose,
}: EditChannelHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-input-stroke pb-[1rem] sticky top-[0rem] bg-primary z-[100]">
      <div className="flex items-center gap-[1rem]">
        <ImageComponent
          src={channel.icon}
          alt={channel.name}
          width={40}
          height={40}
        />

        <div className="">
          <Heading className="text-[2.4rem]">{channel.name}</Heading>
          <Text className="text-[1.4rem]">
            Edit your {channel.name} settings
          </Text>
        </div>
      </div>

      <CloseModalButton onClick={onClose} />
    </div>
  );
}
