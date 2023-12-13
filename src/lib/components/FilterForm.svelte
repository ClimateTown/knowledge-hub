<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import Funnel from "svelte-bootstrap-icons/lib/Funnel.svelte"
  import Intersect from "svelte-bootstrap-icons/lib/Intersect.svelte"
  import Trash3 from "svelte-bootstrap-icons/lib/Trash3.svelte"
  import Union from "svelte-bootstrap-icons/lib/Union.svelte"

  import type {
    FilterOption,
    FilterLogic,
    CustomFilterEvent,
  } from "$lib/interfaces"
  import {
    replaceStateWithQuery,
    activeTagsSet,
    tagsForURLParam,
  } from "$lib/utils"
  import Collapsible from "$lib/components/Collapsible.svelte"
  import TagWrapper from "$lib/components/TagWrapper.svelte"
  import Checkbox from "$lib/components/Checkbox.svelte"
  import ButtonLinks from "$lib/components/ButtonLinks.svelte"
  const dispatch = createEventDispatcher<CustomFilterEvent>()
  let form: HTMLFormElement

  export let filterData: {
    filterOptions: FilterOption[]
    filterLogicAnd: boolean
  } = {
    filterOptions: [],
    filterLogicAnd: true,
  }

  let filterOptions: FilterOption[]
  $: ({ filterOptions } = filterData)

  export let showFilterLogic: boolean = true
  // Whether all the selected tags must match the resource (vs any of the selected tags)
  let filterLogicAndCtrl: boolean = filterData?.filterLogicAnd ?? true
  let filterLogic: FilterLogic
  $: filterLogic = filterLogicAndCtrl ? "and" : "or"

  let isFilterDirty: boolean
  $: isFilterDirty = filterOptions.some(
    (option: FilterOption) => option.active === true
  )

  const resetFilters = () => {
    filterOptions.map((option) => (option.active = false))

    replaceStateWithQuery({
      tags: "",
      mode: "",
      q: "",
    })

    const filterTags = activeTagsSet(filterOptions)
    filterLogicAndCtrl = true

    dispatch("filter", { filterTags, filterLogic })
  }

  const onSubmit = () => {
    const filterTags = activeTagsSet(filterOptions)

    replaceStateWithQuery({
      tags: tagsForURLParam(filterTags),
      mode: filterLogic,
      q: "",
    })
    dispatch("filter", { filterTags, filterLogic })
  }
</script>

{#if filterOptions}
  <Collapsible label="Filter">
    <form
      bind:this={form}
      on:submit|preventDefault={onSubmit}
      class="p-4 space-y-4"
    >
      <div class="flex flex-row flex-wrap gap-2">
        {#each filterOptions as filterOption}
          <!-- checkboxes -->
          <TagWrapper
            tagColor={filterOption.color}
            extraClasses="input-wrapper-focus flex justify-between gap-2"
          >
            <Checkbox
              name={filterOption.name}
              bind:checked={filterOption.active}
            >
              <span class="text-zinc-700 dark:text-zinc-300 italic"
                >({filterOption.count})</span
              >
            </Checkbox>
          </TagWrapper>
        {/each}
      </div>
      <div class="flex gap-2 justify-end">
        {#if showFilterLogic}
          <label
            aria-label="filter with and / or"
            for="switch"
            class="inline-flex items-center rounded-md cursor-pointer outline-2 outline-offset-1 focus-within:outline text-white border-2 border-green-700 dark:border-green-900/75"
          >
            <input
              bind:checked={filterLogicAndCtrl}
              aria-checked={filterLogicAndCtrl}
              id="switch"
              role="switch"
              type="checkbox"
              class="opacity-0 absolute peer"
            />
            <span
              class="px-4 py-3 rounded-l-sm
                        bg-white text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 peer-checked:bg-green-700 peer-checked:text-white dark:peer-checked:bg-green-900/75"
            >
              <Intersect aria-hidden="true" /><span class="sr-only">and</span
              ></span
            >
            <span
              class="px-4 py-3 rounded-r-sm
                    bg-green-700 dark:bg-green-900/75
                    peer-checked:text-zinc-500 peer-checked:bg-white dark:peer-checked:bg-zinc-800 dark:peer-checked:text-zinc-400"
            >
              <Union aria-hidden="true" /><span class="sr-only">or</span></span
            >
          </label>
        {/if}
        <ButtonLinks
          type="reset"
          on:click={resetFilters}
          disabled={!isFilterDirty}
          version="filled"
          color="green"
        >
          <Trash3 slot="icon" class="w-6 h-6 inline" />
          <span slot="label">Clear All</span>
        </ButtonLinks>

        <ButtonLinks type="submit" version="filled" color="green">
          <Funnel slot="icon" class="w-6 h-6 inline" />
          <span slot="label">Filter</span>
        </ButtonLinks>
      </div>
    </form>
  </Collapsible>
{/if}
