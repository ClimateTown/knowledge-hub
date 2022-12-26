<!-- import PageData type -->
<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    let resources = data.payload.resources;

    import ListItem from "./ListItem.svelte";
</script>

{#each resources as resource}
    <ListItem {...resource} />
{/each}
