"use client";

import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import Checkbox from "../../../../../components/ui/CheckBox";
import Button from "../../../../../components/ui/Button";

interface PlaceholderRequirementsProps {
  onContinue: () => void;
}

export default function PlaceholderRequirements({
  onContinue,
}: PlaceholderRequirementsProps) {
  return (
    <div className="px-[1.6rem] py-[3.1rem]">
      <div className="mb-6">
        <Heading className="mb-[1.5rem] text-[1.6rem]">Requirements</Heading>

        <div className="space-y-4 bg-input-filled rounded-[.8rem] px-[1.6rem] lg:px-[2.4rem] py-[1.6rem] border border-input-stroke">
          <Heading className="mb-[1.5rem]" size="sm">
            Ensure that you:
          </Heading>

          <div className="flex items-center gap-[1.2rem]">
            <Checkbox
              size="sm"
              checked={true}
              onChange={() => {}}
              className="rounded-full shrink-0"
            />
            <Text size="sm">Have an active account for this service</Text>
          </div>
        </div>

        <Button className="w-full mt-[4rem]" onClick={onContinue}>
          Connect
        </Button>
      </div>
    </div>
  );
}

