import { useEffect, useState, useCallback } from "react";
import { BusinessInfo } from "../../utils/types";
import { useToast } from "../../../../../ui/toast/useToast";
import { enhanceBusinessDescription } from "../../../../../../services/businessEnhanceService";

interface UseBusinessDescriptionProps {
  currentInfo: BusinessInfo;
  setEditingInfo: (value: BusinessInfo) => void;
  isEditing: boolean;
}

export function useBusinessDescription({
  currentInfo,
  setEditingInfo,
  isEditing,
}: UseBusinessDescriptionProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const { showToast } = useToast();

  const MAX_CHARACTERS = 500;

  const handleEnhanceWithBeeBot = async () => {
    if (!currentInfo.businessDescription.trim() || isEnhancing || isTyping)
      return;

    setIsEnhancing(true);
    setTypedText("");

    try {
      const response = await enhanceBusinessDescription(
        currentInfo.businessDescription.trim()
      );
      const enhancedText = response.enhanced_overview;

      setIsEnhancing(false);
      setIsTyping(true);

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= enhancedText.length) {
          setTypedText(enhancedText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setEditingInfo({
            ...currentInfo,
            businessDescription: enhancedText,
          });
          setTypedText("");
        }
      }, 30);
    } catch (error) {
      setIsEnhancing(false);
      setIsTyping(false);
      setTypedText("");

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to enhance business description. Please try again.";

      showToast({
        title: "Error",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  const handleDescriptionChange = useCallback(
    (value: string) => {
      if (value.length <= MAX_CHARACTERS) {
        setEditingInfo({ ...currentInfo, businessDescription: value });
      }
    },
    [currentInfo, setEditingInfo]
  );

  const isEnhanceButtonDisabled =
    !currentInfo.businessDescription.trim() || isEnhancing || isTyping;

  useEffect(() => {
    return () => {
      setIsTyping(false);
      setTypedText("");
    };
  }, []);

  return {
    isEnhancing,
    isTyping,
    typedText,
    MAX_CHARACTERS,
    handleEnhanceWithBeeBot,
    handleDescriptionChange,
    isEnhanceButtonDisabled,
  };
}
