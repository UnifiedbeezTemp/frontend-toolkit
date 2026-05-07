import { extractErrorMessage } from "../utils/extractErrorMessage";

export const AUTH_SESSION_EXPIRED_EVENT = "auth:session-expired";

export type AuthSessionExpiredEventDetail = {
  message: string;
  correlationId?: string;
};

export type AuthSessionExpiredListener = (
  detail: AuthSessionExpiredEventDetail,
  event: CustomEvent<AuthSessionExpiredEventDetail>,
) => void;

type ApiErrorLike = {
  status?: number;
  message?: unknown;
  details?: unknown;
};

const getCorrelationId = (error: ApiErrorLike): string | undefined => {
  const details = error.details;
  if (typeof details !== "object" || details === null) return undefined;

  if ("correlationId" in details && typeof details.correlationId === "string") {
    return details.correlationId;
  }

  return undefined;
};

export const notifySessionExpired = (error: ApiErrorLike) => {
  if (typeof window === "undefined") return;

  const message = extractErrorMessage(error, "Invalid or expired session");

  window.dispatchEvent(
    new CustomEvent<AuthSessionExpiredEventDetail>(
      AUTH_SESSION_EXPIRED_EVENT,
      {
        detail: {
          message,
          correlationId: getCorrelationId(error),
        },
      },
    ),
  );
};

export const addAuthSessionExpiredListener = (
  listener: AuthSessionExpiredListener,
): (() => void) => {
  if (typeof window === "undefined") return () => undefined;

  const handleSessionExpired = (event: Event) => {
    const customEvent = event as CustomEvent<AuthSessionExpiredEventDetail>;
    listener(customEvent.detail, customEvent);
  };

  window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);

  return () => {
    window.removeEventListener(
      AUTH_SESSION_EXPIRED_EVENT,
      handleSessionExpired,
    );
  };
};
