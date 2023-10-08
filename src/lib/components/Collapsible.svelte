<script lang="ts">
  export let label: string
  import ChevronDown from "svelte-bootstrap-icons/lib/ChevronDown.svelte"
</script>

<details
  class="rounded-lg border-2 dark:border-zinc-950 dark:text-zinc-200"
  open
>
  <summary class="cursor-pointer text-2xl p-2">
    <ChevronDown
      class="w-6 h-6 inline transition-transform duration-100 ease-in-out"
    />
    {label}
  </summary>
  <div>
    <slot />
  </div>
</details>
