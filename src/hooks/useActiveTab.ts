import { useEffect, useState, useCallback, useRef } from "react";
import {
  ACTIVE_TAB_CHANNEL_NAME,
  ACTIVE_TAB_HEARTBEAT_INTERVAL_MS,
  ACTIVE_TAB_LEASE_TTL_MS,
  ACTIVE_TAB_STORAGE_KEY,
  clearActiveTabLeaseIfOwned,
  createActiveTabLease,
  isActiveTabLeaseValid,
  readActiveTabLease,
  writeActiveTabLease,
} from "./activeTabLock";


function generateTabId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function getOrCreateTabId(TAB_ID_SESSION_KEY: string): string {
  const fallbackTabId = generateTabId();

  if (typeof window === "undefined") return fallbackTabId;

  try {
    const existingTabId = window.sessionStorage.getItem(TAB_ID_SESSION_KEY);

    if (existingTabId) {
      return existingTabId;
    }

    window.sessionStorage.setItem(TAB_ID_SESSION_KEY, fallbackTabId);
    return fallbackTabId;
  } catch {
    return fallbackTabId;
  }
}

function getInitialIsActive(tabId: string): boolean {
  if (typeof window === "undefined") return true;

  const lease = readActiveTabLease(window.localStorage);
  const now = Date.now();

  if (lease?.tabId === tabId) {
    return true;
  }

  if (!isActiveTabLeaseValid(lease, now)) {
    return !document.hidden;
  }

  return false;
}

interface UseActiveTabResult {
  isActive: boolean;
  claimTab: () => void;
}

export default function useActiveTab({ 
  tabIdSessionKey, 
  activeTabLeaseTTLInMs = ACTIVE_TAB_LEASE_TTL_MS, 
  activeTabStorageKey = ACTIVE_TAB_STORAGE_KEY, 
  activeTabChannelName = ACTIVE_TAB_CHANNEL_NAME 
}: { 
  tabIdSessionKey: string, 
  activeTabLeaseTTLInMs?: number, 
  activeTabStorageKey: string, 
  activeTabChannelName?: string 
}): UseActiveTabResult {
  const [tabId] = useState(() => getOrCreateTabId(tabIdSessionKey));
  const [isActive, setIsActive] = useState(() => getInitialIsActive(tabId));
  const channelRef = useRef<BroadcastChannel | null>(null);

  const broadcastPresence = useCallback((): void => {
    channelRef.current?.postMessage({
      type: "TAB_STATE_UPDATED",
      tabId,
    });
  }, [tabId]);

  const takeOwnership = useCallback((): void => {
    if (typeof window === "undefined") return;

    writeActiveTabLease(
      window.localStorage,
      createActiveTabLease(tabId, Date.now(), activeTabLeaseTTLInMs),
    );
    setIsActive(true);
    broadcastPresence();
  }, [broadcastPresence, tabId]);

  const syncOwnership = useCallback(
    (allowClaim: boolean): boolean => {
      if (typeof window === "undefined") return true;

      const lease = readActiveTabLease(window.localStorage);
      const now = Date.now();

      if (lease?.tabId === tabId) {
        setIsActive(true);
        return true;
      }

      if (!isActiveTabLeaseValid(lease, now)) {
        if (allowClaim) {
          takeOwnership();
          return true;
        }

        setIsActive(false);
        return false;
      }

      setIsActive(false);
      return false;
    },
    [tabId, takeOwnership],
  );

  const claimTab = useCallback((): void => {
    takeOwnership();
  }, [takeOwnership]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const allowVisibleClaim = (): boolean => !document.hidden;
    const handleStateChange = (): void => {
      syncOwnership(allowVisibleClaim());
    };

    if (isActive) {
      writeActiveTabLease(
        window.localStorage,
        createActiveTabLease(tabId, Date.now(), activeTabLeaseTTLInMs),
      );
    }

    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(activeTabChannelName);
      channelRef.current = channel;
      channel.onmessage = (): void => {
        handleStateChange();
      };
    }

    const heartbeatId = window.setInterval(() => {
      const lease = readActiveTabLease(window.localStorage);
      const now = Date.now();

      if (lease?.tabId === tabId) {
        writeActiveTabLease(
          window.localStorage,
          createActiveTabLease(tabId, now, activeTabLeaseTTLInMs),
        );
        return;
      }

      if (!isActiveTabLeaseValid(lease, now) && allowVisibleClaim()) {
        takeOwnership();
        return;
      }

      setIsActive(false);
    }, ACTIVE_TAB_HEARTBEAT_INTERVAL_MS);

    const handleStorage = (event: StorageEvent): void => {
      if (event.key !== null && event.key !== activeTabStorageKey) return;
      handleStateChange();
    };

    const releaseOwnership = (): void => {
      clearActiveTabLeaseIfOwned(window.localStorage, tabId);
      broadcastPresence();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleStateChange);
    window.addEventListener("pagehide", releaseOwnership);
    window.addEventListener("beforeunload", releaseOwnership);
    document.addEventListener("visibilitychange", handleStateChange);

    return () => {
      window.clearInterval(heartbeatId);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleStateChange);
      window.removeEventListener("pagehide", releaseOwnership);
      window.removeEventListener("beforeunload", releaseOwnership);
      document.removeEventListener("visibilitychange", handleStateChange);
      channelRef.current?.close();
      channelRef.current = null;
    };
  }, [broadcastPresence, isActive, syncOwnership, tabId, takeOwnership]);

  return { isActive, claimTab };
}
