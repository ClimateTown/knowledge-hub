<script lang="ts">
  import { base } from "$app/paths";
  import type { Resource } from "$lib/interfaces";
  import TagWrapper from "$lib/components/TagWrapper.svelte";
  export let resource: Resource;
</script>

<a href={resource.url} target="_blank" rel="noreferrer">
  <div
    class="flex flex-col bg-white dark:bg-zinc-800 rounded-lg shadow-lg dark:shadow-zinc-900 transition ease-in-out hover:scale-105 h-full"
  >
    {#if resource.og_preview}
      <img
        height="190"
        width="330"
        loading="lazy"
        class="object-cover rounded-t-lg object-center h-48 w-full"
        alt="Website preview"
        src={resource.og_preview}
      />
    {:else}
      <div
        class="object-cover rounded-t-lg object-center h-48 w-full bg-zinc-500 dark:bg-zinc-900 inline-flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="64"
          width="64"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16 text text-zinc-300 dark:text-zinc-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    {/if}

    <div class="flex flex-col grow m-3">
      <div class="text-xl font-medium text-zinc-900 dark:text-zinc-100 mt-3">
        <span>
          {resource.title}
        </span>
        <span
          class="p-2 inline-flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="18"
            width="18"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 inline bg-center"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          <span class="sr-only">in new tab</span>
        </span>
      </div>
      <p class="mt-2 text-zinc-700 dark:text-zinc-400 grow">
        {resource.description}
      </p>
      <div class="flex flex-wrap text-xs py-2">
        {#each resource.tags as tag}
          <TagWrapper tagColor={tag.color} extraClasses="whitespace-nowrap p-1 my-1 mr-2">
            {tag.name}
          </TagWrapper>
        {/each}
      </div>
    </div>
  </div>
</a>
