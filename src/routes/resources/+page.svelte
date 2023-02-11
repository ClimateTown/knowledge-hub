<script lang="ts">
    import { onMount } from "svelte";
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
    // Collapsable
    onMount(() => {
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    });
</script>

<h1 class="pb-5">Resources</h1>

<div class="collapsible cursor-pointer text-2xl rounded-lg p-2 border-2">
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
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
    </svg>

    Filter
</div>
<div class="content">
    <!-- begin form -->
    <form
        on:submit|preventDefault={filterResources}
        class="border-solid border-2 rounded-lg p-4 space-y-4"
    >
        <!-- <label for="search">Search</label> -->
        <!-- <input type="text" id="search" name="search" /> -->
        <div class="flex flex-row flex-wrap gap-2">
            {#each tags as tag}
                <!-- checkboxes -->
                <div
                    class="flex justify-between gap-2 py-2 px-3 rounded-full cursor-pointer bg-gray-300"
                >
                    <input
                        type="checkbox"
                        class="appearance-none w-6 h-6 bg-white rounded-full checked:bg-black transition duration-200"
                        bind:checked={filterObject.tags[tag]}
                        id={removeWhitespace(tag)}
                        name={removeWhitespace(tag)}
                    />
                    <label for={tag}>{tag}</label>
                </div>
            {/each}
        </div>
        <div class="flex flex-row-reverse">
            <button
                type="submit"
                class="p-2 rounded-lg bg-green-500 text-white"
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
</div>

<div
    class="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4 mt-3"
>
    {#each displayedResources as resource}
        <ListItem {...resource} />
    {:else}
        <div>No resources here!</div>
    {/each}
</div>
