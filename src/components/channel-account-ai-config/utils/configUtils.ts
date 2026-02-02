import {
  TimeUnit,
  WorkingDay,
  FollowUpContentType,
  AccountType,
} from "../types/api";

// Webchat Detection
export function isWebchatConnection(
  metadata: Record<string, unknown> | undefined,
): boolean {
  if (!metadata) return false;
  const hasWebsiteUrl =
    typeof metadata.websiteUrl === "string" && metadata.websiteUrl.length > 0;
  const hasNoProvider =
    metadata.provider === undefined || metadata.provider === null;
  return hasWebsiteUrl && hasNoProvider;
}

// Account Type Mapping
const PROVIDER_TO_ACCOUNT_TYPE: Record<string, AccountType> = {
  gmail: "email",
  outlook: "email",
  custom_email: "email",
  whatsapp: "whatsapp",
  facebook_messenger: "facebook",
  messenger: "facebook",
  sms: "sms",
  twilio: "sms",
  google_calendar: "calendar",
  twilio_sms: "sms",
  microsoft_calendar: "calendar",
  paypal: "paypal",
  stripe: "stripe",
  telegram: "telegram",
  zoom: "zoom",
  calendly: "calendly",
  provider: "email",
};

export function getAccountTypeFromProvider(provider: string): AccountType {
  if (!provider) return "email";
  return PROVIDER_TO_ACCOUNT_TYPE[provider.toLowerCase()] || "email";
}

// Time Formatting
export function timeToString(amount: number, unit: TimeUnit): string {
  const unitLabels: Record<TimeUnit, string> = {
    SECONDS: "Sec",
    MINUTES: amount === 1 ? "min" : "mins",
    HOURS: amount === 1 ? "hour" : "hours",
    DAYS: amount === 1 ? "day" : "days",
  };
  return `${amount} ${unitLabels[unit]}`;
}

export function parseTimeString(value: string | null): {
  amount: number;
  unit: TimeUnit;
} {
  if (!value) return { amount: 30, unit: "MINUTES" };
  const lowerValue = value.toLowerCase();
  const match = lowerValue.match(/(\d+)/);
  const num = match ? parseInt(match[1], 10) : 1;

  if (lowerValue.includes("sec")) return { amount: num, unit: "SECONDS" };
  if (lowerValue.includes("hour")) return { amount: num, unit: "HOURS" };
  if (lowerValue.includes("day")) return { amount: num, unit: "DAYS" };
  return { amount: num, unit: "MINUTES" };
}

// Follow-up Formatting
export function delayToString(amount: number, unit: TimeUnit): string {
  const unitLabels: Record<TimeUnit, string> = {
    SECONDS: "seconds",
    MINUTES: "minutes",
    HOURS: amount === 1 ? "hour" : "hours",
    DAYS: amount === 1 ? "day" : "days",
  };
  return `${amount} ${unitLabels[unit]}`;
}

export function parseDelayString(value: string | null): {
  amount: number;
  unit: TimeUnit;
} {
  if (!value) return { amount: 24, unit: "HOURS" };
  const lowerValue = value.toLowerCase();
  const match = lowerValue.match(/(\d+)/);
  const num = match ? parseInt(match[1], 10) : 1;

  if (lowerValue.includes("minute")) return { amount: num, unit: "MINUTES" };
  if (lowerValue.includes("hour")) return { amount: num, unit: "HOURS" };
  if (lowerValue.includes("day")) return { amount: num, unit: "DAYS" };
  return { amount: num, unit: "HOURS" };
}

// Content Type Mapping
const CONTENT_TYPE_MAP: Record<string, FollowUpContentType> = {
  "Sales Follow-up": "SALES",
  "Customer Support": "SUPPORT",
  "Booking Reminder": "BOOKING_REMINDER",
  "Cold Lead Nudge": "COLD_LEAD_NUDGE",
  "Abandoned Cart Recovery": "ABANDONED_CART",
  "Onboarding & Setup Help": "ONBOARDING_SETUP_HELP",
  "Custom Template": "CUSTOM",
};

const API_TO_UI_CONTENT_TYPE: Record<FollowUpContentType, string> = {
  SALES: "Sales Follow-up",
  SUPPORT: "Customer Support",
  BOOKING_REMINDER: "Booking Reminder",
  COLD_LEAD_NUDGE: "Cold Lead Nudge",
  ABANDONED_CART: "Abandoned Cart Recovery",
  ONBOARDING_SETUP_HELP: "Onboarding & Setup Help",
  CUSTOM: "Custom Template",
};

export function contentTypeToAPI(value: string | null): FollowUpContentType {
  if (!value) return "SALES";
  return CONTENT_TYPE_MAP[value] || "SALES";
}

export function contentTypeToUI(value: FollowUpContentType): string {
  return API_TO_UI_CONTENT_TYPE[value] || "Sales Follow-up";
}

// Time Format Conversion
export function to24Hour(
  hours: string,
  minutes: string,
  period: "AM" | "PM",
): number {
  let hour = parseInt(hours, 10) || 0;
  if (period === "AM") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }
  return hour;
}

export function to12Hour(hour24: number): {
  hours: string;
  minutes: string;
  period: "AM" | "PM";
} {
  const period: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM";
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  return {
    hours: String(hour12),
    minutes: "00",
    period,
  };
}

export function daysToUI(apiDays: WorkingDay[]): string[] {
  const dayMap: Record<WorkingDay, string> = {
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
    SUNDAY: "Sunday",
  };
  return (apiDays || []).map((day) => dayMap[day] || day);
}

export function formatTimezoneForUI(timezone: string | null): string {
  if (!timezone) return "UTC";
  return timezone.replace(/_/g, " ");
}
