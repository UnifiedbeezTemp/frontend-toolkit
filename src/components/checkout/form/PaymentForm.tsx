"use client";

import { CheckoutFormData } from "../hooks/useCheckoutForm";
import FormField from "../../forms/FormField";
import { Control, Controller } from "react-hook-form";
import CountrySelector from "./CountrySelector";

interface PaymentFormProps {
  control: Control<CheckoutFormData>;
}

export default function PaymentForm({ control }: PaymentFormProps) {
  return (
    <div className="mt-[2rem] space-y-[1.4rem]">
      <FormField
        control={control}
        labelClassName="font-[400]"
        showRequired
        name="cardHolderName"
        type="text"
        label="Name on card"
        placeholder="Enter name as it appears on your card"
        required
      />

      <FormField
        control={control}
        labelClassName="font-[400]"
        showRequired
        name="address"
        type="text"
        label="Address"
        placeholder="Enter billing address"
        required
      />

      <div className="space-y-[1.4rem] grid gap-[1rem] sm:grid-cols-2 sm:gap-[2rem] sm:space-y-0">
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="city"
          type="text"
          label="City"
          placeholder="Enter city"
          required
        />
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="state"
          type="text"
          label="State / County"
          placeholder="Enter state or county"
          required
        />
      </div>

      <div className="space-y-[1.4rem] grid gap-[1rem] sm:grid-cols-2 sm:gap-[2rem] sm:space-y-0">
        <FormField
          control={control}
          labelClassName="font-[400]"
          showRequired
          name="postalCode"
          type="text"
          label="Postal Code"
          placeholder="Enter postal code / Eircode"
          required
        />
        <Controller
          name="country"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CountrySelector
              value={field.value}
              onChange={field.onChange}
              error={error?.message}
              required
            />
          )}
        />
      </div>
    </div>
  );
}
