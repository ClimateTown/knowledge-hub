<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { FilterOption, FilterLogic, CustomFilterEvent } from "$lib/interfaces";
    import Collapsible from "$lib/components/Collapsible.svelte";
    import TagWrapper from "$lib/components/TagWrapper.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";
    import ButtonLinks from "$lib/components/ButtonLinks.svelte";
    const dispatch = createEventDispatcher<CustomFilterEvent>();
    let form: HTMLFormElement;

    export let filterOptions: FilterOption[];

    export let showFilterLogic: boolean = true;
    // Whether all the selected tags must match the resource (vs any of the selected tags)
    export let filterLogicAnd: boolean = true;
    let filterLogic: FilterLogic
    $: filterLogic = filterLogicAnd ? "and" : "or";

    let isFilterDirty: boolean;
    $: isFilterDirty = filterOptions.some(
        (option: FilterOption) => option.active === true
    );

    const resetFilters = () => {
        filterOptions.forEach(option => option.active = false)
        dispatch("filter", {filterOptions, filterLogic})
    }

    const onSubmit = () => {
        dispatch("filter", {filterOptions, filterLogic})
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
                {#each filterOptions as option}
                    <!-- checkboxes -->
                    <TagWrapper
                        tagColor={option.color}
                        extraClasses="input-wrapper-focus flex justify-between gap-2"
                    >
                        <Checkbox
                            name={option.name}
                            bind:checked={option.active}
                        >
                            <span
                                class="text-zinc-700 dark:text-zinc-300 italic"
                                >({option.count})</span
                            >
                        </Checkbox>
                    </TagWrapper>
                {/each}
            </div>
            <div class="flex gap-2 justify-end">
                {#if showFilterLogic}
                <label aria-label={filterLogic}
                    for="switch"
                    class="inline-flex items-center rounded-md cursor-pointer text-white border-2 border-green-700 dark:border-green-900/75"
                >
                    <input
                        bind:checked={filterLogicAnd}
                        id="switch"
                        type="checkbox"
                        class="hidden peer"
                    />
                    <span aria-hidden={!filterLogicAnd}
                        class="px-4 py-2 rounded-l-sm 
                        bg-white text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800 peer-checked:bg-green-700 peer-checked:text-white dark:peer-checked:bg-green-900/75"
                        >And</span
                    >
                    <span aria-hidden={filterLogicAnd}
                        class="px-4 py-2 rounded-r-sm 
                        bg-green-700 dark:bg-green-900/75
                        peer-checked:text-zinc-500 peer-checked:bg-white dark:peer-checked:bg-zinc-800 dark:peer-checked:text-zinc-400"
                        >Or</span
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
                    <svg
                        slot="icon"
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
                    <span slot="label">Clear All</span>
                </ButtonLinks>

                <ButtonLinks type="submit" version="filled" color="green">
                    <svg
                        slot="icon"
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
                    <span slot="label">Filter</span>
                </ButtonLinks>
            </div>
        </form>
    </Collapsible>
{/if}
