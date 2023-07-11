<!-- Emoji support -->
<script>
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { github_url, climate_town_url } from "$lib/constants";
  import { onMount } from "svelte";
  onMount(() => twemoji.parse(document.body));

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

  import "../app.css";
</script>

<svelte:head>
  <title>Climate Town Knowledge Hub</title>
  <meta name="og:title" content="Climate Town Knowledge Hub" />
  <meta property="og:site_name" content="Climate Town Knowledge Hub" />
  <meta property="twitter:site" content="@ClimateTown" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta name="theme-color" content="#22c55e" />
  <meta
    name="description"
    content="Your one-stop shop for important climate resources that you wish you knew about yesterday. The resource database spans multiple categories from activism, climate accountability, politics, climate tech/open source, climate journalism, and more."
  />
  <meta
    name="og:description"
    content="Your one-stop shop for important climate resources that you wish you knew about yesterday. The resource database spans multiple categories from activism, climate accountability, politics, climate tech/open source, climate journalism, and more."
  />
  <meta property="og:image" content="{base}/images/knowledge-hub-image.png" />
  <meta
    property="og:image:alt"
    content="seascape mountain ranges in the background with an open book centered in the foreground below a bright green tree at sunrise"
  />

  <!-- yt thumbnails, crossbrowser preconnect hint -->
  <link rel="preconnect" href="https://i.ytimg.com" />
  <link rel="dns-prefetch" href="https://i.ytimg.com" />

  <!-- Emoji support with Twemoji https://github.com/twitter/twemoji -->
  <link
    rel="preload"
    href="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
    as="script"
  />
  <script
    src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
    crossorigin="anonymous"></script>
</svelte:head>

<div
  class="body flex flex-col lg:flex-row w-full bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50"
>
  <header
    class="lg:w-fit w-full bg-green-500 dark:bg-green-900/75 flex flex-col p-5 min-h-max lg:min-h-screen"
  >
    <a href="{base}/">
      <picture class="w-48 self-center">
        <source
          type="image/avif"
          srcset="{base}/images/knowledge-hub-logo.avif"
        />
        <source
          type="image/webp"
          srcset="{base}/images/knowledge-hub-logo.webp"
        />
        <img
          height="180"
          width="180"
          src="{base}/images/knowledge-hub-logo.png"
          alt="Climate Town Knowledge Hub"
        />
      </picture>
    </a>
    <nav class="gap-2 flex flex-wrap lg:flex-col grow">
      <a
        class="p-2 text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        href="{base}/">Home</a
      >
      <a
        class="p-2 text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        href="{base}/resources">Resources</a
      >
      <a
        class="p-2 text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        href="{base}/youtube">YouTube Feed</a
      >
      <div class="h-4" />
      <a
        class="p-2 text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        target="_blank"
        rel="noreferrer"
        href={github_url}
        >✍ Contribute on GitHub <span class="sr-only">in a new tab</span></a
      >
      <a
        class="p-2 text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        target="_blank"
        rel="noreferrer"
        href="{github_url}/#contributors"
        >📣 Credits <span class="sr-only">in a new tab</span></a
      >
      <a
        class="p-2 text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        target="_blank"
        rel="noreferrer"
        href={climate_town_url}
        >🌐 Main Website <span class="sr-only">in a new tab</span>
      </a>
    </nav>
    <div>
      <button
        type="button"
        class="p-2 w-full text-left text-zinc-100 bg-green-700/75 dark:bg-green-950 font-bold rounded-lg"
        on:click={setColorMode}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  </header>

  <main class="w-full lg:w-4/5 py-10 pb-5 lg:pt-24 lg:px-32 px-8">
    <slot />
  </main>
</div>

<style>
  /* Emoji support https://github.com/twitter/twemoji#inline-styles */
  :global(img.emoji) {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
    display: inline;
  }
</style>
