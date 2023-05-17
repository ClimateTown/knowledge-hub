import type { PageServerLoad } from './$types'
import { parse } from 'yaml'
import fs from 'fs'

interface Resource {
  title: string,
  description: string,
  url: string,
  tags: string[]
}


interface Tag {
  name: string,
}

const removeEmojisFromStr = (str: string) => {
  return str.replace(/[\u1000-\uFFFF]+/g, '').trim();
}

const hasEmoji = (str: string) => {
  return /[\u1000-\uFFFF]+/g.test(str);
}

const sortAlphabeticallyEmojisFirst = (a: string, b: string) => {
  if(hasEmoji(a) && hasEmoji(b)){
    const aWithoutEmojis = removeEmojisFromStr(a);
    const bWithoutEmojis = removeEmojisFromStr(b);

    return aWithoutEmojis.localeCompare(bWithoutEmojis);
  }

  return a.localeCompare(b);
}

const parseResources = () => {
  const file = fs.readFileSync('data/resources.yml', 'utf8')
  const resources: Resource[] = parse(file)
  return resources.reverse();
}

const getTagCounts = (tags: string[], yml_data: Resource[]) => {
  let tag_count: { [key: string]: number } = {};
  for (const tag of tags) {
    tag_count[tag] = 0;
  }
  for (const resource of yml_data) {
    for (const tag of resource.tags) {
      tag_count[tag] += 1;
    }
  }
  return tag_count;
};

const parseTags = () => {
  const file = fs.readFileSync('data/resource_tags.yml', 'utf8');
  const tags = parse(file).map((tag: Tag) => tag.name);
  tags.sort(sortAlphabeticallyEmojisFirst);
  return tags;
}

export function load(params: PageServerLoad) {

  const resources: Resource[] = parseResources();

  const tags = parseTags();

  const tag_count = getTagCounts(tags, resources);

  return {
    payload: {
      resources: resources,
      tags: tags,
      tags_count: tag_count,
    }
  }
}
