<script lang="ts">
  import ButtonLinks from "./ButtonLinks.svelte"
  import { createEventDispatcher } from "svelte"

  let searchTerm = ""

  const dispatch = createEventDispatcher()

  function onSubmit() {
    dispatch("search", { searchTerm })
  }
</script>

<form on:submit|preventDefault={onSubmit} class="mb-3" role="search">
  <label for="search" />
  <input
    type="search"
    aria-label="search text"
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
