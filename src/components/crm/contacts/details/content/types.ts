export type ActivityCategory = "call" | "email" | "meeting" | "note" | "video";

export interface TimelineActivity {
  id: string;
  category: ActivityCategory;
  title: string;
  description: string;
  date: string;
  time: string;
  status: string;
  sender?: string;
  avatar?: string;
  outcome?: string;
  nextSteps?: string[];
  participants?: { name: string; avatar: string }[];
  tags?: string[];
  createdBy?: string;
  contactHandle?: string;
  contactPhone?: string;
}

export interface EmailActivity {
  id: string;
  subject: string;
  preview: string;
  date: string;
  status: "read" | "unread";
  senderName: string;
  senderHandle: string;
  senderAvatar: string;
}

export interface ContactTask {
  id: string;
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  category: string;
  dueDate: string;
  createdAt?: string;
  assignee?: { name: string; avatar: string };
  completed: boolean;
  contactId?: string;
}

export type CommunicationType = "call" | "video" | "message";
export type CommunicationDirection = "inbound" | "outbound" | "missed";

export interface CommunicationActivity {
  id: string;
  type: CommunicationType;
  direction?: CommunicationDirection;
  title: string;
  description: string;
  meta: string;
  date: string;
  time: string;
  duration?: string;
  participants?: { name: string; avatar: string }[];
  tags?: string[];
}

export interface ContactDetails {
  id: string;
  name: string;
  handle: string;
  email: string;
  phone: string;
  address: string;
  dateCreated: string;
  status: string;
  leadSource: string;
  leadStatus: string;
  assignedTo: string;
  activities: TimelineActivity[];
  emails: EmailActivity[];
  tasks: ContactTask[];
  communications: CommunicationActivity[];
  documents: DocumentActivity[];
}

export interface EmailDraft {
  to: string[];
  cc: string[];
  subject: string;
  body: string;
  attachments: string[];
}

export type DocumentType = "pdf" | "image" | "video" | "document";

export interface DocumentActivity {
  id: string;
  title: string;
  type: DocumentType;
  category: string;
  size: string;
  date: string;
  time: string;
  uploadedBy: { name: string; avatar: string };
}
