import type { PageServerLoad } from './$types'
import { parse } from 'yaml'
import fs from 'fs'

let resources_path: string = "data/resources.yml"

interface Resource {
  description: string
  title: string
  tags: string[]
  url: string
}

function sortAlphabeticallyIgnoringEmojis(a: string, b: string) {
  const a_no_emojis = a.replace(/[\u1000-\uFFFF]/g, '').trim();
  const b_no_emojis = b.replace(/[\u1000-\uFFFF]/g, '').trim();
  return a_no_emojis.localeCompare(b_no_emojis);
}

// Reading in resources
const file = fs.readFileSync(resources_path, 'utf8')
const resources: Resource[] = parse(file) // TODO: use it to validate edits during CI/CD

// Creating a list of unique tags
const tags = new Set<string>();
for (const resource of resources) {
  resource.tags.forEach(tags.add, tags)
}

const sortedTags = [...tags].sort(sortAlphabeticallyIgnoringEmojis);

//Sorting resources by newest (assuming newest is at the bottom of the file )
const sortedResources = [...resources].reverse();

export function load(params: PageServerLoad) {
  return {
    payload: {
      resources: sortedResources,
      tags: sortedTags,
    }
  }
}
