export type ContactStatus =
  | "active"
  | "unconfirmed"
  | "unsubscribed"
  | "bounced";

export interface Contact {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateCreated: string;
  status: ContactStatus;
  avatar?: string;
  list?: string;
}

export interface ContactsTableProps {
  onViewDetails: (contact: Contact) => void;
}
