export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  phoneNumber: string;
  imageUrl: string;
  role: string;
  organization: string;
  plan:{
    name: string,
    id: string
    priceEur: number,
    planType: "business" | "individual" | "organization" | "premium" ,
  }
}