import { AIAssistant } from "../../types/aiAssistantTypes";

export interface AssistantHeaderProps {
  assistant: AIAssistant;
  index: number;
  isSelected?: boolean;
  isExpanded?: boolean;
  showChip?: boolean;
  onSelect?: () => void;
  onToggle?: () => void;
  variant?: "desktop" | "mobile";
  rightElement?: React.ReactNode;
}

export interface PersonalityFields {
  tone?: string;
  style?: string;
  personalityType?: string;
}

export interface PersonalityFormData {
  tone: string;
  style: string;
  personalityType: string;
}

export interface SelectionChipProps {
  text: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
  };
  size?: "sm" | "md" | "lg";
}
