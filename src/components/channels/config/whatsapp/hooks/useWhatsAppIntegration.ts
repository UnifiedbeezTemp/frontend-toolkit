"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { getWabaConfig, initWabaSetup, completeWabaCallback } from "../../../../../services/wabaService";
import { WabaCallbackResponse, WabaSignupData } from "../../../../../types/channelApiTypes";
import { useToast } from "../../../../ui/toast/ToastProvider";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";

type FacebookSDK = {
  init: (config: {
    appId: string;
    version: string;
    xfbml: boolean;
    autoLogAppEvents: boolean;
  }) => void;
  login: (
    cb: (response: {
      authResponse?: { code?: string };
      error?: { message: string; type: string; code: number };
    }) => void,
    options: Record<string, unknown>,
  ) => void;
};

declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

const SIGNUP_STORAGE_KEY = "waba_signup_data";
const TOKEN_STORAGE_KEY = "waba_token";

const loadFacebookSDK = (): Promise<void> => {
  if (window.FB) return Promise.resolve();

  if (document.getElementById("facebook-jssdk")) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (window.FB) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Facebook SDK"));
    document.body.appendChild(script);
  });
};

const initFacebookSDK = (appId: string, version: string) => {
  if (!window.FB) return;

  window.FB.init({
    appId,
    version,
    xfbml: true,
    autoLogAppEvents: true,
  });
};

const isFacebookMessage = (event: MessageEvent) =>
  typeof event.origin === "string" && event.origin.endsWith("facebook.com");

export const useWhatsAppIntegration = (
  onComplete?: (response: WabaCallbackResponse) => void,
) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const configRef = useRef<{
    appId: string;
    configId: string;
    version: string;
  } | null>(null);
  const tokenRef = useRef<string | null>(null);
  const setIsLoadingRef = useRef(setIsLoading);
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  // Keep ref updated
  useEffect(() => {
    setIsLoadingRef.current = setIsLoading;
  }, [setIsLoading]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!isFacebookMessage(event)) return;

      try {
        const data = JSON.parse(event.data);

        if (data?.type === "WA_EMBEDDED_SIGNUP") {
          if (data.event === "FINISH" || data.event === "FINISH_ONLY_WABA") {
            if (data.data) {
              sessionStorage.setItem(
                SIGNUP_STORAGE_KEY,
                JSON.stringify(data.data),
              );
            }
          } else if (data.event === "CANCEL") {
            setIsLoadingRef.current(false);
            showToast({
              title: "Connection Cancelled",
              description: data.data?.current_step
                ? `Connection cancelled at step: ${data.data.current_step}`
                : "WhatsApp connection was cancelled.",
              variant: "error",
            });
          }
        }
      } catch {
        // Ignore malformed events
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [showToast]);

  const startIntegration = useCallback(async () => {
    const isBrowser = typeof window !== "undefined";
    const hostname = isBrowser ? window.location.hostname : "";
    const isLocalhost =
      isBrowser &&
      (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i.test(hostname) ||
        hostname === "");

    // Facebook requires HTTPS, but allows localhost for development
    if (isBrowser && window.location.protocol !== "https:" && !isLocalhost) {
      showToast({
        title: "HTTPS Required",
        description:
          "Facebook login requires HTTPS. Please access the app via 'http://localhost:3000' (not 127.0.0.1) or set up HTTPS locally.",
        variant: "error",
      });
      return;
    }

    // Warn if using HTTP on localhost (should work but not ideal)
    if (isBrowser && window.location.protocol === "http:" && isLocalhost) {
      console.warn(
        "Using HTTP on localhost. For production, use HTTPS. Facebook allows HTTP on localhost for development.",
      );
    }

    const proceedIntegration = async () => {
      try {
        setIsLoading(true);

        // Clear previous signup data
        sessionStorage.removeItem(SIGNUP_STORAGE_KEY);
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);

        // Load configuration
        const config = await getWabaConfig();
        if (!config?.appId || !config?.configId || !config?.version) {
          throw new Error("Invalid configuration received from server");
        }
        configRef.current = config;

        // Load and initialize Facebook SDK
        await loadFacebookSDK();

        if (!window.FB) {
          throw new Error("Facebook SDK failed to load");
        }

        initFacebookSDK(config.appId, config.version);

        // Initialize setup and get token
        const { token } = await initWabaSetup();
        if (!token) {
          throw new Error("Failed to initialize WhatsApp setup");
        }
        tokenRef.current = token;
        sessionStorage.setItem(TOKEN_STORAGE_KEY, token);

        // Launch Facebook login with embedded signup
        window.FB.login(
          (response) => {
            // Wrap async logic in IIFE to avoid making callback async
            (async () => {
              try {
                // Check for Facebook SDK errors first
                if (response.error) {
                  setIsLoading(false);
                  const errorMessage =
                    response.error.message || "Facebook login error";
                  console.error("Facebook login error:", response.error);

                  // Check if it's the HTTPS/security error
                  if (
                    errorMessage.includes("secure connection") ||
                    errorMessage.includes("security")
                  ) {
                    showToast({
                      title: "Facebook App Configuration Required",
                      description:
                        "The Facebook App needs to be configured in Facebook Developer Console. Please add 'localhost' to App Domains and Site URL.",
                      variant: "error",
                    });
                  } else {
                    showToast({
                      title: "Facebook Login Error",
                      description: errorMessage,
                      variant: "error",
                    });
                  }
                  return;
                }

                if (!response?.authResponse?.code) {
                  setIsLoading(false);
                  showToast({
                    title: "Error",
                    description:
                      "Facebook authorization was not completed. Please try again.",
                    variant: "error",
                  });
                  return;
                }

                const code = response.authResponse.code;
                const signupRaw = sessionStorage.getItem(SIGNUP_STORAGE_KEY);

                if (!signupRaw) {
                  setIsLoading(false);
                  showToast({
                    title: "Error",
                    description:
                      "Missing signup data from Facebook. Please try connecting again.",
                    variant: "error",
                  });
                  return;
                }

                let signupData: WabaSignupData;
                try {
                  const rawData = JSON.parse(signupRaw);
                  signupData = {
                    phoneNumberId: rawData.phone_number_id,
                    wabaId: rawData.waba_id,
                    businessId: rawData.business_id,
                  };
                } catch (parseError) {
                  setIsLoading(false);
                  showToast({
                    title: "Error",
                    description:
                      "Invalid signup data received. Please try again.",
                    variant: "error",
                  });
                  return;
                }

                // Complete the callback
                const currentToken =
                  tokenRef.current || sessionStorage.getItem(TOKEN_STORAGE_KEY);
                if (!currentToken) {
                  setIsLoading(false);
                  showToast({
                    title: "Error",
                    description:
                      "Setup token not found. Please try connecting again.",
                    variant: "error",
                  });
                  return;
                }

                const callbackResponse = await completeWabaCallback(
                  currentToken,
                  {
                    code,
                    signupData,
                  },
                );

                if (!callbackResponse?.success) {
                  throw new Error(
                    callbackResponse?.message ||
                      "Connection failed: Invalid response from server",
                  );
                }

                // Clean up
                sessionStorage.removeItem(SIGNUP_STORAGE_KEY);
                sessionStorage.removeItem(TOKEN_STORAGE_KEY);

                showToast({
                  title: "Success",
                  description:
                    callbackResponse.message ||
                    "WhatsApp Business Account connected successfully!",
                  variant: "success",
                });

                setIsLoading(false);
                onComplete?.(callbackResponse);
              } catch (error) {
                setIsLoading(false);
                const errorMessage =
                  error instanceof Error
                    ? error.message
                    : "Failed to complete WhatsApp connection";

                showToast({
                  title: "Error",
                  description: errorMessage,
                  variant: "error",
                });
              }
            })();
          },
          {
            config_id: config.configId,
            response_type: "code",
            override_default_response_type: true,
            extras: {
              setup: {},
              featureType: "",
              sessionInfoVersion: "3",
            },
          },
        );
      } catch (error) {
        setIsLoading(false);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to initialize WhatsApp connection";

        showToast({
          title: "Error",
          description: errorMessage,
          variant: "error",
        });
      }
    };

    showRedirectModal("WhatsApp", proceedIntegration, icons.whatsappIcon);
  }, [showToast, onComplete, showRedirectModal, icons]);

  return {
    startIntegration,
    isLoading,
  };
};
