"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CHECKOUT_FORM_SCHEMA } from "../utils/checkoutSchema";
import { authService } from "../../../api/services/auth";
import { useState, useEffect } from "react";
import { useToast } from "../../ui/toast/useToast";
import { useUser } from "../../../contexts/UserContext";

export type CheckoutFormData = z.infer<typeof CHECKOUT_FORM_SCHEMA>;

const CHECKOUT_STORAGE_KEY = "unifiedbeez_checkout_data";

export const useCheckoutForm = ({
  isYearly = false,
}: { isYearly?: boolean } = {}) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { showToast } = useToast();
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CHECKOUT_FORM_SCHEMA),
    mode: "onSubmit" as const,
    reValidateMode: "onChange" as const,
    defaultValues: {
      cardHolderName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      agreeToTerms: false,
    },
  });

  useEffect(() => {
    const fetchSetupIntent = async () => {
      try {
        const response = await authService.createSetupIntent();
        if (response.client_secret) {
          setClientSecret(response.client_secret);
        }
      } catch (err) {
        console.error("Failed to fetch setup intent:", err);
      }
    };

    fetchSetupIntent();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        Object.entries(parsed).forEach(([key, value]) => {
          if (key !== "agreeToTerms") {
            form.setValue(key as any, value);
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
    setIsReady(true);
  }, [form]);

  const watchedValues = form.watch();
  useEffect(() => {
    if (!isReady) return;
    const { agreeToTerms, ...dataToSave } = watchedValues;
    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [watchedValues, isReady]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!data.agreeToTerms) {
      showToast({
        title: "Terms Required",
        description: "You must agree to the terms and conditions",
        variant: "error",
      });
      return;
    }

    // This triggers the appearance of the Stripe elements or the "confirmation" state
    setHasSubmitted(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  return {
    control: form.control,
    formState: form.formState,
    handleSubmit: form.handleSubmit,
    setValue: form.setValue,
    watch: form.watch,
    onSubmit,
    clientSecret,
    isProcessing,
    setIsProcessing,
    trialEndsAt,
    setTrialEndsAt,
    hasSubmitted,
    handleGoBack,
    setHasSubmitted,
    planType: user?.plan?.toUpperCase(),
  };
};
