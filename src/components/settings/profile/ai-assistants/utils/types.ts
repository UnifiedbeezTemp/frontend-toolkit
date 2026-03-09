import { AIAssistant } from "../../../../../types/aiAssistantTypes";

export type { AIAssistant };

export type PageOption = "Page with all subpages" | "Just this page";
export type Tone = "Friendly" | "Professional" | "Custom";
export type Style = "Concise" | "Detailed" | "Mixed";
export type Personality =
  | "Receptionist"
  | "Doctor/Nurse"
  | "Engineer"
  | "Account Manager"
  | "Custom Role";

export interface AIAssistantsState {
  assistants: AIAssistant[];
  editingAssistant: AIAssistant | null;
  isEditModalOpen: boolean;
  newBotName: string;
  isEditing: boolean;
}
