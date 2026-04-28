import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { cn } from "../../../lib/utils";

interface ChildProps {
  onBack?: () => void;
  hideHeader?: boolean;
}

export default function ChannelConnectionEmptyState({
  onBack,
  hideHeader,
}: ChildProps) {
  return (
    <div className="text-center py-8 flex items-center">
      <div className="">
        <Heading size="lg" className="text-[1.8rem]  mb-2">
          No channels selected
        </Heading>
        <Text size="sm" className="">
          Go back to select channels to connect
        </Text>
      </div>

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
