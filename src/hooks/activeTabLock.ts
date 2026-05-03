export const ACTIVE_TAB_CHANNEL_NAME = "unifiedbeez-tab-tracker";
export const ACTIVE_TAB_STORAGE_KEY = "unifiedbeez-active-tab";
export const ACTIVE_TAB_HEARTBEAT_INTERVAL_MS = 1_500;
export const ACTIVE_TAB_LEASE_TTL_MS = 5_000;

export interface ActiveTabLease {
  tabId: string;
  ownerId: string;
  expiresAt: number;
}

interface StorageReader {
  getItem: Storage["getItem"];
}

interface StorageWriter {
  setItem: Storage["setItem"];
}

interface StorageRemover {
  removeItem: Storage["removeItem"];
}

export function createActiveTabLease(
  tabId: string,
  now: number,
  ttl = ACTIVE_TAB_LEASE_TTL_MS,
  ownerId = tabId,
): ActiveTabLease {
  return {
    tabId,
    ownerId,
    expiresAt: now + ttl,
  };
}

export function isActiveTabLeaseValid(
  lease: ActiveTabLease | null,
  now: number,
): lease is ActiveTabLease {
  return Boolean(
    lease &&
    lease.tabId &&
    lease.ownerId &&
    Number.isFinite(lease.expiresAt) &&
    lease.expiresAt > now,
  );
}

export function isActiveTabLeaseOwnedBy(
  lease: ActiveTabLease | null,
  ownerId: string,
): lease is ActiveTabLease {
  return Boolean(lease && lease.ownerId === ownerId);
}

export function parseActiveTabLease(
  rawLease: string | null,
): ActiveTabLease | null {
  if (!rawLease) return null;

  try {
    const parsed = JSON.parse(rawLease) as Partial<ActiveTabLease>;

    if (
      typeof parsed.tabId !== "string" ||
      typeof parsed.expiresAt !== "number"
    ) {
      return null;
    }

    return {
      tabId: parsed.tabId,
      ownerId:
        typeof parsed.ownerId === "string" ? parsed.ownerId : parsed.tabId,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

export function readActiveTabLease(
  storage: StorageReader,
  storageKey = ACTIVE_TAB_STORAGE_KEY,
): ActiveTabLease | null {
  try {
    return parseActiveTabLease(storage.getItem(storageKey));
  } catch {
    return null;
  }
}

export function writeActiveTabLease(
  storage: StorageWriter,
  lease: ActiveTabLease,
  storageKey = ACTIVE_TAB_STORAGE_KEY,
): void {
  try {
    storage.setItem(storageKey, JSON.stringify(lease));
  } catch {
    // Ignore storage failures and fall back to the current tab remaining usable.
  }
}

export function clearActiveTabLeaseIfOwned(
  storage: StorageReader & StorageRemover,
  ownerId: string,
  storageKey = ACTIVE_TAB_STORAGE_KEY,
): void {
  const lease = readActiveTabLease(storage, storageKey);

  if (!isActiveTabLeaseOwnedBy(lease, ownerId)) return;

  try {
    storage.removeItem(storageKey);
  } catch {
    // Ignore storage failures and let the lease expire naturally.
  }
}
