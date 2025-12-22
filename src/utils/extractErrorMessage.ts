export function extractErrorMessage(error: unknown, defaultMessage: string = "An unexpected error occurred"): string {
  if (!error || typeof error !== "object") {
    return defaultMessage;
  }

  // Handle AuthError with data property (from fetch responses)
  if ("data" in error) {
    const errorWithData = error as { data?: { message?: string | { message?: string; error?: string } } };
    if (errorWithData.data?.message) {
      const message = errorWithData.data.message;
      if (typeof message === "string") {
        return message;
      }
      if (typeof message === "object" && message !== null) {
        if (message.message && typeof message.message === "string") {
          return message.message;
        }
        if (message.error && typeof message.error === "string") {
          return message.error;
        }
      }
    }
  }

  // Handle details object (from axios interceptor)
  if ("details" in error) {
    const errorWithDetails = error as {
      details?: {
        message?: string | { message?: string; error?: string }
      }
    };
    if (errorWithDetails.details?.message) {
      const message = errorWithDetails.details.message;
      if (typeof message === "string") {
        return message;
      }
      if (typeof message === "object" && message !== null) {
        if (message.message && typeof message.message === "string") {
          return message.message;
        }
        if (message.error && typeof message.error === "string") {
          return message.error;
        }
      }
    }
  }

  // Handle axios response structure
  if ("response" in error) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string | { message?: string; error?: string }
        }
      }
    };

    if (axiosError.response?.data?.message) {
      const message = axiosError.response.data.message;

      if (typeof message === "string") {
        return message;
      }

      if (typeof message === "object" && message !== null) {
        if (message.message && typeof message.message === "string") {
          return message.message;
        }
        if (message.error && typeof message.error === "string") {
          return message.error;
        }
      }
    }
  }

  // Handle direct message property (including nested message.message)
  if ("message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
    if (typeof message === "object" && message !== null && "message" in message) {
      const nestedMessage = (message as { message?: string }).message;
      if (typeof nestedMessage === "string") {
        return nestedMessage;
      }
    }
  }

  return defaultMessage;
}

