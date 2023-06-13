<script lang="ts">
  import type { PageData } from "./$types";
  import YoutubeVideo from "./YoutubeVideo.svelte";

  export let data: PageData;

  const videoData = data.payload.videoData;
  const channelData = data.payload.channelData;
  let displayedVideos = videoData;

  let rerender: boolean = false;
  
  interface Channel {
    channelId: string;
    channelSubCount: number;
  }
  interface channelFilterItem { 
    channelId: string;
    active: boolean;
  };

  function sortChannelBySubCount(a: Channel, b: Channel) {
    const ClimateTownChannelId = "UCuVLG9pThvBABcYCm7pkNkA";
    
    if (a.channelId === ClimateTownChannelId) {
      return -1;
    }
    if (b.channelId === ClimateTownChannelId) {
      return 1;
    }

    return b.channelSubCount - a.channelSubCount;
  }
  channelData.sort(sortChannelBySubCount);
  channelData.reverse();

  function getChannelData(channelId: string) {
    // Given a channel ID, return the channel data from the array
    return channelData.find((channel) => channel.channelId === channelId);
  }


  // Creating initial filter object and state
  const channelArr: channelFilterItem[] = [];
  for (const channelInfo of channelData) {
    channelArr.push({ channelId: channelInfo.channelId, active: true });
  }

  function filterResources() {
    // Filter videos based on channel selection in form

    // Reset displayed videos
    displayedVideos = [];

    // Channels
    const filteredActiveChannelIds: string[] = channelArr
      .filter((channel) => channel.active === true) 
      .map((channel) => channel.channelId);

    for (const video of videoData) {
      if (filteredActiveChannelIds.includes(video.channelId)) {
        displayedVideos.push(video);
      }
    }

    // Force svelte re-render
    rerender = !rerender;
  }

  function formatChannelSubCount(num: number) {
    if (num < 1000) {
      return "<1k";
    }
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}k`;
    }
  }
</script>

<h1>ClimateTown YouTube Videos</h1>

<form
  on:submit|preventDefault={filterResources}
  class="border-solid border-2 rounded-lg p-4 space-y-4"
>
  <!-- <label for="search">Search</label> -->
  <!-- <input type="text" id="search" name="search" /> -->
  <div class="flex flex-row flex-wrap gap-2">
    {#each channelData as channelInfo, index}
      <div
        class="flex justify-between gap-2 rounded-full cursor-pointer bg-gray-300"
      >
        <label
          class="cursor-pointer py-2 px-3 rounded-full flex items-center gap-2"
          for={channelInfo.channelId}
        >
          <input
            type="checkbox"
            class="appearance-none w-6 h-6 bg-white rounded-full checked:bg-black transition duration-200"
            bind:checked={channelArr[index].active}
            id={channelInfo.channelId}
          />
          <span
            >{channelInfo.channelName} ({formatChannelSubCount(
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

{#key rerender}
  <div
    class="grid grid-flow-row mt-3 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 gap-4"
  >
    {#each displayedVideos as video}
      <YoutubeVideo {...video} channelInfo={getChannelData(video.channelId)} />
    {:else}
      <div>No videos here!</div>
    {/each}
  </div>
{/key}
