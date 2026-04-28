export const apiBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_TEST;

export const authBaseUrl = `${apiBaseUrl}/auth`;
export const planBaseUrl = `${apiBaseUrl}/plan`;

export const ipifyUrl = `https://api.ipify.org?format=json`;

const safeOrigin = (url?: string) => {
  if (!url) return undefined;
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
};

const apiOrigin = safeOrigin(apiBaseUrl);

export const messagesSocketUrl =
  process.env.NEXT_PUBLIC_MESSAGES_WS_URL ??
  (apiOrigin ? `${apiOrigin}/messages` : `${apiBaseUrl ?? ""}/messages`);
