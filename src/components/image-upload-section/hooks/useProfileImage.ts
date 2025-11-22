export const useProfileImage = () => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const createObjectURL = (file: File): string => {
    return URL.createObjectURL(file);
  };

  return {
    getInitials,
    createObjectURL,
  };
};