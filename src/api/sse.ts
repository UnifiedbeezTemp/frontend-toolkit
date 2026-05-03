import { apiBaseUrl } from "./rootUrls";
import { notifySessionExpired } from "./authSessionEvents";

type FetchSseJsonOptions = {
  headers?: HeadersInit;
  method?: "GET" | "POST";
  signal?: AbortSignal;
  terminalEvent?: string;
  onEvent?: (event: { event: string; data: unknown; rawData: string }) => void;
};

const joinUrl = (base: string, path: string) => {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

const parseSseEventBlock = (
  eventBlock: string,
): { event: string; data: string | null } => {
  const lines = eventBlock.split("\n");
  const dataLines: string[] = [];
  let eventName = "message";

  for (const line of lines) {
    if (line.startsWith("event:")) {
      const value = line.slice("event:".length).replace(/^ /, "").trim();
      if (value) eventName = value;
      continue;
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).replace(/^ /, ""));
    }
  }

  if (dataLines.length === 0) return { event: eventName, data: null };
  return { event: eventName, data: dataLines.join("\n") };
};

const tryParseJson = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const toRequestError = async (res: Response) => {
  const status = res.status || 500;
  const rawText = await res.text().catch(() => "");
  const details = rawText ? (tryParseJson(rawText) ?? { message: rawText }) : null;

  let message = res.statusText || "Something went wrong";
  if (details && typeof details === "object" && "message" in details) {
    const maybeMessage = (details as { message?: unknown }).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim().length > 0) {
      message = maybeMessage;
    }
  } else if (typeof rawText === "string" && rawText.trim().length > 0) {
    message = rawText;
  }

  return { status, message, details };
};

export async function fetchSseJson<TResult>(
  path: string,
  options?: FetchSseJsonOptions,
): Promise<TResult> {
  if (!apiBaseUrl) {
    throw new Error(
      "API base URL is not configured (NEXT_PUBLIC_USE_ONBOARDING_BACKEND).",
    );
  }

  const url = joinUrl(apiBaseUrl, path);
  const method = options?.method ?? "GET";
  const terminalEvent = options?.terminalEvent;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      credentials: "include",
      headers: options?.headers,
      signal: options?.signal,
    });
  } catch (error) {
    return Promise.reject({
      status: 0,
      message:
        "You aren't connected to the internet. Please connect and try again.",
      details: error,
    });
  }

  if (!res.ok) {
    const requestError = await toRequestError(res);
    if (requestError.status === 401) {
      notifySessionExpired(requestError);
    }

    return Promise.reject(requestError);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as TResult;
  }

  if (!contentType.includes("text/event-stream")) {
    const rawText = await res.text();
    const parsed = tryParseJson(rawText);
    if (parsed !== null) return parsed as TResult;
    return rawText as TResult;
  }

  if (!res.body) {
    const rawText = await res.text();
    const parsed = tryParseJson(rawText);
    if (parsed !== null) return parsed as TResult;
    throw new Error("Empty event-stream response body.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastParsed: unknown = null;
  let sawTerminalEvent = false;
  let terminalParsed: unknown = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    buffer = buffer.replace(/\r\n/g, "\n");

    // Process complete SSE events separated by a blank line.
    // https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream
    while (true) {
      const separatorIndex = buffer.indexOf("\n\n");
      if (separatorIndex === -1) break;

      const eventBlock = buffer.slice(0, separatorIndex);
      buffer = buffer.slice(separatorIndex + 2);

      const { event, data } = parseSseEventBlock(eventBlock);
      if (!data) continue;
      if (data.trim() === "[DONE]") {
        sawTerminalEvent = true;
        break;
      }

      const parsed = tryParseJson(data);
      if (parsed !== null) {
        lastParsed = parsed;
        options?.onEvent?.({ event, data: parsed, rawData: data });

        if (terminalEvent && event === terminalEvent) {
          sawTerminalEvent = true;
          terminalParsed = parsed;
          break;
        }
      }
    }

    if (sawTerminalEvent) break;
  }

  if (sawTerminalEvent) {
    try {
      await reader.cancel();
    } catch {
      // noop
    }
  }

  // Flush any remaining buffered event.
  const { event: trailingEvent, data: trailingData } = parseSseEventBlock(
    buffer.trim(),
  );
  if (trailingData && trailingData.trim() !== "[DONE]") {
    const parsed = tryParseJson(trailingData);
    if (parsed !== null) {
      lastParsed = parsed;
      options?.onEvent?.({ event: trailingEvent, data: parsed, rawData: trailingData });
      if (terminalEvent && trailingEvent === terminalEvent) {
        terminalParsed = parsed;
      }
    }
  }

  const finalParsed = terminalParsed ?? lastParsed;

  if (finalParsed === null) {
    throw new Error("No JSON payload found in event-stream response.");
  }

  return finalParsed as TResult;
}
