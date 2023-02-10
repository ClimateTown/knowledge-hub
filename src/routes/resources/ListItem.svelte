<script lang="ts">
    export let title: string;
    export let url: string;
    export let description: string;
    export let og_preview: string | undefined;
    export let tags: Array<string>;

    import { base } from "$app/paths";
</script>

<a href={url} target="_blank" rel="noreferrer">
    <div class="rounded-lg shadow-lg transition ease-in-out hover:scale-105">
        {#if og_preview}
            <img
                class="object-cover rounded-t-lg object-center h-48 w-full"
                alt="Website preview"
                src={og_preview}
            />
        {:else}
            <div
                class="object-cover rounded-t-lg object-center h-48 w-full bg-gray-500 inline-flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-16 h-16 text text-gray-300"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                </svg>
            </div>
        {/if}

        <div class="m-3">
            <div class="text-xl font-medium text-gray-900 mt-3">
                <span>
                    {title}
                </span>
                <span
                    class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 inline bg-center"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                    </svg>
                </span>
            </div>
            <p class="mt-2 text-gray-700">{description}</p>
            <div class="flex flex-wrap text-xs py-2">
                {#each tags as tag}
                    <div class="bg-gray-200 rounded-lg whitespace-nowrap p-1 my-1 mr-2 ">
                        {tag}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</a>
