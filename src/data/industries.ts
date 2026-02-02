import { formatEnumString } from "../utils/formatEnumString";

export interface Industry {
  value: string;
  label: string;
  name?: string;
  icon?: string;
}

export interface FormattedIndustry {
  value: string;
  label: string;
  icon: string;
}

const industryIcons: Record<string, string> = {
  ECOMMERCE_RETAIL: "ecommerce",
  REAL_ESTAThealthcare: "website/health-care.png",
  finance: "website/finance.png",
  education: "website/education.png",
  automotives: "website/automotives.png",
  tech: "website/tech.png",
  beauty: "website/beauty.png",
  events: "website/events.png",
  legal: "website/legal.png",
  ecommerce: "website/ecommerce.png",
  realEstate: "website/real-estate.png",
  HEALTHCARE_CLINICS: "healthcare",
  EDUCATION: "education",
  FINANCE_ACCOUNTING: "finance",
  LEGAL: "legal",
  EVENTS_BOOKINGS: "events",
  HOSPITALITY: "hospitality",
  BEAUTY_WELLNESS: "beauty",
  TECH_SUPPORT_SAAS: "tech",
  AUTOMOTIVE: "automotives",
  PROPERTY_MANAGEMENT: "realEstate",
  DEFAULT: "hospitality",
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
