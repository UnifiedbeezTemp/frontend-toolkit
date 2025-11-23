export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  isVerified: boolean;
  profilePhoto: string | null;
  phoneVerified: boolean;
}

export const createEmptyUser = () => {
  return {
    id: "",
    email: "",
    fullName: "",
    phone: "",
    phoneVerified: false,
    profilePhoto: "",
    isVerified: false,
  };
};
