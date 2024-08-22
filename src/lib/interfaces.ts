// Resources page
export interface Resource {
  title: string
  description: string
  url: string
  tags: Tag[]
  og_preview: string | undefined
}

export interface Tag {
  name: string
  color?: string
}

// YouTube page
export interface YoutubeChannel {
  channelId: string
  channelCustomName: string // e.g. "@notjustbikes"
  channelName: string // e.g. "Not Just Bikes"
  channelPic: string // e.g. "https://yt3.ggpht.com/5DBP22k02WIMvHgeoUj_Tt14Kh8u-oaAhYHQu1gXCoHuisGXnavb5k-ivpyffqIARNDzgpBbUw"
  channelPicH: number // e.g. 180 (for 180px)
  channelPicW: number // e.g. 320 (for 320px)
  channelSubCount: number
}

export interface YoutubeVideo {
  channelId: string
  publishedAt: string
  videoId: string
  title: string
  videoPic: string
  videoPicH: number // e.g. 180 (for 180px)
  videoPicW: number // e.g. 320 (for 320px)
}

export interface FilterOption extends Tag {
  count: number | string
  active: boolean
  id?: string
}

export type FilterLogic = "and" | "or"

export type CustomFilterEvent = {
  filter: { filterTags: Set<string>; filterLogic: FilterLogic }
}
