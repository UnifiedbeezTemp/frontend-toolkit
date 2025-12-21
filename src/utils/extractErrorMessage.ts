export function extractErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    if ("details" in error) {
      const errorWithDetails = error as {
        details?: {
          message?: string | { message?: string; error?: string }
        }
      }
      if (errorWithDetails.details?.message) {
        const message = errorWithDetails.details.message
        if (typeof message === "string") {
          return message
        }
        if (typeof message === "object") {
          if (message.message && typeof message.message === "string") {
            return message.message
          }
          if (message.error && typeof message.error === "string") {
            return message.error
          }
        }
      }
    }

    if ("response" in error) {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string | { message?: string; error?: string }
          }
        }
      }

      if (axiosError.response?.data?.message) {
        const message = axiosError.response.data.message

        if (typeof message === "string") {
          return message
        }

        if (typeof message === "object") {
          if (message.message && typeof message.message === "string") {
            return message.message
          }
          if (message.error && typeof message.error === "string") {
            return message.error
          }
        }
      }
    }

    if ("message" in error) {
      const message = error.message
      if (typeof message === "string") {
        return message
      }
      if (typeof message === "object" && message && "message" in message) {
        const nestedMessage = (message as { message?: string }).message
        if (typeof nestedMessage === "string") {
          return nestedMessage
        }
      }
    }
  }

  return "An unexpected error occurred"
}

