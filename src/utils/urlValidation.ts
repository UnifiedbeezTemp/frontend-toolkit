/**
 * URL Validation Utilities
 */

/**
 * Validates if a string is a valid URL
 * Supports URLs with or without protocol (http://, https://)
 * @param url - The URL string to validate
 * @returns Object with isValid boolean and error message
 */
export const validateUrl = (
  url: string
): { isValid: boolean; error: string } => {
  if (!url.trim()) {
    return { isValid: false, error: "URL is required" }
  }

  // Try to validate as URL
  try {
    // Add protocol if missing
    const urlWithProtocol = url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`

    const urlObj = new URL(urlWithProtocol)
    
    // Check if hostname contains a dot (basic domain validation)
    if (!urlObj.hostname.includes(".")) {
      return {
        isValid: false,
        error: "Please enter a valid URL (e.g., example.com or https://example.com)",
      }
    }

    return { isValid: true, error: "" }
  } catch {
    return {
      isValid: false,
      error: "Please enter a valid URL (e.g., example.com or https://example.com)",
    }
  }
}

/**
 * Checks if a string is a valid URL (simple boolean check)
 * @param url - The URL string to validate
 * @returns true if valid URL, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  return validateUrl(url).isValid
}
