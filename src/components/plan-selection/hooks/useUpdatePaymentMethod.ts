import { useState, useCallback } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { authService, PaymentMethodData } from "../../../api/services/auth";
import { useToast } from "../../ui/toast/useToast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CHECKOUT_FORM_SCHEMA } from "../../checkout/utils/checkoutSchema";

const UPDATE_PAYMENT_METHOD_SCHEMA = CHECKOUT_FORM_SCHEMA.omit({
  agreeToTerms: true,
});
export type UpdatePaymentMethodData = z.infer<
  typeof UPDATE_PAYMENT_METHOD_SCHEMA
>;

interface UseUpdatePaymentMethodProps {
  onSuccess: (newMethod: PaymentMethodData) => void;
}

export const useUpdatePaymentMethod = ({
  onSuccess,
}: UseUpdatePaymentMethodProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { showToast } = useToast();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const form = useForm<UpdatePaymentMethodData>({
    resolver: zodResolver(UPDATE_PAYMENT_METHOD_SCHEMA),
    defaultValues: {
      cardHolderName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const handleUpdate = useCallback(
    async (data: UpdatePaymentMethodData) => {
      if (!stripe || !elements) {
        setUpdateError("Stripe has not loaded yet.");
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        setUpdateError("Card element not found.");
        return;
      }

      setIsUpdating(true);
      setUpdateError(null);

      try {
        // Step 1: Create Setup Intent
        const { client_secret } = await authService.createSetupIntent();

        // Step 2: Confirm Card Setup
        const { error: stripeError, setupIntent } =
          await stripe.confirmCardSetup(client_secret, {
            payment_method: {
              card: cardNumberElement,
              billing_details: {
                name: data.cardHolderName,
                address: {
                  line1: data.address,
                  city: data.city,
                  state: data.state,
                  postal_code: data.postalCode,
                  country: data.country,
                },
              },
            },
          });

        if (stripeError) {
          throw new Error(stripeError.message || "Stripe confirmation failed");
        }

        if (
          setupIntent?.status !== "succeeded" ||
          !setupIntent.payment_method
        ) {
          throw new Error("Card setup was not successful.");
        }

        const paymentMethodId =
          typeof setupIntent.payment_method === "string"
            ? setupIntent.payment_method
            : setupIntent.payment_method.id;

        // Step 3: Update Payment Method in backend
        const updatedMethod =
          await authService.updatePaymentMethod(paymentMethodId);

        showToast({
          title: "Success",
          description: "Payment method updated successfully.",
          variant: "success",
        });

        onSuccess(updatedMethod);
      } catch (err) {
        const errorMessage = extractErrorMessage(
          err,
          "Failed to update payment method",
        );
        setUpdateError(errorMessage);
        showToast({
          title: "Update failed",
          description: errorMessage,
          variant: "error",
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [stripe, elements, showToast, onSuccess],
  );

  return {
    control: form.control,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    handleUpdate,
    isUpdating,
    updateError,
    setUpdateError,
  };
};
