import { MergeField, MergeFieldCategory } from "./types";

const AUDIENCE_FIELDS: MergeField[] = [
  {
    id: "email-address",
    name: "Email Address",
    type: "Text Input",
    autoFillTag: "%EMAIL_ADDRESSES%",
    category: "audience",
    required: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "full-name",
    name: "Full Name",
    type: "Text Input",
    autoFillTag: "%FULL_NAMES%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "first-name",
    name: "First Name",
    type: "Text Input",
    autoFillTag: "%FIRST_NAMES%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "last-name",
    name: "Last Name",
    type: "Text Input",
    autoFillTag: "%LAST_NAMES%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "phone-number",
    name: "Phone Number",
    type: "Text Input",
    autoFillTag: "%PHONE_NUMBERS%",
    category: "audience",
    required: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "iso-country",
    name: "ISO - Country",
    type: "Text Input",
    autoFillTag: "%ISO_COUNTRYS%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "iso-region",
    name: "ISO - Region",
    type: "Text Input",
    autoFillTag: "%ISO_REGIONS%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "time-subscribed",
    name: "Time Subscribed",
    type: "Text Input",
    autoFillTag: "%TIME_SUBSCRIBEDS%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "subscriber-id",
    name: "Subscriber ID",
    type: "Text Input",
    autoFillTag: "%SUBSCRIBER_IDS%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "position-role",
    name: "Position / Role",
    type: "Text Input",
    autoFillTag: "%POSITION_ROLES%",
    category: "audience",
    required: false,
    createdAt: new Date().toISOString(),
  },
];

const MESSAGE_FIELDS: MergeField[] = [
  {
    id: "subject-line",
    name: "Subject Line",
    type: "Text Input",
    autoFillTag: "%SUBJECT_LINE%",
    category: "message",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "preview-text",
    name: "Preview Text",
    type: "Text Input",
    autoFillTag: "%PREVIEW_TEXT%",
    category: "message",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "sender-name",
    name: "Sender Name",
    type: "Text Input",
    autoFillTag: "%SENDER_NAME%",
    category: "message",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "reply-to",
    name: "Reply-To Address",
    type: "Email",
    autoFillTag: "%REPLY_TO%",
    category: "message",
    required: false,
    createdAt: new Date().toISOString(),
  },
];

const SOCIAL_FIELDS: MergeField[] = [
  {
    id: "facebook-url",
    name: "Facebook URL",
    type: "URL",
    autoFillTag: "%FACEBOOK_URL%",
    category: "social",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "twitter-handle",
    name: "Twitter Handle",
    type: "Text Input",
    autoFillTag: "%TWITTER_HANDLE%",
    category: "social",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "instagram-url",
    name: "Instagram URL",
    type: "URL",
    autoFillTag: "%INSTAGRAM_URL%",
    category: "social",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "linkedin-url",
    name: "LinkedIn URL",
    type: "URL",
    autoFillTag: "%LINKEDIN_URL%",
    category: "social",
    required: false,
    createdAt: new Date().toISOString(),
  },
];

const PROFILE_FIELDS: MergeField[] = [
  {
    id: "company-name",
    name: "Company Name",
    type: "Text Input",
    autoFillTag: "%COMPANY_NAME%",
    category: "profile",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "company-address",
    name: "Company Address",
    type: "Text Input",
    autoFillTag: "%COMPANY_ADDRESS%",
    category: "profile",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "website-url",
    name: "Website URL",
    type: "URL",
    autoFillTag: "%WEBSITE_URL%",
    category: "profile",
    required: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "logo-url",
    name: "Logo URL",
    type: "URL",
    autoFillTag: "%LOGO_URL%",
    category: "profile",
    required: false,
    createdAt: new Date().toISOString(),
  },
];

export const generateDummyFields = (): MergeField[] => {
  return [
    ...AUDIENCE_FIELDS,
    ...MESSAGE_FIELDS,
    ...SOCIAL_FIELDS,
    ...PROFILE_FIELDS,
  ];
};

export const getCategoryLabel = (category: MergeFieldCategory): string => {
  const labels: Record<MergeFieldCategory, string> = {
    audience: "Audience",
    message: "Message",
    social: "Social",
    profile: "Profile",
  };
  return labels[category] || category;
};
