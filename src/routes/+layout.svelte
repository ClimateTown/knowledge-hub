<!-- Emoji support -->
<script>
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    onMount(() => twemoji.parse(document.body));

    import "../app.css"
</script>

<svelte:head>
    <title>Climate Town Knowledge Hub</title>
    <!-- Emoji support with Twemoji https://github.com/twitter/twemoji -->
    <script
        src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="body flex flex-col lg:flex-row min-w-fit">
    <div class="w-full lg:w-1/5 bg-green-600 flex flex-col lg:p-5 min-h-max lg:min-h-screen px-16">
        <img class="md:w-6/12 lg:w-full self-center" src="{base}/images/knowledge-hub-logo.png" alt="Logo of Knowledge Hub" />
        <nav class="self-center gap-4 flex flex-wrap lg:flex-col pb-6 lg:pb-0">
            <button class="bg-slate-200 p-3 drop-shadow-md"><a href="{base}/">Home</a></button>
            <button class="bg-slate-200 p-3 drop-shadow-md"><a href="{base}/resources">Resources</a></button>
            <button class="bg-slate-200 p-3 drop-shadow-md"><a href="{base}/youtube">YouTube Feed</a></button>
            <button class="bg-slate-200 p-3 drop-shadow-md"><a href="https://github.com/ClimateTown/knowledge-hub">✍ Contribute on GitHub</a></button>
            <button class="bg-slate-200 p-3 drop-shadow-md"><a href="https://github.com/ClimateTown/knowledge-hub/graphs/contributors">📣 Credits</a></button>
            <button class="bg-slate-200 p-3 drop-shadow-md"><a href="https://www.climatetownproductions.com/">🌐 Main Website </a></button>
        </nav>
    </div>

    <div class="w-full lg:w-4/5 py-10 pb-5 lg:pt-24 lg:px-32 px-8">
        <slot />
    </div>
</div>

<style>
    /* Emoji support https://github.com/twitter/twemoji#inline-styles */
    :global(img.emoji) {
        height: 1em;
        width: 1em;
        margin: 0 0.05em 0 0.1em;
        vertical-align: -0.1em;
    }
</style>
