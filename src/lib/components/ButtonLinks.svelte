<script lang="ts">
  // DESIGN
  export let version: "hollow" | "filled" = "hollow"
  export let color: "green" | "red" = "green"
  export let isCircle: boolean = false
  export let extraClasses: string = ""

  // button el
  export let disabled: boolean = false
  export let type: "button" | "reset" | "submit" = "button"

  // anchor el
  export let link: boolean = false
  export let url: string = "#"
  export let newTab: boolean = false
  export let download: string | undefined = undefined

  let target: "_blank" | undefined
  let rel: string | undefined

  if (newTab) {
    target = "_blank"
    rel = "noreferrer"
  }

  let designClasses: string = isCircle ? "rounded-full" : "rounded-lg"

  const designClassesMap = {
    hollow: {
      green:
        "border-green-500 dark:border-green-700 text-green-700 dark:text-green-500 hover:text-black hover:bg-green-500 dark:hover:text-white dark:hover:bg-green-900",
      red: "border-red-500 dark:border-red-700 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-black dark:hover:text-white dark:hover:bg-red-900",
    },
    filled: {
      green:
        "bg-green-700 text-white dark:bg-green-900/75 border-green-700 hover:border-green-500 dark:hover:border-green-700 dark:border-green-900/75",
      red: "bg-red-700 text-white dark:bg-red-900/75 border-red-700 hover:border-red-500 dark:hover:border-red-700 dark:border-red-900/75",
    },
  }
  designClasses = `${designClasses} ${designClassesMap[version][color]}`
</script>

{#if link}
  <a
    class="btn-base {designClasses} {extraClasses}"
    href={url}
    {target}
    {rel}
    {download}
    ><slot name="icon" />
    <slot name="label" />
    {#if newTab}<span class="sr-only">in a new tab</span>{/if}
  </a>
{:else}
  <button
    {type}
    {disabled}
    on:click
    class="btn-base {designClasses} {extraClasses} disabled:text-zinc-400 disabled:border-current disabled:bg-zinc-200 dark:disabled:bg-zinc-700 disabled:hover:text-zinc-400 disabled:cursor-not-allowed"
  >
    <slot name="icon" />
    <slot name="label" />
  </button>
{/if}

<style>
  .btn-base {
    @apply inline-flex items-center gap-1;
    @apply border-2 p-2;
    @apply transition-colors;
  }
</style>
