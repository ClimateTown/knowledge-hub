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

const parseResources = () => {
  const file = fs.readFileSync('data/resources.yml', 'utf8')
  const resources: Resource[] = parse(file)
  return resources.reverse();
}

const parseTags = () => {
  const file = fs.readFileSync('data/resource_tags.yml', 'utf8');
  const tags = parse(file).map((tag: Tag) => tag.name);
  return tags;
}

export function load(params: PageServerLoad) {

  const resources: Resource[] = parseResources();

  const tags  = parseTags();

  return {
    payload: {
      resources: resources,
      tags: tags
    }
  }
}
