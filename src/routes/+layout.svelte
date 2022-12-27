<!-- Emoji support -->
<script>
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

<nav>
    <a href="/">Home</a>
    <a href="/resources">Resources</a>
    <a href="/youtube">YouTube Feed</a>
</nav>

<slot />

<style>
    :global(img.emoji) {
        height: 1em;
        width: 1em;
        margin: 0 0.05em 0 0.1em;
        vertical-align: -0.1em;
    }
</style>
