<script>
    export let title;
    export let url;
    export let description;
    export let tags;
</script>

<div class="card space-y-5 flex flex-col mt-7 justify-between">
    <div class="border-b-2 flex">
        <h2>{title}</h2>
        <a class="pl-2 pt-2" href={url}>Link</a>
    </div>
    <div class="flex flex-col justify-between">
        <div class="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0">
            <p class="md:w-10/12">
                {description}
            </p>
        <img class="md:w-2/12" src="/images/plant.jpg" style="width:300px;height:300px;" alt="watering a plant" />
        </div>
        <div class="flex space-x-2 pt-4 md:pt-0">
                {#each tags as tag}
                    <div class="bg-gray-200 rounded p-2">
                        {tag}
                    </div>
                {/each}
        </div>
    </div>
</div>

<style>
    .card {
        padding: 15px 30px 15px 30px;
        border-radius: 5px;
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.75);
    }
</style>
