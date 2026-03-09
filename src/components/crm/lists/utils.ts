import { AUTOMATION_TYPES } from "../../../constants/automations";
import { MarketingChannel } from "../shared/types";
import { CRMList } from "./types";

export const CHANNELS: MarketingChannel[] = ["WhatsApp", "Email", "SMS"];

export const generateDummyLists = (): CRMList[] => {
  const lists: CRMList[] = [];
  AUTOMATION_TYPES.forEach((category) => {
    for (let i = 1; i <= 25; i++) {
      const channel = CHANNELS[i % CHANNELS.length];
      const id = `${category.replace(/\s+/g, "-").toLowerCase()}-${i}`;
      lists.push({
        id,
        name: `${category} ${i}`,
        label: `Label for ${category} ${i}`,
        activeContacts: Math.floor(Math.random() * 5000) + 100,
        marketingChannel: channel,
        onSubmissionAction:
          i % 2 === 0 ? "Send Welcome Email" : "Add to Automation",
        submissions: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
        category: category,
      });
    }
  });
  return lists;
};

export const getChannelIcon = (
  channel: MarketingChannel,
  icons: Record<string, string>,
) => {
  switch (channel) {
    case "WhatsApp":
      return icons.whatsappIcon;
    case "Email":
      return icons.emailRedIcon;
    case "SMS":
      return icons.twilioSmsIcon;
    default:
      return icons.envelope;
  }
};

export const getChannelColor = (channel: MarketingChannel) => {
  switch (channel) {
    case "WhatsApp":
      return "text-brand-primary border-border bg-soft-green";
    case "Email":
      return "text-warning border-border bg-warning/10";
    case "SMS":
      return "text-primary-blue border-border bg-primary-blue/10";
    default:
      return "text-text-primary border-border bg-input-filled";
  }
};
