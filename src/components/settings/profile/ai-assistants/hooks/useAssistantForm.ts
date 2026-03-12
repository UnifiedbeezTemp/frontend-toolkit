import { useState } from "react";

export function useAssistantForm() {
  const [botName, setBotName] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validateBotName = (name: string) => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 30;
  };

  const isValid = validateBotName(botName);

  const handleKeyPress = (e: React.KeyboardEvent, onSubmit: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isValid) {
        onSubmit();
      } else {
        setShowValidation(true);
      }
    }
  };

  const handleEnterClick = (onSubmit: () => void) => {
    if (isValid) {
      onSubmit();
    } else {
      setShowValidation(true);
    }
  };

  const resetForm = () => {
    setBotName("");
    setShowValidation(false);
  };

  return {
    botName,
    setBotName,
    showValidation,
    isValid,
    handleKeyPress,
    handleEnterClick,
    resetForm,
    validateBotName,
  };
}
