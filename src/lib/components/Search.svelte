<script lang="ts">
	import { createEventDispatcher } from "svelte";

    let searchTerm = '';

    const dispatch = createEventDispatcher();

    function onSubmit(){
        dispatch("search", {searchTerm})
    }

</script>

<form on:submit|preventDefault={onSubmit} class="p-4 space-y-4">
	<label for="search" />
	<input
		type="text"
		bind:value={searchTerm}
		placeholder="Search by keyword"
		id="search"
		name="search"
		class="p-2 rounded-lg border-2 border-green-500 dark:border-green-700 text-green-700 dark:text-green-500"
	/>
	<button
		type="submit"
		class="p-2 rounded-lg bg-green-700 text-white dark:bg-green-900/75"
	>
		Search
	</button>
</form>
