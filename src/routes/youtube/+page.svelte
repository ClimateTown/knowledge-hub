<script lang="ts">
  import { onMount } from "svelte"
  import { page } from "$app/stores"
  import type { PageData } from "./$types"
  import type { YoutubeVideo, FilterOption, FilterLogic } from "$lib/interfaces"
  import { DEFAULT_DISPLAY_LIMIT } from "$lib/constants"
  import {
    sortChannelBySubCount,
    semanticNumber,
    getChannelData,
    tagQParamSetActive,
    activeTagsSet,
  } from "$lib/utils"
  import YoutubeThumbnail from "./YoutubeThumbnail.svelte"
  import FilterForm from "$lib/components/FilterForm.svelte"
  import ScrollTopButton from "$lib/components/ScrollTopButton.svelte"

  export let data: PageData

  const videoData = data.payload.videoData
  const channelData = data.payload.channelData
  channelData.sort(sortChannelBySubCount)

  let displayedVideoLimit: number = DEFAULT_DISPLAY_LIMIT
  $: displayedVideoLimit
  let displayedVideos: YoutubeVideo[] = [...videoData]
  let rerender: boolean = false

  // Creating form filter options, default view
  let filterObject: FilterOption[] = []
  for (const channelInfo of channelData) {
    let channelOption: FilterOption = {
      name: channelInfo.channelName,
      id: channelInfo.channelId,
      count: semanticNumber(channelInfo.channelSubCount),
      active: true,
    }
    filterObject.push(channelOption)
  }

  const getChannelIdFromName = (channelName: string) => {
    return channelData.find((channel) => channel.channelName === channelName)
  }

  const filterVideos = (
    event: CustomEvent<{ filterTags: Set<string>; filterLogic: FilterLogic }>
  ) => {
    const { filterTags } = event.detail
    applyVideoFilter(filterTags)
  }

  const applyVideoFilter = (filterTags: Set<string>) => {
    const selectedChannels = Array.from(filterTags).map(
      (option) => getChannelIdFromName(option)?.channelId
    )

    displayedVideos = []

    const filteredVideos: YoutubeVideo[] = videoData.filter((video) =>
      selectedChannels.includes(video.channelId)
    )

    // Force svelte re-render
    displayedVideos = filteredVideos
    rerender = !rerender
  }

  const updateLimit = (event: CustomEvent<{ displayLimit: number }>) => {
    const { displayLimit } = event.detail
    displayedVideoLimit = displayLimit
  }

  onMount(() => {
    const params = Object.fromEntries($page.url.searchParams)
    if (params.tags) {
      filterObject = tagQParamSetActive(params.tags, filterObject)
    }

    applyVideoFilter(activeTagsSet(filterObject))
  })
</script>

<h1>Climate YouTube</h1>
<div class="my-3 dark:text-zinc-200">
  Enjoy thoughtful climate-related discussions from your favorite climate
  YouTubers. The feed is updated daily at midnight and noon UTC, and showcases
  the latest long-form videos from each YouTuber.
</div>
<FilterForm
  filterData={{ filterOptions: filterObject, filterLogicAnd: false }}
  showFilterLogic={false}
  showReset={false}
  on:filter={filterVideos}
/>

{#key rerender}
  <ol
    class="grid grid-flow-row mt-3 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 gap-4"
  >
    {#each displayedVideos.slice(0, displayedVideoLimit) as video (video)}
      <li>
        <YoutubeThumbnail
          {video}
          channelInfo={getChannelData(channelData, video.channelId)}
        />
      </li>
    {:else}
      <li>No videos here!</li>
    {/each}
  </ol>
{/key}
<p class="italic text-center m-4">Those are all the videos!</p>

<ScrollTopButton on:updateLimit={updateLimit} />
