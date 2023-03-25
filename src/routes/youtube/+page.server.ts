import type { PageServerLoad } from './$types'
import fs from 'fs'

const channelDataPath: string = "data/channel_data.json"
const videoDataPath: string = "data/video_data.json"

// Function to read JSON file or return an empty array if the file doesn't exist
function readJsonFile(filePath: string): any[] {
  try {
    const file = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(file)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    } else {
      throw error
    }
  }
}

// Reading in channel and video data
const channelData = readJsonFile(channelDataPath)
const videoData = readJsonFile(videoDataPath)





// // Creating a list of unique tags
// let tags: string[] = [];
// let resource;
// for (resource of videoData) {
//   tags.push(...resource.tags)
// }
// tags = [...new Set(tags)]


export function load(params: PageServerLoad) {
  return {
    payload: {
      videoData: videoData,
      channelData: channelData,
    }
  }
}
