export interface Tab {
  name: string;
  iconActive: string;
  iconInactive: string;
  isDynamic?: boolean;
  subTabs?: string[];
}

export const getTabsList = (icons: {
  profileActive: string;
  profileInactive: string;
  preferenceActive: string;
  preferenceInactive: string;
  notificationsActive: string;
  notificationsInactive: string;
  securityActive: string;
  securityInactive: string;
  channelsActive: string;
  channelsInactive: string;
  teamActive: string;
  teamInactive: string;
}): Tab[] => [
  {
    name: "Profile",
    iconActive: icons.profileActive,
    iconInactive: icons.profileInactive,
  },
  {
    name: "Plans & billings",
    iconActive: icons.mastercard,
    iconInactive: icons.mastercard,
    isDynamic: true,
    subTabs: ["Your Plan", "Invoice", "Budget", "Credit"],
  },
  {
    name: "Preference",
    iconActive: icons.preferenceActive,
    iconInactive: icons.preferenceInactive,
  },
  {
    name: "Notifications",
    iconActive: icons.notificationsActive,
    iconInactive: icons.notificationsInactive,
  },
  {
    name: "Security",
    iconActive: icons.securityActive,
    iconInactive: icons.securityInactive,
  },
  {
    name: "Channels",
    iconActive: icons.channelsActive,
    iconInactive: icons.channelsInactive,
  },
  {
    name: "Team",
    iconActive: icons.teamActive,
    iconInactive: icons.teamInactive,
  },
];
