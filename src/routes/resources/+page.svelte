<script lang="ts">
  import { base } from "$app/paths";
  import { github_url } from "$lib/constants";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import type { Tag } from "$lib/interfaces";
  import Collapsible from "$lib/components/Collapsible.svelte";
  import ListItem from "./ListItem.svelte";
  export let data: PageData;

  // Constants for infinite scroll/lazy loading
  const DEFAULT_DISPLAY_LIMIT = 18;
  const SCROLL_THRESHOLD = 200;
  let displayedResourceLimit = DEFAULT_DISPLAY_LIMIT;
  let scrollPosition = 0;
  let showButton = false;

  let resources = data.payload.resources;
  let displayedResources = resources;
  let tagLogicAnd: boolean = true; // Whether all the selected tags must match the resource (vs any of the selected tags)
  // TODO: make this a user preference
  $: tagLogic = tagLogicAnd ? "and" : "or";

  let tags: Tag[] = data.payload.tags;
  let tags_count = data.payload.tags_count;

  // Creating filter object
  let filterObject: any = {};
  filterObject["tags"] = {};
  for (const tag of tags) {
    filterObject.tags[tag.name] = false;
  }

  $: isFilterDirty = Object.values(filterObject.tags).some(
    (tag_active) => tag_active === true
  );

  let removeWhitespace = (str: string) => {
    return str.replace(/\W+/g, "");
  };

  function clearAllFilters() {
    for (const key in filterObject.tags) {
      // set all filters to false
      filterObject.tags[key] = false;
    }
    filterResources();
  }

  function filterResources() {
    // Reset displayed resources
    displayedResources = [];

    // Tags of interest
    let filterTags: Set<string> = new Set(
      Object.keys(filterObject.tags).filter(
        (tag) => filterObject.tags[tag] === true
      )
    );

    // ! Need to refactor later to make more readable
    // When union is implemented for filter...
    // let minCommonTags = tagLogic == "and" ? filterTags.size : 1; // For union, minCommonTags = 1
    let minCommonTags = filterTags.size; // Intersection only

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

  function setIntersection(set1: Set<any>, set2: Set<any>) {
    let intersection = new Set();
    for (let element of set2) {
      if (set1.has(element)) {
        intersection.add(element);
      }
    }
    return intersection;
  }

  // Update the displayedResourceLimit based on the scroll position
  function updateDisplayLimit() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const currentPosition = scrollTop + clientHeight;

    if (currentPosition >= scrollHeight - SCROLL_THRESHOLD) {
      displayedResourceLimit += DEFAULT_DISPLAY_LIMIT;
      console.log("updateLimit");
    }
  }

  // Event listener for scroll events and update limit
  function handleScroll() {
    scrollPosition = document.documentElement.scrollTop;
    showButton = scrollPosition >= window.innerHeight * 2;
    if (scrollPosition >= SCROLL_THRESHOLD) updateDisplayLimit();
  }

  let mainH1El: HTMLHeadingElement | null;

  // Hook into component lifecycle events
  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    mainH1El = document.querySelector("main > h1");
  });

  // for button
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // return keyboard focus to top
    mainH1El?.setAttribute("tabIndex", "0");
    mainH1El?.focus();
  }
</script>

<h1>Resources</h1>
<div class="py-1 dark:text-zinc-200">
  <p class="italic">{resources.length} resources and counting!!</p>
</div>
<nav aria-label="Resource Navigation" class="flex flex-wrap gap-2 pb-3">
  <a
    class="p-2 rounded-lg border-2 border-green-500  dark:border-green-700 text-green-700 dark:text-green-500"
    href="{github_url}/issues/new/choose"
    target="_blank"
    rel="noreferrer"
  >
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
    Suggest resource
    <span class="sr-only">in a new tab</span>
  </a>

  <a
    class="p-2 rounded-lg border-2 border-green-500  dark:border-green-700 text-green-700 dark:text-green-500"
    href="{github_url}/edit/main/data/resources.yml"
    target="_blank"
    rel="noreferrer"
  >
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
    Edit
    <span class="sr-only">in a new tab</span>
  </a>

  <a
    class="p-2 rounded-lg border-2 border-green-500 dark:border-green-700 text-green-700 dark:text-green-500"
    href="{base}/ClimateTown-Knowledge-Hub-resources.csv"
    download
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="w-6 h-6 inline"
      viewBox="0 0 16 16"
    >
      <path
        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
      />
      <path
        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
      />
    </svg>
    Download resources
  </a>
</nav>

<Collapsible label="Filter">
  <!-- begin form -->
  <form on:submit|preventDefault={filterResources} class="p-4 space-y-4">
    <!-- <label for="search">Search</label> -->
    <!-- <input type="text" id="search" name="search" /> -->
    <div class="flex flex-row flex-wrap gap-2">
      {#each tags as tag}
        <!-- checkboxes -->
        <div
          class="input-wrapper-focus flex justify-between gap-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white"
          class:tag-color={tag.color || tag.darkColor}
          style:--tag-color={tag.color}
          style:--tag-color-dark={tag.darkColor}
        >
          <label
            class="cursor-pointer py-2 px-3 rounded-full flex items-center gap-2 text-sm"
            for={removeWhitespace(tag.name)}
          >
            <input
              type="checkbox"
              class="appearance-none cursor-pointer w-6 h-6  rounded-full bg-white dark:bg-black checked:bg-black dark:checked:bg-green-600 transition duration-200"
              bind:checked={filterObject.tags[tag.name]}
              id={removeWhitespace(tag.name)}
              name={removeWhitespace(tag.name)}
            />
            <span>
              {tag.name}
              <span class="text-zinc-700 dark:text-zinc-300 italic"
                >({tags_count[tag.name]})</span
              >
            </span>
          </label>
        </div>
      {/each}
    </div>
    <div class="flex justify-end">
      <button
        on:click|preventDefault={clearAllFilters}
        class="mr-2 p-2 rounded-lg border-2 border-green-500 text-green-500 disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
        disabled={!isFilterDirty}
      >
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        Clear All
      </button>
      <button
        type="submit"
        class="p-2 rounded-lg bg-green-700 text-white dark:bg-green-900/75"
      >
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
</Collapsible>

<ol
  class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4 mt-3"
>
  {#each displayedResources.slice(0, displayedResourceLimit) as resource}
    <li><ListItem {resource} /></li>
  {:else}
    <li>No resources here!</li>
  {/each}
</ol>
<div class="italic text-center m-4">Those are all the resources!</div>

<button
  class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-700 dark:bg-green-900/75 text-white cursor-pointer fixed transition-opacity bottom-10 right-10 z-50 outline-offset-2 {showButton
    ? 'opacity-100'
    : 'opacity-0'}"
  on:click={scrollToTop}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    class="bi bi-chevron-up w-6 h-6 inline bg-center"
  >
    <path
      fill-rule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </svg>
  <span class="sr-only">Back to Top</span>
</button>
