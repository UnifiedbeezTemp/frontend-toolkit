export interface Platform {
  id: string;
  name: string;
  icon: string;
}

export interface PlatformContent {
  description: string;
  features: string[];
  steps: string[];
  requirements: string[];
}

export interface PlatformGuideDetailProps {
  platform: Platform;
  content: PlatformContent;
}
