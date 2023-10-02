<script lang="ts">
  const removeWhitespace = (str: string) => {
    return str.replace(/\W+/g, "")
  }

  export let name: string
  export let id: string | undefined = undefined
  export let checked: boolean

  let checkboxId: string = id ? id : removeWhitespace(name)
</script>

<label
  class="cursor-pointer py-2 px-3 rounded-full flex items-center gap-2 text-sm"
  for={checkboxId}
>
  <input
    type="checkbox"
    class="appearance-none cursor-pointer w-6 h-6 rounded-full bg-white dark:bg-black checked:bg-zinc-800 dark:checked:bg-green-600 transition duration-200"
    bind:checked
    id={checkboxId}
    name={checkboxId}
  />
  <span>
    {name}
    <slot />
  </span>
</label>
