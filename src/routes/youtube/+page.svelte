<script lang="ts">
    import type { PageData } from "./$types";
    import YoutubeVideo from "./YoutubeVideo.svelte";

    export let data: PageData;

    let videoData = data.payload.videoData;
    let channelData = data.payload.channelData;
    let displayedVideos = videoData;

    let rerender: boolean = false;

    // Sort channel data by subcount (bubbling Climate Town to the top)
    function channelSort(a: any, b: any) {
        const ClimateTownChannelId = "UCuVLG9pThvBABcYCm7pkNkA";
        if (a.channelId === ClimateTownChannelId) {
            return -1;
        }
        if (b.channelId === ClimateTownChannelId) {
            return 1;
        }

        // Normal sort
        return b.channelSubCount - a.channelSubCount;
    }
    channelData.sort(channelSort);
    channelData.reverse();

    function getChannelData(channelId: string) {
        // Given a channel ID, return the channel data from the array
        return channelData.find((channel) => channel.channelId === channelId);
    }

    // Creating filter object
    type channelFilterItem = { channelId: string; active: boolean };

    // Creating initial filter object and state
    let filterObject: channelFilterItem[] = [];
    for (let channelInfo of channelData) {
        filterObject.push({ channelId: channelInfo.channelId, active: true });
    }

    function filterResources(event) {
        // Filter videos based on channel selection in form

        // Reset displayed videos
        displayedVideos = [];

        // Channels
        let channelList: string[] = filterObject
            .filter((channel) => channel.active === true) // Filter out inactive channels
            .map((channel) => channel.channelId); // Get channel IDs

        for (let video of videoData) {
            console.log(video.channelId);
            if (channelList.includes(video.channelId)) {
                displayedVideos.push(video);
            }
        }
        console.log(channelList);
        console.log(displayedVideos);

        // Force svelte re-render
        rerender = !rerender;
    }

    function semanticNumber(number: number) {
        // if number between 1 and 99
        if (number < 1000) {
            return "<1k";
        }
        if (number >= 1000) {
            return `${Math.floor(number / 1000)}k`;
        }
    }
</script>

<!-- begin form -->
<form on:submit|preventDefault={filterResources}>
    {#each channelData as channelInfo, index}
        <div>
            <input
                type="checkbox"
                bind:checked={filterObject[index].active}
                id={channelInfo.channelId}
            />
            <label for={channelInfo.channelId}
                >{channelInfo.channelName} ({semanticNumber(
                    channelInfo.channelSubCount
                )})</label
            >
        </div>
    {/each}
    <button type="submit">Filter</button>
</form>

{#key rerender}
    <div class="grid grid-flow-row xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 gap-2">
        {#each displayedVideos as video}
            <YoutubeVideo
                {...video}
                channelInfo={getChannelData(video.channelId)}
            />
        {:else}
            <div>No videos here!</div>
        {/each}
    </div>
{/key}
