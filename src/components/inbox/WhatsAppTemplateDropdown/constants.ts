import { WhatsAppTemplate } from "./types"

export const mockWhatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: "template-1",
    name: "Confirmation of Deposit",
    content: "Hi, thank you, looking forward to your response.",
    variables: ["First name"],
  },
  {
    id: "template-2",
    name: "New Customer",
    content: "Hello {{First name}}, welcome to our service!",
    variables: ["First name"],
  },
  {
    id: "template-3",
    name: "Preset Library for new messages",
    content: "Thank you for contacting us. We'll get back to you soon.",
  },
  {
    id: "template-4",
    name: "Start conversation",
    content: "Hi {{First name}}, how can we help you today?",
    variables: ["First name"],
  },
  {
    id: "template-5",
    name: "Message with Hi",
    content: "Hi {{First name}}, hope you're doing well!",
    variables: ["First name"],
  },
  {
    id: "template-6",
    name: "Custom message",
    content: "This is a custom message template.",
  },
  {
    id: "template-7",
    name: "Casual feedback reply",
    content: "Thanks for your feedback, {{First name}}! We appreciate it.",
    variables: ["First name"],
  },
]
