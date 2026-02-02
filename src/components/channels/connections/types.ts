export interface BaseChannelConnection {
  id: number | string;
  connectedChannelId: number;
  isActive?: boolean;
  isConnected?: boolean;
}

export interface WebchatConnectionsResponse {
  webchats: WebchatConnection[];
}

export interface WebchatConnection extends BaseChannelConnection {
  websiteUrl: string;
  aiAssistantId: number | null;
  emailAddresses: string | null;
  phoneNumbers: string | null;
  chatIcon: string | null;
  bubbleColor: string;
  greetingText: string | null;
  greetingLanguage: string;
  backgroundType: string;
  backgroundColor: string;
  backgroundGradient: string | null;
  alignment: string;
  distanceFromRight: number;
  distanceFromBottom: number;
  teamMemberAccess: unknown[];
  profilePic: string | null;
  introduceTeam: boolean;
  widgetBgColor: string;
  widgetFontColor: string;
  displayWelcomeMsg: boolean;
  launcherIcon: string | null;
  launcherShape: string;
  launcherBgColor: string;
  launcherIconColor: string;
  launcherPosition: string;
  avatarPhoto: string | null;
  removeUnifiedBeezLogo: boolean;
  defaultLanguage: string;
  languages: unknown | null;
  localizedContent: unknown | null;
  createdAt: string;
  updatedAt: string;
  aiAssistant: unknown | null;
  connectedChannel: {
    id: number;
    userId: number;
    availableChannelId: number;
    channelName: string;
    isActive: boolean;
    isConnected: boolean;
    credentials: unknown;
    connectedAt: string;
    lastSyncAt: string | null;
    availableChannel: {
      id: number;
      name: string;
      displayName: string;
      description: string;
      category: string;
      channelType: string;
      isActive: boolean;
      comingSoon: boolean;
      requiresPlan: string[];
      requiresAddon: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
  communicationLabels: unknown[];
  languageConfigs: unknown[];
  contentLocalizations: unknown[];
}

export interface ConnectionDisplayData {
  id: string | number;
  title: string;
  subtitle?: string;
  isActive: boolean;
  isConnected: boolean;
  metadata?: Record<string, unknown>;
}

export interface ConnectionItemProps {
  connection: ConnectionDisplayData;
  isEditing: boolean;
  onEdit: () => void;
  onCancel?: () => void;
}

