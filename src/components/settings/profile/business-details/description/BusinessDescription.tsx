import { useBusinessDescription } from "./hooks/useBusinessDescription";
import BusinessDescriptionDisplay from "./BusinessDescriptionDisplay";
import { BusinessInfo } from "../utils/types";
import Heading from "../../../../ui/Heading";
import BusinessDescriptionEditor from "../../../../business-description-editor/BusinessDescriptionEditor";

interface Props {
  isEditing: boolean;
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
}

export default function BusinessDescription({
  isEditing,
  currentInfo,
  setEditingInfo,
}: Props) {
  const {
    isEnhancing,
    isTyping,
    typedText,
    MAX_CHARACTERS,
    handleEnhanceWithBeeBot,
    handleDescriptionChange,
    isEnhanceButtonDisabled,
  } = useBusinessDescription({
    currentInfo,
    setEditingInfo,
    isEditing,
  });

  if (!isEditing) {
    return (
      <div className="mt-[2.4rem]">
        <Heading size="sm" className="mb-[0.8rem]">
          Business Description
        </Heading>
        <BusinessDescriptionDisplay
          description={currentInfo.businessDescription}
        />
      </div>
    );
  }

  return (
    <div className="mt-[2.4rem]">
      <Heading size="sm" className="mb-[0.8rem]">
        Business Description
      </Heading>

      <BusinessDescriptionEditor
        description={currentInfo.businessDescription}
        isEnhancing={isEnhancing}
        isTyping={isTyping}
        typedText={typedText}
        maxCharacters={MAX_CHARACTERS}
        isEnhanceButtonDisabled={isEnhanceButtonDisabled}
        onDescriptionChange={handleDescriptionChange}
        onEnhanceWithBeeZaro={handleEnhanceWithBeeBot}
      />
    </div>
  );
}
