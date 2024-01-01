<script lang="ts">
  import mixpanel from "mixpanel-browser"
  import Fuse from "fuse.js"

  import { page } from "$app/stores"
  import type { PageData } from "./$types"
  import { onMount } from "svelte"
  import { DEFAULT_DISPLAY_LIMIT } from "$lib/constants"
  import type {
    Tag,
    FilterOption,
    FilterLogic,
    Resource,
  } from "$lib/interfaces"
  import {
    setIntersection,
    activeTagsSet,
    tagQParamSetActive,
    filterByQuery,
  } from "$lib/utils"
  import Search from "$lib/components/Search.svelte"
  import ListItem from "./ListItem.svelte"
  import ResourceNav from "$lib/components/ResourceNav.svelte"
  import ScrollTopButton from "$lib/components/ScrollTopButton.svelte"
  import FilterForm from "$lib/components/FilterForm.svelte"
  export let data: PageData

  let searchTerm: string | null
  let displayedResourceLimit: number = DEFAULT_DISPLAY_LIMIT
  $: displayedResourceLimit
  let resources = data.payload.resources
  let displayedResources = resources
  let filterByTags: Resource[]
  let tagLogicAnd: boolean = true // Whether all the selected tags must match the resource (vs any of the selected tags)

  let tagLogic: FilterLogic
  $: tagLogic = tagLogicAnd ? "and" : "or"

  let tags: Tag[] = data.payload.tags
  let tags_count = data.payload.tags_count

  // Creating form filter options, default view
  let filterObject: FilterOption[] = []
  $: filterObject
  for (const tag of tags) {
    let tagOption: FilterOption = {
      name: tag.name,
      count: tags_count[tag.name],
      active: false,
    }
    if (tag.color) tagOption["color"] = tag.color
    filterObject.push(tagOption)
  }

  function filterBySearchInput(event: CustomEvent<{ searchTerm: string }>) {
    const { searchTerm } = event.detail

    // Analytics
    mixpanel.track("Resource Search", {
      "search term": searchTerm,
    })
    const searchResults = filterByQuery(searchTerm, resources)

    displayedResources = searchResults
  }

  const filterResources = (
    event: CustomEvent<{ filterTags: Set<string>; filterLogic: FilterLogic }>
  ) => {
    const { filterTags, filterLogic } = event.detail
    // clear search form when using filters
    searchTerm = null

    // Analytics
    mixpanel.track("Resource Filter", {
      "filter tags": Array.from(filterTags),
      "filter logic": filterLogic,
    })

    applyTagFilter(filterTags, filterLogic)
  }

  const applyTagFilter = (
    filterTags: Set<string>,
    filterLogic: FilterLogic
  ) => {
    // Reset displayed resources
    displayedResources = []

    // ! Need to refactor later to make more readable
    // For intersection, minCommonTags = filterTags.size
    // For union, minCommonTags = 1
    tagLogicAnd = filterLogic === "and"
    let minCommonTags = tagLogicAnd ? filterTags.size : 1

    for (let resource of resources) {
      // Resource tags
      let resourceTags = new Set(resource.tags.map((tag: Tag) => tag.name))

      if (setIntersection(filterTags, resourceTags).size >= minCommonTags) {
        displayedResources.push(resource)
      }
    }

    // search to rely on displayedResources
    filterByTags = displayedResources

    // Force svelte re-render
    displayedResources = displayedResources
  }

  // Update the displayedResourceLimit based on the scroll position
  const updateLimit = (event: CustomEvent<{ displayLimit: number }>) => {
    const { displayLimit } = event.detail
    displayedResourceLimit = displayLimit
  }

  onMount(() => {
    const params = Object.fromEntries($page.url.searchParams)

    if (params.q && !params.tags) {
      searchTerm = params.q
      const searchResults = filterByQuery(searchTerm, resources)

      displayedResources = searchResults
    } else {
      // clear search form when using filters
      searchTerm = null

      if (params.mode) {
        tagLogicAnd = params.mode === "and" ? true : false
      }
      if (params.tags) {
        filterObject = tagQParamSetActive(params.tags, filterObject)
      }

      applyTagFilter(
        activeTagsSet(filterObject),
        (params.mode as FilterLogic) ?? "and"
      )
    }
  })
</script>

<h1>Resources</h1>
<div class="py-1 dark:text-zinc-200">
  <p class="italic">{resources.length} resources and counting!!</p>
</div>
<ResourceNav />
<Search {searchTerm} on:search={filterBySearchInput}></Search>
<FilterForm
  filterData={{ filterOptions: filterObject, filterLogicAnd: tagLogicAnd }}
  on:filter={filterResources}
/>

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
