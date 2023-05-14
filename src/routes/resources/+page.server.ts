import type { PageServerLoad } from './$types'
import { parse } from 'yaml'
import fs from 'fs'

interface Resource {
  title: string,
  description: string,
  url: string,
  tags: string[]
}

const parseResourcesFromYaml = (filePath: string) => {
  const file = fs.readFileSync(filePath, 'utf8')
  const resources: Resource[] = parse(file)
  return resources;
}

const generateUniqueTags = (resources: Resource[]) => {
  const tags: string[] = []

  for (const resource of resources) {
    tags.push(...resource.tags);
  }

  return [...new Set(tags)]
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

export function load(params: PageServerLoad) {

  const resources: Resource[] = parseResourcesFromYaml('data/resources.yml');

  const uniqueTags: string[] = generateUniqueTags(resources);

  const uniqueTagsInAlphabeticalOrder = uniqueTags.sort(sortAlphabeticallyEmojisFirst);

  const resourcesNewestToOldest = [...resources].reverse();

  return {
    payload: {
      resources: resourcesNewestToOldest,
      tags: uniqueTagsInAlphabeticalOrder,
    }
  }
}
