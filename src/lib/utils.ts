import type { YoutubeChannel } from "./interfaces";

/**
 * format subcount for user display
 * @param number 
 * @returns 
 */
export const semanticNumber = (number: number): string => {
    // number less than 1000
    if (number < 1000) {
        return number.toString();
    }
    // number between 1k and 1M
    else if (number >= 1000 && number < 1000000) {
        return `${(number / 1000).toFixed(0)}k`;
    }
    // number between 1M and 1B
    else if (number >= 1000000 && number < 1_000000000) {
        return `${(number / 1000000).toFixed(1)}M`;
    } else {
        return ">1B";
    }
}

/**
 * channels sorted by subcount, climate town always first
 * @param a YoutubeChannel
 * @param b YoutubeChannel
 * @returns sort number
 */
export const sortChannelBySubCount = (a: YoutubeChannel, b: YoutubeChannel): number => {
    const ClimateTownChannelId = "UCuVLG9pThvBABcYCm7pkNkA";

    if (a.channelId === ClimateTownChannelId) {
        return -1;
    }
    if (b.channelId === ClimateTownChannelId) {
        return 1;
    }

    // Normal sort
    return b.channelSubCount - a.channelSubCount;
}

/**
 * Given a channel ID, return the channel data from the array
 * @param channelData YoutubeChannel[]
 * @param channelId string
 * @returns found channel data
 */
export const getChannelData = (channelData: YoutubeChannel[], channelId: string): YoutubeChannel | undefined => {
    return channelData.find((channel) => channel.channelId === channelId);
}

/**
 * compare sets and return a new set with any found matches
 * @param set1 Set<any>
 * @param set2 Set<any>
 * @returns new Set()
 */
export const setIntersection = (set1: Set<any>, set2: Set<any>) => {
    let intersection = new Set();
    for (let element of set2) {
      if (set1.has(element)) {
        intersection.add(element);
      }
    }
    return intersection;
  }