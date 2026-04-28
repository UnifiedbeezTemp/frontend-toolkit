export interface WebchatLanguageConfigDto {
  id: number;
  webchatConfigId: number;
  languageCode: string;
  languageName: string;
  isActive: boolean;
  displayOrder: number;
  content: string | null;
  greeting: string | null;
}

export interface WebchatContentLocalizationDto {
  id: number;
  webchatConfigId: number;
  languageCode: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebchatLiveChatDto {
  id: number;
  webchatConfigId: number;
  liveChatConfigId: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  liveChatConfig: {
    id: number;
    chatName: string;
    profilePic: string | null;
    isActive: boolean;
  };
}

export interface WebchatConfigDto {
  id: number;
  websiteUrl: string;
  connectedChannelId: number;
  aiAssistantId: number;
  emailAddresses: string[] | null;
  phoneNumbers: string[] | null;
  chatIcon: string | null;
  bubbleColor: string;
  textColor: string;
  greetingText: string | null;
  greetingLanguage: string;
  backgroundType: "SOLID" | "GRADIENT";
  backgroundColor: string;
  backgroundGradient: {
    start: string;
    end: string;
    direction: string;
  } | null;
  alignment: "LEFT" | "RIGHT";
  distanceFromRight: number;
  distanceFromBottom: number;
  teamMemberAccess: { id: number; email: string; fullName: string }[];
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
  languages: string[] | null;
  localizedContent: unknown | null;
  languageConfigs?: WebchatLanguageConfigDto[];
  contentLocalizations?: WebchatContentLocalizationDto[];
  createdAt: string;
  updatedAt: string;
  aiAssistant?: {
    id: number;
    name: string;
    tone: string;
    style: string;
  };
  connectedChannel?: {
    id: number;
    userId: number;
    availableChannelId: number;
    channelName: string;
    isActive: boolean;
    isConnected: boolean;
  };
  communicationLabels?: CommunicationLabel[];
  liveChats?: WebchatLiveChatDto[];
  directChannels?: DirectChannelItem[];
  directLinks?: DirectLinkItem[];
}

export interface DirectLinkItem {
  id: number;
  webchatConfigId: number;
  linkType: "WEBSITE" | "EMAIL" | "PHONE";
  icon: string;
  text: string;
  websiteUrl: string | null;
  emailAddress: string | null;
  phoneNumber: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  type?: "link";
}

export interface DirectChannelItem {
  id: number;
  webchatConfigId: number;
  accountType: string;
  accountId: number;
  displayName: string;
  icon: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  type?: "channel";
}

export interface LabelLinkItem {
  type: "link";
  id: number;
  displayOrder: number;
  linkType: "WEBSITE" | "EMAIL" | "PHONE";
  icon: string;
  text: string;
  websiteUrl: string | null;
  emailAddress: string | null;
  phoneNumber: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LabelChannelItem {
  type: "channel";
  id: number;
  displayOrder: number;
  accountType?: string;
  accountId?: number;
  connectedChannelId?: number;
  displayName: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LabelItem = LabelLinkItem | LabelChannelItem;

export interface CommunicationLabel {
  id: number;
  webchatConfigId: number;
  name: string;
  displayOrder: number;
  showCtaButton: boolean;
  ctaButtonText: string;
  ctaButtonLink: string;
  items: LabelItem[];
}

export interface CreateLabelPayload {
  name: string;
  showCtaButton: boolean;
  ctaButtonText: string;
  ctaButtonLink: string;
  displayOrder: number;
}

export interface UpdateLabelPayload {
  name?: string;
  showCtaButton?: boolean;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  displayOrder?: number;
}

export interface CreateLabelLinkPayload {
  linkType: "WEBSITE" | "EMAIL" | "PHONE";
  icon: string;
  text: string;
  websiteUrl?: string;
  emailAddress?: string;
  phoneNumber?: string;
  displayOrder?: number;
}

export interface LocalizedContent {
  [language: string]: {
    title?: string;
    body?: string;
  };
}

export interface UpdateWebchatConfigPayload {
  websiteUrl?: string;
  chatIcon?: string;
  bubbleColor?: string;
  textColor?: string;
  greetingText?: string;
  greetingLanguage?: string;
  backgroundType?: "SOLID" | "TRANSPARENT" | "GRADIENT";
  backgroundColor?: string;
  backgroundGradient?: {
    start: string;
    end: string;
    direction: string;
  };
  alignment?: "LEFT" | "RIGHT";
  distanceFromRight?: number;
  distanceFromBottom?: number;
  teamMemberAccess?: number[];
  profilePic?: string;
  introduceTeam?: boolean;
  widgetBgColor?: string;
  widgetFontColor?: string;
  avatarPhoto?: string;
  removeUnifiedBeezLogo?: boolean;
  defaultLanguage?: string;
}

export interface WebchatEmbedResponse {
  embedCode: string;
}

export interface SendInstructionsByEmailPayload {
  emails: string[];
}

export interface SendInstructionsToTeamPayload {
  teamMemberIds: number[];
}

export interface CreateLanguagePayload {
  languageCode: string;
  languageName: string;
}

export interface CreateLocalizationPayload {
  languageCode: string;
  title: string;
  body: string;
}

export interface InstallScriptResponse {
  scriptUrl: string;
  embedCode: string;
}

export interface VerifyInstallationResponse {
  verified: boolean;
  message: string;
}
