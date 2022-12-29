<!-- Emoji support -->
<script>
    import { onMount } from "svelte";
    onMount(() => twemoji.parse(document.body));
</script>

<svelte:head>
    <title>Climate Town Knowledge Hub</title>
    <!-- Emoji support with Twemoji https://github.com/twitter/twemoji -->
    <script
        src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
        crossorigin="anonymous"
    ></script>
</svelte:head>

<nav>
    <!-- image of width 4em -->
    <img
        style="width: 4em"
        src="/images/knowledge-hub-logo.png"
        alt="Knowledge Hub logo"
    />

    <a href="/">Home</a>
    <a href="/resources">Resources</a>

    <a href="https://github.com/ClimateTown/knowledge-hub"
        >✍ Contribute on GitHub</a
    >
    <a href="https://github.com/ClimateTown/knowledge-hub/graphs/contributors"
        >📣 Credits</a
    >
    <a href="https://www.climatetownproductions.com/">🌐 Main Website </a>
</nav>

<slot />

<style>
    /* Emoji support https://github.com/twitter/twemoji#inline-styles */
    :global(img.emoji) {
        height: 1em;
        width: 1em;
        margin: 0 0.05em 0 0.1em;
        vertical-align: -0.1em;
    }
</style>
