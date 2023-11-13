import { describe, expect, it } from "vitest"

import { getChannelData, semanticNumber, sortChannelBySubCount } from "./utils"
import type { YoutubeChannel } from "./interfaces"

describe("semanticNumber", () => {
  it("should convert number less than 1000 to string", () => {
    expect(semanticNumber(999)).toBe("999")
  })

  it("should convert number between 1000 to 1000000 divide by 1000 string appending 'k'", () => {
    expect(semanticNumber(120000)).toBe("120k")
  })

  it("should convert number between 1000000 to 1_000000000 divide by 1000000 string appending 'M'", () => {
    expect(semanticNumber(13000000)).toBe("13.0M")
  })

  it("should convert number over 1_000000000 to string '>1B'", () => {
    expect(semanticNumber(123049000000000)).toBe(">1B")
  })
})

describe("sortChannelBySubCount", () => {
  const ytList: YoutubeChannel[] = [
    {
      channelId: "UCuVLG9pThvBABcYCm7pkNkA",
      channelCustomName: "climate town",
      channelName: "climate town",
      channelPic: "",
      channelSubCount: 2,
    },
    {
      channelId: "UCuVLG9pThvG74cYCm7pkNkA",
      channelCustomName: "FAKE1",
      channelName: "FAKE1",
      channelPic: "",
      channelSubCount: 100,
    },
    {
      channelId: "UCuVLJKpThvBABcYCm7pkNkA",
      channelCustomName: "FAKE2",
      channelName: "FAKE2",
      channelPic: "",
      channelSubCount: 270,
    },
    {
      channelId: "UCuVLG9pThvG74cYCm7pLOkA",
      channelCustomName: "FAKE3",
      channelName: "FAKE3",
      channelPic: "",
      channelSubCount: 5,
    },
  ]

  it("should always sort climate town channel first", () => {
    const res = [...ytList].sort(sortChannelBySubCount)

    expect(res[0].channelName).toBe("climate town")
  })

  it("should sort channels by subscription count", () => {
    const res = [...ytList].sort(sortChannelBySubCount)

    expect(res[1].channelSubCount).toBe(270)
  })
})

describe("getChannelData", () => {
  const ytList: YoutubeChannel[] = [
    {
      channelId: "UCuVLG9pThvBABcYCm7pkNkA",
      channelCustomName: "climate town",
      channelName: "climate town",
      channelPic: "",
      channelSubCount: 2,
    },
    {
      channelId: "UCuVLG9pThvG74cYCm7pkNkA",
      channelCustomName: "FAKE1",
      channelName: "FAKE1",
      channelPic: "",
      channelSubCount: 100,
    },
  ]

  it("should find channel info my matching ID", () => {
    const res = getChannelData(ytList, "UCuVLG9pThvBABcYCm7pkNkA")

    expect(res?.channelName).toBe("climate town")
  })
})
