import { WebsitePage } from "../../../business-details/knowledge-files/websites/utils/types";

export const generateDummyPages = (baseUrl: string): WebsitePage[] => {
  const subpages = ["/about", "/contact", "/faq", "/services", "/pricing"];
  return subpages.map(subpage => ({
    url: `${baseUrl}${subpage}`,
    status: "active" as const,
    characters: Math.floor(Math.random() * 90000000 + 10000000).toString(),
    updatedAt: new Date().toLocaleString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));
};

export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.includes('.');
  } catch {
    return false;
  }
};

export const tones = ["Friendly", "Professional", "Custom"] as const;
export const styles = ["Concise", "Detailed", "Mixed"] as const;
export const personalities = ["Receptionist", "Doctor/Nurse", "Engineer", "Account Manager", "Custom Role"] as const;