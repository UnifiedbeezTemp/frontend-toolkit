export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.hostname.includes(".");
  } catch {
    return false;
  }
};

export const cleanAndPrepareUrl = (url: string): { fullUrl: string; displayName: string; cleanUrl: string } => {
  const cleanUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const fullUrl = cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;
  
  let displayName: string;
  try {
    const urlObj = new URL(fullUrl);
    displayName = urlObj.hostname.replace("www.", "");
  } catch {
    displayName = cleanUrl;
  }

  return { fullUrl, displayName, cleanUrl };
};

