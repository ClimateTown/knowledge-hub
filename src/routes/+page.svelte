<script>
  import { base } from "$app/paths";
  import { github_url } from "$lib/constants";
</script>

<h1 class="font-bold text-5xl">Climate Town</h1>
<h2 class="font-semibold text-4xl pl-16">Knowledge Hub</h2>

<p class="pt-16">
  Welcome to the Climate Town Knowledge Hub, your one-stop shop for important
  resources in the fight against climate change! This website contains a
  collection of online resources, initiatives, and tools suggested by the
  Climate Town Discord community.
</p>

<p class="pt-6 pb-3">
  Some of the resource tags in the Knowledge Hub are special. These are prefaced
  with emojis:
</p>
<ul class="list-disc">
  <li>
    <span class="font-semibold">📚 Knowledge Hubs:</span> These are initiatives similar
    to the Climate Town Knowledge Hub. These initiatives curate various lists of climate-related
    resources, lists which may even be more specific in topic than the list
    of resources provided here, taking full advantage of the network effect!
  </li>
  <li>
    <span class="font-semibold">🍞 Rollie's Choice:</span> These are resources endorsed
    by the Climate Town team.
  </li>
  <li>
    <span class="font-semibold">✨ Mod Choice:</span> These are resources endorsed
    by the moderators of the Climate Town Discord.
  </li>
</ul>

<div class="grid grid-cols-2 pb-10">
  <div
    class="rounded-lg shadow-xl border-b-4 border-r-4 m-5 p-3 border-gray-200 md:col-span-1 col-span-2"
  >
    <h3>Resources</h3>
    <div class="my-3 text-gray-500">
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
      class="block w-fit p-4 rounded-lg border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>

      Resources
    </a>
  </div>
  <div
    class="rounded-lg shadow-xl border-b-4 border-r-4 m-5 p-3 border-gray-200 md:col-span-1 col-span-2"
  >
    <h3>YouTube Feed</h3>
    <div class="my-3 text-gray-500">
      A feed of Climate Town videos, right here in the Knowledge Hub!
    </div>
    <a
      href="{base}/youtube"
      class="block w-fit p-4 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 inline"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>

      YouTube Feed
    </a>
  </div>
</div>

<div class="text-xs text-slate-400">
  Legal Disclaimer: This website hosts content curated and managed by community
  members from the Climate Town Discord and is not directly managed by Climate
  Town YouTube. While every effort is made to ensure the quality of the content,
  we cannot guarantee its accuracy, completeness, or suitability for any
  purpose. The opinions and views expressed on this site are those of the
  individual contributors and do not necessarily reflect those of Climate Town
  YouTube. By using this website, you agree to hold the site administrators and
  contributors harmless from any liability arising from your use of the content.
</div>
