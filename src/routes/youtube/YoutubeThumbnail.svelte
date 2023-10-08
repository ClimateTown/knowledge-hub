<script lang="ts">
  export let title: string
  export let videoId: string
  export let channelInfo: any // Contains channel data for the video uploader
  // export let realeasedDatetime: string;

  const thumbnail = `https://i.ytimg.com/vi/${videoId}/default.jpg`
  const { channelCustomName, channelName } = channelInfo

  function trimString(str: string, maxLength: number): string {
    /**
     * Trims a string to a max length, finding a space character in order to end the string.
     */

    // Check if the length of the input string is already less than or equal to maxLength
    if (str.length <= maxLength) {
      return str
    }

    // Trim the string to maxLength characters
    let trimmedString = str.substring(0, maxLength)

    // Find the last occurrence of a space character in the trimmed string
    let lastIndex = trimmedString.lastIndexOf(" ")

    // If a space character is found, trim the string again to remove everything after the space character
    if (lastIndex !== -1) {
      trimmedString = trimmedString.substring(0, lastIndex)
    }

    // Add an ellipsis to indicate that the string has been trimmed
    return trimmedString + "..."
  }
</script>

<a
  href="https://youtu.be/{videoId}"
  class="lg:hover:scale-105"
  target="_blank"
  rel="noreferrer"
>
  <div
    class="flex w-full flex-row bg-white dark:bg-zinc-800 md:block md:w-auto md:h-auto shadow-md dark:shadow-zinc-900 rounded-lg"
  >
    <img
      loading="lazy"
      class="rounded-l-lg md:rounded-bl-none md:rounded-t-lg md:w-full"
      height="90"
      width="120"
      src={thumbnail}
      alt="{title} thumbnail"
    />
    <div class="mx-2">
      <!-- Don't trim title on mobile, trim on desktop (probably a better way to do this with media queries) -->
      <div
        class="md:block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {@html title}
      </div>
      <a
        class="text-sm text-zinc-700 dark:text-zinc-400"
        href="https://www.youtube.com/{channelCustomName}"
        target="_blank"
        rel="noreferrer"
      >
        {@html channelName}</a
      >
    </div>
  </div>
</a>
