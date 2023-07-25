<script lang="ts">
  import { base } from "$app/paths";
  import { github_url } from "$lib/constants";

  import ButtonLinks from "$lib/components/ButtonLinks.svelte";
</script>

<nav aria-label="Resource Navigation" class="flex flex-wrap gap-2 pb-3">
  <ButtonLinks
    link={true}
    url="{github_url}/issues/new/choose"
    version="hollow"
    color="green"
    newTab={true}
  >
    <svg
      slot="icon"
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
    <span slot="label">Suggest resource</span></ButtonLinks
  >

  <ButtonLinks
    link={true}
    url="{github_url}/edit/main/data/resources.yml"
    version="hollow"
    color="green"
    newTab={true}
  >
    <svg
      slot="icon"
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
    <span slot="label">Edit</span>
  </ButtonLinks>

  <ButtonLinks
    link={true}
    download={true}
    url="{base}/ClimateTown-Knowledge-Hub-resources.csv"
    version="hollow"
    color="green"
  >
    <svg
      slot="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="w-6 h-6 inline"
      viewBox="0 0 16 16"
    >
      <path
        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
      />
      <path
        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
      />
    </svg>
    <span slot="label">Download resources</span>
  </ButtonLinks>
</nav>
