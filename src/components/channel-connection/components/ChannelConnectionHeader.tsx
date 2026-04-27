import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Button from "../../ui/Button";
import { cn } from "../../../lib/utils";

interface ChannelConnectionHeaderProps {
  title?: string;
  subTitle?: string;
  onBack?: () => void;
  hideHeader?: boolean;
}

export default function ChannelConnectionHeader({
  title = "Connect selected channels",
  subTitle = "Connect as many channels as you like",
  onBack,
  hideHeader = false,
}: ChannelConnectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {!hideHeader && (
        <div>
          <Heading size="lg" className="text-[2.4rem]">
            {title}
          </Heading>
          <Text size="sm" className="">
            {subTitle}
          </Text>
        </div>
      )}
      {onBack && (
        <Button
          variant="secondary"
          onClick={onBack}
          className={cn(!hideHeader ? "ml-auto" : "")}
        >
          Go Back
        </Button>
      )}
    </div>
  );
}
