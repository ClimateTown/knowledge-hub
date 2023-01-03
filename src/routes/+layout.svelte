<!-- Emoji support -->
<script>
    import "../app.css";
    import { onMount } from "svelte";
    onMount(() => twemoji.parse(document.body));
</script>

<svelte:head>
    <title>My App</title>
    <!-- TODO: Remove line in production -->
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <!-- Emoji support with Twemoji https://github.com/twitter/twemoji -->
    <script
        src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<div class="body h-screen flex">
<div class="w-1/5 bg-green-600 flex flex-col p-5 h-screen">
    <img src="/images/knowledge-hub-logo.png" alt="Logo of Knowledge Hub" />
<nav class="space-y-6 flex flex-col">
    <button class="bg-slate-200 p-3 drop-shadow-md"><a href="/">Home</a></button>
    <button class="bg-slate-200 p-3 drop-shadow-md"><a href="/resources">Resources</a></button>
    <button class="bg-slate-200 p-3 drop-shadow-md"><a href="/youtube">YouTube Feed</a></button>
</nav>
</div>

<div class="w-4/5 py-10 pb-5 pt-24 px-32">
    <slot />
</div>

</div>

<style>
    :global(img.emoji) {
        height: 1em;
        width: 1em;
        margin: 0 0.05em 0 0.1em;
        vertical-align: -0.1em;
    }
</style>
