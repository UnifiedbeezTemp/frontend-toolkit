export interface Template {
  id: string;
  title: string;
  description: string;
  video: string;
  icon: string;
  info: {
    desription: string;
    lists: {
      title: string;
      list: string[];
      ordered: boolean;
    }[];
  };
}

export const getTemplatesData = (
  assets: Record<string, string>,
): readonly Template[] => {
  return [
    {
      id: "sales-lead-gen",
      title: "Sales & Lead Generation",
      description:
        "Capture new leads, qualify prospects, and convert interest into revenue with automated follow-ups and personalized outreach",
      video:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      icon: assets.featuredIcon1,
      info: {
        desription:
          "Easily connect Stripe to your UnifiedBeez workspace to enable automated sales tracking, payment workflows, and customer billing — all within your growth automation setup.",
        lists: [
          {
            title: "This integration lets you:",
            list: [
              "Automatically trigger workflows when a new payment is received",
              "Sync customer and transaction data with your CRM",
              "Send personalized follow-up emails post-purchase",
              "Automate failed payment alerts or subscription renewal reminders",
              "Segment leads based on purchase history",
            ],
            ordered: false,
          },
          {
            title: "🚀 How to Install:",
            list: [
              "Click “Connect Stripe” on the Stripe card in the Automation Library",
              "Sign in with your Stripe credentials",
              "Authorize UnifiedBeez to access your account",
              "Choose the events (e.g., new charge, failed payment) you want to automate",
              "Click “Finish Setup” — your Stripe automation is live 🎉",
            ],
            ordered: true,
          },
          {
            title: "✅ Requirements:",
            list: [
              "Active Stripe account",
              "Admin access to UnifiedBeez workspace",
              "At least one automation flow set up or selected",
            ],
            ordered: false,
          },
        ],
      },
    },
    {
      id: "support-escalation",
      title: "Support & Escalation",
      description:
        "Tailor your follow-up flow to match contact interests. This automation kicks in when a product interest is tagged, keeping your messages timely and relevant.",
      video:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      icon: assets.featuredIcon2,
      info: {
        desription:
          "Easily connect Stripe to your UnifiedBeez workspace to enable automated sales tracking, payment workflows, and customer billing — all within your growth automation setup.",
        lists: [
          {
            title: "This integration lets you:",
            list: [
              "Automatically trigger workflows when a new payment is received",
              "Sync customer and transaction data with your CRM",
              "Send personalized follow-up emails post-purchase",
              "Automate failed payment alerts or subscription renewal reminders",
              "Segment leads based on purchase history",
            ],
            ordered: false,
          },
          {
            title: "🚀 How to Install:",
            list: [
              "Click “Connect Stripe” on the Stripe card in the Automation Library",
              "Sign in with your Stripe credentials",
              "Authorize UnifiedBeez to access your account",
              "Choose the events (e.g., new charge, failed payment) you want to automate",
              "Click “Finish Setup” — your Stripe automation is live 🎉",
            ],
            ordered: true,
          },
          {
            title: "✅ Requirements:",
            list: [
              "Active Stripe account",
              "Admin access to UnifiedBeez workspace",
              "At least one automation flow set up or selected",
            ],
            ordered: false,
          },
        ],
      },
    },
    {
      id: "retention-nurture",
      title: "Retention & Nurture",
      description:
        "Keep customers engaged with onboarding journeys, product education, and loyalty-building automations that strengthen relationships.",
      video:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      icon: assets.featuredIcon3,
      info: {
        desription:
          "Easily connect Stripe to your UnifiedBeez workspace to enable automated sales tracking, payment workflows, and customer billing — all within your growth automation setup.",
        lists: [
          {
            title: "This integration lets you:",
            list: [
              "Automatically trigger workflows when a new payment is received",
              "Sync customer and transaction data with your CRM",
              "Send personalized follow-up emails post-purchase",
              "Automate failed payment alerts or subscription renewal reminders",
              "Segment leads based on purchase history",
            ],
            ordered: false,
          },
          {
            title: "🚀 How to Install:",
            list: [
              "Click “Connect Stripe” on the Stripe card in the Automation Library",
              "Sign in with your Stripe credentials",
              "Authorize UnifiedBeez to access your account",
              "Choose the events (e.g., new charge, failed payment) you want to automate",
              "Click “Finish Setup” — your Stripe automation is live 🎉",
            ],
            ordered: true,
          },
          {
            title: "✅ Requirements:",
            list: [
              "Active Stripe account",
              "Admin access to UnifiedBeez workspace",
              "At least one automation flow set up or selected",
            ],
            ordered: false,
          },
        ],
      },
    },
    {
      id: "reengagement-campaigns",
      title: "Re-engagement & Campaigns",
      description:
        "Win back inactive users, launch targeted promotions, and run campaigns across email and SMS to reignite interest",
      video:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      icon: assets.featuredIcon4,
      info: {
        desription:
          "Easily connect Stripe to your UnifiedBeez workspace to enable automated sales tracking, payment workflows, and customer billing — all within your growth automation setup.",
        lists: [
          {
            title: "This integration lets you:",
            list: [
              "Automatically trigger workflows when a new payment is received",
              "Sync customer and transaction data with your CRM",
              "Send personalized follow-up emails post-purchase",
              "Automate failed payment alerts or subscription renewal reminders",
              "Segment leads based on purchase history",
            ],
            ordered: false,
          },
          {
            title: "🚀 How to Install:",
            list: [
              "Click “Connect Stripe” on the Stripe card in the Automation Library",
              "Sign in with your Stripe credentials",
              "Authorize UnifiedBeez to access your account",
              "Choose the events (e.g., new charge, failed payment) you want to automate",
              "Click “Finish Setup” — your Stripe automation is live 🎉",
            ],
            ordered: true,
          },
          {
            title: "✅ Requirements:",
            list: [
              "Active Stripe account",
              "Admin access to UnifiedBeez workspace",
              "At least one automation flow set up or selected",
            ],
            ordered: false,
          },
        ],
      },
    },
  ] as const;
};
