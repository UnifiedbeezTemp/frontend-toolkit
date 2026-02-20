import { IconDescriptor } from "../types/iconDescriptor";

// ─── CRM Icons ──────────────────────────────────────────────────────
import DollarIcon from "../assets/icons/DollarIcon";
import DotPointsIcon from "../assets/icons/DotPointsIcon";
import TaskCheckIcon from "../assets/icons/TaskCheckIcon";
import { UsersGroupAltIcon } from "../assets/icons/UsersGroupAltIcon";
import BuildingSegmentsIcon from "../assets/icons/BuildingSegmentsIcon";
import SubscriptionIcon from "../assets/icons/SubscriptionIcon";
import RulesIcon from "../assets/icons/RulesIcon";
import OfficeBuildingIcon from "../assets/icons/OfficeBuildingIcon";

// ─── Contact Icons ──────────────────────────────────────────────────
import { UserIcon } from "../assets/icons/UserIcon";
import TagIcon from "../assets/icons/TagIcon";
import { TargetIcon } from "../assets/icons/TargetIcon";

// ─── Sending Icons ──────────────────────────────────────────────────
import MailIcon from "../assets/icons/MailIcon";
import WhatsAppIcon from "../assets/icons/WhatsAppIcon";
import MessageDotsIcon from "../assets/icons/MessageDotsIcon";
import PIcon from "../assets/icons/PIcon";

// ─── Workflow Icons ─────────────────────────────────────────────────
import HourglassIcon from "../assets/icons/HourglassIcon";
import SitemapIcon from "../assets/icons/SitemapIcon";
import BeezoraCreateIcon from "../assets/icons/BeezoraCreateIcon";
import TimesIcon from "../assets/icons/TimesIcon";
import { LinkIcon } from "../assets/icons/LinkIcon";
import DatabaseIcon from "../assets/icons/DatabaseIcon";
import { ReplyArrowReverseIcon } from "../assets/icons/ReplyArrowReverseIcon";
import NotificationPlusIcon from "../assets/icons/NotificationPlusIcon";
import { TriggerIcon } from "../assets/icons/TriggerIcon";

// ─── Trigger Icons ──────────────────────────────────────────────────
import MailOpenIcon from "../assets/icons/MailOpenIcon";
import CursorClickIcon from "../assets/icons/CursorClickIcon";
import GlobeIcon from "../assets/icons/GlobeIcon";
import ReplyArrowIcon from "../assets/icons/ReplyArrowIcon";
import UserEditIcon from "../assets/icons/UserEditIcon";
import { UserCheckIcon } from "../assets/icons/UserCheckIcon";
import { FileCheckIcon } from "../assets/icons/FileCheckIcon";
import TextFieldFocusIcon from "../assets/icons/TextFieldFocusIcon";
import { BriefcaseIcon } from "../assets/icons/BriefcaseIcon";
import FormIcon from "../assets/icons/FormIcon";

// ─── Apps Icons ─────────────────────────────────────────────────────
import { AppsIcon } from "../assets/icons/AppsIcon";

/**
 * Universal icon map — keyed by entity ID.
 * Consolidates all per-page icon maps into a single source of truth.
 */
export const ENTITY_ICON_MAP: Record<string, IconDescriptor> = {
  // ── CRM ─────────────────────────────────────────────────────────
  "add-deal":                  { iconType: "component", component: DollarIcon, label: "Add deal" },
  "update-deal-title":         { iconType: "component", component: DollarIcon, label: "Update deal title" },
  "update-deal-status":        { iconType: "component", component: DollarIcon, label: "Update deal status" },
  "update-deal-owner":         { iconType: "component", component: UsersGroupAltIcon, label: "Update deal owner" },
  "update-deal-value":         { iconType: "component", component: DollarIcon, label: "Update deal value" },
  "update-deal-stage":         { iconType: "component", component: BuildingSegmentsIcon, label: "Update deal stage" },
  "update-deal-custom-fields": { iconType: "component", component: DollarIcon, label: "Update deal custom fields" },
  "add-deal-task":             { iconType: "component", component: DotPointsIcon, label: "Add deal task" },
  "add-deal-note":             { iconType: "component", component: SubscriptionIcon, label: "Add deal note" },
  "complete-deal-task":        { iconType: "component", component: TaskCheckIcon, label: "Complete deal task" },
  "adjust-deal-score":         { iconType: "component", component: RulesIcon, label: "Adjust deal score" },
  "update-account-field":      { iconType: "component", component: OfficeBuildingIcon, label: "Update account field" },
  "update-account-owner":      { iconType: "component", component: OfficeBuildingIcon, label: "Update account owner" },
  "add-contact-to-account":    { iconType: "component", component: OfficeBuildingIcon, label: "Add contact to account" },
  "add-account-note":          { iconType: "component", component: SubscriptionIcon, label: "Add account note" },

  // ── Contacts ────────────────────────────────────────────────────
  "subscribe-to-list":       { iconType: "component", component: DotPointsIcon, label: "Subscribe to list" },
  "unsubscribe-from-list":   { iconType: "component", component: DotPointsIcon, label: "Unsubscribe from list" },
  "trigger-conversion":      { iconType: "component", component: TargetIcon, label: "Trigger conversion" },
  "update-contact":          { iconType: "component", component: UserIcon, label: "Update contact" },
  "add-tag":                 { iconType: "component", component: TagIcon, label: "Add tag" },
  "remove-tag":              { iconType: "component", component: TagIcon, label: "Remove tag" },
  "add-contact-note":        { iconType: "component", component: SubscriptionIcon, label: "Add contact note" },
  "adjust-contact-score":    { iconType: "component", component: RulesIcon, label: "Adjust contact score" },

  // ── Sending ─────────────────────────────────────────────────────
  "send-email":              { iconType: "component", component: MailIcon, label: "Send email" },
  "whatsapp-flow":           { iconType: "component", component: WhatsAppIcon, label: "WhatsApp flow" },
  "send-1-1-email":          { iconType: "component", component: MailIcon, label: "Send 1:1 email" },
  "transactional-email":     { iconType: "component", component: PIcon, label: "Transactional email", color: "text-brand-primary" },
  "send-sms":                { iconType: "component", component: MessageDotsIcon, label: "Send SMS" },
  "notification-email":      { iconType: "component", component: MailIcon, label: "Notification email", color: "text-error" },
  "site-message":            { iconType: "component", component: MessageDotsIcon, label: "Site message" },

  // ── Workflow ────────────────────────────────────────────────────
  "wait":                    { iconType: "component", component: HourglassIcon, label: "Wait" },
  "smart-rules":             { iconType: "component", component: SitemapIcon, label: "Smart rules" },
  "split":                   { iconType: "component", component: TriggerIcon, label: "Split" },
  "go-to":                   { iconType: "component", component: ReplyArrowReverseIcon, label: "Go to" },
  "jump-to":                 { iconType: "component", component: ReplyArrowReverseIcon, label: "Jump to" },
  "start-automation":        { iconType: "component", component: NotificationPlusIcon, label: "Start automation" },
  "end-automation":          { iconType: "component", component: TimesIcon, label: "End automation" },
  "webhook":                 { iconType: "component", component: LinkIcon, label: "Webhook" },
  "beebot-prompt":           { iconType: "component", component: BeezoraCreateIcon, label: "Beebot prompt" },
  "format-data":             { iconType: "component", component: DatabaseIcon, label: "Format data" },

  // ── Triggers ────────────────────────────────────────────────────
  "subscribes-to-list":      { iconType: "component", component: DotPointsIcon, label: "Subscribes to list" },
  "submits-form":            { iconType: "component", component: FormIcon, label: "Submits form" },
  "opens-reads-email":       { iconType: "component", component: MailOpenIcon, label: "Opens/reads email" },
  "click-link-in-email":     { iconType: "component", component: CursorClickIcon, label: "Click link in email" },
  "webpage-visited":         { iconType: "component", component: GlobeIcon, label: "Webpage visited" },
  "event-recorded":          { iconType: "component", component: CursorClickIcon, label: "Event recorded" },
  "shares-email":            { iconType: "component", component: ReplyArrowIcon, label: "Shares email" },
  "forward-email":           { iconType: "component", component: ReplyArrowIcon, label: "Forward email" },
  "replies-email":           { iconType: "component", component: ReplyArrowReverseIcon, label: "Replies email" },
  "tag-added":               { iconType: "component", component: TagIcon, label: "Tag added" },
  "click-link-email":        { iconType: "component", component: CursorClickIcon, label: "Click link email" },
  "tag-removed":             { iconType: "component", component: TagIcon, label: "Tag removed" },
  "contact-field-changes":   { iconType: "component", component: TextFieldFocusIcon, label: "Contact field changes" },
  "deal-field-changes":      { iconType: "component", component: TextFieldFocusIcon, label: "Deal field changes" },
  "account-field-changes":   { iconType: "component", component: TextFieldFocusIcon, label: "Account field changes" },
  "rss-based":               { iconType: "component", component: CursorClickIcon, label: "RSS based" },
  "dismisses-site-message":  { iconType: "component", component: CursorClickIcon, label: "Dismisses site message" },
  "conversion-occurs":       { iconType: "component", component: CursorClickIcon, label: "Conversion occurs" },
  "makes-purchase":          { iconType: "component", component: CursorClickIcon, label: "Makes purchase" },
  "enters-pipeline":         { iconType: "component", component: CursorClickIcon, label: "Enters pipeline" },
  "deal-stage-changes":      { iconType: "component", component: CursorClickIcon, label: "Deal stage changes" },
  "deal-status-changes":     { iconType: "component", component: CursorClickIcon, label: "Deal status changes" },
  "deal-status-changed":     { iconType: "component", component: CursorClickIcon, label: "Deal status changed" },
  "deal-value-changes":      { iconType: "component", component: BriefcaseIcon, label: "Deal value changes" },
  "deal-owner-changes":      { iconType: "component", component: UserEditIcon, label: "Deal owner changes" },
  "contact-owner-changes":   { iconType: "component", component: UserEditIcon, label: "Contact owner changes" },
  "contact-jumped-to":       { iconType: "component", component: UserCheckIcon, label: "Contact jumped to" },
  "file-downloaded":         { iconType: "component", component: FileCheckIcon, label: "File downloaded" },
  "whatsapp-flow-completed": { iconType: "component", component: WhatsAppIcon, label: "WhatsApp flow completed" },
  "task-completed":          { iconType: "component", component: TaskCheckIcon, label: "Task completed" },
  "file-is-downloaded":      { iconType: "component", component: CursorClickIcon, label: "File is downloaded" },

  // ── Apps (default) ──────────────────────────────────────────────
  "default-app":             { iconType: "component", component: AppsIcon, label: "App" },

  // ── Comment mention entities ────────────────────────────────────
  "action_send_message":       { iconType: "component", component: MessageDotsIcon, label: "Send a message" },
  "trigger_subscribe_list":    { iconType: "component", component: DotPointsIcon, label: "Subscribes to a list" },
  "action_wait":               { iconType: "component", component: HourglassIcon, label: "Wait" },
};

/** Default fallback icon descriptor */
export const DEFAULT_ICON: IconDescriptor = {
  iconType: "component",
  component: DotPointsIcon,
  label: "Default",
};

/**
 * Resolve an entity ID to its IconDescriptor.
 * Falls back to DEFAULT_ICON if not found.
 */
export function getEntityIcon(entityId: string): IconDescriptor {
  return ENTITY_ICON_MAP[entityId] ?? DEFAULT_ICON;
}
