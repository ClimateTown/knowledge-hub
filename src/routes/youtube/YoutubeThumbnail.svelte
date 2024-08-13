<script lang="ts">
  import type { YoutubeChannel, YoutubeVideo } from "$lib/interfaces"

  export let video: YoutubeVideo
  export let channelInfo: YoutubeChannel // Contains channel data for the video uploader

  const { title, videoId, videoPic, videoPicH, videoPicW } = video
  const { channelCustomName, channelName, channelPic } = channelInfo
</script>

<div
  class="flex flex-col w-full flex-row gap-2 bg-white dark:bg-zinc-800 md:flex md:w-auto md:h-auto shadow-md dark:shadow-zinc-900 rounded-lg lg:hover:scale-105"
>
  <a href="https://youtu.be/{videoId}" target="_blank" rel="noreferrer">
    {#if videoPic}
      <img
        loading="lazy"
        class="rounded-l-lg md:rounded-bl-none md:rounded-t-lg md:w-full"
        height={videoPicH}
        width={videoPicW}
        src={videoPic}
        alt=""
      />
    {/if}
    <div
      class="md:block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
    >
      {@html title}
    </div>
  </a>
  <a
    class="text-sm text-zinc-700 dark:text-zinc-400 inline-flex gap-1 items-center"
    href="https://www.youtube.com/{channelCustomName}"
    target="_blank"
    rel="noreferrer"
    aria-label="{channelName} youtube channel (in a new tab)"
  >
    {#if channelPic}
      <img
        class="rounded-full"
        src={channelPic}
        height="18"
        width="18"
        alt=""
      />
    {/if}
    {channelName}
  </a>
</div>
