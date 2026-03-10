import { Contact, ContactStatus } from "../types";

const statuses: ContactStatus[] = [
  "active",
  "unconfirmed",
  "unsubscribed",
  "bounced",
];

const firstNames = [
  "Olivia",
  "Phoenix",
  "Lana",
  "Demi",
  "Candice",
  "Natali",
  "Drew",
  "Orlando",
  "Andi",
  "Kate",
  "James",
  "Sarah",
  "Michael",
  "Emma",
  "David",
  "Emily",
  "Robert",
  "Jessica",
  "William",
  "Ashley",
];
const lastNames = [
  "Rhye",
  "Baker",
  "Steiner",
  "Wilkinson",
  "Wu",
  "Craig",
  "Cano",
  "Diggs",
  "Lane",
  "Morrison",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];

export const mockContacts: Contact[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const username = `@${firstName.toLowerCase()}${i}`;
  const status = statuses[i % statuses.length];

  return {
    id: (i + 1).toString(),
    name,
    username,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
    phone: `+234 902922${(1000 + i).toString()}`,
    dateCreated: "12:32:56",
    status,
  };
});
