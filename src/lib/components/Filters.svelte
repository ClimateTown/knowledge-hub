<script lang="ts">
  import Collapsible from "./Collapsible.svelte";
  import { removeWhitespace } from "$lib/utils";
  import { darkColors, lightColors } from "../resources";

  interface FilterOption {
    [key: string]: any;
  }
  
  export let onSubmit: () => void;
  export let filterOptions: FilterOption[]; // create special filter object tpe
  export let checkboxMapping: { [key: string]: boolean } = {};
  export let defaultChecked: boolean = false;
  export let optionDisplay: string | ((d: FilterOption) => string);
  export let optionId: string | ((d: FilterOption) => string);
  export let optionCount: string | ((d: FilterOption) => string);

  $: isFilterDirty = Object.values(checkboxMapping).some(
    (checkbox_selected) => checkbox_selected !== defaultChecked
  );

  function resolveInputValue(filterOption: FilterOption, functionOrField: string | ((d: FilterOption) => string)): string {
    if (typeof functionOrField === "string") {
      const field = functionOrField;
      return filterOption[field];
    } else {
      const function_ = functionOrField;
      return function_(filterOption);
    }
  };

  function resetFilters() {
    for (const key in checkboxMapping) {
      // set all filters to false
      checkboxMapping[key] = defaultChecked;
    }
    onSubmit();
  }
</script>

<Collapsible label="Filter">
  <form on:submit|preventDefault={onSubmit} class="p-4 space-y-4">
    <div class="flex flex-row flex-wrap gap-2">
      {#each filterOptions as filterOption}
        <div
          class="input-wrapper-focus flex justify-between gap-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white"
          class:option-color={lightColors[filterOption.color] ||
            darkColors[filterOption.color]}
          style:--option-color={lightColors[filterOption.color]}
          style:--option-color-dark={darkColors[filterOption.color]}
        >
          <label
            class="cursor-pointer py-2 px-3 rounded-full flex items-center gap-2 text-sm"
            for={removeWhitespace(resolveInputValue(filterOption, optionId))}
          >
            <input
              type="checkbox"
              class="appearance-none cursor-pointer w-6 h-6 rounded-full bg-white dark:bg-black checked:bg-black dark:checked:bg-green-600 transition duration-200"
              bind:checked={checkboxMapping[resolveInputValue(filterOption, optionId)]}
              id={removeWhitespace(resolveInputValue(filterOption, optionId))}
              name={removeWhitespace(resolveInputValue(filterOption, optionDisplay))}
            />
            <span>
              {resolveInputValue(filterOption, optionDisplay)}
              <span class="text-zinc-700 dark:text-zinc-300 italic"
                >({resolveInputValue(filterOption, optionCount)})</span
              >
            </span>
          </label>
        </div>
      {/each}
    </div>
    <div class="flex justify-end">
      <button
        on:click|preventDefault={resetFilters}
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
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(0 1 1 0 2.5 2.5)"
          >
            <path
              d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"
            />

            <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)" />
          </g>
        </svg>
        Reset
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
