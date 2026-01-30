"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { extractErrorMessage } from "../../webchat/utils/errorUtils";
import { useRedirectModalContext } from "../../../context/RedirectModalContext";
import { useAppMutation } from "../../../../../api";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { GoogleCalendarConnectResponse, GoogleCalendarConnectRequest, connectGoogleCalendar, disconnectGoogleCalendar } from "../../../../../services/googleCalendarService";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface GoogleOAuth2Client {
  requestCode: () => void;
}

interface GoogleOAuth2Config {
  client_id: string;
  scope: string;
  ux_mode: "popup" | "redirect";
  access_type: "online" | "offline";
  prompt?: "consent" | "none" | "select_account";
  callback: (response: { code: string }) => void;
}

interface GoogleAccountsOAuth2 {
  initCodeClient: (config: GoogleOAuth2Config) => GoogleOAuth2Client;
}

interface GoogleAccounts {
  oauth2: GoogleAccountsOAuth2;
}

interface GoogleWindow {
  google?: {
    accounts: GoogleAccounts;
  };
}

interface UseGoogleCalendarIntegrationProps {
  googleClientId: string;
  onComplete?: (response: GoogleCalendarConnectResponse) => void;
  onRefetchChannels?: () => Promise<void> | void;
}

export const useGoogleCalendarIntegration = ({
  googleClientId,
  onComplete,
  onRefetchChannels,
}: UseGoogleCalendarIntegrationProps) => {
  const { showToast } = useToast();
  const [isScriptLoaded, setIsScriptLoaded] = useState(() => {
    if (typeof window === "undefined") return false;
    const googleWindow = window as unknown as GoogleWindow;
    return !!googleWindow.google?.accounts?.oauth2;
  });
  const [isLoading, setIsLoading] = useState(false);
  const scriptLoadedRef = useRef(false);
  const { showRedirectModal } = useRedirectModalContext();
  const icons = useSupabaseIcons();

  useEffect(() => {
    if (scriptLoadedRef.current || typeof window === "undefined") return;

    // Check if it's already available
    const googleWindow = window as unknown as GoogleWindow;
    if (googleWindow.google?.accounts?.oauth2) {
      setIsScriptLoaded(true);
      scriptLoadedRef.current = true;
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="accounts.google.com/gsi/client"]',
    );

    const handleScriptLoad = () => {
      setIsScriptLoaded(true);
      scriptLoadedRef.current = true;
    };

    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (googleWindow.google?.accounts?.oauth2) {
          handleScriptLoad();
          clearInterval(checkInterval);
        }
      }, 100);

      // Clean up interval after 10 seconds to avoid memory leak if it never loads
      setTimeout(() => clearInterval(checkInterval), 10000);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = handleScriptLoad;
    script.onerror = () => {
      showToast({
        title: "Error",
        description: "Failed to load Google Identity Services",
        variant: "error",
      });
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [showToast]);

  const connectMutation = useAppMutation<
    GoogleCalendarConnectRequest,
    GoogleCalendarConnectResponse
  >(
    async (data) => {
      return await connectGoogleCalendar(data);
    },
    {
      onSuccess: async (response) => {
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
        showToast({
          title: "Success",
          description:
            response.message || "Google Calendar connected successfully",
          variant: "success",
        });
        onComplete?.(response);
        setIsLoading(false);
      },
      onError: (error: unknown) => {
        showToast({
          title: "Error",
          description: extractErrorMessage(
            error,
            "Failed to connect Google Calendar",
          ),
          variant: "error",
        });
        setIsLoading(false);
      },
    },
  );

  const handleGoogleCalendarCallback = useCallback(
    (response: { code: string }) => {
      setIsLoading(true);
      connectMutation.mutate({
        authCode: response.code,
      });
    },
    [connectMutation],
  );

  const startIntegration = useCallback(() => {
    if (!isScriptLoaded) {
      showToast({
        title: "Error",
        description:
          "Google Identity Services is still loading. Please try again.",
        variant: "error",
      });
      return;
    }

    const googleWindow = window as unknown as GoogleWindow;
    if (!googleWindow.google?.accounts?.oauth2) {
      showToast({
        title: "Error",
        description: "Google Identity Services is not available",
        variant: "error",
      });
      return;
    }

    const proceedIntegration = () => {
      try {
        setIsLoading(true);
        const googleWindow = window as unknown as GoogleWindow;
        const client = googleWindow.google!.accounts.oauth2.initCodeClient({
          client_id: googleClientId,
          scope:
            "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email",
          ux_mode: "popup",
          access_type: "offline",
          prompt: "consent",
          callback: handleGoogleCalendarCallback,
        });

        client.requestCode();
      } catch (error) {
        console.error(
          "Failed to initialize Google Calendar OAuth client:",
          error,
        );
        showToast({
          title: "Error",
          description: "Failed to start Google Calendar connection",
          variant: "error",
        });
        setIsLoading(false);
      }
    };

    showRedirectModal(
      "Google Calendar",
      proceedIntegration,
      icons.googleCalendar,
    );
  }, [
    isScriptLoaded,
    googleClientId,
    handleGoogleCalendarCallback,
    showToast,
    showRedirectModal,
    icons,
  ]);

  const disconnectMutation = useAppMutation(
    (accountId: number) => disconnectGoogleCalendar(accountId),
    {
      onSuccess: async () => {
        showToast({
          title: "Disconnected",
          description: "Google Calendar disconnected successfully",
          variant: "success",
        });
        if (onRefetchChannels) {
          await onRefetchChannels();
        }
      },
      onError: () => {
        showToast({
          title: "Error",
          description: "Failed to disconnect Google Calendar",
          variant: "error",
        });
      },
    },
  );

  const handleConfirmDelete = (accountId: number) => {
    disconnectMutation.mutate(accountId);
  };

  return {
    startIntegration,
    isLoading: isLoading || connectMutation.isPending,
    isDeleting: disconnectMutation.isPending,
    handleConfirmDelete,
  };
};
