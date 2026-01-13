
import React from "react"
import UserSquareIcon from "../../../../assets/icons/UserSquareIcon";
import { AlertCircleIcon, BookOpenIcon, Building2Icon, CalendarIcon, CircleIcon, EyeIcon, File, FlagIcon, HashIcon, MessageSquareIcon, SettingsIcon, ShieldIcon, UsersIcon } from "lucide-react";
import MailIcon from "../../../../assets/icons/MailIcon";
import PhoneIcon from "../../../../assets/icons/PhoneIcon";
import TagIcon from "../../../../assets/icons/TagIcon";
import LinkIcon from "../../../../assets/icons/LinkIcon";

export type IconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { size?: number; color?: string }
>

export const Icons = {
  User: UserSquareIcon,
  FileText: File,
  Mail: MailIcon,
  Phone: PhoneIcon,
  Building2: Building2Icon,
  Users: UsersIcon,
  MessageSquare: MessageSquareIcon,
  Circle: CircleIcon,
  Hash: HashIcon,
  Flag: FlagIcon,
  Calendar: CalendarIcon,
  Tag: TagIcon,
  Eye: EyeIcon,
  BookOpen: BookOpenIcon,
  AlertCircle: AlertCircleIcon,
  Shield: ShieldIcon,
  Link: LinkIcon,
  Settings: SettingsIcon,
} satisfies Record<string, IconComponent>

export type IconName = keyof typeof Icons
