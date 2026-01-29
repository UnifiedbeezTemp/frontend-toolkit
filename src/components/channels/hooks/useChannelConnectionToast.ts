"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "../../ui/toast/useToast";

export function useChannelConnectionToast<T>(onRefetch?: () => T | Promise<T>) {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const status = searchParams.get("status");
    const calendlyConnected = searchParams.get("calendly_connected") === "true";
    const googleCalendarConnected =
      searchParams.get("google_calendar_connected") === "true";
    const calendarConnected = searchParams.get("calendar_connected") === "true";
    const emailConnected = searchParams.get("email_connected") === "true";
    const paypalConnected = searchParams.get("paypal_connected") === "true";
    const zoomConnected = searchParams.get("zoom_connected") === "true";
    const stripeConnected = searchParams.get("stripe_connected") === "true";
    const instagramConnected =
      searchParams.get("instagram_connected") === "true";
    const shopifyConnected = searchParams.get("shopify_connected") === "true";
    const provider = searchParams.get("provider");
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    const channelId = searchParams.get("channelId");

    const isSuccess =
      success ||
      calendlyConnected ||
      googleCalendarConnected ||
      emailConnected ||
      paypalConnected ||
      zoomConnected ||
      stripeConnected ||
      instagramConnected ||
      shopifyConnected ||
      status === "success" ||
      status === "outlook_connected" ||
      (calendarConnected && provider === "microsoft") ||
      !!channelId;

    if (isSuccess || error) {
      const hasToasted = window.sessionStorage.getItem(
        "connection_toast_shown",
      );
      if (hasToasted) return;

      if (isSuccess) {
        if (onRefetch) {
          onRefetch();
        }
        let description = "Channel connected successfully!";
        if (
          status === "outlook_connected" ||
          (emailConnected && provider === "outlook")
        )
          description = "Outlook connected successfully!";
        else if (emailConnected && provider === "gmail")
          description = "Gmail connected successfully!";
        else if (paypalConnected)
          description = "PayPal connected successfully!";
        else if (zoomConnected) description = "Zoom connected successfully!";
        else if (stripeConnected)
          description = "Stripe connected successfully!";
        else if (instagramConnected)
          description = "Instagram connected successfully!";
        else if (shopifyConnected)
          description = "Shopify connected successfully!";
        else if (calendarConnected && provider === "microsoft")
          description = "Microsoft Calendar connected successfully!";
        else if (calendlyConnected)
          description = "Calendly connected successfully!";
        else if (googleCalendarConnected)
          description = "Google Calendar connected successfully!";

        if (message) description = message;

        showToast({
          title: "Success",
          description,
          variant: "success",
        });
      } else if (error) {
        showToast({
          title: "Connection Failed",
          description: message || error || "Failed to connect channel.",
          variant: "error",
        });
      }

      window.sessionStorage.setItem("connection_toast_shown", "true");
      setTimeout(
        () => window.sessionStorage.removeItem("connection_toast_shown"),
        2000,
      );

      const url = new URL(window.location.href);
      const paramsToRemove = [
        "success",
        "status",
        "message",
        "channelId",
        "calendar_connected",
        "calendly_connected",
        "google_calendar_connected",
        "email_connected",
        "paypal_connected",
        "zoom_connected",
        "stripe_connected",
        "instagram_connected",
        "shopify_connected",
        "provider",
        "error",
      ];

      paramsToRemove.forEach((param) => url.searchParams.delete(param));

      if (url.hash === "#_=_") url.hash = "";
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams, showToast, onRefetch]);
}
