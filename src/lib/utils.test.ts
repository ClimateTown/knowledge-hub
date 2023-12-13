import { describe, expect, it } from "vitest"

import {
  getChannelData,
  semanticNumber,
  sortChannelBySubCount,
  removeEmojisFromStr,
  hasEmoji,
  sortAlphabeticallyEmojisFirst,
  activeTagsSet,
  tagQParamSetActive,
  tagsForURLParam,
} from "./utils"
import type { FilterOption, YoutubeChannel } from "./interfaces"

describe("YouTube Utilities", () => {
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

describe("Emoji Utilities", () => {
  describe("removeEmojisFromStr", () => {
    it("should remove emojis from a string", () => {
      expect(removeEmojisFromStr("Hello 👋")).toBe("Hello")
      expect(removeEmojisFromStr("😃 Smile")).toBe("Smile")
    })

    it("should return the same string if no emojis are present", () => {
      expect(removeEmojisFromStr("Just text")).toBe("Just text")
    })

    it("should handle empty strings", () => {
      expect(removeEmojisFromStr("")).toBe("")
    })
  })

  describe("hasEmoji", () => {
    it("should return true if string contains emojis", () => {
      expect(hasEmoji("Hello 👋")).toBe(true)
      expect(hasEmoji("😃 Smile")).toBe(true)
    })

    it("should return false if string does not contain emojis", () => {
      expect(hasEmoji("Just text")).toBe(false)
    })

    it("should handle empty strings", () => {
      expect(hasEmoji("")).toBe(false)
    })
  })

  describe("sortAlphabeticallyEmojisFirst", () => {
    it("should sort strings with emojis first", () => {
      const strings = ["Hello", "👋 Hi", "World"]
      expect(strings.sort(sortAlphabeticallyEmojisFirst)).toEqual([
        "👋 Hi",
        "Hello",
        "World",
      ])
    })

    it("should sort strings alphabetically when no emojis are present", () => {
      const strings = ["Banana", "Apple", "Cherry"]
      expect(strings.sort(sortAlphabeticallyEmojisFirst)).toEqual([
        "Apple",
        "Banana",
        "Cherry",
      ])
    })

    it("should sort correctly when both strings contain emojis", () => {
      const strings = ["🐱 Cat", "🐶 Dog"]
      expect(strings.sort(sortAlphabeticallyEmojisFirst)).toEqual([
        "🐱 Cat",
        "🐶 Dog",
      ])
    })
  })
})

describe("Tag Utilities", () => {
  const filterOptions: FilterOption[] = [
    {
      count: 10,
      active: false,
      name: "name-1",
    },
    {
      count: 7,
      active: false,
      name: "name-2",
    },
    {
      count: 2,
      active: true,
      name: "name-3",
    },
    {
      count: 5,
      active: false,
      name: "👋 name-4",
    },
  ]

  describe("activeTagsSet", () => {
    it("should return the names of active tags", () => {
      const expected = new Set<string>(["name-3"])
      const result = activeTagsSet(filterOptions)
      expect(result).toEqual(expected)
    })
  })

  describe("tagQParamSetActive", () => {
    it("should turn the filter option that name matches true, others false", () => {
      const expected = [
        {
          count: 10,
          active: false,
          name: "name-1",
        },
        {
          count: 7,
          active: true,
          name: "name-2",
        },
        {
          count: 2,
          active: false,
          name: "name-3",
        },
        {
          count: 5,
          active: false,
          name: "👋 name-4",
        },
      ]
      const result = tagQParamSetActive("name-2", filterOptions)
      expect(result).toEqual(expected)
    })
  })

  describe("tagsForURLParam", () => {
    it("should return url safe comma separated list", () => {
      const expected = "name-3,name-4"
      const params = new Set<string>(["name-3", "👋 name-4"])
      const result = tagsForURLParam(params)
      expect(result).toEqual(expected)
    })
  })
})
