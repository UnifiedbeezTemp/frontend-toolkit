import {
  ContactDetails,
  TimelineActivity,
  ContactTask,
  ActivityCategory,
  EmailActivity,
} from "./types";

export const DUMMY_USERS = [
  { id: "1", name: "John Doe", avatar: "" },
  { id: "2", name: "Jane Smith", avatar: "" },
  { id: "3", name: "Robert Johnson", avatar: "" },
];

export const LEAD_STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export const DUMMY_TASKS: ContactTask[] = [
  {
    id: "1",
    title: "Follow up on proposal",
    description: "Send follow-up email regarding the premium package proposal",
    priority: "Low",
    category: "Follow-up",
    dueDate: "Due Today",
    createdAt: "04/04/2024 12:32",
    assignee: { name: "Alice Miles", avatar: "img2" },
    completed: false,
  },
  {
    id: "2",
    title: "Schedule demo call",
    description: "Book a product demo session with the client",
    priority: "Low",
    category: "Demo",
    dueDate: "Due Today",
    createdAt: "04/04/2024 12:32",
    assignee: { name: "Alice Miles", avatar: "img2" },
    completed: false,
  },
  {
    id: "3",
    title: "Schedule demo call",
    description: "Book a product demo session with the client",
    priority: "High",
    category: "Demo",
    dueDate: "Due Today",
    createdAt: "04/04/2024 12:32",
    assignee: { name: "Alice Miles", avatar: "img2" },
    completed: false,
  },
  {
    id: "4",
    title: "Schedule demo call",
    description: "Book a product demo session with the client",
    priority: "Medium",
    category: "Demo",
    dueDate: "Due Today",
    createdAt: "04/04/2024 12:32",
    assignee: { name: "Alice Miles", avatar: "img2" },
    completed: false,
  },
  {
    id: "5",
    title: "Schedule demo call",
    description: "Book a product demo session with the client",
    priority: "Medium",
    category: "Demo",
    dueDate: "Due June 12",
    createdAt: "04/04/2024 12:32",
    assignee: { name: "Alice Miles", avatar: "img2" },
    completed: true,
  },
  {
    id: "6",
    title: "Research client requirements",
    description: "Book a product demo session with the client",
    priority: "Low",
    category: "Research",
    dueDate: "Due June 12",
    createdAt: "04/04/2024 12:32",
    assignee: { name: "Alice Miles", avatar: "img2" },
    completed: true,
  },
];

export const DUMMY_EMAILS: EmailActivity[] = [
  {
    id: "email-1",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 15 Sept, 12:32",
    status: "unread",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-2",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 19 Sept, 14:15",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-3",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 16 Sept, 09:20",
    status: "unread",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-4",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 15 Sept, 11:45",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-5",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 13 Sept, 16:30",
    status: "unread",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-6",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 15 Sept, 10:10",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-7",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 15 Sept, 08:25",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-8",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 16 Sept, 13:50",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-9",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 15 Sept, 15:40",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
  {
    id: "email-10",
    subject: "How to Grow your CRM Business",
    preview:
      "Hi Brian, trust this mail meets you well to know if the price is negotiable, I need...",
    date: "Friday, 16 Sept, 17:15",
    status: "read",
    senderName: "John Carter",
    senderHandle: "@jcarter",
    senderAvatar: "avatar",
  },
];

export const TIMELINE_DATA: Array<{
  category: ActivityCategory;
  title: string;
  status: string;
  description: string;
  outcome?: string;
  nextSteps?: string[];
  participants?: { name: string; avatar: string }[];
  tags?: string[];
}> = [
  {
    category: "call",
    title: "Phone Call",
    status: "Completed",
    description:
      "This was a comprehensive discussion about the client's requirements for our premium CRM package. We covered pricing tiers, implementation timeline, training requirements, and integration needs. The client expressed strong interest but mentioned they need to get budget approval from their finance team, They're particularly interested in the advanced reporting features and API integrations. Next steps include sending a detailed proposal and scheduling a technical demo.",
    outcome: "Client interested, awaiting budget approval",
    nextSteps: [
      "Send detailed proposal by Friday",
      "Schedule technical demo",
      "Follow up next week",
    ],
    participants: [
      { name: "Carolyn Allen", avatar: "img1" },
      { name: "Gregory Alvarez", avatar: "img2" },
      { name: "Kathryn Reese", avatar: "img3" },
    ],
    tags: ["Vip-customer", "Window-shopper", "google-shopping"],
  },
  {
    category: "email",
    title: "Email",
    status: "Sent",
    description:
      "Follow-up email with proposal details and pricing structure sent to client's inbox.",
    outcome: "Proposal delivered",
    nextSteps: ["Wait for client feedback"],
    participants: [{ name: "John Carter", avatar: "avatar" }],
    tags: ["Follow-up"],
  },
  {
    category: "meeting",
    title: "Meeting Schedule",
    status: "Scheduled",
    description:
      "Product demo meeting scheduled for next week to showcase key features and answer technical questions.",
    outcome: "Meeting confirmed",
    nextSteps: ["Prepare demo slides", "Invite technical leads"],
    participants: [
      { name: "John Carter", avatar: "avatar" },
      { name: "Sarah Connor", avatar: "autoImg1" },
    ],
    tags: ["Demo", "Technical"],
  },
  {
    category: "note",
    title: "Note",
    status: "Added",
    description:
      "Client is interested in premium package but needs budget approval from their finance team. Expected decision by end of week.",
    outcome: "Information logged",
    tags: ["Internal", "Budget"],
  },
  {
    category: "video",
    title: "Video Conference",
    status: "Completed",
    description:
      "Initial consultation call to understand client requirements and present our solution overview.",
    outcome: "Requirements gathered",
    nextSteps: ["Create solution architect document"],
    participants: [
      { name: "John Carter", avatar: "avatar" },
      { name: "Alice Miles", avatar: "autoImg1" },
    ],
    tags: ["Discovery"],
  },
];

export const generateTimeline = (count: number = 10): TimelineActivity[] => {
  return Array.from({ length: count }, (_, i) => {
    const data = TIMELINE_DATA[i % TIMELINE_DATA.length];
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      id: `a${i + 1}`,
      category: data.category,
      title: data.title,
      description: data.description,
      date: date.toISOString().split("T")[0].replace(/-/g, "/"),
      time: "12:32",
      status: data.status,
      sender: "John Carter",
      avatar: "avatar",
      outcome: data.outcome,
      nextSteps: data.nextSteps,
      participants: data.participants,
      tags: data.tags,
      createdBy: "Carolyn Allen",
      contactHandle: "@jcarter",
      contactPhone: "+234 9029220646",
    };
  });
};
import { CommunicationActivity } from "./types";

export const DUMMY_COMMUNICATIONS: CommunicationActivity[] = [
  {
    id: "comm-1",
    type: "call",
    direction: "outbound",
    title: "Follow-up Call",
    description:
      "Discussed Q1 deliverables and pricing options. Client seemed interested in the enterprise tier. Agreed to send a proposal by Friday.",
    meta: "Outbound · 12m 34s",
    date: "Mar 5, 2026",
    time: "2:30 PM",
    duration: "12m 34s",
    participants: [
      { name: "You", avatar: "" },
      { name: "John Carter", avatar: "img1" },
    ],
    tags: ["Sales", "Follow-up"],
  },
  {
    id: "comm-2",
    type: "call",
    direction: "inbound",
    title: "Inbound Support Call",
    description:
      "Client reported an issue with invoice #4521. Escalated to billing team for resolution. Expected turnaround within 24 hours.",
    meta: "Inbound · 8m 12s",
    date: "Mar 4, 2026",
    time: "11:15 AM",
    duration: "8m 12s",
    participants: [
      { name: "John Carter", avatar: "img1" },
      { name: "Support Team", avatar: "" },
    ],
    tags: ["Support", "Billing"],
  },
  {
    id: "comm-3",
    type: "call",
    direction: "missed",
    title: "Missed Call",
    description:
      "Missed call from client. Left a voicemail asking about the status of their project timeline update.",
    meta: "Missed",
    date: "Mar 3, 2026",
    time: "4:45 PM",
    tags: ["Missed"],
  },
  {
    id: "comm-4",
    type: "video",
    title: "Product Demo",
    description:
      "Ran a 30-minute product demo covering the new dashboard features, custom reports, and integration capabilities. Client requested a trial account.",
    meta: "Video · 32m 10s",
    date: "Mar 2, 2026",
    time: "10:00 AM",
    duration: "32m 10s",
    participants: [
      { name: "You", avatar: "" },
      { name: "John Carter", avatar: "img1" },
      { name: "Sarah Miller", avatar: "img2" },
    ],
    tags: ["Demo", "Product"],
  },
  {
    id: "comm-5",
    type: "message",
    title: "WhatsApp Message",
    description:
      "Hey, just wanted to confirm our meeting tomorrow at 2 PM. Looking forward to discussing the partnership proposal!",
    meta: "Message",
    date: "Mar 1, 2026",
    time: "6:22 PM",
    tags: ["WhatsApp"],
  },
  {
    id: "comm-6",
    type: "call",
    direction: "outbound",
    title: "Contract Negotiation",
    description:
      "Final negotiation call regarding pricing and terms. Client agreed to a 12-month commitment with quarterly reviews.",
    meta: "Outbound · 22m 05s",
    date: "Feb 28, 2026",
    time: "3:00 PM",
    duration: "22m 05s",
    participants: [
      { name: "You", avatar: "" },
      { name: "John Carter", avatar: "img1" },
    ],
    tags: ["Negotiation", "Contract"],
  },
];

export const getDummyContactDetails = (id: string): ContactDetails => ({
  id,
  name: "John Carter",
  handle: "@jcarter",
  email: "john.carter@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
  dateCreated: "2023-11-15T08:00:00Z",
  status: "active",
  leadSource: "Google Search",
  leadStatus: "In Progress",
  assignedTo: "1",
  activities: generateTimeline(),
  emails: DUMMY_EMAILS,
  tasks: DUMMY_TASKS,
  communications: DUMMY_COMMUNICATIONS,
  documents: [
    {
      id: "doc-1",
      title: "Q1 2026 Proposal.pdf",
      type: "pdf",
      category: "Proposal",
      size: "2.4 MB",
      date: "Mar 5, 2026",
      time: "3:15 PM",
      uploadedBy: { name: "You", avatar: "" },
    },
    {
      id: "doc-2",
      title: "Product Demo Screenshot.png",
      type: "image",
      category: "Screenshot",
      size: "1.1 MB",
      date: "Mar 4, 2026",
      time: "10:30 AM",
      uploadedBy: { name: "Sarah Miller", avatar: "img2" },
    },
    {
      id: "doc-3",
      title: "Onboarding Walkthrough.mp4",
      type: "video",
      category: "Training",
      size: "45.2 MB",
      date: "Mar 2, 2026",
      time: "1:00 PM",
      uploadedBy: { name: "You", avatar: "" },
    },
  ],
});
