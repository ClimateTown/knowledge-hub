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
<form on:submit|preventDefault={filterResources}>
    <!-- <label for="search">Search</label> -->
    <!-- <input type="text" id="search" name="search" /> -->
    {#each tags as tag}
        <!-- checkbox -->
        <div>
            <input
                type="checkbox"
                bind:checked={filterObject.tags[tag]}
                id={removeWhitespace(tag)}
                name={removeWhitespace(tag)}
            />
            <label for={tag}>{tag}</label>
        </div>
    {/each}
    <button type="submit">Filter</button>
</form>

{#each displayedResources as resource}
    <ListItem {...resource} />
{:else}
    <div>No resources here!</div>
{/each}
