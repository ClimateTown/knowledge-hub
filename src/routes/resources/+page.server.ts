import type { PageServerLoad } from "./$types";
import { parse } from "yaml";
import fs from "fs";
import type { Tag, Resource, TagWithCount } from "$lib/interfaces";
import { hasEmoji, removeEmojisFromStr } from "$lib/utils";

const sortAlphabeticallyEmojisFirst = (a: string, b: string) => {
  if (hasEmoji(a) && hasEmoji(b)) {
    const aWithoutEmojis = removeEmojisFromStr(a);
    const bWithoutEmojis = removeEmojisFromStr(b);

    return aWithoutEmojis.localeCompare(bWithoutEmojis);
  }

  return a.localeCompare(b);
};

const parseResources = (tags: Tag[]) => {
  // Create mapping of tag name to tag object
  let tagMap: { [name: string]: Tag } = {};
  tags.forEach((tag) => {
    tagMap[tag.name] = tag;
  });

  const file = fs.readFileSync("data/resources.yml", "utf8");
  const resources_raw = parse(file);
  for (const resource of resources_raw) {
    // Convert string in resources.yml to full tag object
    resource.tags = resource.tags.map((tag_name: string) => {
      return tagMap[tag_name];
    });
  }

  let resources = resources_raw as Resource[];

  return resources.reverse();
};

const getTagCounts = (tags: Tag[], yml_data: Resource[]): TagWithCount[] => {
  let tag_count: { [key: string]: number } = {};
  for (const tag of tags) {
    tag_count[tag.name] = 0;
  }
  for (const resource of yml_data) {
    for (const tag of resource.tags) {
      tag_count[tag.name] += 1;
    }
  }

  return tags.map((tag) => ({
    ...tag,
    count: tag_count[tag.name],
  }));
};

const parseTags = () => {
  const file = fs.readFileSync("data/resource_tags.yml", "utf8");
  const tags: { name: string; color: string }[] = parse(file);
  tags.sort((tag1, tag2) => {
    return sortAlphabeticallyEmojisFirst(tag1.name, tag2.name);
  });
  return tags;
};

export function load(params: PageServerLoad) {
  const tags: Tag[] = parseTags();

  const resources: Resource[] = parseResources(tags);

  const tag_w_count: TagWithCount[] = getTagCounts(tags, resources);

  return {
    payload: {
      resources: resources,
      tags: tag_w_count,
    },
  };
}
