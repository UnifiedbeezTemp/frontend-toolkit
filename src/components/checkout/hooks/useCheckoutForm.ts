"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CHECKOUT_FORM_SCHEMA } from "../utils/checkoutSchema";
import { authService, StartTrialPayload } from "../../../api/services/auth";
import { useState, useEffect } from "react";
import { useToast } from "../../ui/toast/useToast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useUser } from "../../../contexts/UserContext";

export type CheckoutFormData = z.infer<typeof CHECKOUT_FORM_SCHEMA>;

const CHECKOUT_STORAGE_KEY = "unifiedbeez_checkout_data";

export const useCheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { showToast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CHECKOUT_FORM_SCHEMA),
    mode: "onSubmit" as const,
    reValidateMode: "onChange" as const,
    defaultValues: {
      fullName: "",
      state: "",
      city: "",
      address: "",
      postalCode: "",
      agreeToTerms: false,
    },
  });

  const { user } = useUser();
  const router = useRouter();

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
    const planType = user?.plan?.toUpperCase();

    if (!planType) {
      showToast({
        title: "No Plan Selected",
        description: "Please select a plan first.",
        variant: "error",
      });
      return;
    }

    if (!data.agreeToTerms) {
      showToast({
        title: "Terms Required",
        description: "You must agree to the terms and conditions",
        variant: "error",
      });
      return;
    }

    setIsProcessing(true);
    setHasSubmitted(true);

    try {
      const payload: StartTrialPayload = {
        planType: planType,
      };

      const response = await authService.confirmTrialStart(payload);

      if (response.clientSecret) {
        setClientSecret(response.clientSecret);
        setTrialEndsAt(response.trialEndsAt);
        localStorage.removeItem(CHECKOUT_STORAGE_KEY);
      } else {
        showToast({
          title: "Setup Failed",
          description: "Failed to get client secret from server",
          variant: "error",
        });
        setHasSubmitted(false);
      }
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(
        err,
        "Failed to setup trial. Please try again.",
      );
      showToast({
        title: "Trial Setup Failed",
        description: errorMessage,
        variant: "error",
      });
      setHasSubmitted(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoBack = () => {
    if (hasSubmitted && clientSecret) {
      setHasSubmitted(false);
      setClientSecret("");
    } else {
      router.back();
    }
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
    trialEndsAt,
    hasSubmitted,
    handleGoBack,
    setHasSubmitted,
    planType: user?.plan?.toUpperCase(),
  };
};
