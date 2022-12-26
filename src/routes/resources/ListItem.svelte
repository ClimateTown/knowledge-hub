<script>
    export let title;
    export let url;
    export let description;
    export let tags;
</script>

<div>
    <a href={url}>{title}</a>
    <p>
        {description}
    </p>
    {#each tags as tag}
        <span>{tag}</span>
    {/each}
</div>

<style>
    div {
        border-style: solid;
        margin: 1em;
    }
    span {
        margin: 1em;
    }
</style>
