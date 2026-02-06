import { PlatformContent } from "./types";

export const getPlatformContent = (name: string): PlatformContent => {
  return {
    description: `Easily connect ${name} to your UnifiedBeez workspace to enable automated sales tracking, payment workflows, and customer billing—all within your growth automation setup.`,
    features: [
      `Automatically trigger workflows when a new ${name} event is received`,
      `Sync customer and transaction data with your CRM`,
      `Send personalized follow-up emails post-purchase`,
      `Automate failed payment alerts or subscription renewal reminders`,
      `Segment leads based on purchase history`,
    ],
    steps: [
      `Click "Connect ${name}" on the ${name} card in the Integration Library`,
      `Sign in with your ${name} credentials`,
      `Authorize UnifiedBeez to access your account`,
      `Choose the events (e.g., new charge, failed payment) you want to automate`,
      `Click "Finish Setup" — your ${name} automation is live 🚀`,
    ],
    requirements: [
      `Active ${name} account`,
      `Admin access to UnifiedBeez workspace`,
      `At least one automation flow set up or selected`,
    ],
  };
};
