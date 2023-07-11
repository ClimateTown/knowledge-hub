<script lang="ts">
  import { lightColors, darkColors } from "$lib/resources";
  import type { Tag } from "$lib/interfaces";
  export let tag: Tag | undefined = undefined;
  export let extraClasses: string = "";

  let lightTagColor: string | undefined, darkTagColor: string | undefined;

  if (tag && tag.color !== undefined) {
    lightTagColor = lightColors[tag.color];
    darkTagColor = darkColors[tag.color];
  }
</script>

<div
  class="bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded-full {extraClasses}"
  class:tag-color={lightTagColor || darkTagColor}
  style:--tag-color={lightTagColor}
  style:--tag-color-dark={darkTagColor}
>
  <slot />
</div>
