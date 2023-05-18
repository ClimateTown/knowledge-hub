<!-- Emoji support -->
<script>
  import { base } from "$app/paths";
  import { github_url, climate_town_url } from "$lib/constants";
  import { onMount } from "svelte";
  onMount(() => twemoji.parse(document.body));

  import "../app.css";
</script>

<svelte:head>
  <title>Climate Town Knowledge Hub</title>
  <meta name="og:title" content="Climate Town Knowledge Hub" />
  <meta property="og:site_name" content="Climate Town Knowledge Hub" />
  <meta property="twitter:site" content="@ClimateTown" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta name="theme-color" content="#22c55e">
  <meta
    name="description"
    content="Your one-stop shop for important climate resources that you wish you knew about yesterday. The resource database spans multiple categories from activism, climate accountability, politics, climate tech/open source, climate journalism, and more."
  />
  <meta
    name="og:description"
    content="Your one-stop shop for important climate resources that you wish you knew about yesterday. The resource database spans multiple categories from activism, climate accountability, politics, climate tech/open source, climate journalism, and more."
  />
  <meta property="og:image" content="{base}/images/knowledge-hub-image.png" />
  <meta property="og:image:alt" content="seascape mountain ranges in the background with an open book centered in the foreground below a bright green tree at sunrise" />

  <!-- Emoji support with Twemoji https://github.com/twitter/twemoji -->
  <script
    src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
    crossorigin="anonymous"></script>
</svelte:head>

<div class="body flex flex-col lg:flex-row w-full">
  <div
    class="lg:w-fit w-full bg-green-500 flex flex-col p-5 min-h-max lg:min-h-screen"
  >
    <a href="{base}/">
      <img
        class="w-48 self-center"
        src="{base}/images/knowledge-hub-logo.png"
        alt="Logo of Knowledge Hub"
      />
    </a>
    <nav class="gap-2 flex flex-wrap lg:flex-col">
      <a
        class="p-2 text-slate-200 bg-green-600 font-bold rounded-lg"
        href="{base}/">Home</a
      >
      <a
        class="p-2 text-slate-200 bg-green-600 font-bold rounded-lg"
        href="{base}/resources">Resources</a
      >
      <a
        class="p-2 text-slate-200 bg-green-600 font-bold rounded-lg"
        href="{base}/youtube">YouTube Feed</a
      >
      <div class="h-4" />
      <a
        class="p-2 text-slate-200 bg-green-600 font-bold rounded-lg"
        target="_blank"
        rel="noreferrer"
        href={github_url}>✍ Contribute on GitHub</a
      >
      <a
        class="p-2 text-slate-200 bg-green-600 font-bold rounded-lg"
        target="_blank"
        rel="noreferrer"
        href="{github_url}/#contributors">📣 Credits</a
      >
      <a
        class="p-2 text-slate-200 bg-green-600 font-bold rounded-lg"
        target="_blank"
        rel="noreferrer"
        href={climate_town_url}
        >🌐 Main Website
      </a>
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
    display: inline;
  }
</style>
