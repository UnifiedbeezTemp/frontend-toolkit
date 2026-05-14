"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const activeTabLock_1 = require("../../src/hooks/activeTabLock");
class MemoryStorage {
    state = new Map();
    getItem(key) {
        return this.state.get(key) ?? null;
    }
    setItem(key, value) {
        this.state.set(key, value);
    }
    removeItem(key) {
        this.state.delete(key);
    }
}
(0, node_test_1.default)("readActiveTabLease ignores malformed storage data", () => {
    const storage = new MemoryStorage();
    storage.setItem(activeTabLock_1.ACTIVE_TAB_STORAGE_KEY, "{bad json");
    strict_1.default.equal((0, activeTabLock_1.readActiveTabLease)(storage), null);
    strict_1.default.equal((0, activeTabLock_1.parseActiveTabLease)('{"tabId":1}'), null);
});
(0, node_test_1.default)("parseActiveTabLease supports legacy leases without owner IDs", () => {
    strict_1.default.deepEqual((0, activeTabLock_1.parseActiveTabLease)('{"tabId":"tab-a","expiresAt":3000}'), {
        tabId: "tab-a",
        ownerId: "tab-a",
        expiresAt: 3000,
    });
});
(0, node_test_1.default)("createActiveTabLease produces a valid lease until expiry", () => {
    const lease = (0, activeTabLock_1.createActiveTabLease)("tab-a", 1_000, 2_000);
    strict_1.default.deepEqual(lease, {
        tabId: "tab-a",
        ownerId: "tab-a",
        expiresAt: 3_000,
    });
    strict_1.default.equal((0, activeTabLock_1.isActiveTabLeaseValid)(lease, 2_999), true);
    strict_1.default.equal((0, activeTabLock_1.isActiveTabLeaseValid)(lease, 3_000), false);
    strict_1.default.equal((0, activeTabLock_1.isActiveTabLeaseOwnedBy)(lease, "tab-a"), true);
});
(0, node_test_1.default)("clearActiveTabLeaseIfOwned only clears the current owner", () => {
    const storage = new MemoryStorage();
    const lease = (0, activeTabLock_1.createActiveTabLease)("tab-a", 1_000, 2_000);
    (0, activeTabLock_1.writeActiveTabLease)(storage, lease);
    (0, activeTabLock_1.clearActiveTabLeaseIfOwned)(storage, "tab-b");
    strict_1.default.deepEqual((0, activeTabLock_1.readActiveTabLease)(storage), lease);
    (0, activeTabLock_1.clearActiveTabLeaseIfOwned)(storage, "tab-a");
    strict_1.default.equal((0, activeTabLock_1.readActiveTabLease)(storage), null);
});
(0, node_test_1.default)("duplicated session tab IDs are isolated by owner IDs", () => {
    const storage = new MemoryStorage();
    const lease = (0, activeTabLock_1.createActiveTabLease)("duplicated-tab-id", 1_000, 2_000, "owner-a");
    (0, activeTabLock_1.writeActiveTabLease)(storage, lease);
    (0, activeTabLock_1.clearActiveTabLeaseIfOwned)(storage, "owner-b");
    strict_1.default.deepEqual((0, activeTabLock_1.readActiveTabLease)(storage), lease);
    strict_1.default.equal((0, activeTabLock_1.isActiveTabLeaseOwnedBy)((0, activeTabLock_1.readActiveTabLease)(storage), "owner-a"), true);
    strict_1.default.equal((0, activeTabLock_1.isActiveTabLeaseOwnedBy)((0, activeTabLock_1.readActiveTabLease)(storage), "owner-b"), false);
    (0, activeTabLock_1.clearActiveTabLeaseIfOwned)(storage, "owner-a");
    strict_1.default.equal((0, activeTabLock_1.readActiveTabLease)(storage), null);
});
(0, node_test_1.default)("active tab leases can be isolated with app-specific storage keys", () => {
    const storage = new MemoryStorage();
    const copilotLease = (0, activeTabLock_1.createActiveTabLease)("copilot-tab", 1_000, 2_000);
    const beehiveLease = (0, activeTabLock_1.createActiveTabLease)("beehive-tab", 1_000, 2_000);
    (0, activeTabLock_1.writeActiveTabLease)(storage, copilotLease, "copilot-active-tab");
    (0, activeTabLock_1.writeActiveTabLease)(storage, beehiveLease, "beehive-active-tab");
    strict_1.default.deepEqual((0, activeTabLock_1.readActiveTabLease)(storage, "copilot-active-tab"), copilotLease);
    strict_1.default.deepEqual((0, activeTabLock_1.readActiveTabLease)(storage, "beehive-active-tab"), beehiveLease);
    (0, activeTabLock_1.clearActiveTabLeaseIfOwned)(storage, "copilot-tab", "copilot-active-tab");
    strict_1.default.equal((0, activeTabLock_1.readActiveTabLease)(storage, "copilot-active-tab"), null);
    strict_1.default.deepEqual((0, activeTabLock_1.readActiveTabLease)(storage, "beehive-active-tab"), beehiveLease);
});
