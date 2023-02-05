<script lang="ts">
    export let title: string;
    export let url: string;
    export let description: string;
    export let tags: Array<string>;
</script>

<div class="w-full rounded-lg shadow-lg">
    <img
        alt="Website preview"
        class="object-cover rounded-t-lg object-center h-48 w-full"
        src="images/plant.jpg"
    />
    <div class="m-3">
        <a href={url} target="_blank" rel="noreferrer">
            <div class="text-xl font-medium text-gray-900 mt-3">
                <span class="hover:underline">
                    {title}
                </span>
                <span
                    class="transition ease-in-out hover:scale-105 w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500"
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
        </a>
        <p class="mt-2 text-gray-700">{description}</p>
        <div class="flex space-x-2 text-sm pt-2">
            {#each tags as tag}
                <div class="bg-gray-200 rounded-lg p-1">
                    {tag}
                </div>
            {/each}
        </div>
    </div>
</div>
