export const convertToReadable = (text: string): string => {
  // Handle special cases first
  const specialCases: Record<string, string> = {
    'crmCalendar': 'CRM Calendar',
  };
  
  if (specialCases[text]) {
    return specialCases[text];
  }
  
  // Insert space before capital letters
  let result = text.replace(/([A-Z])/g, ' $1');
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  // Handle acronyms (like CRM)
  result = result.replace(/\b([A-Z])([A-Z]+)\b/g, (match) => match.toUpperCase());
  
  return result;
};

// Examples:
convertToReadable('communication'); // "Communication"
convertToReadable('crmCalendar');   // "CRM Calendar"
convertToReadable('ecommerce');     // "Ecommerce"
convertToReadable('upcoming');      // "Upcoming"