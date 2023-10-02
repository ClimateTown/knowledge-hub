<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte"

  import ChevronUp from "svelte-bootstrap-icons/lib/ChevronUp.svelte"

  import { DEFAULT_DISPLAY_LIMIT, SCROLL_THRESHOLD } from "$lib/constants"
  import ButtonLinks from "$lib/components/ButtonLinks.svelte"

  const dispatch = createEventDispatcher<{
    updateLimit: { displayLimit: number }
  }>()
  let displayLimit = DEFAULT_DISPLAY_LIMIT
  let scrollPosition = 0
  let showButton: boolean = false

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    // return keyboard focus to top
    mainH1El?.setAttribute("tabIndex", "0")
    mainH1El?.focus()
  }

  // Event listener for scroll events and update limit
  const handleScroll = () => {
    scrollPosition = document.documentElement.scrollTop || 0
    showButton = scrollPosition >= window.innerHeight * 2
    if (scrollPosition >= SCROLL_THRESHOLD) updateDisplayLimit()
  }

  // Update the displayLimit based on the scroll position
  const updateDisplayLimit = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    const currentPosition = scrollTop + clientHeight

    if (currentPosition >= scrollHeight - SCROLL_THRESHOLD) {
      displayLimit += DEFAULT_DISPLAY_LIMIT
    }
    dispatch("updateLimit", { displayLimit })
  }

  let mainH1El: HTMLHeadingElement | null
  // Hook into component lifecycle events
  onMount(() => {
    mainH1El = document.querySelector("main > h1")
    window.addEventListener("scroll", handleScroll)
  })
</script>

<ButtonLinks
  type="button"
  version="filled"
  color="green"
  isCircle={true}
  on:click={scrollToTop}
  extraClasses="w-10 h-10 justify-center rounded-full fixed transition-opacity bottom-10 right-10 z-50 outline-offset-2 {showButton
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <ChevronUp slot="icon" class="w-6 h-6 inline bg-center" />
  <span slot="label" class="sr-only">Back to Top</span>
</ButtonLinks>
