<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    let resources = data.payload.resources;
    let displayedResources = resources;
    let tagLogicAnd: boolean = true; // Whether all the selected tags must match the resource (vs any of the selected tags)
    // TODO: make this a user preference
    $: tagLogic = tagLogicAnd ? "and" : "or";

    let tags = data.payload.tags;
    // Creating filter object
    let filterObject: any = {};
    filterObject["tags"] = {};
    let tag: string;
    for (tag of tags) {
        filterObject.tags[tag] = false;
    }

    let removeWhitespace = (str: string) => {
        return str.replace(/\s/g, "");
    };

    function filterResources(event) {
        // Reset displayed resources
        displayedResources = [];

        let resource;
        let tag: string;

        // Tags of interest
        let filterTags: string[] | Set<string> = Object.keys(
            filterObject.tags
        ).filter((tag) => filterObject.tags[tag] === true);
        filterTags = new Set(filterTags);

        let minCommonTags = tagLogic ? filterTags.size : 1;
        let resourceTags: Set<string>;
        for (resource of resources) {
            // Resource tags
            resourceTags = new Set(resource.tags);

            if (
                setIntersection(filterTags, resourceTags).size >= minCommonTags
            ) {
                displayedResources.push(resource);
            }
            console.log(
                resource.title,
                setIntersection(filterTags, resourceTags)
            );
        }

        // Force svelte re-render
        console.log(filterTags);
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

    import ListItem from "./ListItem.svelte";
</script>

<!-- begin form -->
<form on:submit|preventDefault={filterResources} class="border-solid border-2 rounded p-4 space-y-4">
    <h2>Filter</h2>
    <!-- <label for="search">Search</label> -->
    <!-- <input type="text" id="search" name="search" /> -->
    <div class="flex flex-row flex-wrap gap-2">
    {#each tags as tag}
        <!-- checkbox -->
        <div class="checkbox-item flex justify-between gap-2">
            <input
                type="checkbox"
                class="appearance-none bg-white checked:bg-black checked:border-blue-400 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                bind:checked={filterObject.tags[tag]}
                id={removeWhitespace(tag)}
                name={removeWhitespace(tag)}
            />
            <label for={tag}>{tag}</label>
        </div>
    {/each}
    </div>
    <button type="submit">Filter</button>
</form>

<div class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-4 mt-3">
    {#each displayedResources as resource}
        <ListItem {...resource} />
    {:else}
        <div>No resources here!</div>
    {/each}
</div>

<style>
    .checkbox-item {
        background-color: rgb(209 213 219);
        padding: 10px 14px 10px 14px;
        border-radius: 5px;
    }

    @media (min-width: 640px) {
        input[type=checkbox] {
        width: 25px;
        height: 25px;
        border-radius: 7px !important;
        }
    }

    input[type=checkbox] {
        width: 25px;
        height: 25px;
        border-radius: 7px !important;
    }

    

</style>