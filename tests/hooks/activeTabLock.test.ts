import assert from "node:assert/strict";
import test from "node:test";
import {
  ACTIVE_TAB_STORAGE_KEY,
  clearActiveTabLeaseIfOwned,
  createActiveTabLease,
  isActiveTabLeaseOwnedBy,
  isActiveTabLeaseValid,
  parseActiveTabLease,
  readActiveTabLease,
  writeActiveTabLease,
} from "../../src/hooks/activeTabLock";

class MemoryStorage {
  private readonly state = new Map<string, string>();

  getItem(key: string): string | null {
    return this.state.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.state.set(key, value);
  }

  removeItem(key: string): void {
    this.state.delete(key);
  }
}

test("readActiveTabLease ignores malformed storage data", () => {
  const storage = new MemoryStorage();
  storage.setItem(ACTIVE_TAB_STORAGE_KEY, "{bad json");

  assert.equal(readActiveTabLease(storage), null);
  assert.equal(parseActiveTabLease('{"tabId":1}'), null);
});

test("parseActiveTabLease supports legacy leases without owner IDs", () => {
  assert.deepEqual(parseActiveTabLease('{"tabId":"tab-a","expiresAt":3000}'), {
    tabId: "tab-a",
    ownerId: "tab-a",
    expiresAt: 3000,
  });
});

test("createActiveTabLease produces a valid lease until expiry", () => {
  const lease = createActiveTabLease("tab-a", 1_000, 2_000);

  assert.deepEqual(lease, {
    tabId: "tab-a",
    ownerId: "tab-a",
    expiresAt: 3_000,
  });
  assert.equal(isActiveTabLeaseValid(lease, 2_999), true);
  assert.equal(isActiveTabLeaseValid(lease, 3_000), false);
  assert.equal(isActiveTabLeaseOwnedBy(lease, "tab-a"), true);
});

test("clearActiveTabLeaseIfOwned only clears the current owner", () => {
  const storage = new MemoryStorage();
  const lease = createActiveTabLease("tab-a", 1_000, 2_000);
  writeActiveTabLease(storage, lease);

  clearActiveTabLeaseIfOwned(storage, "tab-b");
  assert.deepEqual(readActiveTabLease(storage), lease);

  clearActiveTabLeaseIfOwned(storage, "tab-a");
  assert.equal(readActiveTabLease(storage), null);
});

test("duplicated session tab IDs are isolated by owner IDs", () => {
  const storage = new MemoryStorage();
  const lease = createActiveTabLease(
    "duplicated-tab-id",
    1_000,
    2_000,
    "owner-a",
  );

  writeActiveTabLease(storage, lease);

  clearActiveTabLeaseIfOwned(storage, "owner-b");
  assert.deepEqual(readActiveTabLease(storage), lease);
  assert.equal(
    isActiveTabLeaseOwnedBy(readActiveTabLease(storage), "owner-a"),
    true,
  );
  assert.equal(
    isActiveTabLeaseOwnedBy(readActiveTabLease(storage), "owner-b"),
    false,
  );

  clearActiveTabLeaseIfOwned(storage, "owner-a");
  assert.equal(readActiveTabLease(storage), null);
});

test("active tab leases can be isolated with app-specific storage keys", () => {
  const storage = new MemoryStorage();
  const copilotLease = createActiveTabLease("copilot-tab", 1_000, 2_000);
  const beehiveLease = createActiveTabLease("beehive-tab", 1_000, 2_000);

  writeActiveTabLease(storage, copilotLease, "copilot-active-tab");
  writeActiveTabLease(storage, beehiveLease, "beehive-active-tab");

  assert.deepEqual(
    readActiveTabLease(storage, "copilot-active-tab"),
    copilotLease,
  );
  assert.deepEqual(
    readActiveTabLease(storage, "beehive-active-tab"),
    beehiveLease,
  );

  clearActiveTabLeaseIfOwned(storage, "copilot-tab", "copilot-active-tab");

  assert.equal(readActiveTabLease(storage, "copilot-active-tab"), null);
  assert.deepEqual(
    readActiveTabLease(storage, "beehive-active-tab"),
    beehiveLease,
  );
});
