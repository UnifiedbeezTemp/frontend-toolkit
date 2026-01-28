import {
  Circle,
  Flag,
  Hash,
} from "lucide-react"
import BadgeCheckIcon from "../../../../assets/icons/BadgeCheckIcon";
import UserSquareIcon from "../../../../assets/icons/UserSquareIcon";
import MailIcon from "../../../../assets/icons/MailIcon";
import PhoneIcon from "../../../../assets/icons/PhoneIcon";
import TagIcon from "../../../../assets/icons/TagIcon";
import { LockIcon } from "../../../../assets/icons/LockIcon";
import NotesIcon from "../../../../assets/icons/NotesIcon";
import SettingsDrawerIcon from "../../../../assets/icons/SettingsDrawerIcon";
import { UsersGroupIcon } from "../../../../assets/icons/UsersGroupIcon";
import { BriefcaseIcon } from "../../../../assets/icons/BriefcaseIcon";
import { SmileyFaceIcon } from "../../../../assets/icons/SmileyFaceIcon";
import { ChatBubbleIcon } from "../../../../assets/icons/ChatBubbleIcon";
import { CalendarIcon } from "../../../../assets/icons/CalendarIcon";
import { EyeOpenIcon } from "../../../../assets/icons/EyeOpenIcon";
import { ChainLinkIcon } from "../../../../assets/icons/ChainLinkIcon";
import { TimeHistoryIcon } from "../../../../assets/icons/TimeHistoryIcon";
import { UsersDoubleIcon } from "../../../../assets/icons/UsersDoubleIcon";
import { FileCheckIcon } from "../../../../assets/icons/FileCheckIcon";
import { FilledChevronIcon } from "../../../../assets/icons/FilledChevronIcon";

export type IconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { size?: number; color?: string }
>

export const Icons = {
  User: UserSquareIcon,
  FileText: FileCheckIcon,
  Mail: MailIcon,
  Phone: PhoneIcon,
  Building2: BriefcaseIcon,
  Users: UsersDoubleIcon,
  MessageSquare: ChatBubbleIcon,
  Circle: Circle,
  Hash: Hash,
  Flag: Flag,
  Calendar: CalendarIcon,
  Tag: TagIcon,
  Eye: EyeOpenIcon,
  BookOpen: NotesIcon,
  AlertCircle: TimeHistoryIcon,
  Shield: LockIcon,
  Link: ChainLinkIcon,
  Settings: TimeHistoryIcon,
  BadgeCheckIcon: BadgeCheckIcon,
  Briefcase: BriefcaseIcon,
  SmileyFace: SmileyFaceIcon,
  UsersGroup: UsersGroupIcon,
  FilledChevron: FilledChevronIcon
} satisfies Record<string, IconComponent>

export type IconName = keyof typeof Icons
