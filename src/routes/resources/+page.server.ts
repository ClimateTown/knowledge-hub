import type { PageServerLoad } from './$types'
import { parse } from 'yaml'
import fs from 'fs'

let resources_path: string = "data/resources.yml"

// Reading in resources
const file = fs.readFileSync(resources_path, 'utf8')
const yml_data = parse(file) // TODO: Create interface for this, and then use it to validate edits during CI/CD

// Creating a list of unique tags
let tags: string[] = [];
let resource;
for (resource of yml_data) {
  tags.push(...resource.tags)
}
tags = [...new Set(tags.sort((a, b) => {
  //Identifying emojis with charCode. Obviously this breaks or gets weird if
  //there are multiple emojis in a tag or non alphanumeric characters start getting tossed in.
  let aEmojiCheck = a.charCodeAt(0) > 255;
  let bEmojiCheck = b.charCodeAt(0) > 255;

  //If both tags have emojis, remove the emojis and compare the strings
  if (aEmojiCheck && bEmojiCheck) {
    const aClean = a.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();
    const bClean = b.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();
    return aClean.localeCompare(bClean);
  } else if (!aEmojiCheck && !bEmojiCheck) {
    return a.localeCompare(b);
  } else {
    return aEmojiCheck ? -1 : 1;
  }
}))]

//Sorting resources by newest (assuming newest is at the bottom of the file )
const yml_data_sort = [...yml_data].reverse();

export function load(params: PageServerLoad) {
  return {
    payload: {
      resources: yml_data_sort,
      tags: tags,
    }
  }
}
