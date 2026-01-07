import * as z from "zod";

export const CHECKOUT_FORM_SCHEMA = z.object({
  fullName: z.string().min(1, "Full name is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions to continue",
  }),
});
