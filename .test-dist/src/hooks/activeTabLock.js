"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVE_TAB_LEASE_TTL_MS = exports.ACTIVE_TAB_HEARTBEAT_INTERVAL_MS = exports.ACTIVE_TAB_STORAGE_KEY = exports.ACTIVE_TAB_CHANNEL_NAME = void 0;
exports.createActiveTabLease = createActiveTabLease;
exports.isActiveTabLeaseValid = isActiveTabLeaseValid;
exports.isActiveTabLeaseOwnedBy = isActiveTabLeaseOwnedBy;
exports.parseActiveTabLease = parseActiveTabLease;
exports.readActiveTabLease = readActiveTabLease;
exports.writeActiveTabLease = writeActiveTabLease;
exports.clearActiveTabLeaseIfOwned = clearActiveTabLeaseIfOwned;
exports.ACTIVE_TAB_CHANNEL_NAME = "unifiedbeez-tab-tracker";
exports.ACTIVE_TAB_STORAGE_KEY = "unifiedbeez-active-tab";
exports.ACTIVE_TAB_HEARTBEAT_INTERVAL_MS = 1_500;
exports.ACTIVE_TAB_LEASE_TTL_MS = 5_000;
function createActiveTabLease(tabId, now, ttl = exports.ACTIVE_TAB_LEASE_TTL_MS, ownerId = tabId) {
    return {
        tabId,
        ownerId,
        expiresAt: now + ttl,
    };
}
function isActiveTabLeaseValid(lease, now) {
    return Boolean(lease &&
        lease.tabId &&
        lease.ownerId &&
        Number.isFinite(lease.expiresAt) &&
        lease.expiresAt > now);
}
function isActiveTabLeaseOwnedBy(lease, ownerId) {
    return Boolean(lease && lease.ownerId === ownerId);
}
function parseActiveTabLease(rawLease) {
    if (!rawLease)
        return null;
    try {
        const parsed = JSON.parse(rawLease);
        if (typeof parsed.tabId !== "string" ||
            typeof parsed.expiresAt !== "number") {
            return null;
        }
        return {
            tabId: parsed.tabId,
            ownerId: typeof parsed.ownerId === "string" ? parsed.ownerId : parsed.tabId,
            expiresAt: parsed.expiresAt,
        };
    }
    catch {
        return null;
    }
}
function readActiveTabLease(storage, storageKey = exports.ACTIVE_TAB_STORAGE_KEY) {
    try {
        return parseActiveTabLease(storage.getItem(storageKey));
    }
    catch {
        return null;
    }
}
function writeActiveTabLease(storage, lease, storageKey = exports.ACTIVE_TAB_STORAGE_KEY) {
    try {
        storage.setItem(storageKey, JSON.stringify(lease));
    }
    catch {
        // Ignore storage failures and fall back to the current tab remaining usable.
    }
}
function clearActiveTabLeaseIfOwned(storage, ownerId, storageKey = exports.ACTIVE_TAB_STORAGE_KEY) {
    const lease = readActiveTabLease(storage, storageKey);
    if (!isActiveTabLeaseOwnedBy(lease, ownerId))
        return;
    try {
        storage.removeItem(storageKey);
    }
    catch {
        // Ignore storage failures and let the lease expire naturally.
    }
}
