<script lang="ts">
  import ButtonLinks from "./ButtonLinks.svelte"
  import { createEventDispatcher } from "svelte"
  import { replaceStateWithQuery } from "$lib/utils"

  export let searchTerm: string | null = ""

  const dispatch = createEventDispatcher()

  function onSubmit() {
    if (searchTerm) {
      replaceStateWithQuery({
        q: searchTerm,
      })

      dispatch("search", { searchTerm })
    }
  }
</script>

<form on:submit|preventDefault={onSubmit} class="mb-3" role="search">
  <label for="search" class="sr-only">Search by keyword</label>
  <input
    type="search"
    bind:value={searchTerm}
    placeholder="Search by keyword"
    id="search"
    name="search"
    class="p-2 rounded-lg border-2 border-green-500 dark:border-green-700 text-green-700 dark:text-green-500 dark:bg-transparent"
  />
  <ButtonLinks type="submit" version="filled" color="green">
    <span slot="label">Search</span>
  </ButtonLinks>
</form>
