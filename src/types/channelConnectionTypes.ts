//any coz there is litrally no way to know what all the configiration types are as this flow will be changed during integration

export interface ChannelConnection {
  id: string;
  channelId: string;
  name: string;
  configuration: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelConnectionFormData {
  [key: string]: any;
}

