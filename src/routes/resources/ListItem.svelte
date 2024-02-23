<script lang="ts">
  import { base } from "$app/paths"

  import Link45Deg from "svelte-bootstrap-icons/lib/Link45deg.svelte"
  import CardImage from "svelte-bootstrap-icons/lib/CardImage.svelte"

  import type { Resource } from "$lib/interfaces"
  import TagWrapper from "$lib/components/TagWrapper.svelte"
  import mixpanel from "mixpanel-browser"
  export let resource: Resource

  const trackResourceClick = (resource: Resource) => {
    mixpanel.track("Resource Click", {
      "Resource Title": resource.title,
      "Resource URL": resource.url,
      "Resource Description": resource.description,
      "Resource Tags": resource.tags.map((tag) => tag.name),
    })
  }
</script>

<a
  href={resource.url}
  target="_blank"
  rel="noreferrer"
  on:click={() => trackResourceClick(resource)}
>
  <div
    class="flex flex-col bg-white dark:bg-zinc-800 rounded-lg shadow-lg dark:shadow-zinc-900 transition ease-in-out hover:scale-105 h-full"
  >
    {#if resource.og_preview}
      <img
        height="190"
        width="330"
        loading="lazy"
        class="object-cover rounded-t-lg object-center h-48 w-full"
        alt="{resource.title} Website preview"
        src="{base}/previews/{resource.og_preview}"
      />
    {:else}
      <div
        class="object-cover rounded-t-lg object-center h-48 w-full bg-zinc-500 dark:bg-zinc-900 inline-flex items-center justify-center"
      >
        <CardImage class="w-16 h-16 text text-zinc-300 dark:text-zinc-500" />
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
          <Link45Deg class="w-5 h-5 inline bg-center" />
          <span class="sr-only">in new tab</span>
        </span>
      </div>
      <p class="mt-2 text-zinc-700 dark:text-zinc-400 grow">
        {resource.description}
      </p>
      <div class="flex flex-wrap text-xs py-2">
        {#each resource.tags as tag}
          <TagWrapper
            tagColor={tag.color}
            extraClasses="whitespace-nowrap p-1 my-1 mr-2"
          >
            {tag.name}
          </TagWrapper>
        {/each}
      </div>
    </div>
  </div>
</a>
