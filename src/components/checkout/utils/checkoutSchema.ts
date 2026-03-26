import * as z from "zod";

export const CHECKOUT_FORM_SCHEMA = z.object({
  cardHolderName: z.string().min(1, "Name on card is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z
    .string()
    .min(2, "Country code is required")
    .max(2, "Use 2-letter country code (e.g. IE, GB, DE)"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions to continue",
  }),
});
