import assert from "node:assert/strict";
import test, { after } from "node:test";
import {
  buildUrlWithReturnTo,
  safeReturnTo,
} from "../../src/utils/safeRedirect";
import { redirectToLogin } from "../../src/utils/redirectToLogin";

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalBase = process.env.NEXT_PUBLIC_BASE;
const originalAuthBase = process.env.NEXT_PUBLIC_AUTH_BASE;

function restoreEnvValue(key: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[key];
  } else {
    process.env[key] = value;
  }
}

function setWindowLocation(
  origin: string,
  href = `${origin}/plans`,
  replace?: (url: string) => void,
) {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: {
        origin,
        href,
        replace,
      },
    },
  });
}

after(() => {
  if (originalWindow) {
    Object.defineProperty(globalThis, "window", originalWindow);
  } else {
    delete (globalThis as { window?: unknown }).window;
  }

  restoreEnvValue("NEXT_PUBLIC_BASE", originalBase);
  restoreEnvValue("NEXT_PUBLIC_AUTH_BASE", originalAuthBase);
});

test("safeReturnTo only allows relative, current-origin, or configured-origin redirects", () => {
  setWindowLocation("https://auth.example.com");
  process.env.NEXT_PUBLIC_BASE = "https://copilot.example.com";

  assert.equal(
    safeReturnTo("/chat/businessIdentity"),
    "/chat/businessIdentity",
  );
  assert.equal(
    safeReturnTo("https%3A%2F%2Fcopilot.example.com%2Fchat%2Fsummary"),
    "https://copilot.example.com/chat/summary",
  );
  assert.equal(
    safeReturnTo("https://evil.example.com/phish", { fallback: "/" }),
    "/",
  );
  assert.equal(safeReturnTo("javascript:alert(1)", { fallback: "/" }), "/");
  assert.equal(
    safeReturnTo("//evil.example.com/phish", { fallback: "/" }),
    "/",
  );
});

test("buildUrlWithReturnTo encodes a sanitized returnTo value", () => {
  setWindowLocation(
    "https://copilot.example.com",
    "https://copilot.example.com/chat/channels?edit=true",
  );
  process.env.NEXT_PUBLIC_AUTH_BASE = "https://auth.example.com";

  const url = new URL(
    buildUrlWithReturnTo("https://auth.example.com", "/addons"),
  );

  assert.equal(
    url.href,
    "https://auth.example.com/addons?returnTo=https%3A%2F%2Fcopilot.example.com%2Fchat%2Fchannels%3Fedit%3Dtrue",
  );
  assert.equal(
    url.searchParams.get("returnTo"),
    "https://copilot.example.com/chat/channels?edit=true",
  );
});

test("redirectToLogin uses the shared safe returnTo builder", () => {
  let redirectedTo = "";
  setWindowLocation(
    "https://copilot.example.com",
    "https://copilot.example.com/chat/businessIdentity",
    (url) => {
      redirectedTo = url;
    },
  );
  process.env.NEXT_PUBLIC_BASE = "https://auth.example.com";

  redirectToLogin();

  const url = new URL(redirectedTo);
  assert.equal(
    url.href,
    "https://auth.example.com/auth/signin?returnTo=https%3A%2F%2Fcopilot.example.com%2Fchat%2FbusinessIdentity",
  );
  assert.equal(
    url.searchParams.get("returnTo"),
    "https://copilot.example.com/chat/businessIdentity",
  );
});
