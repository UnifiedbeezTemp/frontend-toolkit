export interface SmartSequence {
  id: string;
  title: string;
  description: string;
  industry: string;
  iconKey: string;
  isCustom?: boolean;
}

export const SMART_SEQUENCE_INDUSTRIES = [
  "Any Industry",
  "Finance & Accounting",
  "Content Creators",
  "Consulting & Agencies",
  "E-Commerce & Retail",
  "Events & Entertainment",
  "Fitness & Wellness",
  "Healthcare & Medical",
  "Media & Publishing",
] as const;

export const MOCK_SMART_SEQUENCES: SmartSequence[] = [
  {
    id: "build-your-flow",
    title: "Build Your Flow",
    description:
      "Start from scratch and build your own custom automation flow.",
    industry: "Any Industry",
    iconKey: "copy",
    isCustom: true,
  },
  {
    id: "1",
    title: "Smart Lead Capture, Instant Deal Setup",
    description:
      "When someone submits your service inquiry form, this workflow instantly sorts them into the right segment, spins up a new deal. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "2",
    title: "Engagement Signal Tagger Part 1",
    description:
      "Automatically keep your contacts labeled by their activity level. These real-time tags help you analyze performance. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "3",
    title: "Engagement Signal Tagger Part 2",
    description:
      "This second workflow updates and refines each contact's engagement tags, ensuring their activity level stays accurate over time. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "4",
    title: "Interest Signal Tracker",
    description:
      "When someone submits your service inquiry form, this workflow instantly sorts them into the right segment, spins up a new deal. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "5",
    title: "Cart Recovery Trigger",
    description:
      "Using Site Tracking, this workflow identifies shoppers who opened their cart but never completed checkout. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "6",
    title: "Conversion Boost Outreach",
    description:
      "Automatically reach out to contacts who visit your upgrade page with a short, targeted email series. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "7",
    title: "Post-Purchase Accessory Upsell",
    description:
      "After a customer buys a product, this workflow checks whether they skipped the recommended accessories. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "8",
    title: "Share-to-Earn Campaign Boost",
    description:
      "Encourage your audience to spread the word. When a contact forwards one of your email campaigns, this workflow automatically rewards. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "9",
    title: "Social Share Reward Campaign",
    description:
      "Motivate your audience to amplify your campaigns. When a contact shares your email on social media, this workflow instantly sends. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "10",
    title: "Social Visitor Follow-Up Invite",
    description:
      "When someone lands on your site from a social platform, this workflow sends a friendly email inviting them to follow your brand. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "11",
    title: "Auto-Task on Contact Reply",
    description:
      "Whenever a contact with an open deal replies to you, this workflow instantly creates a task so your team never misses a follow-up. Read more",
    industry: "Any Industry",
    iconKey: "envelope",
  },
  {
    id: "finance-1",
    title: "Automated Invoice Reminders",
    description:
      "Send friendly follow-ups to clients with outstanding balances to ensure timely payments. Read more",
    industry: "Finance & Accounting",
    iconKey: "envelope",
  },
  {
    id: "finance-2",
    title: "Expense Report Approvals",
    description:
      "Streamline the internal process for reviewing and approving employee business expenses. Read more",
    industry: "Finance & Accounting",
    iconKey: "envelope",
  },
  {
    id: "creators-1",
    title: "New Subscriber Welcome",
    description:
      "Automatically welcome new newsletter subscribers with a personalized email and exclusive content. Read more",
    industry: "Content Creators",
    iconKey: "envelope",
  },
  {
    id: "consulting-1",
    title: "Lead Qualification Engine",
    description:
      "Filter incoming inquiries based on budget and goals before booking a discovery call. Read more",
    industry: "Consulting & Agencies",
    iconKey: "envelope",
  },
  {
    id: "ecommerce-1",
    title: "Abandoned Cart Recovery",
    description:
      "Re-engage shoppers who left items in their cart with a series of gentle reminders and discounts. Read more",
    industry: "E-Commerce & Retail",
    iconKey: "envelope",
  },
  {
    id: "events-1",
    title: "Post-Event Feedback Loop",
    description:
      "Gather valuable insights from attendees immediately after your event finishes to improve future experiences. Read more",
    industry: "Events & Entertainment",
    iconKey: "envelope",
  },
  {
    id: "fitness-1",
    title: "Member Engagement Tracker",
    description:
      "Monitor gym check-ins and send encouraging messages to members who haven't visited in a while. Read more",
    industry: "Fitness & Wellness",
    iconKey: "envelope",
  },
  {
    id: "healthcare-1",
    title: "Appointment Pre-Check",
    description:
      "Send automated reminders and preparation instructions to patients before their scheduled visit. Read more",
    industry: "Healthcare & Medical",
    iconKey: "envelope",
  },
  {
    id: "media-1",
    title: "Breaking News Alert",
    description:
      "Instantly notify your most engaged readers when a high-priority story is published. Read more",
    industry: "Media & Publishing",
    iconKey: "envelope",
  },
];
