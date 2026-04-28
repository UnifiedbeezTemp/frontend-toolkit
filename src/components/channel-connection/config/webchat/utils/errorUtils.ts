export const extractErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (!error || typeof error !== "object") {
    return defaultMessage;
  }

  if ("message" in error) {
    const message = error.message;
    if (typeof message === "object" && message !== null && "message" in message) {
      return String(message.message);
    }
    if (typeof message === "string") {
      return message;
    }
  }

  return defaultMessage;
};

