<script>
  import { base } from "$app/paths"

  import Book from "svelte-bootstrap-icons/lib/Book.svelte"
  import Play from "svelte-bootstrap-icons/lib/Play.svelte"
  import ButtonLinks from "$lib/components/ButtonLinks.svelte"

  import { github_url } from "$lib/constants"
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
    class="rounded-lg shadow-xl border-b-4 border-r-4 m-5 p-3 border-zinc-200 dark:border-zinc-900 md:col-span-1 col-span-2 flex flex-col"
  >
    <h3>Resources</h3>
    <div class="my-3 text-zinc-600 dark:text-zinc-300 grow">
      A crowdsourced collection of a variety of climate resources. Want to
      suggest a resource? Please <a
        href="{github_url}/issues/new/choose"
        class="underline">fill out our form</a
      >
      or
      <a href={github_url} class="underline">edit on GitHub directly</a>
    </div>

    <ButtonLinks
      link={true}
      url="{base}/resources"
      version="hollow"
      color="green"
      extraClasses="block w-fit !p-4 !gap-3"
    >
      <Book slot="icon" class="w-6 h-6 inline" />
      <span slot="label">Resources</span>
    </ButtonLinks>
  </div>
  <div
    class="rounded-lg shadow-xl border-b-4 border-r-4 m-5 p-3 border-zinc-200 dark:border-zinc-900 md:col-span-1 col-span-2 flex flex-col"
  >
    <h3>YouTube Feed</h3>
    <div class="my-3 text-zinc-600 dark:text-zinc-300 grow">
      A feed of Climate Town and various other popular climate YouTuber videos,
      right here in the Knowledge Hub!
    </div>

    <ButtonLinks
      link={true}
      url="{base}/youtube"
      version="hollow"
      color="red"
      extraClasses="block w-fit !p-4"
    >
      <Play slot="icon" class="w-6 h-6 inline" />
      <span slot="label">YouTube Feed</span>
    </ButtonLinks>
  </div>
</div>

<div class="text-xs text-zinc-500 dark:text-zinc-400 pb-5">
  Legal Disclaimer: This website hosts content curated and managed by community
  members from the Climate Town Discord and is not directly managed by Climate
  Town YouTube. While every effort is made to ensure the quality of the content,
  we cannot guarantee its accuracy, completeness, or suitability for any
  purpose. The opinions and views expressed on this site are those of the
  individual contributors and do not necessarily reflect those of Climate Town
  YouTube. By using this website, you agree to hold the site administrators and
  contributors harmless from any liability arising from your use of the content.
</div>

<div class="text-xs text-zinc-500 dark:text-zinc-400">
  Data Disclaimer: By using this website, you consent to the collection of usage
  data, including clicks on "resources", search terms used, and pages visited.
  This data is solely used to monitor site usage, and to enhance the reach of
  the project. As this project is open source, you can inspect the usage of
  analytics. Our analytics platform is Mixpanel (see their privacy policy <a
    href="https://mixpanel.com/legal/privacy-policy"
    class="underline">here</a
  >), with data being stored in the EU.
</div>
