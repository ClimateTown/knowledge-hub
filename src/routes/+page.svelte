<script>
  import { base } from "$app/paths";

  import Book from "svelte-bootstrap-icons/lib/Book.svelte";
  import Play from "svelte-bootstrap-icons/lib/Play.svelte";

  import { github_url } from "$lib/constants";
</script>

<h1 class="font-bold text-5xl">Climate Town</h1>
<h2 class="font-semibold text-4xl pl-16">Knowledge Hub</h2>

<p class="pt-16 leading-7">
  Welcome to the Climate Town Knowledge Hub, your one-stop shop for important
  resources in the fight against climate change! This website contains a
  collection of online resources, initiatives, and tools suggested by the
  Climate Town Discord community.
</p>

<p class="pt-6 pb-3 leading-7">
  Some of the resource tags in the Knowledge Hub are special. These are prefaced
  with emojis:
</p>
<ul class="list-disc leading-6">
  <li class="mb-2">
    <span class="font-semibold">📚 Knowledge Hubs:</span> These are initiatives similar
    to the Climate Town Knowledge Hub. These initiatives curate various lists of
    climate-related resources, lists which may even be more specific in topic than
    the list of resources provided here, taking full advantage of the network effect!
  </li>
  <li class="mb-2">
    <span class="font-semibold">🍞 Rollie's Choice:</span> These are resources endorsed
    by the Climate Town team.
  </li>
  <li class="mb-2">
    <span class="font-semibold">✨ Mod Choice:</span> These are resources endorsed
    by the moderators of the Climate Town Discord.
  </li>
</ul>

<div class="grid grid-cols-2 pb-10">
  <div
    class="rounded-lg shadow-xl border-b-4 border-r-4 m-5 p-3 border-zinc-200 dark:border-zinc-900 md:col-span-1 col-span-2"
  >
    <h3>Resources</h3>
    <div class="my-3 text-zinc-600 dark:text-zinc-300">
      A crowdsourced collection of a variety of climate resources. Want to
      suggest a resource? Please <a
        href="{github_url}/issues/new/choose"
        class="underline">fill out our form</a
      >
      or
      <a href={github_url} class="underline">edit on GitHub directly</a>
    </div>

    <a
      href="{base}/resources"
      class="block w-fit p-4 rounded-lg border-2 border-green-500 dark:border-green-700 text-green-700 dark:text-green-500 hover:text-black hover:bg-green-500 dark:hover:text-white dark:hover:bg-green-900 transition-colors"
    >
      <Book class="w-6 h-6 inline" />
      Resources
    </a>
  </div>
  <div
    class="rounded-lg shadow-xl border-b-4 border-r-4 m-5 p-3 border-zinc-200 dark:border-zinc-900 md:col-span-1 col-span-2"
  >
    <h3>YouTube Feed</h3>
    <div class="my-3  text-zinc-600 dark:text-zinc-300">
      A feed of Climate Town and various other popular climate YouTuber videos,
      right here in the Knowledge Hub!
    </div>
    <a
      href="{base}/youtube"
      class="block w-fit p-4 rounded-lg border-2 border-red-500 dark:border-red-700 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-black dark:hover:text-white dark:hover:bg-red-900 transition-colors"
    >
      <Play class="w-6 h-6 inline" />
      YouTube Feed
    </a>
  </div>
</div>

<div class="text-xs text-zinc-500 dark:text-zinc-400">
  Legal Disclaimer: This website hosts content curated and managed by community
  members from the Climate Town Discord and is not directly managed by Climate
  Town YouTube. While every effort is made to ensure the quality of the content,
  we cannot guarantee its accuracy, completeness, or suitability for any
  purpose. The opinions and views expressed on this site are those of the
  individual contributors and do not necessarily reflect those of Climate Town
  YouTube. By using this website, you agree to hold the site administrators and
  contributors harmless from any liability arising from your use of the content.
</div>
