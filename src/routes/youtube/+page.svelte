<script lang="ts">
  import type { PageData } from "./$types";
  import type {
    YoutubeChannel,
    YoutubeVideo,
    YoutubeChannelFilterItem,
  } from "$lib/interfaces";
  import YoutubeThumbnail from "./YoutubeThumbnail.svelte";
  import Collapsible from "lib//components/Collapsible.svelte";

  export let data: PageData;

  const videoData = data.payload.videoData;
  const channelData = data.payload.channelData;
  let displayedVideos = videoData;

  let rerender: boolean = false;

  function sortChannelBySubCount(a: YoutubeChannel, b: YoutubeChannel) {
    const ClimateTownChannelId = "UCuVLG9pThvBABcYCm7pkNkA";

    if (a.channelId === ClimateTownChannelId) {
      return -1;
    }
    if (b.channelId === ClimateTownChannelId) {
      return 1;
    }

    // Normal sort
    return b.channelSubCount - a.channelSubCount;
  }
  channelData.sort(sortChannelBySubCount);

  function getChannelData(channelId: string) {
    // Given a channel ID, return the channel data from the array
    return channelData.find((channel) => channel.channelId === channelId);
  }

  // Creating initial filter object and state
  const channelArr: YoutubeChannelFilterItem[] = [];
  for (const channelInfo of channelData) {
    channelArr.push({ channelId: channelInfo.channelId, active: true });
  }

  function filterResources(
    videoData: YoutubeVideo[],
    channelArr: YoutubeChannelFilterItem[]
  ): YoutubeVideo[] {
    const filteredActiveChannelIds: string[] = channelArr
      .filter((channel) => channel.active === true)
      .map((channel) => channel.channelId);

    const filteredVideos: YoutubeVideo[] = videoData.filter((video) =>
      filteredActiveChannelIds.includes(video.channelId)
    );

    // Force svelte re-render
    rerender = !rerender;

    return filteredVideos;
  }

  function semanticNumber(number: number) {
    // number less than 1000
    if (number < 1000) {
      return number.toString();
    }
    // number between 1k and 1M
    else if (number >= 1000 && number < 1000000) {
      return `${(number / 1000).toFixed(0)}k`;
    }
    // number between 1M and 1B
    else if (number >= 1000000 && number < 1_000000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else {
      return ">1B";
    }
  }
</script>

<h1>Climate YouTube</h1>
<div class="my-3">
  Enjoy thoughtful climate-related discussions from your favorite climate
  YouTubers. The feed is updated daily at midnight and noon UTC, and showcases
  the latest long-form videos from each YouTuber.
</div>

<Collapsible label="Filter">
  <form
    on:submit|preventDefault={() => {
      displayedVideos = filterResources(videoData, channelArr);
    }}
    class="p-4 space-y-4"
  >
    <!-- <label for="search">Search</label> -->
    <!-- <input type="text" id="search" name="search" /> -->
    <div class="flex flex-row flex-wrap gap-2">
      {#each channelData as channelInfo, index}
        <div
          class="flex justify-between gap-2 rounded-full cursor-pointer bg-gray-300"
        >
          <label
            class="cursor-pointer py-2 px-3 rounded-full flex items-center gap-2 text-sm"
            for={channelInfo.channelId}
          >
            <input
              type="checkbox"
              class="appearance-none w-6 h-6 bg-white rounded-full checked:bg-black transition duration-200"
              bind:checked={channelArr[index].active}
              id={channelInfo.channelId}
            />
            <span
              >{channelInfo.channelName} ({semanticNumber(
                channelInfo.channelSubCount
              )})</span
            ></label
          >
        </div>
      {/each}
    </div>
    <div class="flex flex-row-reverse">
      <button type="submit" class="p-2 rounded-lg bg-green-500 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 inline"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>

        Filter
      </button>
    </div>
  </form>
</Collapsible>

{#key rerender}
  <div
    class="grid grid-flow-row mt-3 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 gap-4"
  >
    {#each displayedVideos as video}
      <YoutubeThumbnail
        {...video}
        channelInfo={getChannelData(video.channelId)}
      />
    {:else}
      <div>No videos here!</div>
    {/each}
  </div>
{/key}
