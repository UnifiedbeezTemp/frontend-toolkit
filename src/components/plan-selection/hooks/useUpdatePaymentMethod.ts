import { useState, useCallback } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { authService, PaymentMethodData } from "../../../api/services/auth";
import { useToast } from "../../ui/toast/useToast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

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

  const handleUpdate = useCallback(async () => {
    if (!stripe || !elements) {
      setUpdateError("Stripe has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setUpdateError("Card element not found.");
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Step 1: Create Setup Intent
      const { client_secret } = await authService.createSetupIntent();

      // Step 2: Confirm Card Setup
      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(
        client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        },
      );

      if (stripeError) {
        throw new Error(stripeError.message || "Stripe confirmation failed");
      }

      if (setupIntent?.status !== "succeeded" || !setupIntent.payment_method) {
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
  }, [stripe, elements, showToast, onSuccess]);

  return {
    handleUpdate,
    isUpdating,
    updateError,
    setUpdateError,
  };
};
