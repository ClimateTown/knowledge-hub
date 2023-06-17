export interface Resource {
  title: string;
  description: string;
  url: string;
  tags: Tag[];
  og_preview: string | undefined;
}

export interface Tag {
  name: string;
  color?: string;
}

export interface Channel {
  channelId: string;
  channelSubCount: number;
}

export interface ChannelFilterItem { 
  channelId: string;
  active: boolean;
}

export interface Video {
  channelId: string;
  [key: string]: any;
}