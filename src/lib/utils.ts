import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateAfter30Days = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 30);

  return futureDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getUserNameParts = (fullName: string) => {
  if (!fullName) return { firstName: "", lastName: "" };
  const nameParts = fullName.split(" ");
  return {
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
  };
};

export function getCurrencySymbol(currencyCode: string): string {
  try {
    const formatter = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const parts = formatter.formatToParts(0);
    const symbol = parts.find((p) => p.type === "currency")?.value;
    return symbol ?? currencyCode;
  } catch {
    return currencyCode;
  }
}
export function formatPrice(
  amount: number,
  currency: string = "GBP",
  locale: string = "en-GB"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function calculateDaysLeft(endDate: string | Date): number {
  const end = new Date(endDate);
  const now = new Date();

  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

export function formatDateTime(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}
