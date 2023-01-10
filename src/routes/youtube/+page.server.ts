import type { PageServerLoad } from './$types'
import fs from 'fs'

const channelDataPath: string = "data/channel_data.json"
const videoDataPath: string = "data/video_data.json"

// Reading in channel and video data
let file = fs.readFileSync(channelDataPath, 'utf8')
const channelData = JSON.parse(file)

file = fs.readFileSync(videoDataPath, 'utf8')
const videoData = JSON.parse(file)





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
