"use client";
import { useState } from "react";
import { StripeCardElementChangeEvent, StripeError } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { authService } from "../../../api/services/auth";

interface FormValues {
  cardHolderName?: string;
  fullName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

interface UseStripePaymentProps {
  control: { _formValues: unknown };
  clientSecret: string;
  onPaymentMethodAttached?: () => void;
}

export const useStripePayment = ({
  control,
  clientSecret,
  onPaymentMethodAttached,
}: UseStripePaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
    setError(event.error?.message || "");
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const formValues = control._formValues as FormValues;

      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formValues.cardHolderName || formValues.fullName,
              address: {
                line1: formValues.address,
                city: formValues.city,
                state: formValues.state,
                postal_code: formValues.postalCode,
              },
            },
          },
        }
      );

      if (stripeError) {
        console.error("Card setup error:", stripeError);
        setError(
          stripeError.message || "Failed to setup card. Please try again."
        );
        return;
      }

      if (setupIntent?.status === "succeeded" && setupIntent.payment_method) {
        const paymentMethodId =
          typeof setupIntent.payment_method === "string"
            ? setupIntent.payment_method
            : setupIntent.payment_method.id;

        console.log("Payment method created:", paymentMethodId);

        try {
          const attachResponse = await authService.attachPaymentMethod(
            paymentMethodId
          );
          console.log("Payment method attached successfully:", attachResponse);
          onPaymentMethodAttached?.();
        } catch (attachError) {
          const errorMessage =
            attachError instanceof Error
              ? attachError.message
              : "Unknown error";
          console.error("Failed to attach payment method:", errorMessage);
          setError(
            "Payment method setup completed but failed to attach to account. Please contact support."
          );
        }
      } else {
        setError("Card setup failed. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      console.error("Payment processing error:", errorMessage);
      setError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  return {
    cardComplete,
    processing,
    error,
    handleCardChange,
    handlePaymentSubmit,
    setError,
  };
};
