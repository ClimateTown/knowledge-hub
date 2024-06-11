<script lang="ts">
  import type { YoutubeChannel } from "$lib/interfaces"

  export let title: string
  export let videoId: string
  export let channelInfo: YoutubeChannel // Contains channel data for the video uploader

  const { channelCustomName, channelName } = channelInfo
</script>

<div
  class="flex w-full flex-row bg-white dark:bg-zinc-800 md:block md:w-auto md:h-auto shadow-md dark:shadow-zinc-900 rounded-lg lg:hover:scale-105"
>
  <a href="https://youtu.be/{videoId}" target="_blank" rel="noreferrer">
    <img
      loading="lazy"
      class="rounded-l-lg md:rounded-bl-none md:rounded-t-lg md:w-full"
      height={channelInfo.channelPicH}
      width={channelInfo.channelPicW}
      src={channelInfo.channelPic}
      alt="{title} thumbnail"
    />
    <div
      class="md:block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
    >
      {@html title}
    </div>
  </a>
  <a
    class="text-sm text-zinc-700 dark:text-zinc-400"
    href="https://www.youtube.com/{channelCustomName}"
    target="_blank"
    rel="noreferrer"
  >
    {@html channelName}</a
  >
</div>
