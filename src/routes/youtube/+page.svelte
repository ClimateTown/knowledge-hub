<script lang="ts">
  import type { PageData } from "./$types";
  import type {
    YoutubeChannel,
    YoutubeVideo,
    YoutubeChannelFilterItem,
  } from "$lib/interfaces";
  import YoutubeThumbnail from "./YoutubeThumbnail.svelte";
  import Collapsible from "lib//components/Collapsible.svelte";
  import TagWrapper from "$lib/components/TagWrapper.svelte";
  import Checkbox from "$lib/components/Checkbox.svelte";
  import ButtonLinks from "$lib/components/ButtonLinks.svelte";
  export let data: PageData;

  const videoData = data.payload.videoData;
  const channelData = data.payload.channelData;
  let displayedVideos = videoData;

  let rerender: boolean = false;
  let form: HTMLFormElement;

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

  $: isFilterDirty = Object.values(channelArr).some(
    (channel) => channel.active === true
  );

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
<div class="my-3 dark:text-zinc-200">
  Enjoy thoughtful climate-related discussions from your favorite climate
  YouTubers. The feed is updated daily at midnight and noon UTC, and showcases
  the latest long-form videos from each YouTuber.
</div>

<Collapsible label="Filter">
  <form
    bind:this={form}
    on:submit|preventDefault={() => {
      displayedVideos = filterResources(videoData, channelArr);
    }}
    class="p-4 space-y-4"
  >
    <!-- <label for="search">Search</label> -->
    <!-- <input type="text" id="search" name="search" /> -->
    <div class="flex flex-row flex-wrap gap-2">
      {#each channelData as channelInfo, index}
        <TagWrapper
          extraClasses="input-wrapper-focus flex justify-between gap-2"
        >
          <Checkbox
            name={channelInfo.channelName}
            bind:checked={channelArr[index].active}
          >
            <span class="text-zinc-700 dark:text-zinc-300 italic"
              >({semanticNumber(channelInfo.channelSubCount)})</span
            >
          </Checkbox>
        </TagWrapper>
      {/each}
    </div>
    <div class="flex gap-2 justify-end">
      <ButtonLinks
        type="reset"
        on:click={() => form.requestSubmit()}
        disabled={!isFilterDirty}
        version="filled"
        color="green"
      >
        <svg
          slot="icon"
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <span slot="label">Clear All</span>
      </ButtonLinks>

      <ButtonLinks type="submit" version="filled" color="green">
        <svg
          slot="icon"
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
        <span slot="label">Filter</span>
      </ButtonLinks>
    </div>
  </form>
</Collapsible>

{#key rerender}
  <ol
    class="grid grid-flow-row mt-3 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 gap-4"
  >
    {#each displayedVideos as video}
      <li>
        <YoutubeThumbnail
          {...video}
          channelInfo={getChannelData(video.channelId)}
        />
      </li>
    {:else}
      <li>No videos here!</li>
    {/each}
  </ol>
{/key}
