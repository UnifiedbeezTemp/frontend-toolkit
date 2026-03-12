"use client";

import { useMemo, useState } from "react";

export interface UsageMetric {
  name: string;
  used: number;
  total: number;
  unit?: string;
  percentage: number;
  estimate?: string;
  avgPerDay?: number;
  status?: "active" | "warning" | "limit_reached";
}

export interface ChartDataPoint {
  label: string;
  value: number;
  isWeekend?: boolean;
}

export interface MessagingUsageData {
  sms: UsageMetric;
  voice: {
    minutesUsed: number;
    activeNumbers: number;
    numbersLimit: number;
  };
}

export interface EmailUsageData {
  monthlySends: UsageMetric;
  dailySends: ChartDataPoint[];
  projectedTotal: number;
  avgPerDay: number;
}

export interface CrmUsageData {
  contacts: UsageMetric;
  growthThisMonth: number;
  avgPerDay: number;
  projectedFullDays: number;
}

export interface TeamUsageData {
  users: UsageMetric;
  aiAssistants: UsageMetric;
}

export interface UsageSummaryData {
  daysRemaining: number;
  monthProgress: number;
  status: string;
}

export interface ReportInsight {
  type: "messaging" | "email" | "crm" | "team";
  content: string;
  color: string;
}

export interface MessagePackage {
  id: string;
  amount: number;
  price: number;
  pricePerUnit: string;
  popular?: boolean;
  saving?: string;
}

export interface EmailPackage {
  id: string;
  amount: number;
  pricePerMonth: number;
}

export interface ContactPackage {
  id: string;
  amount: number;
  pricePerMonth: number;
}

export interface UsageReportData {
  period: string;
  daysRemaining: number;
  summaries: {
    label: string;
    value: string;
    colorClass: string;
  }[];
  insights: ReportInsight[];
}

export const useUsageSettings = () => {
  const messagingUsage: MessagingUsageData = useMemo(
    () => ({
      sms: {
        name: "Twilio SMS",
        used: 1049,
        total: 2500,
        percentage: 42.0,
        estimate: "Estimated 24 days remaining at current usage",
        avgPerDay: 58,
      },
      voice: {
        minutesUsed: 200,
        activeNumbers: 1,
        numbersLimit: 1,
      },
    }),
    [],
  );

  const emailUsage: EmailUsageData = useMemo(
    () => ({
      monthlySends: {
        name: "Monthly Email Sends",
        used: 2153,
        total: 25000,
        percentage: 8.6,
      },
      projectedTotal: 3149,
      avgPerDay: 120,
      dailySends: [
        { label: "Feb 1", value: 120, isWeekend: true },
        { label: "Feb 2", value: 150, isWeekend: false },
        { label: "Feb 3", value: 130, isWeekend: false },
        { label: "Feb 4", value: 180, isWeekend: false },
        { label: "Feb 5", value: 90, isWeekend: false },
        { label: "Feb 6", value: 110, isWeekend: false },
        { label: "Feb 7", value: 200, isWeekend: true },
        { label: "Feb 8", value: 140, isWeekend: true },
        { label: "Feb 9", value: 160, isWeekend: false },
        { label: "Feb 10", value: 170, isWeekend: false },
        { label: "Feb 11", value: 190, isWeekend: false },
        { label: "Feb 12", value: 145, isWeekend: false },
        { label: "Feb 13", value: 155, isWeekend: false },
        { label: "Feb 14", value: 210, isWeekend: true },
        { label: "Feb 15", value: 135, isWeekend: true },
        { label: "Feb 16", value: 125, isWeekend: false },
        { label: "Feb 17", value: 115, isWeekend: false },
        { label: "Feb 18", value: 185, isWeekend: false },
        { label: "Feb 19", value: 175, isWeekend: false },
        { label: "Feb 20", value: 165, isWeekend: false },
        { label: "Feb 21", value: 195, isWeekend: true },
        { label: "Feb 22", value: 140, isWeekend: true },
        { label: "Feb 23", value: 150, isWeekend: false },
        { label: "Feb 24", value: 205, isWeekend: false },
        { label: "Feb 25", value: 180, isWeekend: false },
        { label: "Feb 26", value: 170, isWeekend: false },
        { label: "Feb 27", value: 160, isWeekend: false },
        { label: "Feb 28", value: 150, isWeekend: true },
      ],
    }),
    [],
  );

  const crmUsage: CrmUsageData = useMemo(
    () => ({
      contacts: {
        name: "Contacts",
        used: 1049,
        total: 2500,
        percentage: 42.0,
      },
      growthThisMonth: 147,
      avgPerDay: 8,
      projectedFullDays: 177,
    }),
    [],
  );

  const teamUsage: TeamUsageData = useMemo(
    () => ({
      users: {
        name: "Users (Seats)",
        used: 1,
        total: 1,
        percentage: 100,
      },
      aiAssistants: {
        name: "AI Assistants",
        used: 2,
        total: 5,
        percentage: 40,
      },
    }),
    [],
  );

  const usageSummary: UsageSummaryData = useMemo(
    () => ({
      daysRemaining: 10,
      monthProgress: 64,
      status: "You're on track with your current usage across all services",
    }),
    [],
  );

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const usageReport: UsageReportData = useMemo(
    () => ({
      period: "February 1-10, 2026",
      daysRemaining: 10,
      summaries: [
        {
          label: "SMS Messages",
          value: "42%",
          colorClass: "bg-soft-green",
        },
        {
          label: "Email Sends",
          value: "9%",
          colorClass: "bg-primary-blue/5",
        },
        {
          label: "Contacts",
          value: "42%",
          colorClass: "bg-warning/10",
        },
        {
          label: "Team Seats",
          value: "100%",
          colorClass: "bg-purple-100/5",
        },
      ],
      insights: [
        {
          type: "messaging",
          content:
            "Messaging: You're using 42% of your SMS limit. At current rate, consider buying more messages in 24 days.",
          color: "var(--leaf-green-100)",
        },
        {
          type: "email",
          content:
            "Email: Projected to use 3,349 emails by end of month. You're well within limits.",
          color: "var(--primary-blue)",
        },
        {
          type: "crm",
          content:
            "CRM: Contacts growing at +8/day. Consider upgrading in 177 days.",
          color: "var(--yellow-100)",
        },
        {
          type: "team",
          content:
            "Team: You have 3 available AI assistant slots. Consider adding more assistants to automate workflows.",
          color: "var(--purple-200)",
        },
      ],
    }),
    [],
  );

  const [isBuyMessagesModalOpen, setIsBuyMessagesModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  const [isBuyEmailsModalOpen, setIsBuyEmailsModalOpen] = useState(false);
  const [selectedEmailPackageId, setSelectedEmailPackageId] = useState<
    string | null
  >(null);

  const [isBuyContactsModalOpen, setIsBuyContactsModalOpen] = useState(false);
  const [selectedContactPackageId, setSelectedContactPackageId] = useState<
    string | null
  >(null);

  const messagePackages: MessagePackage[] = useMemo(
    () => [
      {
        id: "pkg_1000",
        amount: 1000,
        price: 25,
        pricePerUnit: "£25.00 per 1,000",
      },
      {
        id: "pkg_2500",
        amount: 2500,
        price: 55,
        pricePerUnit: "£22.00 per 1,000",
        popular: true,
        saving: "Save 12%",
      },
      {
        id: "pkg_5000",
        amount: 5000,
        price: 95,
        pricePerUnit: "£19.00 per 1,000",
        saving: "Save 24%",
      },
      {
        id: "pkg_10000",
        amount: 10000,
        price: 170,
        pricePerUnit: "£17.00 per 1,000",
        saving: "Save 32%",
      },
    ],
    [],
  );

  const emailPackages: EmailPackage[] = useMemo(
    () => [
      {
        id: "email_10k",
        amount: 10000,
        pricePerMonth: 10,
      },
      {
        id: "email_25k",
        amount: 25000,
        pricePerMonth: 20,
      },
      {
        id: "email_100k",
        amount: 100000,
        pricePerMonth: 60,
      },
    ],
    [],
  );

  const contactPackages: ContactPackage[] = useMemo(
    () => [
      {
        id: "contacts_5k",
        amount: 5000,
        pricePerMonth: 15,
      },
      {
        id: "contacts_10k",
        amount: 10000,
        pricePerMonth: 25,
      },
      {
        id: "contacts_50k",
        amount: 50000,
        pricePerMonth: 75,
      },
    ],
    [],
  );

  return {
    messagingUsage,
    emailUsage,
    crmUsage,
    teamUsage,
    usageSummary,
    usageReport,
    isReportModalOpen,
    setIsReportModalOpen,
    isBuyMessagesModalOpen,
    setIsBuyMessagesModalOpen,
    messagePackages,
    selectedPackageId,
    setSelectedPackageId,
    isBuyEmailsModalOpen,
    setIsBuyEmailsModalOpen,
    emailPackages,
    selectedEmailPackageId,
    setSelectedEmailPackageId,
    isBuyContactsModalOpen,
    setIsBuyContactsModalOpen,
    contactPackages,
    selectedContactPackageId,
    setSelectedContactPackageId,
  };
};
