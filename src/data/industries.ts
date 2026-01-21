import { formatEnumString } from "../utils/formatEnumString";

export interface Industry {
  value: string;
  label: string;
}

export interface FormattedIndustry {
  value: string;
  label: string;
  icon: string;
}

const industryIcons: Record<string, string> = {
  ECOMMERCE_RETAIL: "🛍️",
  REAL_ESTATE: "🏠",
  HEALTHCARE_CLINICS: "🏨",
  EDUCATION: "🎓",
  FINANCE_ACCOUNTING: "🛍️",
  LEGAL: "💼",
  EVENTS_BOOKINGS: "🎤",
  HOSPITALITY: "🏨",
  BEAUTY_WELLNESS: "✨",
  TECH_SUPPORT_SAAS: "💻",
  AUTOMOTIVE: "🛞",
  PROPERTY_MANAGEMENT: "🏠️",
  DEFAULT: "🏢",
};

export function mapIndustriesWithIcons(
  industries: Industry[],
): FormattedIndustry[] {
  return industries.map((industry) => ({
    ...industry,
    label: formatEnumString(industry.label),
    icon: industryIcons[industry.value] || industryIcons.DEFAULT,
  }));
}
