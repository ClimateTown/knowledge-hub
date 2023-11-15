import type { PageServerLoad } from "./$types"
import { parse } from "yaml"
import fs from "fs"
import type { Tag, Resource } from "$lib/interfaces"
import {
  removeEmojisFromStr,
  hasEmoji,
  sortAlphabeticallyEmojisFirst,
} from "$lib/utils"

const parseResources = (tags: Tag[]) => {
  // Create mapping of tag name to tag object
  let tagMap: { [name: string]: Tag } = {}
  tags.forEach((tag) => {
    tagMap[tag.name] = tag
  })

  const file = fs.readFileSync("data/resources.yml", "utf8")
  const resources_raw = parse(file)
  for (const resource of resources_raw) {
    // Convert string in resources.yml to full tag object
    resource.tags = resource.tags.map((tag_name: string) => {
      return tagMap[tag_name]
    })
  }

  let resources = resources_raw as Resource[]

  return resources.reverse()
}

const getTagCounts = (tags: Tag[], yml_data: Resource[]) => {
  let tag_count: { [key: string]: number } = {}
  for (const tag of tags) {
    tag_count[tag.name] = 0
  }
  for (const resource of yml_data) {
    for (const tag of resource.tags) {
      tag_count[tag.name] += 1
    }
  }
  return tag_count
}

const parseTags = () => {
  const file = fs.readFileSync("data/resource_tags.yml", "utf8")
  const tags: Tag[] = parse(file)
  tags.sort((tag1, tag2) => {
    return sortAlphabeticallyEmojisFirst(tag1.name, tag2.name)
  })
  return tags
}

export function load(params: PageServerLoad) {
  const tags: Tag[] = parseTags()

  const resources: Resource[] = parseResources(tags)

  const tag_count = getTagCounts(tags, resources)

  return {
    payload: {
      resources: resources,
      tags: tags,
      tags_count: tag_count,
    },
  }
}
