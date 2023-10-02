<script lang="ts">
  import { lightColors, darkColors } from "$lib/resources"
  export let tagColor: string | undefined = undefined
  export let extraClasses: string = ""

  let lightTagColor: string | undefined
  let darkTagColor: string | undefined

  if (tagColor !== undefined) {
    lightTagColor = lightColors[tagColor]
    darkTagColor = darkColors[tagColor]
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
