/**
 * Utility to extract a user-friendly error message from various error structures.
 * It also formats the message by replacing underscores with spaces.
 *
 * This implementation is strictly type-safe, avoiding 'any' and 'as' casts
 * by using the 'in' operator and type guards.
 */
export function extractErrorMessage(
  error: unknown,
  defaultMessage: string = "An unexpected error occurred",
): string {
  if (typeof error !== "object" || error === null) {
    return defaultMessage;
  }

  const formatText = (text: string): string => text.replace(/_/g, " ");

  const processMessageObject = (messageObj: unknown): string | null => {
    if (typeof messageObj === "string") return formatText(messageObj);
    if (typeof messageObj !== "object" || messageObj === null) return null;

    // Handle the specific validation error structure with "errors" array
    if ("errors" in messageObj && Array.isArray(messageObj.errors)) {
      const messages = messageObj.errors
        .map((err: unknown) => {
          if (typeof err !== "object" || err === null) return null;

          // Check for nested errors array (typical for validation errors)
          if ("errors" in err && Array.isArray(err.errors)) {
            return err.errors
              .map((m: unknown) => (typeof m === "string" ? formatText(m) : ""))
              .filter(Boolean)
              .join(", ");
          }

          // Check for message property on the error object
          if ("message" in err && typeof err.message === "string") {
            return formatText(err.message);
          }

          return null;
        })
        .filter((m): m is string => m !== null && m !== "");

      if (messages.length > 0) return messages.join(". ");
    }

    // Handle "message" property which could be a string or another object
    if ("message" in messageObj) {
      if (typeof messageObj.message === "string") {
        return formatText(messageObj.message);
      }
      if (
        typeof messageObj.message === "object" &&
        messageObj.message !== null
      ) {
        return processMessageObject(messageObj.message);
      }
    }

    // Handle "error" property (sometimes used by backends)
    if ("error" in messageObj && typeof messageObj.error === "string") {
      return formatText(messageObj.error);
    }

    return null;
  };

  // 1. Handle AuthError/standard Fetch wrapper with data property
  if (
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null
  ) {
    const data = error.data;
    if ("message" in data) {
      const result = processMessageObject(data.message);
      if (result) return result;
    }
  }

  // 2. Handle details object (common in some API clients)
  if (
    "details" in error &&
    typeof error.details === "object" &&
    error.details !== null
  ) {
    const result = processMessageObject(error.details);
    if (result) return result;
  }

  // 3. Handle axios-like response structure
  if (
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null
  ) {
    const response = error.response;
    if (
      "data" in response &&
      typeof response.data === "object" &&
      response.data !== null
    ) {
      const data = response.data;
      if ("message" in data) {
        const result = processMessageObject(data.message);
        if (result) return result;
      }
      const resultDirect = processMessageObject(data);
      if (resultDirect) return resultDirect;
    }
  }

  // 4. Handle direct message property or Error object
  if ("message" in error) {
    const result = processMessageObject(error.message);
    if (result) return result;

    // Fallback if message is a string but not caught by processMessageObject
    if (typeof error.message === "string") {
      return formatText(error.message);
    }
  }

  return defaultMessage;
}
