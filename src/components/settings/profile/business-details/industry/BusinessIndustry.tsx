import { useIndustryDropdown } from "./hooks/useIndustryDropdown";
import IndustryTrigger from "./IndustryTrigger";
import { BusinessInfo } from "../utils/types";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Modal from "../../../../modal/Modal";
import Button from "../../../../ui/Button";

interface Props {
  isEditing: boolean;
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
}

export default function BusinessIndustry({
  currentInfo,
  setEditingInfo,
  isEditing,
}: Props) {
  const {
    showDropdown,
    triggerRef,
    handleToggleDropdown,
    handleCloseDropdown,
    handleContinue,
  } = useIndustryDropdown({
    currentInfo,
    setEditingInfo,
    isEditing,
  });

  return (
    <div className="mt-[2.4rem]">
      <Heading size="sm" className="mb-[0.8rem]">
        Business Industry
      </Heading>

      <IndustryTrigger
        currentInfo={currentInfo}
        isEditing={isEditing}
        onToggle={handleToggleDropdown}
        triggerRef={triggerRef}
      />

      <Modal
        isOpen={showDropdown}
        onClose={handleCloseDropdown}
        size="md"
        title="Change Industry"
      >
        <div className="p-[2.4rem]">
          <Heading size="sm" className="mb-[1.2rem] text-text-primary">
            Manual Onboarding Required
          </Heading>
          <Text className="mb-[2.4rem] text-text-secondary leading-relaxed">
            Changing your industry requires returning to the manual onboarding
            process. Please note that this will require you to reconfigure
            certain aspects of your account to ensure everything is properly
            aligned with your new industry choice.
          </Text>

          <div className="flex gap-[1.2rem] justify-end mt-[3.2rem]">
            <Button
              variant="secondary"
              onClick={handleCloseDropdown}
              className="px-[2.4rem]"
            >
              Close
            </Button>
            <Button onClick={handleContinue} className="px-[2.4rem]">
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
