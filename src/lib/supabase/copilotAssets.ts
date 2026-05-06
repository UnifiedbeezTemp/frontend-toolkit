import { getAssetUrl } from "./assetUrl";

export const COPILOT_ASSET_PATHS = {
  beezoraDP: "/icons/beezora-dp.png",
  beeZoraWelcome: "icons/beeZoraWelcome.svg",
  bulb: "icons/bulb.svg",
  check: "icons/checkbox-base.svg",
  checkMark: "icons/check-white.svg",
  chevronDown: "icons/chevron-down-grey.svg",
  chatBg: "images/chat-bg.svg",
  close: "icons/x-close.svg",
  copilotSidebarBg: "copilot/copilotSidebarBg.svg",
  copilotSidebarOne: "copilot/copilotSidebarOne.gif",
  copilotSidebarTwo: "copilot/copilotSidebarTwo.gif",
  copilotSidebarThree: "copilot/copilotSidebarThree.gif",
  copilotSidebarFour: "copilot/copilotSidebarFour.gif",
  copilotSidebarFive: "copilot/copilotSidebarFive.gif",
  copilotSidebarSix: "copilot/copilotSidebarSix.gif",
  editPen: "icons/edit-01.svg",
  arrowRight1: "icons/arrow-right1.svg",
  logoutRed: "icons/material-symbols_logout_red.svg",
  plus: "icons/plus.svg",
  send: "icons/send.svg",
  tablerEdit: "icons/tabler_edit.svg",
  trashRed: "icons/trash-01.svg",
  xCancelRed: "icons/x.svg",
} as const;

export type CopilotAssetKey = keyof typeof COPILOT_ASSET_PATHS;

export function getCopilotAssetUrl(key: CopilotAssetKey): string {
  return getAssetUrl(COPILOT_ASSET_PATHS[key]);
}
