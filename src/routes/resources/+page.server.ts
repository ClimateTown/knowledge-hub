import type { PageServerLoad } from "./$types";
import { parse } from "yaml";
import fs from "fs";

interface Resource {
  title: string;
  description: string;
  url: string;
  tags: string[];
  tagInfo?: Tag[];
}

export interface Tag {
  name: string;
  color?: string;
}

const removeEmojisFromStr = (str: string) => {
  return str.replace(/[\u1000-\uFFFF]+/g, "").trim();
};

const hasEmoji = (str: string) => {
  return /[\u1000-\uFFFF]+/g.test(str);
};

const sortAlphabeticallyEmojisFirst = (a: Tag, b: Tag) => {
  if (hasEmoji(a.name) && hasEmoji(b.name)) {
    const aWithoutEmojis = removeEmojisFromStr(a.name);
    const bWithoutEmojis = removeEmojisFromStr(b.name);

    return aWithoutEmojis.localeCompare(bWithoutEmojis);
  }

  return a.name.localeCompare(b.name);
};

const parseResources = (tags: Tag[]) => {
  const file = fs.readFileSync("data/resources.yml", "utf8");
  const resources: Resource[] = parse(file);
  for(const resource of resources) {
    resource.tagInfo = []
    for(const resTag of resource.tags) {
      let matchIdx = tags.findIndex((tag: Tag) => tag.name === resTag)
      resource.tagInfo.push(tags[matchIdx])
    }
  }
  return resources.reverse();
};

const getTagCounts = (tags: Tag[], yml_data: Resource[]) => {
  let tag_count: { [key: string]: number } = {};
  for (const tag of tags) {
    tag_count[tag.name] = 0;
  }
  for (const resource of yml_data) {
    for (const tag of resource.tags) {
      tag_count[tag] += 1;
    }
  }
  return tag_count;
};

const parseTags = () => {
  const file = fs.readFileSync("data/resource_tags.yml", "utf8");
  const tags: Tag[] = parse(file);
  tags.sort(sortAlphabeticallyEmojisFirst);
  return tags;
};

export function load(params: PageServerLoad) {
  const tags: Tag[] = parseTags();

  const resources: Resource[] = parseResources(tags);

  const tag_count = getTagCounts(tags, resources);

  return {
    payload: {
      resources: resources,
      tags: tags,
      tags_count: tag_count,
    },
  };
}
