<script lang="ts">
  import type { PageData } from "./$types";
  import type {
    YoutubeChannel,
    YoutubeVideo,
    YoutubeChannelFilterItem,
  } from "$lib/interfaces";
  import YoutubeThumbnail from "./YoutubeThumbnail.svelte";
  import Collapsible from "lib//components/Collapsible.svelte";
    import Filters from "lib//components/Filters.svelte";

  export let data: PageData;

  const videoData = data.payload.videoData;
  const channelData = data.payload.channelData;
  let displayedVideos = videoData;

  let rerender: boolean = false;

  const DEFAULT_CHECKED = true;
  // Creating initial filter object and state
  const filterObject: { channels: { [key: string]: boolean } } = { channels: {} };
  for (const channel of channelData) {
    filterObject.channels[channel.channelId] = DEFAULT_CHECKED;
  }

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

  function filterVideos(): void {
    displayedVideos = videoData.filter((video) =>
      filterObject.channels[video.channelId]
    );
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

<Filters 
  onSubmit={filterVideos}
  filterOptions={channelData}
  checkboxMapping={filterObject.channels}
  labelCount={(d) => semanticNumber(d.channelSubCount)}
  labelDisplayField="channelName"
  labelIdField="channelId"
  defaultChecked={DEFAULT_CHECKED}
></Filters>

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
