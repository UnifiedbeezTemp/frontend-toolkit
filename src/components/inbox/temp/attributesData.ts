import { AttributeSection } from "../types";

export const attributesData: AttributeSection[] = [
  {
    id: 'contacts',
    title: 'Contacts',
    icon: 'User',
    defaultExpanded: true,
    fields: [
      { id: 'internal-name', icon: 'User', label: 'Internal name', value: 'Bfake', type: 'text' },
      { id: 'first-name', icon: 'FileText', label: 'First name', value: 'Sirio', type: 'text' },
      { id: 'last-name', icon: 'FileText', label: 'Last name', value: 'Sirio', type: 'text' },
      { id: 'email', icon: 'Mail', label: 'Email', value: 'tradevan@gmail.com', type: 'text' },
      { id: 'phone', icon: 'Phone', label: 'Phone number', value: 'Enter', type: 'text' },
      { id: 'gender', icon: 'User', label: 'Gender', value: 'Male', type: 'dropdown', hasDropdown: true },
      { id: 'company', icon: 'Building2', label: 'Company', value: 'Enter', type: 'text' },
      { 
        id: 'conversation-access', 
        icon: 'Users', 
        label: 'Conversation Access', 
        value: ['A', 'B', 'C', 'D'], 
        type: 'avatarGroup',
        avatars: ['A', 'B', 'C', 'D'],
        avatarCount: 4,
        hasDropdown: true
      },
    ],
  },
  {
    id: 'conversations',
    title: 'Conversations',
    icon: 'MessageSquare',
    defaultExpanded: false,
    fields: [
      { id: 'status', icon: 'Circle', label: 'Status', value: 'Pending', type: 'dropdown', hasDropdown: true },
      { id: 'channel', icon: 'Hash', label: 'Channel', value: 'Sirio', type: 'text' },
      { id: 'priority', icon: 'Flag', label: 'Priority', value: 'Urgent', type: 'badge', badgeVariant: 'urgent', hasDropdown: true },
      { id: 'sla', icon: 'Calendar', label: 'SLA Due', value: 'Jan 6, 2022 - Jan 15, 2022', type: 'dateRange' },
      { id: 'tag', icon: 'Tag', label: 'Tag', value: 'Window shopper', type: 'tag', badgeVariant: 'info', hasDropdown: true },
      { id: 'team', icon: 'Users', label: 'Team', value: 'YugoNations', type: 'dropdown', hasDropdown: true },
    ],
  },
  {
    id: 'team',
    title: 'Team',
    icon: 'Users',
    defaultExpanded: false,
    fields: [
      { 
        id: 'owner', 
        icon: 'User', 
        label: 'Owner', 
        value: ['A', 'B', 'C', 'D'], 
        type: 'avatarGroup',
        avatars: ['A', 'B', 'C', 'D'],
        avatarCount: 4,
        hasDropdown: true
      },
      { id: 'visibility', icon: 'Eye', label: 'Visibility', value: 'Organization-wide', type: 'dropdown', hasDropdown: true },
      { id: 'allowed-read', icon: 'BookOpen', label: 'Allowed read', value: 'Viewer', type: 'dropdown', hasDropdown: true },
      { id: 'escalation', icon: 'AlertCircle', label: 'Escalation group', value: 'Team', type: 'dropdown', hasDropdown: true },
    ],
  },
  {
    id: 'groups',
    title: 'Groups',
    icon: 'Users',
    defaultExpanded: false,
    fields: [
      { id: 'group-name', icon: 'Users', label: 'Group name', value: 'Bfake', type: 'text' },
      { id: 'description', icon: 'FileText', label: 'Description', value: 'Aliquam nisi massa, interdum blandit porttitor sit amet, ultrices conseq etur ipsum...', type: 'text' },
      { 
        id: 'members', 
        icon: 'Users', 
        label: 'Members', 
        value: ['A', 'B', 'C', 'D'], 
        type: 'avatarGroup',
        avatars: ['A', 'B', 'C', 'D'],
        avatarCount: 4,
        hasDropdown: true
      },
      { 
        id: 'moderators', 
        icon: 'Shield', 
        label: 'Moderators', 
        value: ['A', 'B', 'C', 'D'], 
        type: 'avatarGroup',
        avatars: ['A', 'B', 'C', 'D'],
        avatarCount: 4,
        hasDropdown: true
      },
      { id: 'visibility-group', icon: 'Eye', label: 'Visibility', value: 'Organization-wide', type: 'dropdown', hasDropdown: true },
      { id: 'join-link', icon: 'Link', label: 'Join Link', value: 'Copy link', type: 'link', linkText: 'Copy link' },
      { id: 'history-settings', icon: 'Settings', label: 'History settings', value: true, type: 'toggle' },
    ],
  },
];
