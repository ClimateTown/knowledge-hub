<!-- Emoji support -->
<script>
  import { base } from "$app/paths"
  import { GITHUB_URL, CLIMATE_TOWN_URL } from "$lib/constants"
  import DarkModeControl from "$lib/components/DarkModeControl.svelte"
  import { onMount } from "svelte"
  import mixpanel from "mixpanel-browser"
  import Footer from "$lib/components/Footer.svelte"
  import List from "svelte-bootstrap-icons/lib/List.svelte"

  // Mixpanel
  let prodToken = "8a77db5f474c225c17451f1bf5b2bca0"
  let devToken = "b14569fe907cb8e8ce3e19459c085225"
  let debug = process.env.NODE_ENV === "development"
  let token = process.env.NODE_ENV === "development" ? devToken : prodToken
  mixpanel.init(token, {
    debug: debug,
    track_pageview: true,
    persistence: "localStorage",
  })

  onMount(() => twemoji.parse(document.body))

  let isDropdownOpen = false

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen // togle state on click
  }

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
    isDropdownOpen = false
  }

  import "../app.css"
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
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div
  class="body flex flex-col w-full bg-zinc-50 dark:bg-neutral-900 dark:text-zinc-50"
>
  <header class="relative border-b border-slate-300">
    <a
      href="#main-content"
      class="absolute z-50 font-bold p-10 mt-8 rounded-lg dark:bg-white bg-neutral-800 hover:underline underline-offset-4 text-white dark:text-black text-2xl left-1/2 transform -translate-x-1/2 -translate-y-[999%] focus:translate-y-1/2 transition-all duration-200 ease-in-out"
    >
      Skip to main content
    </a>

    <div class="flex max-w-7xl mx-auto h-16 text-end">
      <div class="mx-8 flex flex-row justify-between items-center w-full">
        <a href="{base}/" class="flex flex-row items-center">
          <h2 class="font-bold text-2xl">Knowledge Hub</h2>
        </a>

        <div
          class="block md:hidden gap-2"
          on:focusout={handleDropdownFocusLoss}
        >
          <DarkModeControl cssClass="w-fit p-2"></DarkModeControl>

          <button on:click={handleDropdownClick}>
            <List width={24} height={24} />
          </button>

          {#if isDropdownOpen}
            <div
              class="w-40 absolute right-8 z-10 rounded-md bg-white dark:bg-neutral-900 shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <nav class="flex flex-col">
                <a
                  class="p-2 hover:underline underline-offset-4"
                  href="{base}/resources">Resources</a
                >
                <a
                  class="p-2 hover:underline underline-offset-4"
                  href="{base}/youtube">Video Feed</a
                >
                <a
                  class="p-2 hover:underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                  href={GITHUB_URL}
                >
                  Contribute <span class="sr-only">in a new tab</span>
                </a>
                <a
                  class="p-2 hover:underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                  href={CLIMATE_TOWN_URL}
                >
                  Climate Town <span class="sr-only">in a new tab</span>
                </a>
              </nav>
            </div>
          {/if}
        </div>

        <nav class="gap-2 hidden md:flex md:flex-wrap md:items-center">
          <a
            class="p-2 hover:underline underline-offset-4"
            href="{base}/resources">Resources</a
          >
          <a
            class="p-2 hover:underline underline-offset-4"
            href="{base}/youtube">Video Feed</a
          >
          <a
            class="p-2 hover:underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
            href={GITHUB_URL}
            >Contribute <span class="sr-only">in a new tab</span></a
          >
          <a
            class="p-2 hover:underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
            href={CLIMATE_TOWN_URL}
            >Climate Town <span class="sr-only">in a new tab</span>
          </a>
          <DarkModeControl cssClass="w-fit p-2"></DarkModeControl>
        </nav>
      </div>
    </div>
  </header>

  <main id="main-content">
    <slot />
  </main>
  <Footer />
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
