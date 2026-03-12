import { useState } from "react";

export const useAIInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    handleInputChange,
  };
};
