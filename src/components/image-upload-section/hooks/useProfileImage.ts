import { useCallback } from "react";

export const useProfileImage = () => {
  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const createObjectURL = useCallback((file: File): string => {
    return URL.createObjectURL(file);
  }, []);

  return {
    getInitials,
    createObjectURL,
  };
};
