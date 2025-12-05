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
