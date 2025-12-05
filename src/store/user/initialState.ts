import { UserProfile } from "./types";

export const initialUserState: UserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  accountType: "",
  phoneNumber: "",
  role: "",
  organization: "",
  imageUrl: "",
  plan: {
    name: "",
    id: "",
    priceEur: 0,
    planType: "business",
  }
};

