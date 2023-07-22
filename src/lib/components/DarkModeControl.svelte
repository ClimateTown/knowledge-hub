<script lang="ts">
    import { browser } from "$app/environment";

    import MoonStarsFill from "svelte-bootstrap-icons/lib/MoonStarsFill.svelte";
    import SunFill from "svelte-bootstrap-icons/lib/SunFill.svelte";

    export let cssClass: string;
    let darkMode: boolean;
    $: darkMode = browser
        ? localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
        : false;

    const setColorMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            darkMode = false;
            if (browser) {
                localStorage.theme = "light";
            }
        } else {
            document.documentElement.classList.add("dark");
            darkMode = true;
            if (browser) {
                localStorage.theme = "dark";
            }
        }
        return;
    };
</script>

<button type="button" class={cssClass} on:click={setColorMode}>
    {#if darkMode}
        <MoonStarsFill />
    {:else}
        <SunFill />
    {/if}
    <span class="sr-only">Colour Scheme Mode</span>
</button>
