# Auth Session Expiry Events

The shared API layer emits a browser event whenever an API request fails with
`401 Unauthorized`. Consumers can use the built-in provider or subscribe to the
event directly.

## What Emits The Event

These shared API clients call `notifySessionExpired` when they receive a `401`:

- `shared/src/api/axios.ts`
- `shared/src/api/sse.ts`
- `shared/src/api/hooks/useFetch.ts`

The event name is `auth:session-expired`.

## Built-In Provider

Use `AuthSessionExpiredProvider` when your app wants the default shared UI
behavior: show an error toast, clear the session-active storage flag, then
redirect to login.

```tsx
"use client";

import {
  AuthSessionExpiredProvider,
  ToastProvider,
} from "@/shared/src/providers";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthSessionExpiredProvider>{children}</AuthSessionExpiredProvider>
    </ToastProvider>
  );
}
```

The provider must run in a client component and must be wrapped by the shared
`ToastProvider`.

Package consumers can also import the provider from `@unifiedbeez/shared`.

### Custom Provider Behavior

```tsx
<AuthSessionExpiredProvider
  clearSessionStorageKey="my_session_key"
  defaultMessage="Your session has ended."
  redirectDelayMs={1000}
  redirectTo={() => {
    window.location.replace("/login");
  }}
  onSessionExpired={(detail) => {
    console.info("Session expired", detail.correlationId);
  }}
>
  {children}
</AuthSessionExpiredProvider>
```

Set `clearSessionStorageKey={false}` if the consuming app does not use a
browser storage flag.

## Headless Listener

Use `addAuthSessionExpiredListener` when the consuming app wants to own the UI,
state cleanup, or routing.

```ts
import {
  addAuthSessionExpiredListener,
  notifySessionExpired,
} from "@/shared/src/api";

const unsubscribe = addAuthSessionExpiredListener((detail) => {
  showCustomToast(detail.message);
  router.replace("/signin");
});

// Later, when the listener is no longer needed:
unsubscribe();
```

The listener is safe during SSR. If `window` is not available, it returns a
no-op unsubscribe function.

Package consumers can also import the headless API from `@unifiedbeez/shared`.

## Manual Event Dispatch

If a consumer has its own API client, call `notifySessionExpired` when that
client receives a `401`.

```ts
import { notifySessionExpired } from "@/shared/src/api";

if (response.status === 401) {
  notifySessionExpired({
    status: 401,
    message: "Invalid or expired session",
    details: await response.json(),
  });
}
```

`details.correlationId` is copied into the event detail when it is present.

## Public API

```ts
AUTH_SESSION_EXPIRED_EVENT
notifySessionExpired(error)
addAuthSessionExpiredListener(listener)
AuthSessionExpiredEventDetail
AuthSessionExpiredListener
AuthSessionExpiredProvider
AuthSessionExpiredProviderProps
```

These are exported from:

- `@/shared/src/api`
- `@/shared/src`
