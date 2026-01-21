import React from "react"
import {
  AlertCircle,
  BookOpen,
  Building2,
  Calendar,
  Circle,
  Eye,
  FileText,
  Flag,
  Hash,
  Link,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  Shield,
  Tag,
  User,
  Users,
} from "lucide-react"

export type IconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { size?: number; color?: string }
>

export const Icons = {
  User: User,
  FileText: FileText,
  Mail: Mail,
  Phone: Phone,
  Building2: Building2,
  Users: Users,
  MessageSquare: MessageSquare,
  Circle: Circle,
  Hash: Hash,
  Flag: Flag,
  Calendar: Calendar,
  Tag: Tag,
  Eye: Eye,
  BookOpen: BookOpen,
  AlertCircle: AlertCircle,
  Shield: Shield,
  Link: Link,
  Settings: Settings,
} satisfies Record<string, IconComponent>

export type IconName = keyof typeof Icons
