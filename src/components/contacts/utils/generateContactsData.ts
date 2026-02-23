import { Contact } from "../../../store/slices/contactSlice";

export const generateContactsData = (): Contact[] => {
  const statuses: Contact["status"][] = [
    "Active",
    "Unconfirmed",
    "Unsubscribed",
    "Bounced",
  ];

  const names = [
    "Olivia Rhye",
    "Phoenix Baker",
    "Lana Steiner",
    "Demi Wilkinson",
    "Candice Wu",
    "Natali Craig",
    "Drew Cano",
    "Orlando Diggs",
    "Andi Lane",
    "Kate Morrison",
    "Alisa Hester",
    "Zaid Hubbard",
  ];

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const contacts: Contact[] = [];

  for (let i = 0; i < 100; i++) {
    const name = names[i % names.length];
    const username = `@${name.toLowerCase().replace(" ", "")}`;
    const email = `${name.toLowerCase().replace(" ", ".")}@untitled-ui.com`;
    const phone = `+234 ${getRandomInt(700, 999)}${getRandomInt(100, 999)}${getRandomInt(1000, 9999)}`;
    const dateCreated = `04/04/2024 ${getRandomInt(10, 23)}:${getRandomInt(10, 59)}`;

    contacts.push({
      id: String(i + 1),
      name,
      username,
      email,
      phone,
      dateCreated,
      status: statuses[i % statuses.length],
      avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
    });
  }

  return contacts;
};
