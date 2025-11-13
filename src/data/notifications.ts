export interface NotificationSetting {
  name: string;
  description: string;
  key: string;
  defaultValue: boolean;
}

export const notifications: NotificationSetting[] = [
  {
    name: "Email",
    description: "Receive notifications via email",
    key: "email",
    defaultValue: true,
  },
  {
    name: "Push notifications",
    description: "Receive browser notifications",
    key: "push",
    defaultValue: true,
  },
  {
    name: "Marketing emails",
    description: "Product updates and announcements",
    key: "marketing",
    defaultValue: false,
  },
  {
    name: "Security alerts",
    description: "Important security notifications",
    key: "security",
    defaultValue: true,
  },
  {
    name: "Phone notifications",
    description: "Receive SMS/WhatsApp notifications",
    key: "phone",
    defaultValue: false,
  },
];
