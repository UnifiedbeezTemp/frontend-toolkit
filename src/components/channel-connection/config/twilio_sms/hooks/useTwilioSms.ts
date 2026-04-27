import { useState, useCallback, useRef } from "react";
import {
  TwilioPhoneNumber,
  TwilioPurchaseRequest,
  TwilioPurchaseResponse,
  NumberType,
  SearchParams,
  AvailableNumbersResponse,
} from "../types";
import { buildTwilioSearchQuery } from "../utils/twilioUtils";
import { useAppQuery, api, useAppMutation } from "../../../../../api";
import { useToast } from "../../../../ui/toast/ToastProvider";

export const useTwilioSms = (onSuccess?: () => void) => {
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [purchasingPhoneNumber, setPurchasingPhoneNumber] = useState<
    string | null
  >(null);
  const searchCountRef = useRef(0);

  const {
    data,
    isLoading: isSearching,
    isFetching,
    refetch,
  } = useAppQuery<AvailableNumbersResponse>(
    [
      "twilio-sms-numbers",
      searchParams?.countryCode,
      searchParams?.numberType,
      searchParams?.areaCode,
      searchCountRef.current,
    ],
    () =>
      api.get<AvailableNumbersResponse>(
        `/twilio/sms/available-numbers?${buildTwilioSearchQuery(searchParams!)}`
      ),
    {
      enabled: !!searchParams,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const availableNumbers = data?.numbers || [];
  const searchErrors = data?.errors || [];

  const searchNumbers = useCallback(
    (
      countryCode: string,
      numberType: NumberType,
      areaCode?: string,
      limit: number = 20
    ) => {
      searchCountRef.current += 1;
      setSearchParams({ countryCode, numberType, areaCode, limit });
    },
    []
  );

  const hasSearchErrors = searchErrors.length > 0;

  if (data && !isSearching && !isFetching) {
    if (hasSearchErrors && availableNumbers.length === 0) {
      const authError = searchErrors.find((e) => e.error === "Authenticate");
      if (authError) {
        showToast({
          title: "Twilio Not Configured",
          description: "Twilio credentials are not configured on the server.",
          variant: "error",
        });
      }
    } else if (availableNumbers.length === 0) {
      showToast({
        title: "No Numbers Found",
        description: "No phone numbers available for the selected criteria.",
        variant: "info",
      });
    }
  }

  const purchaseMutation = useAppMutation<
    TwilioPurchaseRequest,
    TwilioPurchaseResponse
  >(
    (payload) =>
      api.post<TwilioPurchaseRequest, TwilioPurchaseResponse>(
        "/twilio/sms/purchase-number",
        payload
      ),
    {
      onSuccess: () => {
        showToast({
          title: "Number Purchased",
          description:
            "Your Twilio phone number has been purchased successfully.",
          variant: "success",
        });
        setPurchasingPhoneNumber(null);
        onSuccess?.();
      },
      onError: () => {
        showToast({
          title: "Purchase Failed",
          description: "Failed to purchase the phone number. Please try again.",
          variant: "error",
        });
        setPurchasingPhoneNumber(null);
      },
    }
  );

  const purchaseNumber = useCallback(
    async (phoneNumber: string, countryCode: string) => {
      setPurchasingPhoneNumber(phoneNumber);
      try {
        await purchaseMutation.mutateAsync({
          phoneNumber,
          countryCode,
          capabilities: { sms: true, voice: false },
        });
      } catch (error) {
        setPurchasingPhoneNumber(null);
      }
    },
    [purchaseMutation]
  );

  const clearNumbers = useCallback(() => {
    setSearchParams(null);
  }, []);

  const releaseMutation = useAppMutation<number, { success: boolean }>(
    (numberId) =>
      api.delete<{ success: boolean }>(`/twilio/sms/release/${numberId}`),
    {
      onSuccess: () => {
        showToast({
          title: "Number Released",
          description:
            "Your Twilio phone number has been released successfully.",
          variant: "success",
        });
      },
      onError: () => {
        showToast({
          title: "Release Failed",
          description: "Failed to release the phone number. Please try again.",
          variant: "error",
        });
      },
    }
  );

  const releaseNumber = useCallback(
    async (numberId: number, options?: { onSuccess?: () => void }) => {
      try {
        await releaseMutation.mutateAsync(numberId);
        options?.onSuccess?.();
      } catch (error) {}
    },
    [releaseMutation]
  );

  return {
    availableNumbers,
    isSearching: isSearching || isFetching,
    searchErrors,
    searchNumbers,
    purchaseNumber,
    clearNumbers,
    refetchNumbers: refetch,
    isPurchasing: purchaseMutation.isPending,
    isReleasing: releaseMutation.isPending,
    purchasingPhoneNumber,
    releaseNumber,
  };
};
