<script lang="ts">
  import { base } from "$app/paths"
  import { github_url } from "$lib/constants"

  import Download from "svelte-bootstrap-icons/lib/Download.svelte"
  import FileEarmarkPlus from "svelte-bootstrap-icons/lib/FileEarmarkPlus.svelte"
  import PencilSquare from "svelte-bootstrap-icons/lib/PencilSquare.svelte"

  import ButtonLinks from "$lib/components/ButtonLinks.svelte"
</script>

<nav aria-label="Resource Navigation" class="flex flex-wrap gap-2 pb-3">
  <ButtonLinks
    link={true}
    url="{github_url}/issues/new/choose"
    version="hollow"
    color="green"
    newTab={true}
  >
    <FileEarmarkPlus slot="icon" class="w-6 h-6 inline" />
    <span slot="label">Suggest resource</span></ButtonLinks
  >

  <ButtonLinks
    link={true}
    url="{github_url}/edit/main/data/resources.yml"
    version="hollow"
    color="green"
    newTab={true}
  >
    <PencilSquare slot="icon" class="w-6 h-6 inline" />
    <span slot="label">Edit</span>
  </ButtonLinks>

  <ButtonLinks
    link={true}
    download={""}
    url="{base}/ClimateTown-Knowledge-Hub-resources.csv"
    version="hollow"
    color="green"
  >
    <Download slot="icon" class="w-6 h-6 inline" />
    <span slot="label">Download resources</span>
  </ButtonLinks>
</nav>
