"use client";
import { useState } from "react";
import {
  StripeCardNumberElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardCvcElementChangeEvent,
  StripeError,
} from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Control } from "react-hook-form";
import { CheckoutFormData } from "../hooks/useCheckoutForm";
import { authService } from "../../../api/services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../../../contexts/UserContext";
import { addonService } from "../../../api/services/addon/addonService";
import { Addon } from "../../../store/onboarding/types/addonTypes";
import { queryClient } from "../../../api/client";

interface FormValues {
  cardHolderName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface UseStripePaymentProps {
  control: Control<CheckoutFormData>;
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
  const { user, refetch } = useUser();
  const router = useRouter();

  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const cardComplete =
    cardNumberComplete && cardExpiryComplete && cardCvcComplete;

  const handleCardNumberChange = (
    event: StripeCardNumberElementChangeEvent,
  ) => {
    setCardNumberComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError("");
    }
  };

  const handleCardExpiryChange = (
    event: StripeCardExpiryElementChangeEvent,
  ) => {
    setCardExpiryComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError("");
    }
  };

  const handleCardCvcChange = (event: StripeCardCvcElementChangeEvent) => {
    setCardCvcComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError("");
    }
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      if (!cardNumberElement) {
        throw new Error("Card number element not found");
      }

      const formValues = control._formValues as CheckoutFormData;

      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: formValues.cardHolderName,
              address: {
                line1: formValues.address,
                city: formValues.city,
                state: formValues.state,
                postal_code: formValues.postalCode,
                country: formValues.country,
              },
            },
          },
        },
      );

      if (stripeError) {
        console.error("Card setup error:", stripeError);
        setError(
          stripeError.message || "Failed to setup card. Please try again.",
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
          const attachResponse =
            await authService.attachPaymentMethod(paymentMethodId);
          console.log("Payment method attached successfully:", attachResponse);

          const storedAddonsStr = sessionStorage.getItem(
            "unifiedbeez_checkout_addons",
          );
          if (storedAddonsStr) {
            try {
              const selectedAddons: Addon[] = JSON.parse(storedAddonsStr);
              const purchases = selectedAddons
                .map((addon) => ({
                  addonType: addon.addonType,
                  quantity: addon.used || 1,
                }))
                .filter((p) => p.quantity > 0);

              if (purchases.length > 0) {
                await addonService.purchaseBatch({ purchases });
                console.log("Background addon purchase successful");
                sessionStorage.removeItem("unifiedbeez_checkout_addons");
                sessionStorage.setItem(
                  "unifiedbeez_addons_purchase_complete",
                  "1",
                );
              }
            } catch (addonError) {
              console.error("Background addon purchase failed:", addonError);
              router.push("/addons");
              return;
            }
          }

          onPaymentMethodAttached?.();
          refetch();
          await queryClient.invalidateQueries({ queryKey: ["plans", "user"] });
          await queryClient.invalidateQueries({
            queryKey: ["available-addons"],
          });
          await queryClient.invalidateQueries({ queryKey: ["purchasedAddons"] });
        } catch (attachError) {
          const errorMessage =
            attachError instanceof Error
              ? attachError.message
              : "Unknown error";
          console.error("Failed to attach payment method:", errorMessage);
          setError(
            "Payment method setup completed but failed to attach to account. Please contact support.",
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
    handleCardNumberChange,
    handleCardExpiryChange,
    handleCardCvcChange,
    handlePaymentSubmit,
    setError,
  };
};
