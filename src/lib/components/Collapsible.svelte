<script lang="ts">
  export let label: string;
</script>

<details class="rounded-lg border-2" open>
  <summary class="cursor-pointer text-2xl p-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 inline transition-transform duration-100 ease-in-out"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>

    {label}
  </summary>
  <div>
    <slot />
  </div>
</details>
