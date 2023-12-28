import Fuse from "fuse.js"
import type { FilterOption, Resource, YoutubeChannel } from "./interfaces"

/**
 * format subcount for user display
 * @param {number} number
 * @returns {string}
 */
export const semanticNumber = (number: number): string => {
  // number less than 1000
  if (number < 1000) {
    return number.toString()
  }
  // number between 1k and 1M
  else if (number >= 1000 && number < 1000000) {
    return `${(number / 1000).toFixed(0)}k`
  }
  // number between 1M and 1B
  else if (number >= 1000000 && number < 1_000000000) {
    return `${(number / 1000000).toFixed(1)}M`
  } else {
    return ">1B"
  }
}

/**
 * channels sorted by subcount, climate town always first
 * @param {YoutubeChannel} a
 * @param {YoutubeChannel} b
 * @returns {number} sort
 */
export const sortChannelBySubCount = (
  a: YoutubeChannel,
  b: YoutubeChannel
): number => {
  const ClimateTownChannelId = "UCuVLG9pThvBABcYCm7pkNkA"

  if (a.channelId === ClimateTownChannelId) {
    return -1
  }
  if (b.channelId === ClimateTownChannelId) {
    return 1
  }

  // Normal sort
  return b.channelSubCount - a.channelSubCount
}

/**
 * Given a channel ID, return the channel data from the array
 * @param {YoutubeChannel[]} channelData
 * @param {string} channelId
 * @returns found channel data
 */
export const getChannelData = (
  channelData: YoutubeChannel[],
  channelId: string
): YoutubeChannel | undefined => {
  return channelData.find((channel) => channel.channelId === channelId)
}

/**
 * compare sets and return a new set with any found matches
 * @param {Set<any>} set1
 * @param {Set<any>} set2
 * @returns new Set
 */
export const setIntersection = (set1: Set<any>, set2: Set<any>) => {
  let intersection = new Set()
  for (let element of set2) {
    if (set1.has(element)) {
      intersection.add(element)
    }
  }
  return intersection
}

/**
 * get set of active tag names
 * @param {FilterOption[]} filterOptions
 * @returns {Set<string>} tag names
 */
export const activeTagsSet = (filterOptions: FilterOption[]) => {
  const filterTags: Set<string> = new Set(
    filterOptions
      .filter((option: FilterOption) => option.active === true)
      .map((option: FilterOption) => option.name)
  )
  return filterTags
}

/**
 * Load tag names from URL into filter object.
 * @param {string} querytagNames list of comma separate tag names
 * @param {FilterOption[]} filterObject tag options obj array
 * @returns {FilterOption[]} updated filterObject with active true on tag name matches
 */
export const tagQParamSetActive = (
  querytagNames: string,
  filterObject: FilterOption[]
): FilterOption[] => {
  const tagNames = querytagNames.split(",")

  return filterObject.map((option) => {
    // Remove emoji from option, and compare to URL (which has no emoji)
    option.active = tagNames.includes(removeEmojisFromStr(option.name))
    return option
  })
}

/**
 * update the url params with the record
 * and replace the state in history api
 * @param {Record<string, string> | undefined} values
 */
export const replaceStateWithQuery = (
  values: Record<string, string> | undefined
) => {
  const url = new URL(window.location.toString())
  if (values) {
    // Clear URL of filter settings
    for (let k of url.searchParams.keys()) {
      url.searchParams.delete(k)
    }

    for (let [k, v] of Object.entries(values)) {
      if (!!v) {
        url.searchParams.set(k, v)
      }
    }
  }
  history.replaceState(history.state, "", url)
}

/**
 * init Fuse with options and run search with provided term
 * @param {string} searchTerm
 * @param {Resource[]} resourceList
 * @returns {Resource[]} filtered resources
 */
export const filterByQuery = (
  searchTerm: string,
  resourceList: Resource[]
): Resource[] => {
  const options = {
    includeScore: true,
    threshold: 0.25,
    keys: ["description", "title"],
  }

  const fuse = new Fuse(resourceList, options)

  const results = fuse.search(searchTerm)

  return results.map((result) => {
    return result.item
  })
}

/**
 * remove emojis from given string
 * @param {string} str
 * @returns {string}
 */
export const removeEmojisFromStr = (str: string): string => {
  return str.replace(/[\u1000-\uFFFF]+/g, "").trim()
}

/**
 * check if the string contains emojis
 * @param {string} str
 * @returns {boolean}
 */
export const hasEmoji = (str: string) => {
  return /[\u1000-\uFFFF]+/g.test(str)
}

/**
 * sort strings by emoji first then alphabetical
 * @param {string} a
 * @param {string} b
 * @returns
 */
export const sortAlphabeticallyEmojisFirst = (a: string, b: string) => {
  if (hasEmoji(a) && hasEmoji(b)) {
    const aWithoutEmojis = removeEmojisFromStr(a)
    const bWithoutEmojis = removeEmojisFromStr(b)

    return aWithoutEmojis.localeCompare(bWithoutEmojis)
  }

  return a.localeCompare(b)
}

/**
 * convert the tag set to a comman separated list, removing emojis
 * @param {Set<string>} filterTags
 * @returns {string} comma separated tag list
 */
export const tagsForURLParam = (filterTags: Set<string>): string => {
  return Array.from(filterTags)
    .map((str) => removeEmojisFromStr(str))
    .join(",")
}
