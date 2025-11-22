import BadgeIcon from "../components/ui/BadgeIcon";
import { useSupabaseIcons } from "../lib/supabase/useSupabase";

export interface Plan {
  id: string;
  title: string;
  description: string;
  tag: React.ReactNode;
  badge: React.ReactNode;
  monthlyPrice: number;
  addonAvailable: boolean;
  availableFeatures: string[];
  unAvailableFeatures: string[];
  ctaText: string;
  buttonVariant: "primary" | "secondary";
  footerText: string;
  footerIcon: string;
}

export const getPlansData = (
  icons: ReturnType<typeof useSupabaseIcons>
): Plan[] => [
  {
    id: "individual",
    title: "Individual Plan",
    description: "Individual Plan for custom AI & Chat Automation",
    tag: <></>,
    badge: (
      <BadgeIcon
        icon={icons.userWhite}
        hasPattern
        className="bg-brand-primary"
      />
    ),
    monthlyPrice: 19,
    addonAvailable: false,
    availableFeatures: [
      "1 Seat",
      "1 AI Assistant",
      "Channels: Facebook & Telegram Messenger",
      "Support: Email Only",
    ],
    unAvailableFeatures: [
      "CRM/Calendar Sync",
      "E-commerce Pack: Not Included",
      "Add-Ons: No access",
    ],
    ctaText: "Start with individual",
    buttonVariant: "secondary",
    footerText: "Stripe Checkout only (no add-ons)",
    footerIcon: icons.stripeIconCircle,
  },
  {
    id: "business",
    title: "Business Plan",
    description: "For Business owners for custom AI & Chat Automation",
    tag: (
      <span className="text-[1rem] font-[700] text-white bg-brand-primary rounded-full highlight-inside px-[0.6rem] py-[0.1rem]">
        Most Popular
      </span>
    ),
    badge: (
      <BadgeIcon
        icon={icons.luggage}
        hasPattern
        className="bg-text-secondary"
      />
    ),
    monthlyPrice: 99,
    addonAvailable: true,
    availableFeatures: [
      "5 Seats",
      "2 AI Assistant",
      "Channels: Facebook, Telegram & Whatsapp Messenger",
      "1 WhatsApp Channel Included",
      "Support: Email Only",
      "CRM / Calendar Sync: Optional ( £20/month )",
      "Ecommerce Pack: Optional ( £25/month )",
      "Add-Ons: Allowed",
    ],
    unAvailableFeatures: [],
    ctaText: "Choose Business",
    buttonVariant: "primary",
    footerText: "Stripe Billing + Add-ons enabled",
    footerIcon: icons.stripeIconCircle,
  },
  {
    id: "premium",
    title: "Premium Plan",
    description: "For Business owners for custom AI & Chat Automation",
    tag: (
      <span className="text-[1rem] font-[700] bg-warning text-brand-primary rounded-full highlight-inside px-[0.6rem] py-[0.1rem]">
        Best Value
      </span>
    ),
    badge: <BadgeIcon icon={icons.gem} hasPattern className="bg-warning" />,
    monthlyPrice: 299,
    addonAvailable: true,
    availableFeatures: [
      "20 Seats",
      "AI Assistant: 5 Included (Unlimited Add-ons with £25/extra)",
      "Channels: All supported channels",
      "Support: Priority",
      "CRM / Calendar Sync: Included",
      "Ecommerce Pack: Included",
      "Add-Ons: Allowed",
    ],
    unAvailableFeatures: [],
    ctaText: "Upgrade to Premium",
    buttonVariant: "secondary",
    footerText: "Stripe Billing",
    footerIcon: icons.stripeIconCircle,
  },
  {
    id: "organization",
    title: "Organisation Plan",
    description: "For Business owners for custom AI & Chat Automation",
    tag: (
      <div className="text-[1rem] font-[700] bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)] text-brand-primary rounded-full highlight-inside px-[0.6rem] py-[0.1rem]">
        Enterprise Ready
      </div>
    ),
    badge: (
      <BadgeIcon
        icon={icons.userGroup3}
        hasPattern={false}
        className="bg-[linear-gradient(165deg,#e6faf2_-11.22%,#e3cf9b_219.35%)]"
      />
    ),
    monthlyPrice: 499,
    addonAvailable: true,
    availableFeatures: [
      "50 Seats - Then Unlimited",
      "AI Assistant: 10 Included (Unlimited Add-ons with £25/extra)",
      "Channels: All supported channels",
      "Support: Priority",
      "CRM / Calendar Sync: Included",
      "Ecommerce Pack: Included",
      "Add-Ons: Allowed",
    ],
    unAvailableFeatures: [],
    ctaText: "Talk to Sales",
    buttonVariant: "secondary",
    footerText: "Stripe Billing",
    footerIcon: icons.stripeIconCircle,
  },
];

export const getPlanById = (
  icons: ReturnType<typeof useSupabaseIcons>,
  planId: string
): Plan | undefined => {
  const plans = getPlansData(icons);
  return plans.find(plan => plan.id === planId);
};