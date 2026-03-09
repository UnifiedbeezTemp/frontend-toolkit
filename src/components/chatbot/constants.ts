import { ChatAgent } from "./types";

export const QUICK_ACTIONS = [
  "Account Setup",
  "Billing Question",
  "Technical Issue",
];

export const AI_RESPONSES: Record<string, string> = {
  "account setup":
    "I can help you with account setup! Would you like to configure your profile, team members, or notification preferences?",
  "billing question":
    "Sure! I can help with billing. Are you looking for invoice details, payment methods, or plan upgrades?",
  "technical issue":
    "I'm sorry to hear you're having a technical issue. Could you describe the problem in more detail so I can help?",
  default:
    "Thanks for your message! I'm looking into that for you. Is there anything specific you'd like to know?",
};

export const AGENTS: ChatAgent[] = [
  { id: "agent-1", name: "Sarah Mitchell" },
  { id: "agent-2", name: "James Okonkwo" },
  { id: "agent-3", name: "Priya Sharma" },
];

export const INITIAL_AI_MESSAGE = {
  id: "welcome",
  text: "👋 Hello! I'm the BeeHive AI assistant.\nHow can I help you today?",
  sender: "bot" as const,
  senderName: "AI Bot",
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};
