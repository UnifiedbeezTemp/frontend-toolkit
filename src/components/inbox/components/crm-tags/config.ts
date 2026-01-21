import { Tag, CategoryId } from "../../types";
import { User, Target, MapPin, BarChart3, Zap } from "lucide-react";
import { CategoryConfigItem } from "./types";

export const CATEGORY_CONFIG: Record<CategoryId, CategoryConfigItem> = {
  'contact-type': {
    label: 'Contact Type',
    icon: User,
    headerIconColor: 'text-dark-base-70',
    pillColor: 'bg-input-filled',
    borderColor: 'border-input-stroke',
    textColor: 'text-dark-base-70',
  },
  'intent-action': {
    label: 'Intent & Action',
    icon: Target,
    headerIconColor: 'text-orange-100',
    pillColor: '',
    borderColor: '',
    textColor: 'text-orange-100',
  },
  'source-origin': {
    label: 'Source / Origin',
    icon: MapPin,
    headerIconColor: 'text-primary-blue-100',
    pillColor: '',
    borderColor: '',
    textColor: 'text-primary-blue-100',
  },
  'engagement-level': {
    label: 'Engagement Level',
    icon: BarChart3,
    headerIconColor: 'text-purple-110',
    pillColor: '',
    borderColor: '',
    textColor: 'text-purple-110',
  },
  'actions-behavior': {
    label: 'Actions & Behavior',
    icon: Zap,
    headerIconColor: 'text-dark-green-100',
    pillColor: '',
    borderColor: '',
    textColor: 'text-dark-green-100',
  }
};
