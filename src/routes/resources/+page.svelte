<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { DEFAULT_DISPLAY_LIMIT } from "$lib/constants";
  import type { Tag, FilterOption, FilterLogic } from "$lib/interfaces";
  import { setIntersection } from "$lib/utils";
  import ListItem from "./ListItem.svelte";
  import ResourceNav from "$lib/components/ResourceNav.svelte";
  import ScrollTopButton from "$lib/components/ScrollTopButton.svelte";
  import FilterForm from "$lib/components/FilterForm.svelte";
  export let data: PageData;

  let displayedResourceLimit: number = DEFAULT_DISPLAY_LIMIT;
  $: displayedResourceLimit
  let resources = data.payload.resources;
  let displayedResources = resources;
  let tagLogicAnd: boolean = true;
  let tags: Tag[] = data.payload.tags;
  let tags_count = data.payload.tags_count;

  // Creating form filter options, default view
  let filterObject: FilterOption[] = [];
  for (const tag of tags) {
    let tagOption: FilterOption = {
      name: tag.name,
      count: tags_count[tag.name],
      active: false
    }
    if (tag.color) tagOption['color'] = tag.color
    filterObject.push(tagOption)
  }

  const filterResources = (event: CustomEvent<{filterOptions: FilterOption[], filterLogic: FilterLogic}>) => {
    const {filterOptions, filterLogic} = event.detail
    // Reset displayed resources
    displayedResources = [];

    // Tags of interest
    let filterTags: Set<string> = new Set(filterOptions.filter(
        (option: FilterOption) => option.active === true
      ).map((option: FilterOption) => option.name)
    );

    // ! Need to refactor later to make more readable
    // For Intersection filterTags.size
    // For union, minCommonTags = 1
    let minCommonTags = filterLogic === "and" ? filterTags.size : 1;

    for (let resource of resources) {
      // Resource tags
      let resourceTags = new Set(resource.tags.map((tag: Tag) => tag.name));

      if (setIntersection(filterTags, resourceTags).size >= minCommonTags) {
        displayedResources.push(resource);
      }
    }

    // Force svelte re-render
    displayedResources = displayedResources;
  }

  const updateLimit = (event: CustomEvent<{displayLimit: number}>) => {
    const {displayLimit} = event.detail
    displayedResourceLimit = displayLimit
  }
</script>

<h1>Resources</h1>
<div class="py-1 dark:text-zinc-200">
  <p class="italic">{resources.length} resources and counting!!</p>
</div>
<ResourceNav />
<FilterForm filterOptions={filterObject} filterLogicAnd={tagLogicAnd} on:filter={filterResources} />

<ol
  class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4 mt-3"
>
  {#each displayedResources.slice(0, displayedResourceLimit) as resource}
    <li><ListItem {resource} /></li>
  {:else}
    <li>No resources here!</li>
  {/each}
</ol>
<p class="italic text-center m-4">Those are all the resources!</p>

<ScrollTopButton on:updateLimit={updateLimit} />
