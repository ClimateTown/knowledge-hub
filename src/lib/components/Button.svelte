<script lang="ts">
  export let href: string = ""
  export let onClick: () => void = () => {}
  export let disabled: boolean = false
</script>

{#if href}
  <a
    {href}
    class="ctaBtn bg-transparent hover:bg-blue-tertiary text-white py-2 px-4 rounded-full mx-6 sm:mr-6"
  >
    <slot />
  </a>
{:else}
  <button
    class="ctaBtn bg-transparent hover:bg-blue-tertiary text-white py-2 px-4 rounded-full mx-6 sm:mr-6"
    on:click={() => onClick()}
    {disabled}
  >
    <slot />
  </button>
{/if}

<style>
  .ctaBtn {
    border: 1px solid #fff;
  }

  .ctaBtn:disabled {
    opacity: 30%;
  }

  .ctaBtn:focus-visible {
    box-shadow: 0 0 0 8px theme("colors.blue-primary");
    border: none;
  }
</style>
